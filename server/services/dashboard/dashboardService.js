import { Op } from "sequelize";

import Panel from "../../models/panelModel.js";
import Forecast from "../../models/forecastModel.js";

import AppError from "../../utils/appError.js";

import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../shared/dataAggregationService.js";

import { calculateEfficiency } from "../efficiency/efficiencyService.js";

import {
  getSelectedDayEnergy,
  buildForecast,
  buildWeatherImpact,
  buildDistribution,
} from "../../helpers/dashboardHelper.js";

import { getFullInsightsService } from "../insights/insightService.js";

// ===================================================
// Main Service
// ===================================================

export const getDashboardService = async ({
  panelId,
  startDate,
  endDate,
  userId,
}) => {
  // ===================================================
  // Fetch Panel + Weather + Forecast Data
  // ===================================================

  // Fetch all forecasts and weather data (not filtered by date range)
  // This ensures weather data is always available and dropdown shows all dates
  const { panel, location, forecasts: allForecasts, weather: allWeather } =
    await getFullPanelData(
      panelId,
      "1970-01-01",
      "2099-12-31",
    );

  // ===================================================
  // Validations
  // ===================================================

  if (!panel || !location) {
    throw new AppError(
      "Panel not found",
      404,
    );
  }

  if (panel.user_id !== userId) {
    throw new AppError(
      "Unauthorized panel access",
      403,
    );
  }

  // ===================================================
  // Panel Meta
  // ===================================================

  const panelMeta =
    await getUserPanelMeta(
      userId,
      panelId,
    );

  // ===================================================
  // Available Dates (from ALL forecasts)
  // ===================================================

  const availableDates = [
    ...new Set(
      allForecasts.map((f) =>
        String(f.forecast_date).split("T")[0],
      ),
    ),
  ].sort();

  // ===================================================
  // Resolve effective date range
  // ===================================================

  const formatDateOnly = (value) => {
    if (!value) return null;

    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    return String(value).split("T")[0];
  };

  const availableForecastDates = [
    ...new Set(allForecasts.map((f) => formatDateOnly(f.forecast_date))),
  ].sort();

  const availableWeatherDates = [
    ...new Set(allWeather.map((w) => formatDateOnly(w.recorded_at))),
  ].sort();

  const hasStoredHistory =
    availableForecastDates.length > 0 || availableWeatherDates.length > 0;

  const today = new Date();
  const newPanelStartDate = new Date(today);
  const newPanelEndDate = new Date(today);
  newPanelEndDate.setDate(newPanelEndDate.getDate() + 5);

  const historyStartDate =
    availableForecastDates[0] ||
    availableWeatherDates[0] ||
    (panel.installation_date
      ? formatDateOnly(panel.installation_date)
      : startDate);

  const historyEndDate =
    availableForecastDates.at(-1) ||
    availableWeatherDates.at(-1) ||
    (panel.installation_date
      ? formatDateOnly(panel.installation_date)
      : endDate);

  const hasRequestedRange = Boolean(startDate && endDate);
  const requestedStartDate = hasRequestedRange
    ? formatDateOnly(startDate)
    : null;
  const requestedEndDate = hasRequestedRange
    ? formatDateOnly(endDate)
    : null;
  const requestedForecasts = hasRequestedRange
    ? allForecasts.filter((f) => {
        const date = formatDateOnly(f.forecast_date);

        return date >= requestedStartDate && date <= requestedEndDate;
      })
    : [];
  const requestedWeather = hasRequestedRange
    ? allWeather.filter((w) => {
        const date = formatDateOnly(w.recorded_at);

        return date >= requestedStartDate && date <= requestedEndDate;
      })
    : [];
  const hasRequestedRangeData =
    requestedForecasts.length > 0 || requestedWeather.length > 0;

  const effectiveStartDate =
    hasRequestedRange && hasRequestedRangeData
      ? requestedStartDate
      : hasStoredHistory
        ? historyStartDate
        : formatDateOnly(newPanelStartDate);

  const effectiveEndDate =
    hasRequestedRange && hasRequestedRangeData
      ? requestedEndDate
      : hasStoredHistory
        ? historyEndDate
        : formatDateOnly(newPanelEndDate);

  const effectiveForecasts = allForecasts.filter((f) => {
    const date = formatDateOnly(f.forecast_date);

    return date >= effectiveStartDate && date <= effectiveEndDate;
  });

  const effectiveWeather = allWeather.filter((w) => {
    const date = formatDateOnly(w.recorded_at);

    return date >= effectiveStartDate && date <= effectiveEndDate;
  });

  // ===================================================
  // Totals + Forecast
  // ===================================================

  const totalEnergy =
    calculateTotalEnergy(
      effectiveForecasts,
    );

  const avgWeather =
    effectiveWeather.length > 0
      ? safeWeatherAverage(
          effectiveWeather,
        )
      : {
          temperature: 0,
          cloud_cover: 0,
          humidity: 0,
          precipitation: 0,
          wind_speed: 0,
          air_pressure: 0,
        };

  const forecast =
    buildForecast(
      effectiveForecasts,
    );

  const heroCard =
    getSelectedDayEnergy(
      effectiveForecasts,
      effectiveStartDate,
    );

  // ===================================================
  // Current Weather
  // ===================================================

  let currentWeather = null;

  // Use available weather data for the effective date range
  if (effectiveWeather.length > 0) {
    const targetDate =
      String(effectiveStartDate).split(
        "T",
      )[0];

    const exactWeather =
      effectiveWeather.find(
        (w) =>
          formatDateOnly(w.recorded_at) ===
          targetDate,
      );

    if (exactWeather) {
      currentWeather = {
        temperature:
          Number(exactWeather.temperature) || 0,

        humidity:
          Number(exactWeather.humidity) || 0,

        cloud_cover:
          Number(exactWeather.cloud_cover) || 0,

        wind_speed:
          Number(exactWeather.wind_speed) || 0,

        air_pressure:
          Number(exactWeather.air_pressure) || 0,

        precipitation:
          Number(exactWeather.precipitation) || 0,

        solar_irradiance:
          Number(exactWeather.solar_irradiance) || 0,

        description: "",
      };
    } else {
      currentWeather = {
        temperature:
          Number(effectiveWeather[0]
            .temperature) || 0,

        humidity:
          Number(effectiveWeather[0]
            .humidity) || 0,

        cloud_cover:
          Number(effectiveWeather[0]
            .cloud_cover) || 0,

        wind_speed:
          Number(effectiveWeather[0]
            .wind_speed) || 0,

        air_pressure:
          Number(effectiveWeather[0]
            .air_pressure) || 0,

        precipitation:
          Number(effectiveWeather[0]
            .precipitation) || 0,

        solar_irradiance:
          Number(effectiveWeather[0]
            .solar_irradiance) || 0,

        description: "",
      };
    }
  }

  // ===================================================
  // Parallel Services
  // ===================================================

  const [
    panelPerformance,
    efficiencyData,
    insightsData,
  ] = await Promise.all([
    getPanelPerformance(
      userId,
      effectiveStartDate,
      effectiveEndDate,
    ),

    calculateEfficiency({
      panelId,
      startDate: effectiveStartDate,
      endDate: effectiveEndDate,
    }),

    getFullInsightsService({
      userId,
      panelId,
      startDate: effectiveStartDate,
      endDate: effectiveEndDate,
    }),
  ]);

  // ===================================================
  // Final Response
  // ===================================================

  return {
    heroCard,

    forecast,

    analytics: {
      // ===============================================
      // Daily Energy
      // ===============================================

      dailyEnergy: forecast,

      // ===============================================
      // Weather Impact
      // ===============================================

      weatherImpact:
        buildWeatherImpact(
          effectiveForecasts,
          effectiveWeather,
        ),

      // ===============================================
      // Full Weather History
      // ===============================================

      weatherHistory:
        effectiveWeather.map(
          (weather) => ({
            weather_id:
              weather.weather_id,

            location_id:
              weather.location_id,

            date: formatDateOnly(
              weather.recorded_at,
            ),

            recorded_at:
              weather.recorded_at,

            temperature:
              weather.temperature,

            humidity:
              weather.humidity,

            solar_irradiance:
              weather.solar_irradiance,

            cloud_cover:
              weather.cloud_cover,

            wind_speed:
              weather.wind_speed,

            precipitation:
              weather.precipitation,

            air_pressure:
              weather.air_pressure,
          }),
        ),

      // ===============================================
      // Distribution
      // ===============================================

      distribution:
        buildDistribution(
          effectiveForecasts,
        ),

      // ===============================================
      // Panel Performance
      // ===============================================

      panelPerformance,
    },

    // =================================================
    // Efficiency
    // =================================================

    efficiency:
      efficiencyData.efficiency,

    // =================================================
    // Current Weather
    // =================================================

    currentWeather,

    // =================================================
    // Insights
    // =================================================

    insights: {
      score: insightsData.score,

      alerts:
        insightsData.alerts,

      recommendations:
        insightsData.recommendations,
    },

    // =================================================
    // Database Data
    // =================================================

    db: {
      panel: {
        panel_id:
          panel.panel_id,

        area: panel.area,

        tilt: panel.tilt,

        orientation:
          panel.orientation,

        installation_date:
          panel.installation_date,
      },

      location: {
        location_id:
          location.location_id,

        latitude:
          location.latitude,

        longitude:
          location.longitude,

        city: location.city,

        state: location.state,

        country:
          location.country,
      },
    },

    // =================================================
    // Metadata
    // =================================================

    meta: {
      ...panelMeta,

      weatherAvailable:
        allWeather.length > 0,

      availableDates,

      dateRange: {
        startDate: effectiveStartDate,
        endDate: effectiveEndDate,
        source: hasRequestedRange && hasRequestedRangeData
          ? "requested"
          : hasStoredHistory
            ? "stored-history"
            : "forward-looking",
      },
    },
  };
};

