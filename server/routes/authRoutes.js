import express from "express";
import {
  registerUser,
  loginUser,
  refreshTokenHandler,
  logoutUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);

router.get("/admin-data", protect, authorizeRoles("admin"), (req, res) => {
    console.log("User from token: ", req.user);  // 👈 ADD THIS
    res.json({ message: "Admin access granted" });
  }
);

export default router;