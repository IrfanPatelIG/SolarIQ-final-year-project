import axios from 'axios';

const API_KEY = '05cf51f55bb73d13b2b6c3616953f9f4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch weather data for a specific location and date
 * Note: OpenWeatherMap free tier only provides current weather, not historical
 * For historical data, we would need a paid plan or use a different API
 * For now, we'll use current weather as an approximation
 */
export const fetchWeatherData = async (lat, lon, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;

    // Extract and transform weather data to match ML model features
    const weatherData = {
      solar_irradiance: calculateSolarIrradiance(data.clouds?.all || 0, lat),
      temperature_avg: data.main?.temp || 25,
      humidity: data.main?.humidity || 60,
      wind_speed: data.wind?.speed || 3,
      pressure: data.main?.pressure || 1013,
      cloud_cover: data.clouds?.all || 0,
      precipitation: data.rain?.['1h'] || data.snow?.['1h'] || 0
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    // Return default values if API fails
    return {
      solar_irradiance: 500,
      temperature_avg: 25,
      humidity: 60,
      wind_speed: 3,
      pressure: 1013,
      cloud_cover: 25,
      precipitation: 0
    };
  }
};

/**
 * Calculate solar irradiance based on cloud cover and latitude
 * This is a simplified approximation since OpenWeatherMap doesn't provide direct irradiance
 */
const calculateSolarIrradiance = (cloudCover, latitude) => {
  // Base irradiance (W/m²) - simplified calculation
  const baseIrradiance = 1000;
  
  // Cloud cover reduces irradiance
  const cloudFactor = 1 - (cloudCover / 100) * 0.75;
  
  // Latitude adjustment (higher latitudes get less sun)
  const latFactor = 1 - (Math.abs(latitude) / 90) * 0.3;
  
  return Math.round(baseIrradiance * cloudFactor * latFactor);
};

/**
 * Fetch weather data for a date range
 * Returns array of weather data for each day
 */
export const fetchWeatherForDateRange = async (lat, lon, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = [];
  
  const currentDate = new Date(start);
  while (currentDate <= end) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const weatherData = await fetchWeatherData(lat, lon, dateStr);
    days.push({
      date: dateStr,
      ...weatherData
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};
