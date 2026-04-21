import express from "express";
import { getSolarData } from "../controllers/solarController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Main - POST: /api/solar
router.post("/", getSolarData);


router.get("/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;