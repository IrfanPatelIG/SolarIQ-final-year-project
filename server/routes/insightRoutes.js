import express from "express";
import {
  getAlerts,
  getRecommendations,
} from "../controllers/insightController.js";

const router = express.Router();

router.get("/:panelId/alerts", getAlerts);
router.get("/:panelId/recommendations", getRecommendations);

export default router;