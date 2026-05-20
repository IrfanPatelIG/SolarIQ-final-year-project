import {
  calculateSolar,
  getSeasonalFactor,
} from "./solarService.js";

// ----------------------------
// Helpers
// ----------------------------
const normalizeDate = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

// ----------------------------
// Main Builder
// ----------------------------
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

  const today = getToday();
  const maxEnd = addDays(today, 5);

  let start = normalizeDate(startDate);
  let end = normalizeDate(endDate);

  // ------------------------------------
  // Auto-fix invalid dates
  // ------------------------------------

  // if start in past -> today
  if (start < today) start = today;

  // if end before start
  if (end < start) end = addDays(start, 5);

  // max 5 day range only
  if (end > maxEnd) end = maxEnd;

  end.setHours(23, 59, 59, 999);

  for (const day of dailyWeather) {
    const currentDate = normalizeDate(day.date);

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
      temperature: Number(day.temperature.toFixed(3)),
      humidity: Number(day.humidity.toFixed(3)),
      solar_irradiance: Number(solar_irradiance.toFixed(3)),
      cloud_cover: Number(day.cloud_cover.toFixed(3)),
      wind_speed: Number(day.wind_speed.toFixed(3)),
      precipitation: Number(day.precipitation.toFixed(3)),
      air_pressure: Number(day.air_pressure.toFixed(3)),
      recorded_at: currentDate,
    });

    forecasts.push({
      forecast_date: currentDate,
      predicted_energy_kwh: Number(dailyEnergy.toFixed(3)),
      location_id: locationId,
      panel_id: panelId,
      model_version: "v3",
    });
  }

  return {
    forecasts,
    weatherRows,
    totalEnergy: Number(totalEnergy.toFixed(3)),
  };
};

// ----------------------------
// Summary Factors
// ----------------------------
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
    tiltFactor: result.factors.tiltFactor,
    orientationFactor:
      result.factors.orientationFactor,
  };
};