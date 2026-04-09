const PanelCard = ({
  panelArea,
  setPanelArea,
  tilt,
  setTilt,
  orientation,
  setOrientation,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Panel Configuration</h3>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Panel Area (m²)
          </label>
          <input
            type="number"
            placeholder="e.g., 25"
            value={panelArea}
            onChange={(e) => setPanelArea(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Tilt Angle (°)
          </label>
          <input
            type="number"
            placeholder="e.g., 30"
            value={tilt}
            onChange={(e) => setTilt(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Orientation
          </label>
          <input
            type="text"
            placeholder="North/South"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PanelCard;