import asyncHandler from "../utils/asyncHandler.js";

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
export const getDailyEnergy = asyncHandler(async (req, res) => {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await getDailyEnergyService(requestData);

  return successResponse(res, "Daily energy fetched successfully", data);
});

// Weather Impact
export const getWeatherImpact = asyncHandler(async (req, res) => {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await getWeatherImpactService(requestData);

  return successResponse(res, "Weather impact fetched successfully", data);
});

// Distribution
export const getEnergyDistribution = asyncHandler(async (req, res) => {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await getEnergyDistributionService(requestData);

  return successResponse(res, "Distribution fetched successfully", data);
});

// Panel Performance
export const getPanelPerformance = asyncHandler(async (req, res) => {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await getPanelPerformanceService(requestData);

  return successResponse(res, "Panel performance fetched successfully", data);
});

// Efficiency
export const getPanelEfficiency = asyncHandler(async (req, res) => {
  const requestData = buildRequestData(req);

  const error = validateAnalyticsRequest(requestData);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await getPanelEfficiencyService(requestData);

  return successResponse(res, "Efficiency fetched successfully", data);
});
