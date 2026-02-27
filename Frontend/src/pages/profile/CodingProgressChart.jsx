import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CodingProgressChart({ solved = 0, total = 0 }) {
  const remaining = Math.max(total - solved, 0);
  const completion =
    total === 0 ? 0 : Math.round((solved / total) * 100);

  const data = [
    { name: "Solved", value: solved },
    { name: "Remaining", value: remaining }
  ];

  const COLORS = ["#a855f7", "#1f2937"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-lg text-sm">
          <p className="text-white font-medium">
            {payload[0].name}
          </p>
          <p className="text-purple-400">
            {payload[0].value} Questions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative">

      <h3 className="text-lg font-semibold mb-6">
        Coding Progress
      </h3>

      <div className="h-72 relative">

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-purple-400">
            {completion}%
          </p>
          <p className="text-sm text-gray-400">
            Completed
          </p>
        </div>

      </div>

      {/* Bottom Stats */}
      <div className="flex justify-between mt-6 text-sm">

        <div>
          <p className="text-gray-400">Solved</p>
          <p className="text-purple-400 font-semibold">
            {solved}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Remaining</p>
          <p className="text-gray-300 font-semibold">
            {remaining}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Total</p>
          <p className="text-white font-semibold">
            {total}
          </p>
        </div>

      </div>

    </div>
  );
}

export default CodingProgressChart;