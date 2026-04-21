const PanelCard = ({
  panelArea,
  setPanelArea,
  tilt,
  setTilt,
  orientation,
  setOrientation,
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl">
      
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Panel Configuration
      </h3>

      <input
        value={panelArea}
        onChange={(e) => setPanelArea(e.target.value)}
        placeholder="Panel Area (m²)"
        className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg mb-3 outline-none transition"
      />

      <input
        value={tilt}
        onChange={(e) => setTilt(e.target.value)}
        placeholder="Tilt Angle (°)"
        className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg mb-3 outline-none transition"
      />

      <input
        value={orientation}
        onChange={(e) => setOrientation(e.target.value)}
        placeholder="Orientation (e.g. South)"
        className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg outline-none transition"
      />

    </div>
  );
};

export default PanelCard;