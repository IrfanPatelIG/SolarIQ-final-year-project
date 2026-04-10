import { calculateSolar } from "../services/solarService.js";
import Location from "../models/locationModel.js";
import axios from "axios";

export const getSolarData = async (req, res) => {
  try {
    const { location, panel, dates } = req.body;

    console.log("📥 RAW DATA:", JSON.stringify(req.body, null, 2));

    // Validation
    if (!location || !panel || !dates) {
      return res.status(400).json({
        success: false,
        message: "Missing required data",
      });
    }

    const { lat, lon } = location;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Invalid location data",
      });
    }

    
    // 🌍 FETCH LOCATION DETAILS FROM API
    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse`,
      {
        params: {
          lat,
          lon,
          limit: 1,
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );

    const geoData = geoRes.data[0];

    const city = geoData?.name || null;
    const state = geoData?.state || null;
    const country = geoData?.country || null;

    // ⏱️ TIMEZONE (from another API)
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );

    const timezone = weatherRes.data?.timezone || null;

    // ✅ SAVE LOCATION WITH FULL DATA
    const savedLocation = await Location.create({
      latitude: lat,
      longitude: lon,
      city,
      state,
      country,
      timezone,
    });

    console.log("✅ Location saved:", savedLocation.toJSON());

    // ✅ EXISTING LOGIC (UNCHANGED)
    const result = await calculateSolar({ location, panel, dates });

    // ✅ RESPONSE
    res.json({
      success: true,
      message: "Data processed successfully",
      location: savedLocation,
      data: result,
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};