import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CloudCoverVsEnergyChart = ({ weatherImpact }) => {
  if (!weatherImpact || weatherImpact.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No weather impact data available</p>
      </div>
    );
  }

  const chartData = weatherImpact.map((item) => ({
    cloudCover: Number(item.cloud_cover || 0).toFixed(1),
    energy: Number(item.energy || item.predicted_energy_kwh || 0).toFixed(2),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Cloud Cover vs Energy</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Weather impact on selected panel output</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            type="number"
            dataKey="cloudCover"
            name="Cloud Cover"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Cloud Cover (%)', position: 'insideBottom', style: { fontSize: '12px' } }}
          />
          <YAxis
            type="number"
            dataKey="energy"
            name="Energy"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value, name) => {
              if (name === 'Cloud Cover') return `${value}%`;
              if (name === 'Energy') return `${value} kWh`;
              return value;
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Scatter
            data={chartData}
            fill="#3b82f6"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CloudCoverVsEnergyChart;
