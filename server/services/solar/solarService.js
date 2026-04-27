// 🌞 Seasonal factor
export const getSeasonalFactor = (date) => {
  const month = new Date(date).getMonth() + 1;

  if (month >= 3 && month <= 5) return 1.1; // Summer
  if (month >= 6 && month <= 9) return 0.8; // Monsoon
  return 0.9; // Winter
};

// 📐 Tilt factor
export const getTiltFactor = (tilt, lat) => {
  const optimalTilt = lat;
  const diff = Math.abs(tilt - optimalTilt);

  if (diff <= 5) return 1.0;
  if (diff <= 15) return 0.9;
  return 0.75;
};

// 🧭 Orientation factor
export const getOrientationFactor = (orientation) => {
  const map = {
    S: 1.0,
    SE: 0.95,
    SW: 0.95,
    E: 0.85,
    W: 0.85,
    N: 0.7,
  };

  return map[orientation] || 0.8;
};

export const calculateSolar = async ({ location, panel, weather }) => {
  const { area, tilt, orientation } = panel;
  const { lat } = location;

  const irradiance = weather.solar_irradiance; // W/m²

  const sunlightHours = 5; // avg
  const efficiency = 0.2; // 20% efficiency

  // Convert to kWh/m²/day
  const dailyIrradiance = (irradiance * sunlightHours) / 1000;

  // Factors
  const tiltFactor = getTiltFactor(tilt, lat);
  const orientationFactor = getOrientationFactor(orientation);

  // 🔥 BASE ENERGY (no seasonal here)
  const baseEnergy =
    area *
    dailyIrradiance *
    efficiency *
    tiltFactor *
    orientationFactor;

  return {
    baseEnergy,
    factors: {
      tiltFactor,
      orientationFactor,
    },
  };
};