import { Forecast, Weather, Panel } from "../models/index.js";
import { Op, fn, col } from "sequelize";
import sequelize from "../config/db.js";
import { calculateEfficiency } from "../services/efficiencyService.js";


// 1️⃣ Daily Energy Trend
export const getDailyEnergy = async (req, res) => {
  try {
    const { startDate, endDate, panelId } = req.query;

    const whereClause = {
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    };

    // 🎯 Add panel filter
    if (panelId) {
      whereClause.panel_id = panelId;
    }

    const data = await Forecast.findAll({
      attributes: ["forecast_date", "predicted_energy_kwh"],
      where: whereClause,
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
    const { startDate, endDate, panelId } = req.query;

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
        AND DATE(w.recorded_at) BETWEEN :startDate AND :endDate
      WHERE f.forecast_date BETWEEN :startDate AND :endDate
      ${panelId ? "AND f.panel_id = :panelId" : ""}
      ORDER BY f.forecast_date ASC
    `, {
      replacements: { startDate, endDate, panelId },
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
    const { startDate, endDate, panelId } = req.query;

    const whereClause = {
      forecast_date: {
        [Op.between]: [startDate, endDate],
      },
    };

    if (panelId) {
      whereClause.panel_id = panelId;
    }

    const data = await Forecast.findAll({
      attributes: [
        [fn("DAYNAME", col("forecast_date")), "day"],
        [fn("AVG", col("predicted_energy_kwh")), "avg_energy"],
      ],
      where: whereClause,
      group: [fn("DAYNAME", col("forecast_date"))],
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching distribution" });
  }
};

// 4️⃣ Panel Performance
export const getPanelPerformance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate required" });
    }

    const data = await Panel.findAll({
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
    console.error(err);
    res.status(500).json({ error: "Error fetching panel performance" });
  }
};


// 5️⃣ Efficiancy Score
export const getPanelEfficiency = async (req, res) => {
  try {
    const { panelId } = req.params;
    const { startDate, endDate } = req.query;

    if (!panelId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "panelId, startDate, endDate required",
      });
    }

    const result = await calculateEfficiency({
      panelId,
      startDate,
      endDate,
    });

    res.json({
      success: true,
      dateRange: { startDate, endDate },
      ...result,
    });
  } catch (error) {
    console.error("❌ Efficiency Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Error calculating efficiency",
    });
  }
};