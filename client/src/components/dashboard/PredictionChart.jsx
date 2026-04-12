import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

export default function PredictionChart({ data = [] }) {
  return (
    <Card title="Weather Impact on Energy">
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line dataKey="energy" stroke="#FACC15" strokeWidth={3} dot={false} />
            <Line dataKey="cloud" stroke="#60A5FA" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}