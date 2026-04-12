import express from "express";
import {
  getAlerts,
  getRecommendations,
} from "../controllers/insightController.js";

const router = express.Router();

router.get("/alerts", getAlerts);
router.get("/recommendations", getRecommendations);

export default router;