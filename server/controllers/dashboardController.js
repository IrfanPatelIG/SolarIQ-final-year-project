import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../services/dataAggregationService.js";
import { getSelectedDayEnergy } from "../helpers/dashboardHelper.js";
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
    
    console.log("Requested panelId:", panelId);

    if (isNaN(panelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid panelId",
      });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "startDate cannot be after endDate",
      });
    }

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

    if (!panel) {
      return res.status(404).json({
        success: false,
        message: "Panel not found",
      });
    }

    // 🔐 USER VALIDATION
    if (panel.user_id !== userId) {
      return res.status(403).json({
        message: "Unauthorized: Panel does not belong to this user",
      });
    }

    const totalEnergy = calculateTotalEnergy(forecasts);

    let avgWeather;
    let weatherAvailable = true;

    try {
      avgWeather = calculateAvgWeather(weather);
    } catch {
      weatherAvailable = false;
    }

    // 1️⃣ FORECAST
    const forecast = forecasts.map((f) => ({
      date: f.forecast_date,
      energy: Number(f.predicted_energy_kwh.toFixed(2)),
    }));

    const selectedDayEnergy = getSelectedDayEnergy(
      forecasts,
      startDate
    );

    // 2️⃣ DAILY ENERGY
    const dailyEnergy = forecast;

    // 3️⃣ WEATHER IMPACT (FIXED MAPPING)
    const weatherMap = {};

    weather.forEach((w) => {
      const date = new Date(w.recorded_at).toLocaleDateString("en-CA");
      weatherMap[date] = w;
    });

    const weatherImpact = forecasts.map((f) => {
      const date = new Date(f.forecast_date).toLocaleDateString("en-CA");
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

    const panelPerformance = [];

    for (const p of panels) {
      const { forecasts: pf } = await getFullPanelData(
        p.panel_id,
        startDate,
        endDate
      );

      const energy =
        pf.reduce((sum, f) => sum + f.predicted_energy_kwh, 0) /
        (pf.length || 1);

      panelPerformance.push({
        panel_id: p.panel_id,
        tilt: p.tilt,
        orientation: p.orientation,
        avg_energy: energy,
      });
    }

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

    console.log("Panel from DB:", panel.panel_id);

    res.json({
      success: true,
      data: {
        heroCard: selectedDayEnergy,
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
      meta: {
        weatherAvailable,
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
