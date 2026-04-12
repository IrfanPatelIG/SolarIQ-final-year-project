import { generateRecommendations } from "../services/recommendationService.js";
import { Op } from "sequelize";
import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solarService.js";
import Panel from "../models/panelModel.js";
import Weather from "../models/weatherModel.js";
import Location from "../models/locationModel.js";
import Forecast from "../models/forecastModel.js";

// 🧠 COMMON FUNCTION (internal use)
const getInsightData = async (startDate, endDate) => {
  const forecasts = await Forecast.findAll({
    where: {
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // 🌦 Get weather data for date range
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 🔥 Extend end to full day
  end.setHours(23, 59, 59, 999);

  const weatherData = await Weather.findAll({
    where: {
      recorded_at: {
        [Op.between]: [start, end],
      },
    },
  });

  // ⚠️ Safety check
  let avgWeather;

  if (!weatherData.length) {
    console.log("⚠️ No weather in range → using latest weather");

    const latestWeather = await Weather.findOne({
      order: [["recorded_at", "DESC"]],
    });

    avgWeather = {
      cloud_cover: latestWeather.cloud_cover,
      temperature: latestWeather.temperature,
      wind_speed: latestWeather.wind_speed,
      precipitation: latestWeather.precipitation,
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

  const totalEnergy = forecasts.reduce(
    (sum, f) => sum + f.predicted_energy_kwh,
    0,
  );

  // 📐 Get panel + location (latest for now)
  const panel = await Panel.findOne({
    order: [["createdAt", "DESC"]],
  });

  const location = await Location.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!panel || !location) {
    throw new Error("Panel or Location data missing");
  }

  // 🔥 Calculate REAL factors
  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
  const orientationFactor = getOrientationFactor(panel.orientation);

  const factors = {
    tiltFactor,
    orientationFactor,
  };

  console.log("📊 Forecast count:", forecasts.length);
  console.log("🌦 Weather count:", weatherData.length);

  return generateRecommendations({
    weather: avgWeather,
    factors,
    totalEnergy,
  });
};

//✅ 1️⃣ ALERTS API
export const getAlerts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "startDate and endDate required",
      });
    }

    const insights = await getInsightData(startDate, endDate);

    res.json({
      success: true,
      alerts: insights.alerts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching alerts" });
  }
};

// ✅ 2️⃣ RECOMMENDATIONS API
export const getRecommendations = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "startDate and endDate required",
      });
    }

    const insights = await getInsightData(startDate, endDate);

    res.json({
      success: true,
      recommendations: insights.recommendations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching recommendations" });
  }
};
