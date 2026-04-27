import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../services/shared/dataAggregationService.js";
import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solar/solarService.js";
import { generateRecommendations } from "../services/insights/recommendationService.js";

export const getAlerts = async (req, res) => {
  return handleInsightRequest(req, res, "alerts");
};

export const getRecommendations = async (req, res) => {
  return handleInsightRequest(req, res, "recommendations");
};

const handleInsightRequest = async (req, res, insightType) => {
  try {
    const requestData = getInsightRequestData(req);

    if (
      !requestData.panelId ||
      Number.isNaN(Number(requestData.panelId))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid panelId",
      });
    }

    const data = await getPanelInsightData(requestData);
    const insights = generateRecommendations({
      weather: data.avgWeather,
      factors: data.factors,
      totalEnergy: data.totalEnergy,
    });

    return res.json(buildInsightResponse(insightType, insights));
  } catch (error) {
    console.log(`Insight error for ${insightType}:`, error.message);
    return res.status(500).json({
      success: false,
      message: `${capitalizeInsightType(
        insightType
      )} not available for this data, Error: ${error.message}`,
    });
  }
};

const getInsightRequestData = (req) => {
  return {
    userId: req.user.user_id,
    panelId: req.params.panelId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };
};

const getPanelInsightData = async ({
  panelId,
  userId,
  startDate,
  endDate,
}) => {
  const { panel, location, forecasts, weather } =
    await getFullPanelData(panelId, startDate, endDate);

  if (!panel || !location) {
    throw new Error("Panel not found");
  }

  if (panel.user_id !== userId) {
    throw new Error("Unauthorized panel access");
  }

  const totalEnergy = calculateTotalEnergy(forecasts);
  const avgWeather = calculateAvgWeather(weather);

  return {
    totalEnergy,
    avgWeather,
    factors: {
      tiltFactor: getTiltFactor(panel.tilt, location.latitude),
      orientationFactor: getOrientationFactor(panel.orientation),
    },
  };
};

const buildInsightResponse = (insightType, insights) => {
  return {
    success: true,
    [insightType]: insights[insightType],
  };
};

const capitalizeInsightType = (insightType) => {
  return insightType.charAt(0).toUpperCase() + insightType.slice(1);
};
