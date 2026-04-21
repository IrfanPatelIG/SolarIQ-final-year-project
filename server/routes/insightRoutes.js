import express from "express";
import {
  getAlerts,
  getRecommendations,
} from "../controllers/insightController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/alerts", protect, getAlerts);
router.get("/recommendations", protect, getRecommendations);

export default router;