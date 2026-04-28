import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

import { validateDashboardRequest } from "../validators/dashboardValidator.js";

import { getDashboardService } from "../services/dashboard/dashboardService.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const requestData = {
    panelId: req.params.panelId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    userId: req.user?.user_id,
  };

  const validationError = validateDashboardRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

  const data = await getDashboardService(requestData);

  return successResponse(res, "Dashboard fetched successfully", data);
});
