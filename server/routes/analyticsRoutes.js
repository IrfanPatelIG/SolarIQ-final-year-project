import express from "express";
import {
  getDailyEnergy,
  getWeatherImpact,
  getEnergyDistribution,
  getPanelPerformance,
  getPanelEfficiency,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/daily-energy", getDailyEnergy);
router.get("/weather-impact", getWeatherImpact);
router.get("/distribution", getEnergyDistribution);
router.get("/panel-performance", getPanelPerformance);
router.get("/efficiency/panel/:panelId", getPanelEfficiency);

export default router;