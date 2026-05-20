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
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="panelArea" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Panel Area (m2)
            </label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{panelArea || 0} m2</span>
          </div>
          <input
            id="panelArea"
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={panelArea}
            onChange={(e) => setPanelArea(e.target.value)}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>1 m2</span>
            <span>100 m2</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="tilt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <RotateCw size={16} /> Tilt Angle
            </label>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{tilt || 0} deg</span>
          </div>
          <input
            id="tilt"
            type="range"
            min="0"
            max="90"
            step="1"
            value={tilt}
            onChange={(e) => setTilt(e.target.value)}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>0 deg</span>
            <span>90 deg</span>
          </div>
        </div>

        <div>
          <label htmlFor="orientation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
            <Compass size={16} /> Orientation
          </label>
          <select
            id="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="">Select orientation</option>
            <option value="N">North</option>
            <option value="NE">North-East</option>
            <option value="E">East</option>
            <option value="SE">South-East</option>
            <option value="S">South</option>
            <option value="SW">South-West</option>
            <option value="W">West</option>
            <option value="NW">North-West</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PanelCard;
