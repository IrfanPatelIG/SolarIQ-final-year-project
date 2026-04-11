export default function Notifications({ data = [] }) {

  if (!data.length) {
    return (
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
        <h2 className="text-xl text-white font-bold mb-4">Notifications</h2>
        <p className="text-gray-500 text-sm">No alerts</p>
      </div>
    );
  }

  // 🔥 Alert logic
  const alerts = [];

  // High temperature
  if (data.some(d => d.temp > 35)) {
    alerts.push({
      type: "warning",
      message: "High panel temperature detected (>35°C)",
    });
  }

  // Low energy
  const lowEnergyDays = data.filter(d => d.energy < 12);
  if (lowEnergyDays.length > 0) {
    alerts.push({
      type: "alert",
      message: `Low energy on ${lowEnergyDays.map(d => d.date).join(", ")}`,
    });
  }

  // Cloud impact
  if (data.some(d => d.cloud > 60)) {
    alerts.push({
      type: "info",
      message: "Heavy cloud cover affecting production",
    });
  }

  // If no issues → success
  if (alerts.length === 0) {
    alerts.push({
      type: "success",
      message: "System operating optimally",
    });
  }

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <h2 className="text-sm text-gray-400 mb-4">Notifications</h2>

      <ul className="space-y-3 text-sm">

        {alerts.map((alert, i) => (
          <li
            key={i}
            className={
              alert.type === "warning"
                ? "text-yellow-400"
                : alert.type === "alert"
                ? "text-red-400"
                : alert.type === "info"
                ? "text-blue-400"
                : "text-green-400"
            }
          >
            {alert.type === "warning" && "⚠️ "}
            {alert.type === "alert" && "🚨 "}
            {alert.type === "info" && "ℹ️ "}
            {alert.type === "success" && "✅ "}
            {alert.message}
          </li>
        ))}

      </ul>
    </div>
  );
}