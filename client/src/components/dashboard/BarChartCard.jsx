import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

const data = [
  { name: "Home", value: 300 },
  { name: "Battery", value: 200 },
  { name: "Grid", value: 400 },
];

export default function BarChartCard() {
  return (
    <Card title="Energy Distribution">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <Tooltip />
          <Bar dataKey="value" fill="#38BDF8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}