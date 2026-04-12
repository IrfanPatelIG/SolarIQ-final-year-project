import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

export default function BarChartCard({ data = [] }) {
  return (
    <Card title="Weekly Energy Distribution">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="avg_energy"
              fill="#38BDF8"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}