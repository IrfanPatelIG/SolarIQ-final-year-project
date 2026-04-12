import axios from "axios";
import { Location, Panel, Weather, Forecast } from "../models/index.js";
import {
  calculateSolar,
  getSeasonalFactor,
} from "../services/solarService.js";

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

    // 🌦 1) Fetch weather data
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // ⏱️ TIMEZONE (from weather API)
    const timezone = weatherRes.data?.timezone || null;

    // 💾 2) SAVE LOCATION (FULL DATA)
    const savedLocation = await Location.create({
      latitude: lat,
      longitude: lon,
      city,
      state,
      country,
      timezone,
    });

    console.log("✅ Location saved:", savedLocation.toJSON());

    // ⚡* Calculate irradiance
    const w = weatherRes.data;

    // 🌡 Extract weather values
    const temperature = w.main?.temp;
    const humidity = w.main?.humidity;
    const wind_speed = w.wind?.speed;
    const cloud_cover = w.clouds?.all;
    const precipitation = w.rain?.["1h"] || 0;
    const air_pressure = w.main?.pressure;

    // ☀️ Solar irradiance calculation
    const solar_irradiance = 1000 * (1 - cloud_cover / 100);

    // 💾 3) Save Weather
    const savedWeather = await Weather.create({
      location_id: savedLocation.location_id,
      temperature: temperature,
      humidity: humidity,
      solar_irradiance,
      cloud_cover: cloud_cover,
      wind_speed: wind_speed,
      precipitation: precipitation,
      air_pressure: air_pressure,
      recorded_at: new Date(),
    });

    console.log("✅ Weather saved:", savedWeather.toJSON());

    // 💾 4) SAVE PANEL (linked)
    const savedPanel = await Panel.create({
      area: panel.area,
      tilt: panel.tilt,
      orientation: panel.orientation,
      installation_date: null, // optional for now
      location_id: savedLocation.location_id,
    });

    console.log("✅ Panel saved:", savedPanel.toJSON());


    // ⚡5) Solar calculation from solarService.js (ML Output)
    // ⚡ Base calculation
    const result = await calculateSolar({
      location,
      panel,
      weather: savedWeather,
    });
      // Bcz all "location, panel & dates" are comming directly from API call from frontend, 
      // But for weather we are fetching this at Backend itself therefor we specified this separately with "savedWeather"


    // 📅 6) SAVING FORECAST DATA | Generate date range
    // 📅 Date loop
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);

    let currentDate = new Date(start);

    const forecasts = [];

    let totalEnergy = 0;

    while (currentDate <= end) {
      const seasonalFactor = getSeasonalFactor(currentDate);

      const dailyEnergy =
        result.baseEnergy *
        seasonalFactor *
        result.factors.tiltFactor *
        result.factors.orientationFactor;

      // 🧮 Add to total
      totalEnergy += dailyEnergy;

      // 🖨️ PRINT EACH DAY ENERGY (what you asked)
      console.log(
        `📅 ${currentDate.toISOString().split("T")[0]} → ⚡ ${dailyEnergy.toFixed(
          2
        )} kWh`
      );

      forecasts.push({
        forecast_date: new Date(currentDate),
        predicted_energy_kwh: dailyEnergy,
        location_id: savedLocation.location_id,
        panel_id: savedPanel.panel_id,
        model_version: "v2",
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(`\n🔋 Total Energy: ${totalEnergy.toFixed(2)} kWh\n`);

    // 💾 Save
    await Forecast.bulkCreate(forecasts);

    console.log("✅ Forecast data saved");

    // ✅ 7) RESPONSE
    res.json({
      success: true,
      message: "Data processed successfully",
      forecast: forecasts.map(f => ({
        date: f.forecast_date,
        energy: f.predicted_energy_kwh
      })),   // daily values
      summary: {
        totalEnergy: totalEnergy,
        days: forecasts.length,
      },
      factors: {
        tiltFactor: result.factors.tiltFactor,
        orientationFactor: result.factors.orientationFactor,
      },
      db: {
        location: savedLocation,
        weather: savedWeather,
        panel: savedPanel,
      },
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};