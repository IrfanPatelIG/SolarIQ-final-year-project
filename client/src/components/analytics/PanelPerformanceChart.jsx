import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PanelPerformanceChart = ({ panelPerformance, selectedPanelId }) => {
  if (!panelPerformance || panelPerformance.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No panel performance data available</p>
      </div>
    );
  }

  // Sort panels by average energy and create chart data
  const sortedData = [...panelPerformance]
    .sort((a, b) => Number(b.avg_energy) - Number(a.avg_energy))
    .map((panel) => ({
      name: `Panel ${panel.panel_id}`,
      panelId: panel.panel_id,
      avgEnergy: Number(panel.avg_energy).toFixed(2),
      tilt: panel.tilt,
      orientation: panel.orientation,
    }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Panel Performance Comparison</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Average energy generation per panel</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            type="number"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Avg Energy (kWh)', position: 'insideBottomRight', offset: -5, style: { fontSize: '12px' } }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={90}
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value, name) => {
              if (name === 'avgEnergy') return `${value} kWh`;
              return value;
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Bar
            dataKey="avgEnergy"
            fill="#8b5cf6"
            radius={[0, 8, 8, 0]}
            name="Avg Energy (kWh)"
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Panel Details Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left px-4 py-2 font-semibold text-slate-900 dark:text-slate-100">Panel</th>
              <th className="text-right px-4 py-2 font-semibold text-slate-900 dark:text-slate-100">Avg Energy</th>
              <th className="text-right px-4 py-2 font-semibold text-slate-900 dark:text-slate-100">Tilt</th>
              <th className="text-right px-4 py-2 font-semibold text-slate-900 dark:text-slate-100">Orientation</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((panel) => (
              <tr
                key={panel.panelId}
                className={`border-b border-slate-100 dark:border-slate-800 ${
                  panel.panelId === selectedPanelId
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100 font-medium">
                  Panel {panel.panelId}
                  {panel.panelId === selectedPanelId && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Selected</span>
                  )}
                </td>
                <td className="text-right px-4 py-3 text-slate-700 dark:text-slate-300">{panel.avgEnergy} kWh</td>
                <td className="text-right px-4 py-3 text-slate-700 dark:text-slate-300">{panel.tilt}°</td>
                <td className="text-right px-4 py-3 text-slate-700 dark:text-slate-300">{panel.orientation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelPerformanceChart;
