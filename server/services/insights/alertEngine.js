export const generateAlerts = ({
  weather,
  totalEnergy,
  factors,
  panel,
}) => {
  const alerts = [];

  const push = (
    severity,
    type,
    message
  ) => {
    alerts.push({
      severity,
      type,
      message,
    });
  };

  // Weather Alerts
  if (weather.cloud_cover > 75)
    push(
      "high",
      "weather",
      "Heavy cloud cover may reduce solar generation."
    );

  if (weather.temperature > 38)
    push(
      "medium",
      "temperature",
      "High temperature may reduce panel efficiency."
    );

  if (weather.temperature < 10)
    push(
      "low",
      "temperature",
      "Cold weather may delay morning production."
    );

  if (weather.wind_speed > 15)
    push(
      "high",
      "wind",
      "Strong wind detected. Check panel mounting."
    );

  if (weather.precipitation > 5)
    push(
      "medium",
      "rain",
      "Rain expected. Output may dip temporarily."
    );

  if (weather.humidity > 85)
    push(
      "low",
      "humidity",
      "High humidity may slightly reduce efficiency."
    );

  if (weather.air_pressure < 990)
    push(
      "low",
      "weather",
      "Low pressure indicates unstable weather."
    );

  // Performance Alerts
  if (totalEnergy < 10)
    push(
      "high",
      "performance",
      "Very low energy generation expected."
    );

  if (totalEnergy > 50)
    push(
      "low",
      "performance",
      "Excellent generation expected."
    );

  // Panel Alerts
  if (factors.tiltFactor < 0.85)
    push(
      "medium",
      "tilt",
      "Panel tilt angle may be suboptimal."
    );

  if (factors.orientationFactor < 0.9)
    push(
      "medium",
      "orientation",
      "Panel orientation may reduce peak output."
    );

  if (
    panel.orientation === "North"
  )
    push(
      "high",
      "orientation",
      "North-facing panels significantly reduce output."
    );

  if (panel.area > 100)
    push(
      "low",
      "system",
      "Large system detected. Monitor inverter load."
    );

  if (panel.area < 20)
    push(
      "low",
      "system",
      "Small panel area limits generation capacity."
    );

  if (alerts.length === 0) {
    push(
      "low",
      "general",
      "System operating under normal conditions."
    );
  }

  return alerts;
};