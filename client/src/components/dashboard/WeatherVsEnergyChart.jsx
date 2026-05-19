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

const WeatherVsEnergyChart = ({ weatherImpact }) => {
  if (!weatherImpact || weatherImpact.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No weather impact data available</p>
      </div>
    );
  }

  const chartData = weatherImpact.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    energy: Number(item.energy).toFixed(2),
    temperature: Number(item.temperature).toFixed(1),
    cloudCover: Number(item.cloud_cover).toFixed(1),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Weather vs Energy</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Correlation between weather conditions and energy output</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Temp (°C) / Cloud (%)', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value, name) => {
              if (name === 'energy') return `${value} kWh`;
              if (name === 'temperature') return `${value} °C`;
              if (name === 'cloudCover') return `${value} %`;
              return value;
            }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="energy"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Energy (kWh)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="temperature"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Temperature (°C)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cloudCover"
            stroke="#6b7280"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Cloud Cover (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherVsEnergyChart;
