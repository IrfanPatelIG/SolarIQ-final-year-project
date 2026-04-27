import {
  getFullPanelData,
  calculateTotalEnergy,
} from "./dataAggregationService.js";

import {
  getTiltFactor,
  getOrientationFactor,
} from "./solarService.js";

// ---------- Helpers ----------
const clamp = (num, min = 0, max = 100) =>
  Math.max(min, Math.min(max, num));

const round = (num) => Math.round(num);

// Performance label
const getPerformance = (score) => {
  if (score >= 76) return "Good";
  if (score >= 51) return "Moderate";
  return "Poor";
};

// Build YYYY-MM-DD key
const getDateKey = (value) => {
  return new Date(value).toLocaleDateString("en-CA");
};

// ---------- Main ----------
export const calculateEfficiency = async ({
  panelId,
  startDate,
  endDate,
}) => {
  const { panel, location, forecasts, weather } =
    await getFullPanelData(panelId, startDate, endDate);

  if (!forecasts.length) {
    throw new Error("No forecast data for this range");
  }

  // Panel constants
  const tiltFactor = getTiltFactor(
    panel.tilt,
    location.latitude
  );

  const orientationFactor =
    getOrientationFactor(panel.orientation);

  const panelScore = clamp(
    ((tiltFactor + orientationFactor) / 2) * 100
  );

  // Weather lookup by date
  const weatherMap = {};

  weather.forEach((row) => {
    const key = getDateKey(row.recorded_at);
    weatherMap[key] = row;
  });

  // ---------- Daily Scores ----------
  const daily = [];

  for (const day of forecasts) {
    const dateKey = getDateKey(day.forecast_date);
    const w = weatherMap[dateKey];

    // If no weather row, skip that day
    if (!w) continue;

    // Energy Score
    const idealEnergy = 10;

    const energyScore = clamp(
      (day.predicted_energy_kwh / idealEnergy) * 100
    );

    // Weather Score
    const weatherScore = clamp(
      100 -
        (
          (w.cloud_cover || 0) * 0.5 +
          (w.precipitation || 0) * 2 +
          Math.abs((w.temperature || 25) - 25)
        )
    );

    // Final Daily Efficiency
    const efficiencyScore = clamp(
      energyScore * 0.5 +
        weatherScore * 0.3 +
        panelScore * 0.2
    );

    daily.push({
      date: dateKey,
      efficiencyScore: round(efficiencyScore),
      performance: getPerformance(
        round(efficiencyScore)
      ),
      breakdown: {
        energyScore: round(energyScore),
        weatherScore: round(weatherScore),
        panelScore: round(panelScore),
      },
    });
  }

  if (!daily.length) {
    throw new Error(
      "No weather-matched daily efficiency data found"
    );
  }

  // ---------- Overall ----------
  const overallEfficiency =
    daily.reduce(
      (sum, row) => sum + row.efficiencyScore,
      0
    ) / daily.length;

  const totalEnergy = calculateTotalEnergy(forecasts);
  const avgEnergy = totalEnergy / forecasts.length;

  const avgEnergyScore =
    daily.reduce(
      (sum, row) =>
        sum + row.breakdown.energyScore,
      0
    ) / daily.length;

  const avgWeatherScore =
    daily.reduce(
      (sum, row) =>
        sum + row.breakdown.weatherScore,
      0
    ) / daily.length;

  return {
    panel_id: Number(panelId),
    totalEnergy: Number(totalEnergy.toFixed(2)),
    avgEnergy: Number(avgEnergy.toFixed(2)),

    efficiency: {
      overall: {
        efficiencyScore: round(
          overallEfficiency
        ),
        performance: getPerformance(
          round(overallEfficiency)
        ),
        breakdown: {
          energyScore: round(avgEnergyScore),
          weatherScore: round(
            avgWeatherScore
          ),
          panelScore: round(panelScore),
        },
      },

      daily,
    },
  };
};