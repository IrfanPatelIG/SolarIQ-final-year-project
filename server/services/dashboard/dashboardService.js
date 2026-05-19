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
  // If no date range provided, fetch all data for the panel to get available dates
  const { panel, location, forecasts, weather } = await getFullPanelData(
    panelId,
    startDate || '1970-01-01',
    endDate || '2099-12-31',
  );

  if (!panel || !location) {
    throw new AppError("Panel not found", 404);
  }

  if (panel.user_id !== userId) {
    throw new AppError("Unauthorized panel access", 403);
  }

  const panelMeta = await getUserPanelMeta(userId, panelId);

  // Get available dates for this panel from database
  const availableDates = forecasts.map(f => f.forecast_date).sort();

  // If no date range provided, return only available dates
  if (!startDate || !endDate) {
    return {
      meta: {
        ...panelMeta,
        weatherAvailable: weather.length > 0,
        availableDates,
      },
    };
  }

  // Filter forecasts and weather by the requested date range
  const filteredForecasts = forecasts.filter(f => {
    const date = new Date(f.forecast_date).toISOString().split('T')[0];
    return date >= startDate && date <= endDate;
  });

  const filteredWeather = weather.filter(w => {
    const date = new Date(w.recorded_at).toISOString().split('T')[0];
    return date >= startDate && date <= endDate;
  });

  const totalEnergy = calculateTotalEnergy(filteredForecasts);

  const avgWeather = filteredWeather.length > 0 ? safeWeatherAverage(filteredWeather) : {
    temperature: 0,
    cloud_cover: 0,
    humidity: 0,
    precipitation: 0,
    wind_speed: 0,
    air_pressure: 0,
  };

  const forecast = buildForecast(filteredForecasts);

  const heroCard = getSelectedDayEnergy(filteredForecasts, startDate);

  // Use database weather data for consistency (not external API)
  let currentWeather = null;
  if (filteredWeather.length > 0) {
    // Get weather data for the start date (today's date)
    const targetDate = new Date(startDate).toISOString().split('T')[0];
    const exactWeather = filteredWeather.find(
      (w) => new Date(w.recorded_at).toISOString().split('T')[0] === targetDate
    );
    
    if (exactWeather) {
      currentWeather = {
        temperature: exactWeather.temperature,
        humidity: exactWeather.humidity,
        cloud_cover: exactWeather.cloud_cover,
        wind_speed: exactWeather.wind_speed,
        air_pressure: exactWeather.air_pressure,
        precipitation: exactWeather.precipitation,
        description: "",
      };
    } else {
      // Fallback to first available weather data
      currentWeather = {
        temperature: filteredWeather[0].temperature,
        humidity: filteredWeather[0].humidity,
        cloud_cover: filteredWeather[0].cloud_cover,
        wind_speed: filteredWeather[0].wind_speed,
        air_pressure: filteredWeather[0].air_pressure,
        precipitation: filteredWeather[0].precipitation,
        description: "",
      };
    }
  }

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
      weatherImpact: buildWeatherImpact(filteredForecasts, filteredWeather),
      distribution: buildDistribution(filteredForecasts),
      panelPerformance,
    },

    efficiency: efficiencyData.efficiency,

    currentWeather,

    insights: {
      score: insightsData.score,
      alerts: insightsData.alerts,
      recommendations: insightsData.recommendations,
    },

    db: {
      panel: {
        panel_id: panel.panel_id,
        area: panel.area,
        tilt: panel.tilt,
        orientation: panel.orientation,
        installation_date: panel.installation_date,
      },
      location: {
        location_id: location.location_id,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        state: location.state,
        country: location.country,
      },
    },

    meta: {
      ...panelMeta,
      weatherAvailable: weather.length > 0,
      availableDates,
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

const getUserPanelMeta = async (userId, panelId) => {
  const panels = await Panel.findAll({
    where: {
      user_id: userId,
    },
    attributes: ["panel_id"],
    order: [
      ["createdAt", "ASC"],
      ["panel_id", "ASC"],
    ],
  });

  const totalPanels = panels.length;
  const index = panels.findIndex(
    (panel) => Number(panel.panel_id) === Number(panelId),
  );

  return {
    panelId: Number(panelId),
    userPanelId: index >= 0 ? index + 1 : Number(panelId),
    totalPanels,
  };
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
