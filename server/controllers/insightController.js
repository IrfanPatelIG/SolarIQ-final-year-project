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

    if (!panelId || isNaN(panelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid panelId",
      });
    }

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
    console.log("❌ Alerts not available for this data, Error")
    res.status(500).json({
      success: false,
      message: `Alerts not available for this data, Error: ${err.message}`,
    });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!panelId || isNaN(panelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid panelId",
      });
    }
    
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
    console.log("❌ Recommendation not available for this data, Error")
    res.status(500).json({
      success: false,
      message: `Recommendation not available for this data, Error: ${err.message}`,
    });
  }
};
