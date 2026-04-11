import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

// ✅ Default fallback data (weekly distribution)
const defaultData = [
  { date: "Mon", energy: 12 },
  { date: "Tue", energy: 15 },
  { date: "Wed", energy: 10 },
  { date: "Thu", energy: 18 },
  { date: "Fri", energy: 20 },
  { date: "Sat", energy: 22 },
  { date: "Sun", energy: 17 },
];

export default function BarChartCard({ data = defaultData }) {
  return (
    <Card title="Weekly Energy Distribution">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="energy"
            fill="#38BDF8"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}