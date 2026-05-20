import AppError from "../../utils/appError.js";

import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../shared/dataAggregationService.js";

import { getTiltFactor, getOrientationFactor } from "../solar/solarService.js";

import { generateAlerts } from "./alertEngine.js";
import { generateRecommendations } from "./recommendationService.js";
import { calculatePerformanceScore } from "./scoreEngine.js";

// ===================================================
// Public Services
// ===================================================

export const getAlertsService = async (requestData) => {
  const insights = await buildInsightPayload(requestData);

  return {
    panelId: insights.panelId,
    score: insights.score,
    alerts: insights.alerts,
  };
};

export const getRecommendationsService = async (requestData) => {
  const insights = await buildInsightPayload(requestData);

  return {
    panelId: insights.panelId,
    score: insights.score,
    recommendations: insights.recommendations,
  };
};

export const getFullInsightsService = async (requestData) => {
  return await buildInsightPayload(requestData);
};

// ===================================================
// Main Logic
// ===================================================

const buildInsightPayload = async ({ userId, panelId, startDate, endDate }) => {
  validateRequest({
    userId,
    panelId,
    startDate,
    endDate,
  });

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

  const avgWeather = getSafeAverageWeather(weather);

  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);

  const orientationFactor = getOrientationFactor(panel.orientation);

  const factors = {
    tiltFactor,
    orientationFactor,
  };

  const alerts = generateAlerts({
    weather: avgWeather,
    totalEnergy,
    factors,
    panel,
  });

  const recommendations = generateRecommendations({
    weather: avgWeather,
    totalEnergy,
    factors,
    panel,
  });

  const score = calculatePerformanceScore({
    weather: avgWeather,
    totalEnergy,
    factors,
  });

  return {
    panelId: Number(panelId),
    score,
    alerts,
    recommendations,
    summary: {
      totalEnergy,
      avgWeather,
      factors,
    },
  };
};

// ===================================================
// Helpers
// ===================================================

const validateRequest = ({ userId, panelId, startDate, endDate }) => {
  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  if (!panelId || Number.isNaN(Number(panelId))) {
    throw new AppError("Invalid panelId", 400);
  }

  if (!startDate || !endDate) {
    throw new AppError("startDate and endDate required", 400);
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw new AppError("Invalid date range", 400);
  }
};

const getSafeAverageWeather = (weather) => {
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
