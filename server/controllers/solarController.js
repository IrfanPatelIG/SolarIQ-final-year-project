import axios from "axios";
import { Location, Panel, Weather, Forecast } from "../models/index.js";
import {
  calculateSolar,
  getSeasonalFactor,
} from "../services/solar/solarService.js";
import sequelize from "../config/db.js";
import { getInclusiveDateRange } from "../helpers/dateHelper.js";

export const getSolarData = async (req, res) => {
  try {
    const requestData = getSolarRequestData(req);
    const validation = validateSolarRequest(requestData);

    if (validation) {
      return res.status(validation.status).json(validation.body);
    }

    console.log("RAW SOLAR REQUEST:", JSON.stringify(req.body, null, 2));

    const locationDetails = await fetchLocationDetails(
      requestData.location
    );
    const weatherPayload = await fetchWeatherForecast(
      requestData.location
    );
    const dailyWeather = buildDailyWeather(weatherPayload.list);
    const filteredWeather = filterWeatherByRange(
      dailyWeather,
      requestData.dates
    );
    const baseResult = await calculateSolar({
      location: requestData.location,
      panel: requestData.panel,
      weather: { solar_irradiance: 1000 },
    });

    const transaction = await sequelize.transaction();

    try {
      const savedLocation = await createLocationRecord(
        requestData,
        locationDetails,
        weatherPayload.timezone,
        transaction
      );
      const savedPanel = await createPanelRecord(
        requestData,
        savedLocation.location_id,
        transaction
      );
      const analysisData = await buildAnalysisRows({
        location: requestData.location,
        panel: requestData.panel,
        dailyWeather: filteredWeather,
        locationId: savedLocation.location_id,
        panelId: savedPanel.panel_id,
      });

      await Weather.bulkCreate(analysisData.weatherRows, {
        transaction,
      });
      await Forecast.bulkCreate(analysisData.forecasts, {
        transaction,
      });

      await transaction.commit();

      return res.json(
        buildSolarResponse({
          forecasts: analysisData.forecasts,
          totalEnergy: analysisData.totalEnergy,
          baseResult,
          savedLocation,
          savedPanel,
        })
      );
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Solar data processing failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Solar data processing failed",
    });
  }
};

const getSolarRequestData = (req) => {
  return {
    location: req.body.location,
    panel: req.body.panel,
    dates: req.body.dates,
    userId: req.user?.user_id,
  };
};

const validateSolarRequest = ({
  location,
  panel,
  dates,
  userId,
}) => {
  if (!location || !panel || !dates) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Missing required data",
      },
    };
  }

  if (location.lat == null || location.lon == null) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Invalid location data",
      },
    };
  }

  if (!userId) {
    return {
      status: 401,
      body: {
        success: false,
        message: "User not authenticated",
      },
    };
  }

  return null;
};

const fetchLocationDetails = async ({ lat, lon }) => {
  const geoRes = await axios.get(
    "http://api.openweathermap.org/geo/1.0/reverse",
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

  return {
    city: geoData?.name || null,
    state: geoData?.state || null,
    country: geoData?.country || null,
  };
};

const fetchWeatherForecast = async ({ lat, lon }) => {
  const forecastRes = await axios.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        lat,
        lon,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    }
  );

  return {
    list: forecastRes.data.list,
    timezone: forecastRes.data?.city?.timezone || null,
  };
};

const buildDailyWeather = (forecastList) => {
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

  return Object.keys(dailyWeatherMap).map((date) => {
    const dayData = dailyWeatherMap[date];

    return {
      date,
      temperature: getAverage(dayData.temps),
      cloud_cover: getAverage(dayData.clouds),
      humidity: getAverage(dayData.humidity),
      wind_speed: getAverage(dayData.wind),
      air_pressure: getAverage(dayData.pressure),
      precipitation: getAverage(dayData.rain),
    };
  });
};

const filterWeatherByRange = (dailyWeather, dates) => {
  const { start, end } = getInclusiveDateRange(
    dates.startDate,
    dates.endDate
  );

  return dailyWeather.filter((dayData) => {
    const currentDate = new Date(dayData.date);
    return currentDate >= start && currentDate <= end;
  });
};

const createLocationRecord = async (
  requestData,
  locationDetails,
  timezone,
  transaction
) => {
  return Location.create(
    {
      latitude: requestData.location.lat,
      longitude: requestData.location.lon,
      city: locationDetails.city,
      state: locationDetails.state,
      country: locationDetails.country,
      timezone,
      user_id: requestData.userId,
    },
    { transaction }
  );
};

const createPanelRecord = async (
  requestData,
  locationId,
  transaction
) => {
  return Panel.create(
    {
      area: requestData.panel.area,
      tilt: requestData.panel.tilt,
      orientation: requestData.panel.orientation,
      installation_date: null,
      location_id: locationId,
      user_id: requestData.userId,
    },
    { transaction }
  );
};

const buildAnalysisRows = async ({
  location,
  panel,
  dailyWeather,
  locationId,
  panelId,
}) => {
  const weatherRows = [];
  const forecasts = [];
  let totalEnergy = 0;

  for (const dayData of dailyWeather) {
    const currentDate = new Date(dayData.date);
    const solarIrradiance = getSolarIrradiance(dayData.cloud_cover);
    const solarResult = await calculateSolar({
      location,
      panel,
      weather: { solar_irradiance: solarIrradiance },
    });
    const dailyEnergy =
      solarResult.baseEnergy *
      getSeasonalFactor(currentDate);

    totalEnergy += dailyEnergy;
    weatherRows.push(
      buildWeatherRow(dayData, currentDate, locationId, solarIrradiance)
    );
    forecasts.push(
      buildForecastRow(currentDate, dailyEnergy, locationId, panelId)
    );
  }

  return {
    weatherRows,
    forecasts,
    totalEnergy,
  };
};

const buildWeatherRow = (
  dayData,
  currentDate,
  locationId,
  solarIrradiance
) => {
  return {
    location_id: locationId,
    temperature: dayData.temperature,
    humidity: dayData.humidity,
    solar_irradiance: solarIrradiance,
    cloud_cover: dayData.cloud_cover,
    wind_speed: dayData.wind_speed,
    precipitation: dayData.precipitation,
    air_pressure: dayData.air_pressure,
    recorded_at: currentDate,
  };
};

const buildForecastRow = (
  currentDate,
  dailyEnergy,
  locationId,
  panelId
) => {
  return {
    forecast_date: currentDate,
    predicted_energy_kwh: dailyEnergy,
    location_id: locationId,
    panel_id: panelId,
    model_version: "v3",
  };
};

const buildSolarResponse = ({
  forecasts,
  totalEnergy,
  baseResult,
  savedLocation,
  savedPanel,
}) => {
  return {
    success: true,
    message: "Data processed successfully",
    forecast: forecasts.map((forecast) => ({
      date: forecast.forecast_date,
      energy: forecast.predicted_energy_kwh,
    })),
    summary: {
      totalEnergy,
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
  };
};

const getAverage = (values) => {
  return (
    values.reduce((sum, value) => sum + value, 0) / values.length
  );
};

const getSolarIrradiance = (cloudCover) => {
  return 1000 * (1 - cloudCover / 100);
};
