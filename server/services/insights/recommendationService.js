export const generateRecommendations = ({
  weather,
  totalEnergy,
  factors,
  panel,
}) => {
  const recommendations = [];

  const push = (priority, category, message) => {
    recommendations.push({
      priority,
      category,
      message,
    });
  };

  // -----------------------------
  // Tilt / Orientation
  // -----------------------------
  if (factors.tiltFactor < 0.9) {
    push(
      "high",
      "panel",
      "Adjust tilt angle closer to local latitude for better yearly output.",
    );
  }

  if (factors.orientationFactor < 0.9) {
    push(
      "high",
      "panel",
      "South-facing orientation can improve peak generation.",
    );
  }

  if (panel?.orientation === "West") {
    push(
      "medium",
      "panel",
      "West-facing panels are better for afternoon loads. Consider batteries for evening usage.",
    );
  }

  if (panel?.orientation === "East") {
    push(
      "medium",
      "panel",
      "East-facing panels help morning generation. Shift morning appliances accordingly.",
    );
  }

  // -----------------------------
  // Weather Based
  // -----------------------------
  if (weather.cloud_cover > 70) {
    push(
      "medium",
      "weather",
      "Cloudy conditions expected. Reduce dependency on solar-only loads today.",
    );
  }

  if (weather.temperature > 38) {
    push(
      "high",
      "maintenance",
      "High heat reduces efficiency. Ensure airflow below panels.",
    );
  }

  if (weather.precipitation > 5) {
    push(
      "low",
      "weather",
      "Rain may clean panel dust naturally. Inspect after rainfall.",
    );
  }

  if (weather.wind_speed > 15) {
    push(
      "high",
      "safety",
      "Inspect mounting clamps and frame after strong winds.",
    );
  }

  if (weather.humidity > 85) {
    push(
      "low",
      "maintenance",
      "Check connectors periodically in humid conditions.",
    );
  }

  // -----------------------------
  // Performance Based
  // -----------------------------
  if (totalEnergy < 10) {
    push(
      "high",
      "performance",
      "Low generation expected. Check shading, dust, or inverter issues.",
    );
  }

  if (totalEnergy >= 10 && totalEnergy < 25) {
    push(
      "medium",
      "performance",
      "Moderate generation expected. Schedule heavy appliances mid-day.",
    );
  }

  if (totalEnergy > 40) {
    push(
      "low",
      "performance",
      "High generation expected. Use washing machine, pumps, or charging loads today.",
    );
  }

  // -----------------------------
  // System Size Based
  // -----------------------------
  if (panel?.area > 100) {
    push(
      "medium",
      "system",
      "Large array detected. Monitor inverter clipping during peak sunlight.",
    );
  }

  if (panel?.area < 20) {
    push("low", "system", "Consider expanding panel area for better savings.");
  }

  // -----------------------------
  // Generic Fallback
  // -----------------------------
  if (recommendations.length === 0) {
    push(
      "low",
      "general",
      "System conditions look stable. Continue regular maintenance.",
    );
  }

  return recommendations;
};
