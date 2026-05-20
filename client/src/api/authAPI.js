import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

// Register new user
export const registerUser = (data) => {
  return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
};

// Login user
export const loginUser = (email, password) => {
  return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
};

// Get current user
export const getCurrentUser = () => {
  return apiClient.get(API_ENDPOINTS.AUTH.ME);
};

// Refresh token
export const refreshToken = () => {
  return apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
};

// Logout user
export const logoutUser = () => {
  return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
};
