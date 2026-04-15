import Forecast from "../models/forecastModel.js";
import Weather from "../models/weatherModel.js";
import Panel from "../models/panelModel.js";
import Location from "../models/locationModel.js";
import { Op } from "sequelize";

import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solarService.js";

import { generateRecommendations } from "../services/recommendationService.js";

// 🧠 CENTRALIZED FUNCTION
const getPanelInsightData = async (panelId, startDate, endDate) => {
  // 1️⃣ Panel
  const panel = await Panel.findByPk(panelId);

  if (!panel) {
    throw new Error("Panel not found");
  }

  // 2️⃣ Location
  const location = await Location.findByPk(panel.location_id);

  if (!location) {
    throw new Error("Location not found");
  }

  // 3️⃣ Forecast (filtered)
  const forecasts = await Forecast.findAll({
    where: {
      panel_id: panelId,
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // 4️⃣ Total energy
  const totalEnergy = forecasts.reduce(
    (sum, f) => sum + f.predicted_energy_kwh,
    0
  );

  // 5️⃣ Weather (date-safe range)
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const weatherData = await Weather.findAll({
    where: {
      location_id: location.location_id,
      recorded_at: {
        [Op.between]: [start, end],
      },
    },
  });

  let avgWeather;

  if (!weatherData.length) {
    console.log("⚠️ No weather in range → using latest weather");

    const latestWeather = await Weather.findOne({
      where: { location_id: location.location_id },
      order: [["createdAt", "DESC"]],
    });

    avgWeather = {
      cloud_cover: latestWeather?.cloud_cover || 0,
      temperature: latestWeather?.temperature || 25,
      wind_speed: latestWeather?.wind_speed || 0,
      precipitation: latestWeather?.precipitation || 0,
    };
  } else {
    avgWeather = {
      cloud_cover:
        weatherData.reduce((sum, w) => sum + w.cloud_cover, 0) /
        weatherData.length,

      temperature:
        weatherData.reduce((sum, w) => sum + w.temperature, 0) /
        weatherData.length,

      wind_speed:
        weatherData.reduce((sum, w) => sum + w.wind_speed, 0) /
        weatherData.length,

      precipitation:
        weatherData.reduce((sum, w) => sum + w.precipitation, 0) /
        weatherData.length,
    };
  }

  // 6️⃣ Factors
  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
  const orientationFactor = getOrientationFactor(panel.orientation);

  const factors = {
    tiltFactor,
    orientationFactor,
  };

  return {
    totalEnergy,
    avgWeather,
    factors,
  };
};

export const getAlerts = async (req, res) => {
  try {
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "startDate and endDate required",
      });
    }

    const data = await getPanelInsightData(
      panelId,
      startDate,
      endDate
    );

    const insights = generateRecommendations({
      weather: data.avgWeather,
      factors: data.factors,
      totalEnergy: data.totalEnergy,
    });

    res.json({
      success: true,
      alerts: insights.alerts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.message || "Error fetching alerts",
    });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "startDate and endDate required",
      });
    }

    const data = await getPanelInsightData(
      panelId,
      startDate,
      endDate
    );

    const insights = generateRecommendations({
      weather: data.avgWeather,
      factors: data.factors,
      totalEnergy: data.totalEnergy,
    });

    res.json({
      success: true,
      recommendations: insights.recommendations,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.message || "Error fetching recommendations",
    });
  }
};