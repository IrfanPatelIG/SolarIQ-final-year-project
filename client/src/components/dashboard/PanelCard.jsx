import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import Card from "./Card";

const data = [
  {
    name: "Efficiency",
    value: 92, // %
    fill: "#FACC15",
  },
];

export default function PanelCard() {
  return (
    <Card title="Panel Performance">
      <div className="w-full h-62.5 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />

            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-yellow-400">92%</p>
          <p className="text-sm text-gray-400">Efficiency</p>
        </div>
      </div>
    </Card>
  );
}