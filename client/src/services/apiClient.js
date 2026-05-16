import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/constants.js';
import * as tokenService from './tokenService.js';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    // If response has the structure { success, message, data }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenService.clearTokens();
      window.location.href = '/auth';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
