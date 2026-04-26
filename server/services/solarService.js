import { fetchWeatherForDateRange } from './weatherService.js';
import { prepareModelInput } from './featureService.js';
import axios from 'axios';

const ML_SERVER_URL = 'http://127.0.0.1:5000';

export const calculateSolar = async ({ location, panel, dates }) => {
  const { lat, lon } = location;
  const { startDate, endDate } = dates;

  try {
    // Fetch weather data for each day in the date range
    const weatherDataArray = await fetchWeatherForDateRange(lat, lon, startDate, endDate);

    // Prepare model inputs for each day
    const modelInputs = weatherDataArray.map((weatherData) => {
      return prepareModelInput(location, panel, weatherData, weatherData.date);
    });

    console.log({weatherDataArray, modelInputs})

    // Call Python ML server for predictions
    const mlResponse = await axios.post(`${ML_SERVER_URL}/predict`, modelInputs);
    
    if (!mlResponse.data.success) {
      throw new Error(`ML server error: ${mlResponse.data.error}`);
    }

    const predictions = mlResponse.data.predictions;

    // Combine predictions with inputs and add context
    const results = modelInputs.map((input, index) => ({
      date: input.day_of_year,
      input,
      prediction: predictions[index]
    }));

    // Calculate total energy
    const totalEnergy = predictions.reduce((sum, pred) => sum + pred, 0);

    return {
      location,
      panel,
      dates,
      dailyResults: results,
      totalDays: modelInputs.length,
      totalEnergy: Math.round(totalEnergy * 1000) / 1000,
      averageDailyEnergy: Math.round((totalEnergy / modelInputs.length) * 1000) / 1000
    };
  } catch (error) {
    console.error('Error in calculateSolar:', error);
    throw error;
  }
};