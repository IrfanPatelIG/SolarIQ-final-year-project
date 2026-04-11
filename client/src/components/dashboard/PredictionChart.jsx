import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "./Card";

// ✅ Default fallback data
const defaultData = [
  { date: "Mon", energy: 12, cloud: 30 },
  { date: "Tue", energy: 15, cloud: 20 },
  { date: "Wed", energy: 10, cloud: 60 },
  { date: "Thu", energy: 18, cloud: 10 },
  { date: "Fri", energy: 20, cloud: 5 },
];

export default function PredictionChart({ data = defaultData }) {
  return (
    <Card title="Weather Impact on Energy">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* ⚡ Energy Line */}
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#FACC15"
            strokeWidth={3}
            dot={false}
          />

          {/* ☁️ Cloud Cover Line */}
          <Line
            type="monotone"
            dataKey="cloud"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}