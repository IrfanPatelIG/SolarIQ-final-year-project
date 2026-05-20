import { successResponse, errorResponse } from "../utils/apiResponse.js";

import { validateDashboardRequest } from "../validators/dashboardValidator.js";

import { getDashboardService } from "../services/dashboard/dashboardService.js";
import { Location, Panel } from "../models/index.js";

export const getUserPanels = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return errorResponse(res, "User not authenticated", 401);
    }

    const panels = await Panel.findAll({
      where: { user_id: userId },
      attributes: [
        "panel_id",
        "area",
        "tilt",
        "orientation",
        "installation_date",
        "createdAt",
      ],
      include: [
        {
          model: Location,
          attributes: [
            "location_id",
            "latitude",
            "longitude",
            "city",
            "state",
            "country",
          ],
        },
      ],
      order: [
        ["createdAt", "ASC"],
        ["panel_id", "ASC"],
      ],
    });
    const totalPanels = panels.length;
    const userPanels = panels.map((panel, index) => ({
      ...panel.toJSON(),
      userPanelId: index + 1,
      totalPanels,
    }));

    return successResponse(res, "Panels fetched successfully", {
      totalPanels,
      panels: userPanels,
    });
  } catch (error) {
    console.error("Error in getUserPanels:", error);
    return errorResponse(res, error.message, 500);
  }
};

export const getDashboardData = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    return errorResponse(res, error.message, 500);
  }
};
