import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import Card from "./Card";

export default function BarChartCard() {
  const dummyData = [
    { day: "Mon", avg_energy: 12 },
    { day: "Tue", avg_energy: 18 },
    { day: "Wed", avg_energy: 10 },
    { day: "Thu", avg_energy: 22 },
    { day: "Fri", avg_energy: 16 },
    { day: "Sat", avg_energy: 25 },
    { day: "Sun", avg_energy: 19 },
  ];

  // 🌈 Color palette
  const colors = [
    "#60A5FA", // blue
    "#34D399", // green
    "#FBBF24", // yellow
    "#F87171", // red
    "#A78BFA", // purple
    "#22D3EE", // cyan
    "#FB7185", // pink
  ];

  return (
    <Card title="Weekly Energy Distribution">
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyData}>

            {/* Grid */}
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

            {/* Axes */}
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              formatter={(value) => `${value} kWh`}
            />

            {/* Bars */}
            <Bar dataKey="avg_energy" radius={[10, 10, 0, 0]}>
              {dummyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}