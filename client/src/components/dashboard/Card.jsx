export default function Card({ title, children }) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 shadow-md hover:shadow-xl transition">
      <h3 className="text-sm text-gray-400 mb-4">{title}</h3>
      {children}
    </div>
  );
}