import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solarRoutes from "./routes/solarRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 5000;
dotenv.config();

// Connecting to DB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/solar", solarRoutes);

// Backend check
app.get("/", (req, res) => {
  res.send("SolarIQ Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});