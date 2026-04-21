export default function Insights({ data }) {
  // 🔥 dummy insights (fallback)
  const dummyInsights = [
    "Adjust panel tilt to 30° for maximum efficiency this week",
    "Peak energy generation expected between 12:00–14:00",
    "Low cloud cover tomorrow may increase output by ~12%",
    "Current orientation slightly reduces morning efficiency",
  ];

  const insights = data && data.length ? data : dummyInsights;

  return (
    <div id="insights" className=" bg-white border border-gray-200 rounded-2xl p-5 shadow-sm ">
      
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Insights
      </h2>

      <ul className="space-y-3">
        {insights.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            {/* Icon */}
            <span className="text-blue-500 text-lg">💡</span>

            {/* Text */}
            <span className="text-sm text-gray-700">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}