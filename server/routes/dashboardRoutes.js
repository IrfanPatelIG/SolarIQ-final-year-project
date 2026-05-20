import express from "express";
import {
  getDashboardData,
  getUserPanels,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/panels", protect, getUserPanels);
router.get("/:panelId", protect, getDashboardData);

export default router;
