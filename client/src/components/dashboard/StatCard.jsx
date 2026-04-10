export default function StatCard({ title, value, unit }) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">
        {value} <span className="text-sm text-gray-400">{unit}</span>
      </h2>
    </div>
  );
}