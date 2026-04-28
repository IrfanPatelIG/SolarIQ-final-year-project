import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

import { isValidDateRange } from "../helpers/dateHelper.js";

import {
  getDailyEnergyService,
  getWeatherImpactService,
  getEnergyDistributionService,
  getPanelPerformanceService,
  getPanelEfficiencyService,
} from "../services/analytics/analyticsService.js";

// ===================================================
// Helpers
// ===================================================

const getRequestParams = (req) => ({
  userId: req.user?.user_id,
  startDate: req.query.startDate,
  endDate: req.query.endDate,
});

const validateRequest = ({ userId, startDate, endDate }) => {
  if (!userId) {
    return "User not authenticated";
  }

  if (!startDate || !endDate) {
    return "startDate and endDate required";
  }

  if (!isValidDateRange(startDate, endDate)) {
    return "Invalid date range";
  }

  return null;
};

const handleAnalyticsResponse = async (req, res, service, message) => {
  const params = getRequestParams(req);

  const error = validateRequest(params);

  if (error) {
    return errorResponse(res, error, 400);
  }

  const data = await service(params);

  return successResponse(res, message, data);
};

// ===================================================
// Controllers
// ===================================================

export const getDailyEnergy = asyncHandler(async (req, res) => {
  return handleAnalyticsResponse(
    req,
    res,
    getDailyEnergyService,
    "Daily energy fetched successfully",
  );
});

export const getWeatherImpact = asyncHandler(async (req, res) => {
  return handleAnalyticsResponse(
    req,
    res,
    getWeatherImpactService,
    "Weather impact fetched successfully",
  );
});

export const getEnergyDistribution = asyncHandler(async (req, res) => {
  return handleAnalyticsResponse(
    req,
    res,
    getEnergyDistributionService,
    "Distribution fetched successfully",
  );
});

export const getPanelPerformance = asyncHandler(async (req, res) => {
  return handleAnalyticsResponse(
    req,
    res,
    getPanelPerformanceService,
    "Panel performance fetched successfully",
  );
});

export const getPanelEfficiency = asyncHandler(async (req, res) => {
  return handleAnalyticsResponse(
    req,
    res,
    getPanelEfficiencyService,
    "Efficiency fetched successfully",
  );
});
