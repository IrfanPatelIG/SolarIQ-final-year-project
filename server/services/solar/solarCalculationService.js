import {
  calculateSolar,
  getSeasonalFactor,
} from "./solarService.js";

export const buildSolarForecastRows = async ({
  dailyWeather,
  startDate,
  endDate,
  location,
  panel,
  locationId,
  panelId,
}) => {
  const forecasts = [];
  const weatherRows = [];
  let totalEnergy = 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (const day of dailyWeather) {
    const currentDate = new Date(day.date);

    if (currentDate < start || currentDate > end) {
      continue;
    }

    const solar_irradiance =
      1000 * (1 - day.cloud_cover / 100);

    const result = await calculateSolar({
      location,
      panel,
      weather: { solar_irradiance },
    });

    const seasonalFactor =
      getSeasonalFactor(currentDate);

    const dailyEnergy =
      result.baseEnergy * seasonalFactor;

    totalEnergy += dailyEnergy;

    weatherRows.push({
      location_id: locationId,
      temperature: day.temperature,
      humidity: day.humidity,
      solar_irradiance,
      cloud_cover: day.cloud_cover,
      wind_speed: day.wind_speed,
      precipitation: day.precipitation,
      air_pressure: day.air_pressure,
      recorded_at: currentDate,
    });

    forecasts.push({
      forecast_date: currentDate,
      predicted_energy_kwh: dailyEnergy,
      location_id: locationId,
      panel_id: panelId,
      model_version: "v3",
    });
  }

  return {
    forecasts,
    weatherRows,
    totalEnergy,
  };
};

export const buildFactorSummary = async ({
  location,
  panel,
}) => {
  const result = await calculateSolar({
    location,
    panel,
    weather: {
      solar_irradiance: 1000,
    },
  });

  return {
    tiltFactor:
      result.factors.tiltFactor,
    orientationFactor:
      result.factors.orientationFactor,
  };
};