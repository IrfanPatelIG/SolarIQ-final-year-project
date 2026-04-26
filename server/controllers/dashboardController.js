import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../services/dataAggregationService.js";

import { calculateEfficiency } from "../services/efficiencyService.js";

import { generateRecommendations } from "../services/recommendationService.js";

import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solarService.js";

import Panel from "../models/panelModel.js";

// 🔥 MAIN DASHBOARD CONTROLLER
export const getDashboardData = async (req, res) => {
  try {
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userId = req.user.user_id;

    if (!panelId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "panelId, startDate and endDate required",
      });
    }

    // 🔥 CENTRALIZED DATA FETCH
    const { panel, location, forecasts, weather } = await getFullPanelData(
      panelId,
      startDate,
      endDate,
    );

    // 🔐 USER VALIDATION
    if (panel.user_id !== userId) {
      return res.status(403).json({
        message: "Unauthorized: Panel does not belong to this user",
      });
    }

    const totalEnergy = calculateTotalEnergy(forecasts);
    const avgWeather = calculateAvgWeather(weather);

    // 1️⃣ FORECAST
    const forecast = forecasts.map((f) => ({
      date: f.forecast_date,
      energy: f.predicted_energy_kwh,
    }));

    // 2️⃣ DAILY ENERGY
    const dailyEnergy = forecast;

    // 3️⃣ WEATHER IMPACT (FIXED MAPPING)
    const weatherMap = {};

    weather.forEach((w) => {
      const date = new Date(w.recorded_at).toISOString().split("T")[0];
      weatherMap[date] = w;
    });

    const weatherImpact = forecasts.map((f) => {
      const date = new Date(f.forecast_date).toISOString().split("T")[0];
      const w = weatherMap[date];

      return {
        date: f.forecast_date,
        energy: f.predicted_energy_kwh,
        temperature: w?.temperature || 0,
        cloud_cover: w?.cloud_cover || 0,
      };
    });

    // 4️⃣ DISTRIBUTION
    const distributionMap = {};

    forecasts.forEach((f) => {
      const day = new Date(f.forecast_date).toLocaleString("en-US", {
        weekday: "long",
      });

      if (!distributionMap[day]) {
        distributionMap[day] = [];
      }

      distributionMap[day].push(f.predicted_energy_kwh);
    });

    const distribution = Object.keys(distributionMap).map((day) => ({
      day,
      avg_energy:
        distributionMap[day].reduce((a, b) => a + b, 0) /
        distributionMap[day].length,
    }));

    // 5️⃣ PANEL PERFORMANCE
    const panels = await Panel.findAll({
      where: { user_id: userId },
    });

    const panelPerformance = panels.map((p) => ({
      panel_id: p.panel_id,
      tilt: p.tilt,
      orientation: p.orientation,
      avg_energy: totalEnergy / forecasts.length,
    }));

    // 6️⃣ EFFICIENCY
    const efficiencyData = await calculateEfficiency({
      panelId,
      startDate,
      endDate,
    });

    // 7️⃣ INSIGHTS
    const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
    const orientationFactor = getOrientationFactor(panel.orientation);

    const insights = generateRecommendations({
      weather: avgWeather,
      factors: { tiltFactor, orientationFactor },
      totalEnergy,
    });

    res.json({
      success: true,
      data: {
        forecast,
        analytics: {
          dailyEnergy,
          weatherImpact,
          distribution,
          panelPerformance,
        },
        efficiency: efficiencyData.efficiency,
        insights,
      },
    });
  } catch (err) {
    console.error("❌ Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed",
    });
  }
};
