import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import Card from "./Card";

// ✅ Default fallback data (only if no props passed)
const defaultData = [
  { date: "Mon", energy: 12 },
  { date: "Tue", energy: 15 },
  { date: "Wed", energy: 10 },
  { date: "Thu", energy: 18 },
  { date: "Fri", energy: 20 },
];

export default function LineChartCard({ data = defaultData }) {
  return (
    <Card title="Daily Energy Trend (kWh)">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#FACC15"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}