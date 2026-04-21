export default function Card({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full">
      
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {children}

    </div>
  );
}