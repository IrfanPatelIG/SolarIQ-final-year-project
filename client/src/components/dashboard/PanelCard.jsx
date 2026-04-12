import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

export default function PanelCard({ data = [] }) {
  return (
    <Card title="Panel Performance">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="tilt" stroke="#9CA3AF" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="energy"
              fill="#FACC15"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}