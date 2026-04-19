import { Forecast } from "../models/index.js";
import { Op } from "sequelize";

import {
  calculateEfficiency
} from "../services/efficiencyService.js";

import {
  generateRecommendations
} from "../services/recommendationService.js";

import {
  getTiltFactor,
  getOrientationFactor
} from "../services/solarService.js";

import Weather from "../models/weatherModel.js";
import Panel from "../models/panelModel.js";
import Location from "../models/locationModel.js";

// 🔥 MAIN DASHBOARD CONTROLLER
export const getDashboardData = async (req, res) => {
  try {
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!panelId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "panelId, startDate and endDate required"
      });
    }

    // 1️⃣ FORECAST DATA
    const forecasts = await Forecast.findAll({
      where: {
        panel_id: panelId,
        forecast_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [["forecast_date", "ASC"]]
    });

    const forecast = forecasts.map(f => ({
      date: f.forecast_date,
      energy: f.predicted_energy_kwh
    }));

    // 2️⃣ DAILY ENERGY (same as forecast)
    const dailyEnergy = forecast;

    // 3️⃣ WEATHER IMPACT
    const weatherData = await Weather.findAll();

    const weatherImpact = forecasts.map((f, i) => ({
      date: f.forecast_date,
      energy: f.predicted_energy_kwh,
      temperature: weatherData[i]?.temperature || 0,
      cloud_cover: weatherData[i]?.cloud_cover || 0
    }));

    // 4️⃣ DISTRIBUTION
    const distributionMap = {};

    forecasts.forEach(f => {
      const day = new Date(f.forecast_date).toLocaleString("en-US", {
        weekday: "long"
      });

      if (!distributionMap[day]) {
        distributionMap[day] = [];
      }

      distributionMap[day].push(f.predicted_energy_kwh);
    });

    const distribution = Object.keys(distributionMap).map(day => ({
      day,
      avg_energy:
        distributionMap[day].reduce((a, b) => a + b, 0) /
        distributionMap[day].length
    }));

    // 5️⃣ PANEL PERFORMANCE
    const panels = await Panel.findAll();

    const panelPerformance = panels.map(p => ({
      panel_id: p.panel_id,
      tilt: p.tilt,
      orientation: p.orientation,
      avg_energy:
        forecasts.reduce((sum, f) => sum + f.predicted_energy_kwh, 0) /
        forecasts.length
    }));

    // 6️⃣ EFFICIENCY (REAL SERVICE)
    const efficiencyData = await calculateEfficiency({
      panelId,
      startDate,
      endDate
    });

    // 7️⃣ INSIGHTS (REAL LOGIC)
    const panel = await Panel.findByPk(panelId);
    const location = await Location.findByPk(panel.location_id);

    const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
    const orientationFactor = getOrientationFactor(panel.orientation);

    const totalEnergy = forecasts.reduce(
      (sum, f) => sum + f.predicted_energy_kwh,
      0
    );

    const avgWeather = {
      cloud_cover:
        weatherData.reduce((s, w) => s + (w.cloud_cover || 0), 0) /
        weatherData.length,

      temperature:
        weatherData.reduce((s, w) => s + (w.temperature || 0), 0) /
        weatherData.length,

      wind_speed:
        weatherData.reduce((s, w) => s + (w.wind_speed || 0), 0) /
        weatherData.length,

      precipitation:
        weatherData.reduce((s, w) => s + (w.precipitation || 0), 0) /
        weatherData.length
    };

    const insights = generateRecommendations({
      weather: avgWeather,
      factors: { tiltFactor, orientationFactor },
      totalEnergy
    });

    // ✅ FINAL RESPONSE
    res.json({
      success: true,
      data: {
        forecast,

        analytics: {
          dailyEnergy,
          weatherImpact,
          distribution,
          panelPerformance
        },

        efficiency: efficiencyData.efficiency,

        insights
      }
    });

  } catch (err) {
    console.error("❌ Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed"
    });
  }
};