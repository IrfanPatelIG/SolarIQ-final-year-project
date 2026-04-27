import Panel from "../../models/panelModel.js";
import Location from "../../models/LocationModel.js";
import Forecast from "../../models/forecastModel.js";
import Weather from "../../models/weatherModel.js";
import { Op } from "sequelize";
import { getInclusiveDateRange } from "../../helpers/dateHelper.js";

// Fetch full dataset for a panel
export const getFullPanelData = async (panelId, startDate, endDate) => {
  const panel = await Panel.findByPk(panelId);

  if (!panel) {
    return {
      panel: null,
      location: null,
      forecasts: [],
      weather: [],
    };
  }

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

  const { start, end } = getInclusiveDateRange(startDate, endDate);

  const weather = await Weather.findAll({
    where: {
      location_id: panel.location_id,
      recorded_at: {
        [Op.between]: [start, end],
      },
    },
    order: [["recorded_at", "ASC"]],
  });

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

  const avg = (field) =>
    weatherData.reduce((sum, row) => sum + (row[field] || 0), 0) /
    weatherData.length;

  return {
    temperature: avg("temperature"),
    cloud_cover: avg("cloud_cover"),
    humidity: avg("humidity"),
    precipitation: avg("precipitation"),
    wind_speed: avg("wind_speed"),
    air_pressure: avg("air_pressure"),
  };
};
