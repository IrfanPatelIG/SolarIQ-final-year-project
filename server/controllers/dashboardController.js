import {
  getFullPanelData,
  calculateTotalEnergy,
  calculateAvgWeather,
} from "../services/shared/dataAggregationService.js";
import { getSelectedDayEnergy } from "../helpers/dashboardHelper.js";
import {
  buildForecast,
  buildWeatherImpact,
  buildDistribution,
  buildPanelPerformance,
} from "../helpers/dashboardAnalyticsHelper.js";
import { calculateEfficiency } from "../services/efficiency/efficiencyService.js";
import { generateRecommendations } from "../services/insights/recommendationService.js";
import {
  getTiltFactor,
  getOrientationFactor,
} from "../services/solar/solarService.js";
import Panel from "../models/panelModel.js";
import { isValidDateRange } from "../helpers/dateHelper.js";

export const getDashboardData = async (req, res) => {
  try {
    const requestData = getDashboardRequestData(req);
    const validation = validateDashboardRequest(requestData);

    if (validation) {
      return res.status(validation.status).json(validation.body);
    }

    const { panel, location, forecasts, weather } = await getFullPanelData(
      requestData.panelId,
      requestData.startDate,
      requestData.endDate
    );

    if (!panel || !location) {
      return res.status(404).json({
        success: false,
        message: "Panel not found",
      });
    }

    if (panel.user_id !== requestData.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Panel does not belong to this user",
      });
    }

    const totalEnergy = calculateTotalEnergy(forecasts);
    const weatherSummary = buildWeatherSummary(weather);
    const forecast = buildForecast(forecasts);
    const selectedDayEnergy = getSelectedDayEnergy(
      forecasts,
      requestData.startDate
    );
    const panelPerformance = await getUserPanelPerformance(
      requestData.userId,
      requestData.startDate,
      requestData.endDate
    );
    const efficiencyData = await calculateEfficiency({
      panelId: requestData.panelId,
      startDate: requestData.startDate,
      endDate: requestData.endDate,
    });
    const insights = buildDashboardInsights(
      panel,
      location,
      weatherSummary.avgWeather,
      totalEnergy
    );

    return res.status(200).json(
      buildDashboardResponse({
        heroCard: selectedDayEnergy,
        forecast,
        dailyEnergy: forecast,
        weatherImpact: buildWeatherImpact(forecasts, weather),
        distribution: buildDistribution(forecasts),
        panelPerformance,
        efficiency: efficiencyData.efficiency,
        insights,
        weatherAvailable: weatherSummary.weatherAvailable,
      })
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Dashboard fetch failed",
    });
  }
};

const getDashboardRequestData = (req) => {
  return {
    panelId: req.params.panelId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    userId: req.user?.user_id,
  };
};

const validateDashboardRequest = ({
  panelId,
  startDate,
  endDate,
  userId,
}) => {
  if (!panelId || Number.isNaN(Number(panelId))) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Invalid panelId",
      },
    };
  }

  if (!startDate || !endDate) {
    return {
      status: 400,
      body: {
        success: false,
        message: "panelId, startDate and endDate required",
      },
    };
  }

  if (!isValidDateRange(startDate, endDate)) {
    return {
      status: 400,
      body: {
        success: false,
        message: "startDate cannot be after endDate",
      },
    };
  }

  if (!userId) {
    return {
      status: 401,
      body: {
        success: false,
        message: "User not authenticated",
      },
    };
  }

  return null;
};

const buildWeatherSummary = (weather) => {
  try {
    return {
      avgWeather: calculateAvgWeather(weather),
      weatherAvailable: true,
    };
  } catch {
    return {
      avgWeather: {
        temperature: 0,
        cloud_cover: 0,
        humidity: 0,
        precipitation: 0,
        wind_speed: 0,
        air_pressure: 0,
      },
      weatherAvailable: false,
    };
  }
};

const getUserPanelPerformance = async (
  userId,
  startDate,
  endDate
) => {
  const panels = await Panel.findAll({
    where: { user_id: userId },
  });

  return buildPanelPerformance(panels, startDate, endDate);
};

const buildDashboardInsights = (
  panel,
  location,
  avgWeather,
  totalEnergy
) => {
  const tiltFactor = getTiltFactor(panel.tilt, location.latitude);
  const orientationFactor = getOrientationFactor(panel.orientation);

  return generateRecommendations({
    weather: avgWeather,
    factors: {
      tiltFactor,
      orientationFactor,
    },
    totalEnergy,
  });
};

const buildDashboardResponse = ({
  heroCard,
  forecast,
  dailyEnergy,
  weatherImpact,
  distribution,
  panelPerformance,
  efficiency,
  insights,
  weatherAvailable,
}) => {
  return {
    success: true,
    data: {
      heroCard,
      forecast,
      analytics: {
        dailyEnergy,
        weatherImpact,
        distribution,
        panelPerformance,
      },
      efficiency,
      insights,
    },
    meta: {
      weatherAvailable,
    },
  };
};
