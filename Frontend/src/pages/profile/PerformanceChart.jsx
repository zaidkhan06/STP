import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PerformanceChart({ data }) {

  const formattedData = data.performanceTrend.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    })
  }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Performance Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            tick={{ fill: "#aaa", fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: "#aaa", fontSize: 12 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#C27AFF"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;