import { Menu, ChevronDown, LogOut, User } from "lucide-react";
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
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-xl z-100">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="relative" ref={dropdownRef}>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-sm font-bold">
            {user.charAt(0)}
          </div>

          <span className="hidden sm:block text-sm">{user}</span>

          <ChevronDown size={16} />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-black border border-white/10 rounded-xl shadow-lg backdrop-blur-xl overflow-hidden z-100">

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
  );
}

export default Topbar;