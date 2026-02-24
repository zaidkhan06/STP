function StatsCards({ data }) {
  const stats = [
    { label: "Total Attempts", value: data.totalAttempts },
    { label: "Best Score", value: `${data.bestScore}%` },
    { label: "Average Score", value: `${data.averageScore}%` },
    { label: "Avg Duration", value: `${data.averageDuration}s` }
  ];
  console.log(data.bestScore);
  console.log(data.averageScore);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
          <p className="text-sm text-gray-400">{stat.label}</p>
          <h3 className="text-2xl font-bold mt-2 text-purple-400">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;