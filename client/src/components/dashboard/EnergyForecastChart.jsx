import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const EnergyForecastChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No forecast data available</p>
      </div>
    );
  }

  const chartData = forecast.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    energy: Number(item.energy).toFixed(2),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Energy Forecast</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Daily predicted energy generation trend</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
            label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
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
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
            name="Predicted Energy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyForecastChart;
