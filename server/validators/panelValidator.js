const allowedOrientations = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"];

export const validateSolarRequest = (body) => {
  const { location, panel, dates } = body;

  if (!location || !panel || !dates) {
    return "location, panel and dates are required";
  }

  const { lat, lon } = location;
  const { area, tilt, orientation } = panel;
  const { startDate, endDate } = dates;

  if (lat === undefined || lon === undefined) {
    return "Latitude and longitude are required";
  }

  if (Number.isNaN(Number(lat)) || Number.isNaN(Number(lon))) {
    return "Latitude and longitude must be valid numbers";
  }

  if (area === undefined || tilt === undefined || !orientation) {
    return "area, tilt and orientation are required";
  }

  if (Number(area) <= 0) {
    return "Panel area must be greater than 0";
  }

  if (Number(tilt) < 0 || Number(tilt) > 90) {
    return "Tilt must be between 0 and 90";
  }

  if (!allowedOrientations.includes(String(orientation).toUpperCase())) {
    return "Invalid orientation value";
  }

  if (!startDate || !endDate) {
    return "startDate and endDate are required";
  }

  if (new Date(startDate) > new Date(endDate)) {
    return "startDate cannot be after endDate";
  }

  return null;
};