export default function Alerts({ data }) {
  const dummyAlerts = [
    "Cloud cover expected to reduce output by 18%",
    "Panel tilt may not be optimal for current season",
    "Peak production expected between 12:00–14:00",
    "Temperature rise may slightly impact efficiency",
  ];

  const alerts = data && data.length ? data : dummyAlerts;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full w-full flex flex-col">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Alerts
      </h2>

      {/* Content */}
      <ul className="space-y-3 flex-1">
        {alerts.map((message, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 w-full"
          >
            <span className="text-yellow-500 text-lg">⚠️</span>

            <span className="text-sm text-gray-700 leading-relaxed">
              {message}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}