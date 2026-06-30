import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

export const getUserPanels = () => {
  return apiClient.get(`${API_ENDPOINTS.DASHBOARD.GET_DATA}/panels`);
};

// Get dashboard data for a specific panel
export const getDashboardData = (panelId, startDate = null, endDate = null) => {
  const params = {};

  if (startDate && endDate) {
    params.startDate = startDate;
    params.endDate = endDate;
  }

  return apiClient.get(`${API_ENDPOINTS.DASHBOARD.GET_DATA}/${panelId}`, {
    params,
  });
};
