import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 600 },
  { name: "Wed", value: 800 },
  { name: "Thu", value: 500 },
  { name: "Fri", value: 900 },
];

export default function LineChartCard() {
  return (
    <Card title="Solar Output (kWh)">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FACC15"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}