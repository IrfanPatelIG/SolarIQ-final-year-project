import { successResponse, errorResponse } from "../utils/apiResponse.js";

import { validateAnalyticsRequest } from "../validators/analyticsValidator.js";

import {
  getDailyEnergyService,
  getWeatherImpactService,
  getEnergyDistributionService,
  getPanelPerformanceService,
  getPanelEfficiencyService,
} from "../services/analytics/analyticsService.js";

const buildRequestData = (req) => ({
  userId: req.user?.user_id,
  startDate: req.query.startDate,
  endDate: req.query.endDate,
});

// Daily Energy
export const getDailyEnergy = async (req, res) => {
  try {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

    const data = await getDailyEnergyService(requestData);

    return successResponse(res, "Daily energy fetched successfully", data);
  } catch (error) {
    console.error("Error in getDailyEnergy:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Weather Impact
export const getWeatherImpact = async (req, res) => {
  try {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

    const data = await getWeatherImpactService(requestData);

    return successResponse(res, "Weather impact fetched successfully", data);
  } catch (error) {
    console.error("Error in getWeatherImpact:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Distribution
export const getEnergyDistribution = async (req, res) => {
  try {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

    const data = await getEnergyDistributionService(requestData);

    return successResponse(res, "Distribution fetched successfully", data);
  } catch (error) {
    console.error("Error in getEnergyDistribution:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Panel Performance
export const getPanelPerformance = async (req, res) => {
  try {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

    const data = await getPanelPerformanceService(requestData);

    return successResponse(res, "Panel performance fetched successfully", data);
  } catch (error) {
    console.error("Error in getPanelPerformance:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Efficiency
export const getPanelEfficiency = async (req, res) => {
  try {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

    const data = await getPanelEfficiencyService(requestData);

    return successResponse(res, "Efficiency fetched successfully", data);
  } catch (error) {
    console.error("Error in getPanelEfficiency:", error);
    return errorResponse(res, error.message, 500);
  }
};
