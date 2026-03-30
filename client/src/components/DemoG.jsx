import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const solarData = [
  { time: "6 AM", energy: 5, temp: 18, efficiency: 20 },
  { time: "8 AM", energy: 20, temp: 22, efficiency: 40 },
  { time: "10 AM", energy: 45, temp: 26, efficiency: 65 },
  { time: "12 PM", energy: 70, temp: 30, efficiency: 78 },
  { time: "2 PM", energy: 82, temp: 32, efficiency: 85 },
  { time: "4 PM", energy: 60, temp: 29, efficiency: 70 },
  { time: "6 PM", energy: 30, temp: 24, efficiency: 40 },
];

const DemoGraphsPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        SolarIQ Dashboard - Demo Graphs
      </h1>

      {/* Energy Production Graph */}
      <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Solar Energy Production (kWh)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={solarData}>
            <CartesianGrid opacity={0.2} />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#22d3ee"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Temperature Graph */}
      <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Panel Temperature (°C)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={solarData}>
            <CartesianGrid opacity={0.2} />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#f472b6"
              fill="#be185d50"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Efficiency Graph */}
      <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Panel Efficiency (%)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={solarData}>
            <CartesianGrid opacity={0.2} />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DemoGraphsPage;
