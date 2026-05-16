import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

const formatDate = (date) => date.toLocaleDateString('en-CA');

const getDefaultDateRange = () => {
  const start = new Date();
  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

export const getUserPanels = () => {
  return apiClient.get(`${API_ENDPOINTS.DASHBOARD.GET_DATA}/panels`);
};

// Get dashboard data for a specific panel
export const getDashboardData = (panelId, startDate = null, endDate = null) => {
  const defaultRange = getDefaultDateRange();
  const params = {
    startDate: startDate || defaultRange.startDate,
    endDate: endDate || defaultRange.endDate,
  };

  return apiClient.get(`${API_ENDPOINTS.DASHBOARD.GET_DATA}/${panelId}`, {
    params,
  });
};
