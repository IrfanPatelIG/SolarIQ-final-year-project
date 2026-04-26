import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../services/dataAggregationService.js";

import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solarService.js";

import { generateRecommendations } from "../services/recommendationService.js";

// 🧠 CENTRALIZED FUNCTION
const getPanelInsightData = async (panelId, userId, startDate, endDate) => {
  const { panel, location, forecasts, weather } = await getFullPanelData(panelId, startDate, endDate);

  if (panel.user_id !== userId) {
    throw new Error("Unauthorized panel access");
  }

  const totalEnergy = calculateTotalEnergy(forecasts);
  const avgWeather = calculateAvgWeather(weather);

  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
  const orientationFactor = getOrientationFactor(panel.orientation);

  return {
    totalEnergy,
    avgWeather,
    factors: {
      tiltFactor,
      orientationFactor,
    },
  };
};

export const getAlerts = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    const data = await getPanelInsightData(panelId, userId, startDate, endDate);

    const insights = generateRecommendations({
      weather: data.avgWeather,
      factors: data.factors,
      totalEnergy: data.totalEnergy,
    });

    res.json({
      success: true,
      alerts: insights.alerts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    const data = await getPanelInsightData(panelId, userId, startDate, endDate);

    const insights = generateRecommendations({
      weather: data.avgWeather,
      factors: data.factors,
      totalEnergy: data.totalEnergy,
    });

    res.json({
      success: true,
      recommendations: insights.recommendations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
