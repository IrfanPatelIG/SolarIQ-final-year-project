import { Sun, RotateCw, Compass } from 'lucide-react';

const PanelCard = ({
  panelArea,
  setPanelArea,
  tilt,
  setTilt,
  orientation,
  setOrientation,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
          <Sun className="text-yellow-600 dark:text-yellow-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Panel Configuration</h3>
      </div>

      <div className="flex flex-col gap-6">
        {/* Panel Area with Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm text-slate-700 dark:text-slate-300">Panel Area (m²)</label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{panelArea || 0} m²</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={panelArea || 0}
            onChange={(e) => setPanelArea(e.target.value)}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1 m²</span>
            <span>100 m²</span>
          </div>
        </div>

        {/* Tilt Angle with Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm text-slate-700 dark:text-slate-300">Tilt Angle (°)</label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{tilt || 0}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="90"
            step="5"
            value={tilt || 0}
            onChange={(e) => setTilt(e.target.value)}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0° (Flat)</span>
            <span>90° (Vertical)</span>
          </div>
        </div>

        {/* Orientation with Dropdown */}
        <div>
          <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">Orientation</label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
          >
            <option value="">Select orientation</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
            <option value="South-East">South-East</option>
            <option value="South-West">South-West</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PanelCard;