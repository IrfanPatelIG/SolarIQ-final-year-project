import { formatDateKey } from "./dateHelper.js";

// ===================================================
// Hero Card
// ===================================================

export const getTargetDate = (startDate) => {
  if (!startDate) {
    throw new Error("startDate is required to get target date from database");
  }
  return formatDateKey(startDate);
};

export const getSelectedDayEnergy = (forecasts, startDate) => {
  if (!forecasts?.length) {
    return {
      date: null,
      energy: 0,
      source: "no-data",
    };
  }

  const targetDate = getTargetDate(startDate);

  const exact = forecasts.find(
    (item) => formatDateKey(item.forecast_date) === targetDate,
  );

  if (exact) {
    return {
      date: targetDate,
      energy: Number(exact.predicted_energy_kwh.toFixed(2)),
      source: "exact",
    };
  }

  const future = forecasts.find(
    (item) => formatDateKey(item.forecast_date) > targetDate,
  );

  if (future) {
    return {
      date: formatDateKey(future.forecast_date),
      energy: Number(future.predicted_energy_kwh.toFixed(2)),
      source: "nearest",
    };
  }

  const last = forecasts[forecasts.length - 1];

  return {
    date: formatDateKey(last.forecast_date),
    energy: Number(last.predicted_energy_kwh.toFixed(2)),
    source: "last-available",
  };
};

// ===================================================
// Forecast
// ===================================================

export const buildForecast = (forecasts) => {
  return forecasts.map((item) => ({
    date: item.forecast_date,
    energy: Number(item.predicted_energy_kwh.toFixed(2)),
  }));
};

// ===================================================
// Weather Impact
// ===================================================

export const buildWeatherImpact = (forecasts, weather) => {
  const weatherMap = {};

  weather.forEach((row) => {
    weatherMap[formatDateKey(row.recorded_at)] = row;
  });

  return forecasts.map((item) => {
    const date = formatDateKey(item.forecast_date);

    const w = weatherMap[date];

    return {
      date: item.forecast_date,
      energy: item.predicted_energy_kwh,
      temperature: w?.temperature || 0,
      cloud_cover: w?.cloud_cover || 0,
      weather_recorded_at: w?.recorded_at || null,
    };
  });
};

// ===================================================
// Distribution
// ===================================================

export const buildDistribution = (forecasts) => {
  const map = {};

  forecasts.forEach((item) => {
    const day = new Date(item.forecast_date).toLocaleString("en-US", {
      weekday: "long",
    });

    if (!map[day]) {
      map[day] = [];
    }

    map[day].push(item.predicted_energy_kwh);
  });

  return Object.keys(map).map((day) => ({
    day,
    avg_energy: map[day].reduce((a, b) => a + b, 0) / map[day].length,
  }));
};
