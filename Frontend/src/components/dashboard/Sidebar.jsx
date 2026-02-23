import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle =
    "block px-4 py-3 rounded-xl hover:bg-purple-600/20 transition";

  return (
    <div className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">

      <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        StudyTrack
      </h2>

      <nav className="space-y-3">
        <NavLink to="/dashboard" end className={linkStyle}>
          Overview
        </NavLink>

        <NavLink to="/dashboard/aptitude" className={linkStyle}>
          Aptitude
        </NavLink>

        <NavLink to="/dashboard/coding" className={linkStyle}>
          Coding
        </NavLink>

        <NavLink to="/dashboard/interviews" className={linkStyle}>
          Interviews
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;