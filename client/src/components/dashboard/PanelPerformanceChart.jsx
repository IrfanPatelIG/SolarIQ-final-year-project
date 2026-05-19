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

  const chartData = panelPerformance.map((panel) => ({
    panelId: `Panel #${panel.panel_id}`,
    avgEnergy: Number(panel.avg_energy || panel.avgEnergy || 0).toFixed(2),
    isSelected: Number(panel.panel_id) === Number(selectedPanelId),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Panel Performance Comparison</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Average energy per panel comparison</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            type="number"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Avg Energy (kWh)', position: 'insideBottom', style: { fontSize: '12px' } }}
          />
          <YAxis
            type="category"
            dataKey="panelId"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value) => `${value} kWh`}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Bar
            dataKey="avgEnergy"
            fill={(entry) => entry.isSelected ? '#3b82f6' : '#94a3b8'}
            radius={[0, 4, 4, 0]}
            name="Avg Energy (kWh)"
          >
            {chartData.map((entry, index) => (
              <rect
                key={`bar-${index}`}
                fill={entry.isSelected ? '#3b82f6' : '#94a3b8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PanelPerformanceChart;
