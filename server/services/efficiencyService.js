import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "./dataAggregationService.js";

import { getTiltFactor, getOrientationFactor } from "./solarService.js";

// 🚀 MAIN FUNCTION
export const calculateEfficiency = async ({ panelId, startDate, endDate }) => {
  const { panel, location, forecasts, weather } = await getFullPanelData(
    panelId,
    startDate,
    endDate,
  );

  if (!forecasts.length) {
    throw new Error("No forecast data for this range");
  }

  const totalEnergy = calculateTotalEnergy(forecasts);
  const avgEnergy = totalEnergy / forecasts.length;

  let avgWeather;

  try {
    avgWeather = calculateAvgWeather(weather);
  } catch {
    throw new Error("Weather data required for efficiency calculation");
  }

  // 🔥 SAFE FALLBACK
  if (!avgWeather) {
    console.log("⚠️ No weather data → using default values");
  }

  // FACTORS (NOW CONSISTENT)
  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
  const orientationFactor = getOrientationFactor(panel.orientation);

  // 🟡 Energy Score
  const idealEnergy = 10;
  const energyScore = Math.min((avgEnergy / idealEnergy) * 100, 100);

  // 🟡 Weather Score
  const weatherScore =
    100 -
    (avgWeather.cloud_cover * 0.5 +
      avgWeather.precipitation * 2 +
      Math.abs(avgWeather.temperature - 25));

  // 🟡 Panel Score
  const panelScore = ((tiltFactor + orientationFactor) / 2) * 100;

  // 🟡 Final Efficiency
  const efficiencyScore =
    energyScore * 0.5 + weatherScore * 0.3 + panelScore * 0.2;

  let performance = "Poor";
  if (efficiencyScore > 75) performance = "Good";
  else if (efficiencyScore > 50) performance = "Moderate";

  return {
    panel_id: panelId,
    totalEnergy,
    avgEnergy,
    efficiency: {
      efficiencyScore: Math.round(efficiencyScore),
      performance,
      breakdown: {
        energyScore: Math.round(energyScore),
        weatherScore: Math.round(weatherScore),
        panelScore: Math.round(panelScore),
      },
    },
  };
};
