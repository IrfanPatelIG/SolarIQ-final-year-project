export const calculatePerformanceScore = ({
  weather,
  totalEnergy,
  factors,
}) => {
  let score = 100;

  // --------------------------------
  // Weather Penalties
  // --------------------------------
  if (weather.cloud_cover > 80) score -= 25;
  else if (weather.cloud_cover > 60) score -= 15;
  else if (weather.cloud_cover > 40) score -= 8;

  if (weather.temperature > 40) score -= 12;
  else if (weather.temperature > 35) score -= 7;

  if (weather.wind_speed > 18) score -= 8;
  else if (weather.wind_speed > 12) score -= 4;

  if (weather.precipitation > 10) score -= 6;

  // --------------------------------
  // Panel Efficiency Factors
  // --------------------------------
  score *= factors.tiltFactor;
  score *= factors.orientationFactor;

  // --------------------------------
  // Output Bonus / Penalty
  // --------------------------------
  if (totalEnergy > 50) score += 5;
  else if (totalEnergy < 10) score -= 20;
  else if (totalEnergy < 20) score -= 10;

  // --------------------------------
  // Clamp Score
  // --------------------------------
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return Math.round(score);
};