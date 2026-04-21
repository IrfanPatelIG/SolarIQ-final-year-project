export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-sm text-gray-600">Solar system overview</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold">
          Add System
        </button>
      </div>
    </div>
  );
}