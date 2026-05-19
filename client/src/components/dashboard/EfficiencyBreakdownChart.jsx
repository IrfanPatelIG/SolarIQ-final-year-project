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

const EfficiencyBreakdownChart = ({ efficiencyData }) => {
  if (!efficiencyData || efficiencyData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No efficiency breakdown data available</p>
      </div>
    );
  }

  const chartData = efficiencyData.map((item) => {
    const breakdown = item.breakdown || {};
    return {
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      energyScore: Number(breakdown.energyScore || breakdown.energy || 0).toFixed(1),
      weatherScore: Number(breakdown.weatherScore || breakdown.weather || 0).toFixed(1),
      panelScore: Number(breakdown.panelScore || breakdown.panel || 0).toFixed(1),
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Efficiency Breakdown</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Daily efficiency scores breakdown by category</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value) => `${value}`}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Bar dataKey="energyScore" stackId="a" fill="#3b82f6" name="Energy Score" radius={[0, 0, 4, 4]} />
          <Bar dataKey="weatherScore" stackId="a" fill="#f59e0b" name="Weather Score" />
          <Bar dataKey="panelScore" stackId="a" fill="#10b981" name="Panel Score" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyBreakdownChart;
