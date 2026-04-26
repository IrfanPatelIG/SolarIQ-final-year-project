/**
 * Convert orientation string to degrees
 * Maps cardinal directions to degree values (0-360)
 */
export const convertOrientationToDegrees = (orientation) => {
  const orientationMap = {
    'North': 0,
    'N': 0,
    'Northeast': 45,
    'NE': 45,
    'East': 90,
    'E': 90,
    'Southeast': 135,
    'SE': 135,
    'South': 180,
    'S': 180,
    'Southwest': 225,
    'SW': 225,
    'West': 270,
    'W': 270,
    'Northwest': 315,
    'NW': 315
  };

  // Handle case-insensitive lookup
  const key = Object.keys(orientationMap).find(
    k => k.toLowerCase() === orientation.toLowerCase()
  );

  if (key) {
    return orientationMap[key];
  }

  // If not found, try to parse as number
  const parsed = parseFloat(orientation);
  if (!isNaN(parsed)) {
    return parsed % 360;
  }

  // Default to South (180) if unknown
  console.warn(`Unknown orientation: ${orientation}, defaulting to South (180)`);
  return 180;
};

/**
 * Calculate capacity_kw from panel area
 * Uses average panel efficiency of 175 W/m² (midpoint of 150-200 range)
 * Formula: capacity_kw = (area * 175) / 1000
 */
export const calculateCapacityFromArea = (area) => {
  const panelEfficiency = 175; // W/m²
  const capacityWatts = parseFloat(area) * panelEfficiency;
  return capacityWatts / 1000; // Convert to kW
};

/**
 * Calculate panel area from capacity_kw
 * Formula: area = (capacity_kw * 1000) / 175
 */
export const calculateAreaFromCapacity = (capacityKw) => {
  const panelEfficiency = 175; // W/m²
  const capacityWatts = parseFloat(capacityKw) * 1000;
  return capacityWatts / panelEfficiency;
};

/**
 * Calculate time-based features from a date
 */
export const calculateTimeFeatures = (date) => {
  const dateObj = new Date(date);
  const dayOfYear = getDayOfYear(dateObj);
  const month = dateObj.getMonth() + 1; // 1-12
  
  // Sine and cosine of day of year for cyclical feature
  const sinDoy = Math.sin((2 * Math.PI * dayOfYear) / 365);
  const cosDoy = Math.cos((2 * Math.PI * dayOfYear) / 365);
  
  return {
    day_of_year: dayOfYear,
    month: month,
    sin_doy: Math.round(sinDoy * 1000) / 1000,
    cos_doy: Math.round(cosDoy * 1000) / 1000
  };
};

/**
 * Get day of year (1-365)
 */
const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

/**
 * Prepare complete feature set for ML model
 * Combines all features in the correct order expected by the model
 */
export const prepareModelInput = (location, panel, weatherData, date) => {
  const { lat, lon } = location;
  const { area, tilt, orientation } = panel;
  
  // Calculate derived features
  const capacityKw = calculateCapacityFromArea(area);
  const orientationDegrees = convertOrientationToDegrees(orientation);
  const timeFeatures = calculateTimeFeatures(date);
  
  // Prepare input object matching ML model feature order
  const modelInput = {
    latitude: lat,
    longitude: lon,
    day_of_year: timeFeatures.day_of_year,
    month: timeFeatures.month,
    sin_doy: timeFeatures.sin_doy,
    cos_doy: timeFeatures.cos_doy,
    solar_irradiance: weatherData.solar_irradiance,
    temperature_avg: weatherData.temperature_avg,
    humidity: weatherData.humidity,
    wind_speed: weatherData.wind_speed,
    pressure: weatherData.pressure,
    cloud_cover: weatherData.cloud_cover,
    precipitation: weatherData.precipitation,
    capacity_kw: Math.round(capacityKw * 100) / 100,
    panel_area: parseFloat(area),
    tilt_angle: parseInt(tilt),
    orientation: orientationDegrees
  };
  
  return modelInput;
};
