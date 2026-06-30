// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
export const API_TIMEOUT = 10000; // 10 seconds

// Token Keys
export const ACCESS_TOKEN_KEY = 'solariq_access_token';
export const REFRESH_TOKEN_KEY = 'solariq_refresh_token';
export const USER_KEY = 'solariq_user';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  // Dashboard
  DASHBOARD: {
    GET_DATA: '/api/dashboard',
  },
  // Analytics
  ANALYTICS: {
    DAILY_ENERGY: '/api/analytics/daily-energy',
    WEATHER_IMPACT: '/api/analytics/weather-impact',
    DISTRIBUTION: '/api/analytics/distribution',
    PANEL_PERFORMANCE: '/api/analytics/panel-performance',
    EFFICIENCY: '/api/analytics/efficiency',
  },
  // Solar
  SOLAR: {
    GET_DATA: '/api/solar',
  },
  // Insights
  INSIGHTS: {
    GET_INSIGHTS: '/api/insights',
  },
  // Contact
  CONTACT: {
    SUBMIT: '/api/contact/submit',
  },
};
