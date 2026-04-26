import Panel from "../models/panelModel.js";
import Location from "../models/locationModel.js";
import Forecast from "../models/forecastModel.js";
import Weather from "../models/weatherModel.js";
import { Op } from "sequelize";

// Fetch full dataset for a panel
export const getFullPanelData = async (panelId, startDate, endDate) => {
  const panel = await Panel.findByPk(panelId);
  if (!panel) throw new Error("Panel not found");

  const location = await Location.findByPk(panel.location_id);

  const forecasts = await Forecast.findAll({
    where: {
      panel_id: panelId,
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    },
    order: [["forecast_date", "ASC"]],
  });

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const weather = await Weather.findAll({
    where: {
      location_id: panel.location_id,
      recorded_at: {
        [Op.between]: [start, end],
      },
    },
    order: [["recorded_at", "ASC"]],
  });

  if (!weather.length) {
    throw new Error("No weather data available for this date range");
  }

  return { panel, location, forecasts, weather };
};

// Total energy
export const calculateTotalEnergy = (forecasts) => {
  return forecasts.reduce((sum, f) => sum + f.predicted_energy_kwh, 0);
};

// Average weather
export const calculateAvgWeather = (weatherData) => {
  if (!weatherData.length) {
    throw new Error("Cannot calculate average weather: no data");
  }

  return {
    temperature:
      weatherData.reduce((sum, w) => sum + w.temperature, 0) /
      weatherData.length,

    cloud_cover:
      weatherData.reduce((sum, w) => sum + w.cloud_cover, 0) /
      weatherData.length,

    humidity:
      weatherData.reduce((sum, w) => sum + w.humidity, 0) / weatherData.length,
  };
};
