import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

// Get insights
export const getInsights = (params = {}) => {
  return apiClient.get(API_ENDPOINTS.INSIGHTS.GET_INSIGHTS, { params });
};
