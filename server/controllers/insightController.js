import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  getAlertsService,
  getRecommendationsService,
} from "../services/insights/insightService.js";

export const getAlerts = asyncHandler(async (req, res) => {
  const data = await getAlertsService({
    userId: req.user.user_id,
    panelId: req.params.panelId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });

  return successResponse(res, "Alerts fetched successfully", data);
});

export const getRecommendations = asyncHandler(async (req, res) => {
  const data = await getRecommendationsService({
    userId: req.user.user_id,
    panelId: req.params.panelId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });

  return successResponse(res, "Recommendations fetched successfully", data);
});
