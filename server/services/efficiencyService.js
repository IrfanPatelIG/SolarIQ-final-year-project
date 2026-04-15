import Forecast from "../models/forecastModel.js";
import Weather from "../models/weatherModel.js";
import Panel from "../models/panelModel.js";
import { Op } from "sequelize";

// 🔧 Helper functions
const getTiltFactor = (tilt) => {
  if (tilt >= 20 && tilt <= 30) return 1;
  if (tilt >= 10 && tilt < 20) return 0.9;
  return 0.8;
};

const getOrientationFactor = (orientation) => {
  if (!orientation) return 0.8;
  orientation = orientation.toLowerCase();

  if (orientation === "south") return 1;
  if (orientation === "east" || orientation === "west") return 0.85;
  return 0.7;
};

// 🚀 MAIN FUNCTION
export const calculateEfficiency = async ({
  panelId,
  startDate,
  endDate,
}) => {
  // 1️⃣ Get Panel
  const panel = await Panel.findByPk(panelId);

  if (!panel) {
    throw new Error("Panel not found");
  }

  // 2️⃣ Get Forecast Data
  const forecasts = await Forecast.findAll({
    where: {
      panel_id: panelId,
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  if (!forecasts.length) {
    throw new Error("No forecast data for this range");
  }

  // 3️⃣ Total + Avg Energy
  const totalEnergy = forecasts.reduce(
    (sum, f) => sum + f.predicted_energy_kwh,
    0
  );

  const avgEnergy = totalEnergy / forecasts.length;

  // 4️⃣ Get Weather Data (range)
  let weatherData = await Weather.findAll({
    where: {
      recorded_at: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // ⚠️ Fallback
  if (!weatherData.length) {
    console.log("⚠️ No weather in range → using latest weather");

    const latest = await Weather.findOne({
      order: [["recorded_at", "DESC"]],
    });

    if (latest) weatherData = [latest];
  }

  // 5️⃣ Average Weather
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
      weatherData.length,
  };

  // 6️⃣ PANEL FACTORS
  const tiltFactor = getTiltFactor(panel.tilt);
  const orientationFactor = getOrientationFactor(panel.orientation);

  // 7️⃣ SCORES

  // 🟡 Energy Score
  const idealEnergy = 10; // adjust later if needed
  const energyScore = Math.min((avgEnergy / idealEnergy) * 100, 100);

  // 🟡 Weather Score
  const weatherScore =
    100 -
    (avgWeather.cloud_cover * 0.5 +
      avgWeather.precipitation * 2 +
      Math.abs(avgWeather.temperature - 25));

  // 🟡 Panel Score
  const panelScore = ((tiltFactor + orientationFactor) / 2) * 100;

  // 8️⃣ FINAL EFFICIENCY
  const efficiencyScore =
    energyScore * 0.5 + weatherScore * 0.3 + panelScore * 0.2;

  // 9️⃣ PERFORMANCE LABEL
  let performance = "Poor";
  if (efficiencyScore > 75) performance = "Good";
  else if (efficiencyScore > 50) performance = "Moderate";

  return {
    panel_id: panelId,
    totalEnergy,
    avgEnergy,

    efficiency: {
      efficiencyScore: Math.round(efficiencyScore),
      performance,

      breakdown: {
        energyScore: Math.round(energyScore),
        weatherScore: Math.round(weatherScore),
        panelScore: Math.round(panelScore),
      },
    },
  };
};