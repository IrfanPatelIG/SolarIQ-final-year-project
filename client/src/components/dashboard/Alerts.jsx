export default function Alerts({ data = [] }) {
  if (!data.length) {
    return (
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
        <h2 className="text-lg font-bold mb-4">Alerts</h2>
        <p className="text-gray-500 text-sm">No alerts</p>
      </div>
    );
  }

  const alerts = [];

  // High temp
  if (data.some(d => d.temp > 35)) {
    alerts.push({
      type: "warning",
      message: "High panel temperature (>35°C)",
    });
  }

  // Low energy
  const lowEnergy = data.filter(d => d.energy < 12);
  if (lowEnergy.length > 0) {
    alerts.push({
      type: "critical",
      message: `Low production on ${lowEnergy.map(d => d.date).join(", ")}`,
    });
  }

  // Cloud issue
  if (data.some(d => d.cloud > 60)) {
    alerts.push({
      type: "info",
      message: "Heavy cloud cover reducing output",
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "success",
      message: "All systems operating optimally",
    });
  }

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <h2 className="text-lg font-bold mb-4">Alerts</h2>

      <ul className="space-y-3 text-sm">
        {alerts.map((alert, i) => (
          <li
            key={i}
            className={
              alert.type === "critical"
                ? "text-red-400"
                : alert.type === "warning"
                ? "text-yellow-400"
                : alert.type === "info"
                ? "text-blue-400"
                : "text-green-400"
            }
          >
            {alert.type === "critical" && "🚨 "}
            {alert.type === "warning" && "⚠️ "}
            {alert.type === "info" && "ℹ️ "}
            {alert.type === "success" && "✅ "}
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}