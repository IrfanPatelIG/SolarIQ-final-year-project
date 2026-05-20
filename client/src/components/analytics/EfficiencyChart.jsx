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

const EfficiencyChart = ({ dailyEfficiency }) => {
  if (!dailyEfficiency || dailyEfficiency.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No efficiency data available</p>
      </div>
    );
  }

  const chartData = dailyEfficiency.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: Number(item.efficiencyScore).toFixed(1),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Daily Efficiency Scores</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Efficiency performance over time</p>
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
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value) => `${value}%`}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Bar
            dataKey="score"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            name="Efficiency Score"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyChart;
