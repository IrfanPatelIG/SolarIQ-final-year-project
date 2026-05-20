import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

import { validateSolarRequest } from "../validators/panelValidator.js";

import {
  processSolarRequest,
} from "../services/solar/solarService.js";

export const getSolarData = async (req, res) => {
  try {
    const validationError =
      validateSolarRequest(
        req.body
      );

    if (validationError) {
      return errorResponse(
        res,
        validationError,
        400
      );
    }

    const result =
      await processSolarRequest(
        req
      );

    return successResponse(
      res,
      "Solar data processed successfully",
      result,
      200
    );
  } catch (error) {
    console.error("Error in getSolarData:", error);
    return errorResponse(res, error.message, 500);
  }
};