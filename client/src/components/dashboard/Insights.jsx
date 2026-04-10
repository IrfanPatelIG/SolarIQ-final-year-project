export default function Insights() {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <h2 className="text-xl text-white font-bold mb-4">Insights</h2>

      <ul className="space-y-3 text-sm text-gray-300">
        <li className="text-yellow-400">• Peak production occurs between 12–2 PM</li>
        <li className="text-green-400">• Efficiency drops when temperature exceeds 35°C</li>
        <li className="text-blue-400">• Consider panel cleaning for better output</li>
      </ul>
    </div>
  );
}