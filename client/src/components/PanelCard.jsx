const PanelCard = ({ panelArea, setPanelArea, tilt, setTilt, orientation, setOrientation }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">

      <h3 className="text-xl font-semibold mb-4">Panel Configuration</h3>

      <input
        value={panelArea}
        onChange={(e) => setPanelArea(e.target.value)}
        placeholder="Panel Area (m²)"
        className="w-full bg-white/10 p-3 rounded-lg mb-3"
      />

      <input
        value={tilt}
        onChange={(e) => setTilt(e.target.value)}
        placeholder="Tilt Angle"
        className="w-full bg-white/10 p-3 rounded-lg mb-3"
      />

      <input
        value={orientation}
        onChange={(e) => setOrientation(e.target.value)}
        placeholder="Orientation"
        className="w-full bg-white/10 p-3 rounded-lg"
      />

    </div>
  );
};

export default PanelCard;