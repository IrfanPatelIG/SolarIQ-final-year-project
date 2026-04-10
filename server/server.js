import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solarRoutes from "./routes/solarRoutes.js";
import { connectDB } from "./config/db.js";
import sequelize from "./config/db.js";
import "./models/index.js";

const app = express();
const PORT = 5000;
dotenv.config();

// Connecting to DB
await connectDB();

// Synchronizing Tables in DB
await sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tables synced"))
  .catch(err => console.error("❌ Sync error:", err));


// Middleware
app.use(cors());
app.use(express.json());

// Actual Routes
app.use("/api/solar", solarRoutes);

// Just for Backend Health-check
app.get("/", (req, res) => {
  res.send("SolarIQ Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`\n🖥️  Server running on http://localhost:${PORT}`);
});