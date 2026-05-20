import { successResponse, errorResponse } from "../utils/apiResponse.js";

import {
  validateRegisterRequest,
  validateLoginRequest,
  validateRefreshTokenRequest,
  validateCurrentUserRequest,
} from "../validators/authValidator.js";

import {
  registerUserService,
  loginUserService,
  refreshTokenService,
  logoutUserService,
  getCurrentUserService,
} from "../services/auth/authService.js";

// Register
export const registerUser = async (req, res) => {
  try {
  const requestData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const validationError = validateRegisterRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

    const data = await registerUserService(requestData);

    return successResponse(res, "User registered successfully", data, 201);
  } catch (error) {
    console.error("Error in registerUser:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
  const requestData = {
    email: req.body.email,
    password: req.body.password,
  };

  const validationError = validateLoginRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

    const data = await loginUserService(requestData);

    return successResponse(res, "Login successful", data);
  } catch (error) {
    console.error("Error in loginUser:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Refresh Token
export const refreshTokenHandler = async (req, res) => {
  try {
  const requestData = {
    refreshToken: req.body.refreshToken,
  };

  const validationError = validateRefreshTokenRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

    const data = await refreshTokenService(requestData.refreshToken);

    return successResponse(res, "Access token refreshed", data);
  } catch (error) {
    console.error("Error in refreshTokenHandler:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
  const requestData = {
    refreshToken: req.body.refreshToken,
  };

  const validationError = validateRefreshTokenRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

    await logoutUserService(requestData.refreshToken);

    return successResponse(res, "Logged out successfully");
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Current User
export const getCurrentUser = async (req, res) => {
  try {
  const requestData = {
    userId: req.user?.user_id,
  };

  const validationError = validateCurrentUserRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 401);
  }

    const data = await getCurrentUserService(requestData.userId);

    return successResponse(res, "Current user fetched successfully", data);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return errorResponse(res, error.message, 500);
  }
};
