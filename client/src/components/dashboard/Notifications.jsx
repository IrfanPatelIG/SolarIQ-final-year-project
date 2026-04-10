export default function Notifications() {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <h2 className="text-sm text-gray-400 mb-4">Notifications</h2>

      <ul className="space-y-3 text-sm">
        <li className="text-yellow-400">⚠️ High panel temperature detected</li>
        <li className="text-green-400">✅ System operating normally</li>
        <li className="text-blue-400">🔄 Data synced successfully</li>
      </ul>
    </div>
  );
}