import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function AccuracyPieChart({ average }) {

  const correct = Math.round(average);
  const incorrect = 100 - correct;

  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: incorrect }
  ];

  return (
   <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Overall Accuracy
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none"
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AccuracyPieChart;