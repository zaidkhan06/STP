import { NavLink } from "react-router-dom";

function Sidebar({ closeSidebar }) {
  const linkClass =
    "block px-4 py-3 rounded-xl hover:bg-purple-600/20 transition";

  return (
    <div className="h-full w-64 p-6 bg-white/5 backdrop-blur-xl border-r border-white/10 ">

      <h2 className="text-2xl font-bold mb-8 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        StudyTrack
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          end
          className={linkClass}
          onClick={closeSidebar}
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/aptitude"
          className={linkClass}
          onClick={closeSidebar}
        >
          Aptitude
        </NavLink>

        <NavLink
          to="/dashboard/coding"
          className={linkClass}
          onClick={closeSidebar}
        >
          Coding
        </NavLink>

        <NavLink
          to="/dashboard/interviews"
          className={linkClass}
          onClick={closeSidebar}
        >
          Interviews
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;