import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./Card";

export default function PredictionChart() {
  const dummyData = [
    { date: "Mon", energy: 12, cloud: 30, temp: 32 },
    { date: "Tue", energy: 18, cloud: 20, temp: 34 },
    { date: "Wed", energy: 10, cloud: 60, temp: 31 },
    { date: "Thu", energy: 22, cloud: 25, temp: 35 },
    { date: "Fri", energy: 16, cloud: 40, temp: 33 },
    { date: "Sat", energy: 25, cloud: 10, temp: 36 },
    { date: "Sun", energy: 19, cloud: 35, temp: 34 },
  ];

  return (
    <Card title="Weather Impact on Energy">
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData}>

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
              }}
              formatter={(value, name) => {
                if (name === "energy") return [`${value} kWh`, "Energy"];
                if (name === "cloud") return [`${value}%`, "Cloud"];
                if (name === "temp") return [`${value}°C`, "Temp"];
                return value;
              }}
            />

            {/* Legend */}
            <Legend />

            {/* Lines */}
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="cloud"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}