import sequelize from "../../config/db.js";
import {
  Location,
  Panel,
  Weather,
  Forecast,
} from "../../models/index.js";

import { getLocationDetails } from "./geoService.js";
import {
  getForecastData,
  groupForecastToDaily,
} from "./weatherService.js";

import {
  buildSolarForecastRows,
  buildFactorSummary,
} from "./solarCalculationService.js";

// -----------------------------
// Existing Utility Functions
// -----------------------------

export const getSeasonalFactor = (date) => {
  const month = new Date(date).getMonth() + 1;

  if (month >= 3 && month <= 5) return 1.1;
  if (month >= 6 && month <= 9) return 0.8;

  return 0.9;
};

export const getTiltFactor = (tilt, lat) => {
  const diff = Math.abs(tilt - lat);

  if (diff <= 5) return 1.0;
  if (diff <= 15) return 0.9;

  return 0.75;
};

export const getOrientationFactor = (
  orientation
) => {
  const map = {
    S: 1.0,
    SE: 0.95,
    SW: 0.95,
    E: 0.85,
    W: 0.85,
    N: 0.7,
  };

  return map[orientation] || 0.8;
};

export const calculateSolar = async ({
  location,
  panel,
  weather,
}) => {
  const sunlightHours = 5;
  const efficiency = 0.2;

  const dailyIrradiance =
    (weather.solar_irradiance *
      sunlightHours) /
    1000;

  const tiltFactor = getTiltFactor(
    panel.tilt,
    location.lat
  );

  const orientationFactor =
    getOrientationFactor(
      panel.orientation
    );

  const baseEnergy =
    panel.area *
    dailyIrradiance *
    efficiency *
    tiltFactor *
    orientationFactor;

  return {
    baseEnergy,
    factors: {
      tiltFactor,
      orientationFactor,
    },
  };
};

// -----------------------------
// Main Service
// -----------------------------

export const processSolarRequest = async (
  req
) => {
  const transaction =
    await sequelize.transaction();

  try {
    const {
      location,
      panel,
      dates,
    } = req.body;

    const userId = req.user.user_id;
    const { lat, lon } = location;

    // 1 Geo API
    const geo =
      await getLocationDetails(
        lat,
        lon
      );

    // 2 Weather API
    const forecastApi =
      await getForecastData(
        lat,
        lon
      );

    const dailyWeather =
      groupForecastToDaily(
        forecastApi.forecastList
      );

    // 3 Save Location
    const savedLocation =
      await Location.create(
        {
          latitude: lat,
          longitude: lon,
          city: geo.city,
          state: geo.state,
          country: geo.country,
          timezone:
            forecastApi.timezone,
          user_id: userId,
        },
        { transaction }
      );

    // 4 Save Panel
    const savedPanel =
      await Panel.create(
        {
          area: panel.area,
          tilt: panel.tilt,
          orientation:
            panel.orientation,
          installation_date:
            null,
          location_id:
            savedLocation.location_id,
          user_id: userId,
        },
        { transaction }
      );

    // 5 Build rows
    const generated =
      await buildSolarForecastRows({
        dailyWeather,
        startDate:
          dates.startDate,
        endDate:
          dates.endDate,
        location,
        panel,
        locationId:
          savedLocation.location_id,
        panelId:
          savedPanel.panel_id,
      });

    // 6 Save weather
    await Weather.bulkCreate(
      generated.weatherRows,
      { transaction }
    );

    // 7 Save forecasts
    await Forecast.bulkCreate(
      generated.forecasts,
      { transaction }
    );

    await transaction.commit();

    // 8 Factors
    const factors =
      await buildFactorSummary({
        location,
        panel,
      });

    return {
      forecast:
        generated.forecasts.map(
          (item) => ({
            date:
              item.forecast_date,
            energy:
              item.predicted_energy_kwh,
          })
        ),

      summary: {
        totalEnergy:
          generated.totalEnergy,
        days:
          generated.forecasts
            .length,
      },

      factors,

      db: {
        location:
          savedLocation,
        panel: savedPanel,
        weather:
          "Stored per-day weather",
      },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};