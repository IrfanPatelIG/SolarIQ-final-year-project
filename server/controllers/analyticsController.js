import { Forecast, Panel } from "../models/index.js";
import { Op, fn, col } from "sequelize";
import sequelize from "../config/db.js";
import { calculateEfficiency } from "../services/efficiency/efficiencyService.js";

export const getDailyEnergy = async (req, res) => {
  return handleAnalyticsRequest(
    res,
    () => fetchDailyEnergy(getAnalyticsParams(req)),
    "Error fetching daily energy"
  );
};

export const getWeatherImpact = async (req, res) => {
  return handleAnalyticsRequest(
    res,
    () => fetchWeatherImpactData(getAnalyticsParams(req)),
    "Error fetching weather impact"
  );
};

export const getEnergyDistribution = async (req, res) => {
  return handleAnalyticsRequest(
    res,
    () => fetchEnergyDistribution(getAnalyticsParams(req)),
    "Error fetching distribution"
  );
};

export const getPanelPerformance = async (req, res) => {
  return handleAnalyticsRequest(
    res,
    () => fetchPanelPerformanceData(getAnalyticsParams(req)),
    "Error fetching panel performance"
  );
};

export const getPanelEfficiency = async (req, res) => {
  return handleAnalyticsRequest(
    res,
    async () => {
      const { userId, startDate, endDate } = getAnalyticsParams(req);
      const panel = await findUserPanel(userId);

      if (!panel) {
        return {
          status: 404,
          body: { message: "No panel found" },
        };
      }

      const result = await calculateEfficiency({
        panelId: panel.panel_id,
        startDate,
        endDate,
      });

      return {
        success: true,
        ...result,
      };
    },
    "Efficiency error"
  );
};

const handleAnalyticsRequest = async (
  res,
  action,
  errorMessage
) => {
  try {
    const payload = await action();

    if (payload?.status) {
      return res.status(payload.status).json(payload.body);
    }

    return res.json(payload);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: errorMessage });
  }
};

const getAnalyticsParams = (req) => {
  return {
    userId: req.user.user_id,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };
};

const buildForecastDateFilter = (startDate, endDate) => {
  return {
    forecast_date: {
      [Op.between]: [startDate, endDate],
    },
  };
};

const fetchDailyEnergy = async ({
  userId,
  startDate,
  endDate,
}) => {
  return Forecast.findAll({
    attributes: ["forecast_date", "predicted_energy_kwh"],
    where: buildForecastDateFilter(startDate, endDate),
    include: [
      {
        model: Panel,
        attributes: [],
        where: { user_id: userId },
      },
    ],
    order: [["forecast_date", "ASC"]],
  });
};

const fetchWeatherImpactData = async ({
  userId,
  startDate,
  endDate,
}) => {
  const [rows] = await sequelize.query(
    `
      SELECT
        f.panel_id,
        f.forecast_date,
        f.predicted_energy_kwh,
        w.cloud_cover,
        w.temperature
      FROM forecasted_values f
      JOIN weather_data w
        ON f.location_id = w.location_id
       AND DATE(w.recorded_at) = f.forecast_date
      JOIN panel_configs p
        ON f.panel_id = p.panel_id
      WHERE f.forecast_date BETWEEN :startDate AND :endDate
        AND p.user_id = :userId
      ORDER BY f.forecast_date ASC
    `,
    {
      replacements: { startDate, endDate, userId },
    }
  );

  return rows;
};

const fetchEnergyDistribution = async ({
  userId,
  startDate,
  endDate,
}) => {
  return Forecast.findAll({
    attributes: [
      [fn("DAYNAME", col("forecast_date")), "day"],
      [fn("AVG", col("predicted_energy_kwh")), "avg_energy"],
    ],
    where: buildForecastDateFilter(startDate, endDate),
    include: [
      {
        model: Panel,
        attributes: [],
        where: { user_id: userId },
      },
    ],
    group: [fn("DAYNAME", col("forecast_date"))],
  });
};

const fetchPanelPerformanceData = async ({
  userId,
  startDate,
  endDate,
}) => {
  return Panel.findAll({
    where: { user_id: userId },
    attributes: [
      "panel_id",
      "tilt",
      "orientation",
      [fn("AVG", col("Forecasts.predicted_energy_kwh")), "avg_energy"],
    ],
    include: [
      {
        model: Forecast,
        attributes: [],
        where: buildForecastDateFilter(startDate, endDate),
      },
    ],
    group: ["Panel.panel_id", "tilt", "orientation"],
    raw: true,
  });
};

const findUserPanel = async (userId) => {
  return Panel.findOne({
    where: { user_id: userId },
  });
};
