import apiClient from '../services/apiClient.js';
import { API_ENDPOINTS } from '../config/constants.js';

// Get solar data
export const getSolarData = (data) => {
  return apiClient.post(API_ENDPOINTS.SOLAR.GET_DATA, data);
};
