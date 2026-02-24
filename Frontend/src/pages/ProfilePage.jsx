import axios from "axios";
import { useEffect, useState } from "react";
import StatsCards from "./profile/StatsCards";
import PerformanceChart from "./profile/PerformanceChart";
import AccuracyPieChart from "./profile/AccuracyPieChart";

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

      setAnalytics(analyticsRes.data);
      setUser(userRes.data);
    };

    fetchData();
  }, []);

  if (!analytics || !user)
    return (
      <div className="text-white text-center p-10 bg-white/5 rounded-3xl">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto text-white space-y-8">

      {/* Profile Header */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>

          <div className="flex gap-4 mt-2 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">
              {user.role}
            </span>

            {user.emailVerified && (
              <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Analytics */}
      <StatsCards data={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerformanceChart data={analytics} />
        <AccuracyPieChart average={analytics.averageScore} />
      </div>

    </div>
  );
}

export default ProfilePage;