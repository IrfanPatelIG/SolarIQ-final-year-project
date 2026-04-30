import { Op } from "sequelize";
import Panel from "../../models/panelModel.js";
import Forecast from "../../models/forecastModel.js";
import AppError from "../../utils/appError.js";

import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../shared/dataAggregationService.js";

import { calculateEfficiency } from "../efficiency/efficiencyService.js";

import {
  getSelectedDayEnergy,
  buildForecast,
  buildWeatherImpact,
  buildDistribution,
} from "../../helpers/dashboardHelper.js";

import { getFullInsightsService } from "../insights/insightService.js";

// ===================================================
// Main Service
// ===================================================

export const getDashboardService = async ({
  panelId,
  startDate,
  endDate,
  userId,
}) => {
  const { panel, location, forecasts, weather } = await getFullPanelData(
    panelId,
    startDate,
    endDate,
  );

  if (!panel || !location) {
    throw new AppError("Panel not found", 404);
  }

  if (panel.user_id !== userId) {
    throw new AppError("Unauthorized panel access", 403);
  }

  const totalEnergy = calculateTotalEnergy(forecasts);

  const avgWeather = safeWeatherAverage(weather);

  const forecast = buildForecast(forecasts);

  const heroCard = getSelectedDayEnergy(forecasts, startDate);

  const [panelPerformance, efficiencyData, insightsData] = await Promise.all([
    getPanelPerformance(userId, startDate, endDate),

    calculateEfficiency({
      panelId,
      startDate,
      endDate,
    }),

    getFullInsightsService({
      userId,
      panelId,
      startDate,
      endDate,
    }),
  ]);

  return {
    heroCard,
    forecast,

    analytics: {
      dailyEnergy: forecast,
      weatherImpact: buildWeatherImpact(forecasts, weather),
      distribution: buildDistribution(forecasts),
      panelPerformance,
    },

    efficiency: efficiencyData.efficiency,

    insights: {
      score: insightsData.score,
      alerts: insightsData.alerts,
      recommendations: insightsData.recommendations,
    },

    meta: {
      weatherAvailable: weather.length > 0,
    },
  };
};

// ===================================================
// Helpers
// ===================================================

const safeWeatherAverage = (weather) => {
  try {
    return calculateAvgWeather(weather);
  } catch {
    return {
      temperature: 0,
      cloud_cover: 0,
      humidity: 0,
      precipitation: 0,
      wind_speed: 0,
      air_pressure: 0,
    };
  }
};

const getPanelPerformance = async (userId, startDate, endDate) => {
  const panels = await Panel.findAll({
    where: {
      user_id: userId,
    },
    attributes: ["panel_id", "tilt", "orientation"],
  });

  const panelIds = panels.map((panel) => panel.panel_id);

  if (!panelIds.length) {
    return [];
  }

  const forecasts = await Forecast.findAll({
    where: {
      panel_id: panelIds,
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: ["panel_id", "predicted_energy_kwh"],
  });

  const energyMap = {};

  forecasts.forEach((row) => {
    if (!energyMap[row.panel_id]) {
      energyMap[row.panel_id] = [];
    }

    energyMap[row.panel_id].push(Number(row.predicted_energy_kwh));
  });

  return panels.map((panel) => {
    const energies = energyMap[panel.panel_id] || [];

    const avg =
      energies.reduce((sum, val) => sum + val, 0) / (energies.length || 1);

    return {
      panel_id: panel.panel_id,
      tilt: panel.tilt,
      orientation: panel.orientation,
      avg_energy: avg,
    };
  });
};
