import express from "express";
import {
  getDailyEnergy,
  getWeatherImpact,
  getEnergyDistribution,
  getPanelPerformance,
  getPanelEfficiency,
} from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/daily-energy", protect, getDailyEnergy);
router.get("/weather-impact", protect, getWeatherImpact);
router.get("/distribution", protect, getEnergyDistribution);
router.get("/panel-performance", protect, getPanelPerformance);
router.get("/efficiency", protect, getPanelEfficiency);

export default router;