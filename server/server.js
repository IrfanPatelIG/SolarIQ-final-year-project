import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import sequelize from "./config/db.js";

import "./models/index.js";

// Routes
import solarRoutes from "./routes/solarRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const PORT = 5000;

dotenv.config();

// DB
await connectDB();

await sequelize.sync()
  .then(() => console.log("✅ Tables synced"))
  .catch(err => console.error("❌ DB Tables Sync error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("login");
app.use("/api/solar", solarRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/insights", insightRoutes);

// ✅ Dashboard (MAIN API)
app.use("/api", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("SolarIQ Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`🖥️ Server running on http://localhost:${PORT}`);
});