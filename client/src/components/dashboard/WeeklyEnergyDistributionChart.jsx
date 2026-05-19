import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const WeeklyEnergyDistributionChart = ({ distribution }) => {
  if (!distribution || distribution.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400">No distribution data available</p>
      </div>
    );
  }

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const chartData = dayOrder.map((day) => {
    const dayData = distribution.find((d) => d.day === day);
    return {
      day: day.substring(0, 3),
      energy: dayData ? Number(dayData.energy || dayData.predicted_energy_kwh || 0).toFixed(2) : 0,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Weekly Energy Distribution</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Energy generation consistency by weekday</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={chartData} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
          <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <PolarAngleAxis
            dataKey="day"
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 'dataMax']}
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Energy (kWh)', position: 'insideTop', style: { fontSize: '12px' } }}
          />
          <Radar
            name="Energy"
            dataKey="energy"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyEnergyDistributionChart;
