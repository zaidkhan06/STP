import { Menu, ChevronDown, LogOut, User, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Topbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const dropdownRef = useRef();


  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  const fetchUser = async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/aptitude/profile",
        { withCredentials: true }
      )
      setUser(data.data.name);
      console.log(data.data.name);

    } catch (error) {
      console.log(error);       
    }
  }
  useEffect(()=>{
    fetchUser();
  }, [])
  
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="right-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-gradient-to-r from-black/60 via-[#050816]/80 to-black/60 backdrop-blur-xl z-[100]">
      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold">
            Dashboard
          </h1>
          <p className="hidden sm:block text-xs text-gray-400">
            Track your preparation and progress in one place.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification pill (placeholder) */}
        <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition">
          <Bell size={16} />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white/5 px-3 sm:px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
              {user.charAt(0)}
            </div>

            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm leading-tight">{user}</span>
              <span className="text-[10px] text-gray-400">
                Logged in
              </span>
            </div>

            <ChevronDown size={16} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-black/95 border border-white/10 rounded-xl shadow-lg backdrop-blur-xl overflow-hidden z-[120]">
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-purple-600/20 transition"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-red-600/20 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;