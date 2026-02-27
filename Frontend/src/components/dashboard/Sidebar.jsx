import { NavLink } from "react-router-dom";
import { LayoutDashboard, Target, Code2, MessageCircle, HeartHandshake } from "lucide-react";

function Sidebar({ closeSidebar }) {
  const baseLinkClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition";

  const getLinkClass = ({ isActive }) =>
    [
      baseLinkClass,
      isActive
        ? "bg-purple-600/25 text-white border border-purple-500/40 shadow-[0_0_18px_rgba(168,85,247,0.4)]"
        : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent",
    ].join(" ");

  return (
    <div className="h-full w-64 p-6 bg-gradient-to-b from-black/70 via-[#050816] to-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col">

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            StudyTrack
          </h2>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300">
            Beta
          </span>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={getLinkClass}
            onClick={closeSidebar}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/dashboard/aptitude"
            className={getLinkClass}
            onClick={closeSidebar}
          >
            <Target size={18} />
            <span>Aptitude</span>
          </NavLink>

          <NavLink
            to="/dashboard/coding"
            className={getLinkClass}
            onClick={closeSidebar}
          >
            <Code2 size={18} />
            <span>Coding</span>
          </NavLink>

          <NavLink
            to="/dashboard/interviews"
            className={getLinkClass}
            onClick={closeSidebar}
          >
            <MessageCircle size={18} />
            <span>Interviews</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <NavLink
          to="/dashboard/support"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 transition text-sm text-purple-100 border border-purple-500/40"
          onClick={closeSidebar}
        >
          <HeartHandshake size={18} />
          <span>Support StudyTrack</span>
        </NavLink>
      </div>

    </div>
  );
}

export default Sidebar;