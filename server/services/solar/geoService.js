import axios from "axios";

export const getLocationDetails = async (lat, lon) => {
  const response = await axios.get(
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

  const data = response.data?.[0] || {};

  return {
    city: data.name || null,
    state: data.state || null,
    country: data.country || null,
  };
};