import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./Card";

export default function LineChartCard() {
  const dummyData = [
    { date: "Mon", energy: 12 },
    { date: "Tue", energy: 18 },
    { date: "Wed", energy: 10 },
    { date: "Thu", energy: 22 },
    { date: "Fri", energy: 16 },
    { date: "Sat", energy: 25 },
    { date: "Sun", energy: 19 },
  ];

  return (
    <Card title="Solar Output Forecast">
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData}>
            
            {/* Gradient */}
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

            {/* Axes */}
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => `${value} kWh`}
            />

            {/* Area (Filled Line) */}
            <Area
              type="monotone"
              dataKey="energy"
              stroke="#F59E0B"
              strokeWidth={3}
              fill="url(#colorEnergy)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}