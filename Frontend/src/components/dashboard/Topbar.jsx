import axios from "axios";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;