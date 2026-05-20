import { successResponse, errorResponse } from "../utils/apiResponse.js";

import {
  getAlertsService,
  getRecommendationsService,
} from "../services/insights/insightService.js";

export const getAlerts = async (req, res) => {
  try {
    const data = await getAlertsService({
      userId: req.user.user_id,
      panelId: req.params.panelId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    });

    return successResponse(res, "Alerts fetched successfully", data);
  } catch (error) {
    console.error("Error in getAlerts:", error);
    return errorResponse(res, error.message, 500);
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const data = await getRecommendationsService({
      userId: req.user.user_id,
      panelId: req.params.panelId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    });

    return successResponse(res, "Recommendations fetched successfully", data);
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    return errorResponse(res, error.message, 500);
  }
};
