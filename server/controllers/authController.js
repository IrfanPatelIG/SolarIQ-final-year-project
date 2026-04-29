import asyncHandler from "../utils/asyncHandler.js";
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
export const registerUser = asyncHandler(async (req, res) => {
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
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
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
});

// Refresh Token
export const refreshTokenHandler = asyncHandler(async (req, res) => {
  const requestData = {
    refreshToken: req.body.refreshToken,
  };

  const validationError = validateRefreshTokenRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

  const data = await refreshTokenService(requestData.refreshToken);

  return successResponse(res, "Access token refreshed", data);
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  const requestData = {
    refreshToken: req.body.refreshToken,
  };

  const validationError = validateRefreshTokenRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 400);
  }

  await logoutUserService(requestData.refreshToken);

  return successResponse(res, "Logged out successfully");
});

// Current User
export const getCurrentUser = asyncHandler(async (req, res) => {
  const requestData = {
    userId: req.user?.user_id,
  };

  const validationError = validateCurrentUserRequest(requestData);

  if (validationError) {
    return errorResponse(res, validationError, 401);
  }

  const data = await getCurrentUserService(requestData.userId);

  return successResponse(res, "Current user fetched successfully", data);
});
