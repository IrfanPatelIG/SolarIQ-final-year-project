export default function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-400 mt-1">{sub}</p>

    </div>
  );
}