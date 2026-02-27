import axios from "axios";
import { useEffect, useState } from "react";
import StatsCards from "./profile/StatsCards";
import PerformanceChart from "./profile/PerformanceChart";
import AccuracyPieChart from "./profile/AccuracyPieChart";
import CodingProgressChart from "./profile/CodingProgressChart";

function ProfilePage() {
  const [analytics, setAnalytics] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [analyticsRes, userRes] = await Promise.all([
        axios.get(
          "http://localhost:5000/api/aptitude/profile-analytics",
          { withCredentials: true }
        ),
        axios.get(
          "http://localhost:5000/api/aptitude/profile",
          { withCredentials: true }
        )
      ]);
      console.log(analyticsRes);

      console.log(analytics);
      setAnalytics(analyticsRes.data);
      setUser(userRes.data);
    };

    fetchData();
  }, []);
  console.log(analytics);

  if (!analytics || !user)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-center px-8 py-6 bg-white/5 border border-white/10 rounded-3xl shadow-xl">
          <p className="text-lg font-semibold">Loading your profile...</p>
          <p className="text-sm text-gray-400 mt-1">
            Fetching your performance analytics and account details.
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto text-white space-y-8">
      {/* Page title */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Overview
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Your aptitude and coding performance summary in one place.
          </p>
        </div>
        <div className="flex gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Role: <span className="font-medium">{user.role}</span>
          </span>
          {user.emailVerified && (
            <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 border border-green-500/40">
              Email Verified
            </span>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-[0_0_40px_rgba(15,23,42,0.7)]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg">
          {user.name.charAt(0)}
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              {user.name}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {user.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm mt-2">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
              Aspirant Level:{" "}
              <span className="font-medium">
                {analytics.level || "Not rated"}
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-200 border border-purple-500/40">
              Overall Accuracy:{" "}
              <span className="font-semibold">
                {analytics.averageScore.toFixed(0)}%
              </span>
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-200 border border-blue-500/40">
               Attemptes: 
              <span className="font-semibold"> {analytics?.totalAttempts}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Analytics cards row */}
      <StatsCards data={analytics} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PerformanceChart data={analytics} />
        <AccuracyPieChart average={analytics.averageScore} />
        <CodingProgressChart
          solved={analytics.totalSolvedQuestions}
          total={analytics.totalCodingQuestions}
        />
      </div>
    </div>
  );
}

export default ProfilePage;


