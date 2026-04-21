import { Forecast, Weather, Panel } from "../models/index.js";
import { Op, fn, col } from "sequelize";
import sequelize from "../config/db.js";
import { calculateEfficiency } from "../services/efficiencyService.js";


// 1️⃣ Daily Energy Trend
export const getDailyEnergy = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { startDate, endDate } = req.query;

    const data = await Forecast.findAll({
      attributes: ["forecast_date", "predicted_energy_kwh"],
      where: {
        forecast_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Panel,
          attributes: [],
          where: { user_id: userId }, // 🔥 KEY CHANGE
        },
      ],
      order: [["forecast_date", "ASC"]],
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching daily energy" });
  }
};

// 2️⃣ Weather Impact
export const getWeatherImpact = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { startDate, endDate } = req.query;

    const data = await sequelize.query(`
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
      WHERE f.forecast_date BETWEEN :startDate AND :endDate
        AND p.user_id = :userId
      ORDER BY f.forecast_date ASC
    `, {
      replacements: { startDate, endDate, userId },
    });

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching weather impact" });
  }
};

// 3️⃣ Energy Distribution (by weekday)
export const getEnergyDistribution = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { startDate, endDate } = req.query;

    const data = await Forecast.findAll({
      attributes: [
        [fn("DAYNAME", col("forecast_date")), "day"],
        [fn("AVG", col("predicted_energy_kwh")), "avg_energy"],
      ],
      where: {
        forecast_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Panel,
          attributes: [],
          where: { user_id: userId },
        },
      ],
      group: [fn("DAYNAME", col("forecast_date"))],
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching distribution" });
  }
};

// 4️⃣ Panel Performance
export const getPanelPerformance = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { startDate, endDate } = req.query;

    const data = await Panel.findAll({
      where: { user_id: userId }, // 🔥 FILTER USER
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
          where: {
            forecast_date: {
              [Op.between]: [startDate, endDate],
            },
          },
        },
      ],
      group: ["Panel.panel_id", "tilt", "orientation"],
      raw: true,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching panel performance" });
  }
};


// 5️⃣ Efficiancy Score
export const getPanelEfficiency = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { startDate, endDate } = req.query;

    const panel = await Panel.findOne({
      where: { user_id: userId },
    });

    if (!panel) {
      return res.status(404).json({ message: "No panel found" });
    }

    const result = await calculateEfficiency({
      panelId: panel.panel_id,
      startDate,
      endDate,
    });

    res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    res.status(500).json({ message: "Efficiency error" });
  }
};