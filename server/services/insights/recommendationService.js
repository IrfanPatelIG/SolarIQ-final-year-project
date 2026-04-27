export const generateRecommendations = ({
  weather,
  factors,
  totalEnergy,
}) => {
  const recommendations = [];
  const alerts = [];

  const {
    cloud_cover,
    temperature,
    wind_speed,
    precipitation,
  } = weather;

  const { tiltFactor, orientationFactor } = factors;

  // 🌥 CLOUD COVER
  if (cloud_cover > 70) {
    alerts.push("High cloud cover detected — solar output may drop significantly.");
  }

  // 🌧 RAIN
  if (precipitation > 0) {
    alerts.push("Rainy conditions — energy generation will be low.");
  }

  // 🌡 TEMPERATURE
  if (temperature > 35) {
    recommendations.push("High temperature detected — panel efficiency may decrease. Consider ventilation.");
  }

  // 💨 WIND
  if (wind_speed > 10) {
    recommendations.push("High wind speed — ensure panel mounting is secure.");
  }

  // 📐 TILT
  if (tiltFactor < 0.9) {
    recommendations.push("Panel tilt is not optimal. Adjust tilt angle closer to your latitude for better performance.");
  }

  // 🧭 ORIENTATION
  if (orientationFactor < 0.9) {
    recommendations.push("Panel orientation is suboptimal. South-facing panels perform best in your region.");
  }

  // ⚡ LOW ENERGY
  if (totalEnergy < 20) {
    alerts.push("Low total energy predicted — check panel setup or weather conditions.");
  }

   if (totalEnergy > 50) {
    alerts.push("Excellent solar generation expected.");
  }

  // 🌟 GOOD PERFORMANCE
  if (alerts.length === 0 && recommendations.length === 0) {
    recommendations.push("System is performing optimally under current conditions.");
  }
  
  if (alerts.length === 0) {
    alerts.push("No critical issues detected. System is operating normally.");
  }

  return {
    alerts,
    recommendations,
  };
};