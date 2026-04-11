export default function Insights({ data = [] }) {
  
  if (!data.length) {
    return (
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
        <h2 className="text-xl text-white font-bold mb-4">Insights</h2>
        <p className="text-gray-400 text-sm">No data available</p>
      </div>
    );
  }

  // 🔥 Logic
  const maxEnergyDay = data.reduce((prev, curr) =>
    curr.energy > prev.energy ? curr : prev
  );

  const highTemp = data.some(d => d.temp > 35);
  const lowEnergyDays = data.filter(d => d.energy < 12);

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <h2 className="text-xl text-white font-bold mb-4">Insights</h2>

      <ul className="space-y-3 text-sm text-gray-300">

        {/* Peak Production */}
        <li className="text-yellow-400">
          • Peak production on {maxEnergyDay.date} ({maxEnergyDay.energy} kWh)
        </li>

        {/* Temperature Warning */}
        {highTemp && (
          <li className="text-green-400">
            • Efficiency may drop due to high temperature ( 35°C)
          </li>
        )}

        {/* Low Energy */}
        {lowEnergyDays.length > 0 && (
          <li className="text-blue-400">
            • Low output detected on {lowEnergyDays.map(d => d.date).join(", ")}
          </li>
        )}

      </ul>
    </div>
  );
}