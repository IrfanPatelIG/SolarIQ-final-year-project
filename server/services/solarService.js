export const calculateSolar = async ({ location, panel, dates }) => {
  const { lat, lon } = location;
  const { area, tilt } = panel;

  // 🔥 Dummy logic (replace later)
  const baseIrradiance = 5; // kWh/m²/day (avg)

  const dailyEnergy = area * baseIrradiance * 0.2; // efficiency = 20%

  const days =
    (new Date(dates.endDate) - new Date(dates.startDate)) /
      (1000 * 60 * 60 * 24) + 1;

  const totalEnergy = dailyEnergy * days;

  return {
    location,
    panel,
    dates,
    dailyEnergy,
    totalEnergy,
  };
};