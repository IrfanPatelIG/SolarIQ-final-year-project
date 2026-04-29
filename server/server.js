import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import sequelize from "./config/db.js";
import "./models/index.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import solarRoutes from "./routes/solarRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// DB
await connectDB();

await sequelize.sync()
  .then(() => console.log("✅ Tables synced"))
  .catch(err => console.error("❌ DB Tables Sync error:", err));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/solar", solarRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/insights", insightRoutes);

// ✅ Dashboard (MAIN API)
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("SolarIQ Backend Running 🚀");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🖥️ Server running on http://localhost:${PORT}`);
});