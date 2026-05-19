import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CloudCoverScatterPlot = ({ weatherImpact }) => {
  if (!weatherImpact || weatherImpact.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No data available</p>
      </div>
    );
  }

  const chartData = weatherImpact.map((item) => ({
    cloudCover: Number(item.cloud_cover).toFixed(1),
    energy: Number(item.energy).toFixed(2),
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Cloud Cover vs Energy</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Weather impact on solar output</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis
            type="number"
            dataKey="cloudCover"
            name="Cloud Cover (%)"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
            label={{ value: 'Cloud Cover (%)', position: 'insideBottomRight', offset: -5, style: { fontSize: '12px' } }}
          />
          <YAxis
            type="number"
            dataKey="energy"
            name="Energy (kWh)"
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
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => [value, '']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Scatter
            name="Cloud Cover vs Energy"
            data={chartData}
            fill="#f59e0b"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Insight:</span> Each dot represents a day. Points clustered to the left 
          (low cloud cover) with high energy values indicate optimal solar conditions.
        </p>
      </div>
    </div>
  );
};

export default CloudCoverScatterPlot;
