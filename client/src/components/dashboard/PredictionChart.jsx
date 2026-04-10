import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

const data = [
  { name: "Now", value: 400 },
  { name: "1h", value: 600 },
  { name: "2h", value: 750 },
  { name: "3h", value: 900 },
];

export default function PredictionChart() {
  return (
    <Card title="Predicted Output">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#FACC15"
            fill="#FACC15"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}