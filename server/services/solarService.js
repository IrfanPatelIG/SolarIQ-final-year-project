export const calculateSolar = async ({ location, panel, dates, weather }) => {
  const { area, tilt } = panel;

  const irradiance = weather.solar_irradiance; // W/m²

  const sunlightHours = 5; // avg
  const efficiency = 0.2; // 20%

  // Convert to kWh/m²/day
  const dailyIrradiance = (irradiance * sunlightHours) / 1000;

  // Final energy
  const dailyEnergy = area * dailyIrradiance * efficiency;

  const days =
    (new Date(dates.endDate) - new Date(dates.startDate)) /
      (1000 * 60 * 60 * 24) +
    1;

  const totalEnergy = dailyEnergy * days;

  return {
    dailyEnergy,
    totalEnergy,
  };
};