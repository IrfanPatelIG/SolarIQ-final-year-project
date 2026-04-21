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

export default function PanelCard() {
  const dummyData = [
    { tilt: "10°", energy: 12 },
    { tilt: "20°", energy: 18 },
    { tilt: "30°", energy: 25 },
    { tilt: "40°", energy: 20 },
    { tilt: "50°", energy: 15 },
  ];

  // 🔥 find best tilt
  const maxEnergy = Math.max(...dummyData.map(d => d.energy));

  return (
    <Card title="Panel Performance">
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dummyData}>

            {/* Gradient */}
            <defs>
              <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#FCD34D" stopOpacity={0.5}/>
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

            {/* Axes */}
            <XAxis dataKey="tilt" stroke="#6B7280" />
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
            <Bar dataKey="energy" radius={[10, 10, 0, 0]}>
              {dummyData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.energy === maxEnergy
                      ? "#22C55E" // 🔥 best tilt = green highlight
                      : "url(#panelGradient)"
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}