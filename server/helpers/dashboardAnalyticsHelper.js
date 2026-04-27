import { getFullPanelData } from "../services/shared/dataAggregationService.js";
import { formatDateKey } from "./dateHelper.js";

// Forecast formatter
export const buildForecast = (forecasts) => {
  return forecasts.map((f) => ({
    date: f.forecast_date,
    energy: Number(f.predicted_energy_kwh.toFixed(2)),
  }));
};

// Weather impact formatter
export const buildWeatherImpact = (forecasts, weather) => {
  const weatherMap = {};

  weather.forEach((w) => {
    const date = formatDateKey(w.recorded_at);
    weatherMap[date] = w;
  });

  return forecasts.map((f) => {
    const date = formatDateKey(f.forecast_date);
    const w = weatherMap[date];

    return {
      date: f.forecast_date,
      energy: f.predicted_energy_kwh,
      temperature: w?.temperature || 0,
      cloud_cover: w?.cloud_cover || 0,
    };
  });
};

// Distribution by weekday
export const buildDistribution = (forecasts) => {
  const distributionMap = {};

  forecasts.forEach((f) => {
    const day = new Date(f.forecast_date).toLocaleString("en-US", {
      weekday: "long",
    });

    if (!distributionMap[day]) {
      distributionMap[day] = [];
    }

    distributionMap[day].push(f.predicted_energy_kwh);
  });

  return Object.keys(distributionMap).map((day) => ({
    day,
    avg_energy:
      distributionMap[day].reduce((a, b) => a + b, 0) /
      distributionMap[day].length,
  }));
};

// Multi-panel performance
export const buildPanelPerformance = async (
  panels,
  startDate,
  endDate
) => {
  const result = [];

  for (const panel of panels) {
    const panelData = await getFullPanelData(
      panel.panel_id,
      startDate,
      endDate
    );

    const avgEnergy = calculateAverageEnergy(panelData.forecasts);

    result.push({
      panel_id: panel.panel_id,
      tilt: panel.tilt,
      orientation: panel.orientation,
      avg_energy: avgEnergy,
    });
  }

  return result;
};

const calculateAverageEnergy = (forecasts) => {
  return (
    forecasts.reduce(
      (sum, row) => sum + row.predicted_energy_kwh,
      0
    ) / (forecasts.length || 1)
  );
};
