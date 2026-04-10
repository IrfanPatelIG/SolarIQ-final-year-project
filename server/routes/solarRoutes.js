import express from "express";
import { getSolarData } from "../controllers/solarController.js";

const router = express.Router();

// Main - POST: /api/solar
router.post("/", getSolarData);

export default router;