// ===================================================
// Safe Weather Average
// ===================================================

const safeWeatherAverage = (
  weather,
) => {
  try {
    return calculateAvgWeather(
      weather,
    );
  } catch {
    return {
      temperature: 0,
      cloud_cover: 0,
      humidity: 0,
      precipitation: 0,
      wind_speed: 0,
      air_pressure: 0,
    };
  }
};

// ===================================================
// User Panel Metadata
// ===================================================

const getUserPanelMeta =
  async (
    userId,
    panelId,
  ) => {
    const panels =
      await Panel.findAll({
        where: {
          user_id: userId,
        },

        attributes: [
          "panel_id",
        ],

        order: [
          ["createdAt", "ASC"],
          ["panel_id", "ASC"],
        ],
      });

    const totalPanels =
      panels.length;

    const index =
      panels.findIndex(
        (panel) =>
          Number(
            panel.panel_id,
          ) === Number(panelId),
      );

    return {
      panelId:
        Number(panelId),

      userPanelId:
        index >= 0
          ? index + 1
          : Number(panelId),

      totalPanels,
    };
  };

// ===================================================
// Panel Performance
// ===================================================

const getPanelPerformance =
  async (
    userId,
    startDate,
    endDate,
  ) => {
    const panels =
      await Panel.findAll({
        where: {
          user_id: userId,
        },

        attributes: [
          "panel_id",
          "tilt",
          "orientation",
        ],
      });

    const panelIds =
      panels.map(
        (panel) =>
          panel.panel_id,
      );

    if (!panelIds.length) {
      return [];
    }

    const forecasts =
      await Forecast.findAll({
        where: {
          panel_id: panelIds,

          forecast_date: {
            [Op.between]: [
              startDate,
              endDate,
            ],
          },
        },

        attributes: [
          "panel_id",
          "predicted_energy_kwh",
        ],
      });

    const energyMap = {};

    forecasts.forEach(
      (row) => {
        if (
          !energyMap[
            row.panel_id
          ]
        ) {
          energyMap[
            row.panel_id
          ] = [];
        }

        energyMap[
          row.panel_id
        ].push(
          Number(
            row.predicted_energy_kwh,
          ),
        );
      },
    );

    return panels.map(
      (panel) => {
        const energies =
          energyMap[
            panel.panel_id
          ] || [];

        const avg =
          energies.reduce(
            (sum, val) =>
              sum + val,
            0,
          ) /
          (energies.length ||
            1);

        return {
          panel_id:
            panel.panel_id,

          tilt: panel.tilt,

          orientation:
            panel.orientation,

          avg_energy: avg,
        };
      },
    );
  };
