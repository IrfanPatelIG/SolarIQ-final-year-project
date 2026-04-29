import { Forecast, Panel } from "../../models/index.js";

import { Op, fn, col } from "sequelize";

import sequelize from "../../config/db.js";

import AppError from "../../utils/appError.js";

import { calculateEfficiency } from "../efficiency/efficiencyService.js";

const buildDateFilter = (startDate, endDate) => ({
  forecast_date: {
    [Op.between]: [startDate, endDate],
  },
});

// Daily Energy
export const getDailyEnergyService = async ({ userId, startDate, endDate }) => {
  return Forecast.findAll({
    attributes: ["forecast_date", "predicted_energy_kwh"],
    where: buildDateFilter(startDate, endDate),
    include: [
      {
        model: Panel,
        attributes: [],
        where: {
          user_id: userId,
        },
      },
    ],
    order: [["forecast_date", "ASC"]],
  });
};

// Weather Impact
export const getWeatherImpactService = async ({
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
        JOIN panel_configs p
          ON f.panel_id = p.panel_id
        WHERE f.forecast_date
          BETWEEN :startDate AND :endDate
          AND p.user_id = :userId
        ORDER BY f.forecast_date ASC
      `,
    {
      replacements: {
        startDate,
        endDate,
        userId,
      },
    },
  );

  return rows;
};

// Distribution
export const getEnergyDistributionService = async ({
  userId,
  startDate,
  endDate,
}) => {
  return Forecast.findAll({
    attributes: [
      [fn("DAYNAME", col("forecast_date")), "day"],
      [fn("AVG", col("predicted_energy_kwh")), "avg_energy"],
    ],
    where: buildDateFilter(startDate, endDate),
    include: [
      {
        model: Panel,
        attributes: [],
        where: {
          user_id: userId,
        },
      },
    ],
    group: [fn("DAYNAME", col("forecast_date"))],
  });
};

// Panel Performance
export const getPanelPerformanceService = async ({
  userId,
  startDate,
  endDate,
}) => {
  return Panel.findAll({
    where: {
      user_id: userId,
    },
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
        where: buildDateFilter(startDate, endDate),
      },
    ],
    group: ["Panel.panel_id", "tilt", "orientation"],
    raw: true,
  });
};

// Efficiency
export const getPanelEfficiencyService = async ({
  userId,
  startDate,
  endDate,
}) => {
  const panel = await Panel.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!panel) {
    throw new AppError("No panel found", 404);
  }

  return calculateEfficiency({
    panelId: panel.panel_id,
    startDate,
    endDate,
  });
};
