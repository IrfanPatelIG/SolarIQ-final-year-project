import axios from "axios";

export const getForecastData = async (lat, lon) => {
  const response = await axios.get(
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
    timezone: response.data?.city?.timezone || null,
    forecastList: response.data?.list || [],
  };
};

export const groupForecastToDaily = (forecastList) => {
  const map = {};

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!map[date]) {
      map[date] = {
        temps: [],
        clouds: [],
        humidity: [],
        wind: [],
        pressure: [],
        rain: [],
      };
    }

    map[date].temps.push(item.main.temp);
    map[date].clouds.push(item.clouds.all);
    map[date].humidity.push(item.main.humidity);
    map[date].wind.push(item.wind.speed);
    map[date].pressure.push(item.main.pressure);
    map[date].rain.push(item.rain?.["3h"] || 0);
  });

  return Object.keys(map).map((date) => {
    const row = map[date];

    const avg = (arr) =>
      arr.reduce((sum, value) => sum + value, 0) / arr.length;

    return {
      date,
      temperature: avg(row.temps),
      cloud_cover: avg(row.clouds),
      humidity: avg(row.humidity),
      wind_speed: avg(row.wind),
      air_pressure: avg(row.pressure),
      precipitation: avg(row.rain),
    };
  });
};