import axios from "axios";
import { Location, Panel, Weather, Forecast } from "../models/index.js";
import {
  calculateSolar,
  getSeasonalFactor,
} from "../services/solarService.js";
import sequelize from "../config/db.js";

export const getSolarData = async (req, res) => {
  const t = await sequelize.transaction();
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

    // 🌦 FETCH FORECAST DATA (3-hour intervals)
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const forecastList = forecastRes.data.list;

    // ⏱️ TIMEZONE FIX
    const timezone = forecastRes.data?.city?.timezone || null;

    // 🧠 GROUP INTO DAILY WEATHER
    const dailyWeatherMap = {};

    forecastList.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];

      if (!dailyWeatherMap[date]) {
        dailyWeatherMap[date] = {
          temps: [],
          clouds: [],
          humidity: [],
          wind: [],
          pressure: [],
          rain: [],
        };
      }

      dailyWeatherMap[date].temps.push(entry.main.temp);
      dailyWeatherMap[date].clouds.push(entry.clouds.all);
      dailyWeatherMap[date].humidity.push(entry.main.humidity);
      dailyWeatherMap[date].wind.push(entry.wind.speed);
      dailyWeatherMap[date].pressure.push(entry.main.pressure);
      dailyWeatherMap[date].rain.push(entry.rain?.["3h"] || 0);
    });

    // 📊 CONVERT TO DAILY AVERAGE
    const dailyWeather = Object.keys(dailyWeatherMap).map((date) => {
      const d = dailyWeatherMap[date];

      const avg = (arr) =>
        arr.reduce((a, b) => a + b, 0) / arr.length;

      return {
        date,
        temperature: avg(d.temps),
        cloud_cover: avg(d.clouds),
        humidity: avg(d.humidity),
        wind_speed: avg(d.wind),
        air_pressure: avg(d.pressure),
        precipitation: avg(d.rain),
      };
    });

    // 📅 DATE RANGE FIX
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);

    // 💾 SAVE LOCATION
    const user_id = req.user.user_id;

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const savedLocation = await Location.create({
      latitude: lat,
      longitude: lon,
      city,
      state,
      country,
      timezone,
      user_id: user_id,
    }, { transaction: t });

    // 💾 SAVE PANEL
    const savedPanel = await Panel.create({
      area: panel.area,
      tilt: panel.tilt,
      orientation: panel.orientation,
      installation_date: null,
      location_id: savedLocation.location_id,
      user_id: user_id,
    }, { transaction: t });

    // 🔧 BASE FACTORS (fix for scope issue)
    const baseResult = await calculateSolar({
      location,
      panel,
      weather: { solar_irradiance: 1000 },
    });

    // 💾 PROCESS DAILY WEATHER + FORECAST
    const forecasts = [];
    let totalEnergy = 0;

    for (const dayData of dailyWeather) {
      const currentDate = new Date(dayData.date);

      if (currentDate < start || currentDate > end) continue;

      const solar_irradiance = 1000 * (1 - dayData.cloud_cover / 100);

      const tempWeather = {
        solar_irradiance,
      };

      const result = await calculateSolar({
        location,
        panel,
        weather: tempWeather,
      });

      const seasonalFactor = getSeasonalFactor(currentDate);

      const dailyEnergy =
        result.baseEnergy * seasonalFactor;

      totalEnergy += dailyEnergy;

      // 💾 SAVE WEATHER (PER DAY)
      await Weather.create({
        location_id: savedLocation.location_id,
        temperature: dayData.temperature,
        humidity: dayData.humidity,
        solar_irradiance,
        cloud_cover: dayData.cloud_cover,
        wind_speed: dayData.wind_speed,
        precipitation: dayData.precipitation,
        air_pressure: dayData.air_pressure,
        recorded_at: currentDate,
      }, { transaction: t });

      // 💾 SAVE FORECAST
      forecasts.push({
        forecast_date: currentDate,
        predicted_energy_kwh: dailyEnergy,
        location_id: savedLocation.location_id,
        panel_id: savedPanel.panel_id,
        model_version: "v3",
      });
    }

    // 💾 SAVE FORECAST
    await Forecast.bulkCreate(forecasts, { transaction: t });

    await t.commit();

    // ✅ RESPONSE
    res.json({
      success: true,
      message: "Data processed successfully",
      forecast: forecasts.map((f) => ({
        date: f.forecast_date,
        energy: f.predicted_energy_kwh,
      })),
      summary: {
        totalEnergy: totalEnergy,
        days: forecasts.length,
      },
      factors: {
        tiltFactor: baseResult.factors.tiltFactor,
        orientationFactor: baseResult.factors.orientationFactor,
      },
      db: {
        location: savedLocation,
        weather: "Stored per-day weather",
        panel: savedPanel,
      },
    });

  } catch (err) {
    await t.rollback();
    console.error("❌ Transaction rolled back:", err);

    res.status(500).json({
      success: false,
      message: "Server Error: Solar data processing failed",
    });
  }
};