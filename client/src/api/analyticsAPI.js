import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

// Get daily energy data
export const getDailyEnergy = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ANALYTICS.DAILY_ENERGY, { params });
};

// Get weather impact
export const getWeatherImpact = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ANALYTICS.WEATHER_IMPACT, { params });
};

// Get energy distribution
export const getEnergyDistribution = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ANALYTICS.DISTRIBUTION, { params });
};

// Get panel performance
export const getPanelPerformance = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ANALYTICS.PANEL_PERFORMANCE, { params });
};

// Get panel efficiency
export const getPanelEfficiency = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ANALYTICS.EFFICIENCY, { params });
};
