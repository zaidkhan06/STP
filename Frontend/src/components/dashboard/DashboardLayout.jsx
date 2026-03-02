import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
        <Sidebar />
      </div>

      {/* Mobile Drawer (Always Mounted for Animation) */}
      <div
        className={`
          fixed inset-0 z-50 flex md:hidden
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Sliding Sidebar */}
        <div
          className={`
            w-64 bg-black border-r border-white/10
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar closeSidebar={() => setOpen(false)} />
        </div>

        {/* Overlay */}
        <div
          className="flex-1 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Right Content */}
      <div className="md:ml-64">

        {/* Topbar */}
        <div className="fixed top-0 md:left-64 left-0 right-0 h-16 z-30">
          <Topbar toggleSidebar={() => setOpen(true)} />
        </div>

        {/* Page Content */}
        <main className="pt-20 min-h-screen p-6 bg-linear-to-br from-black via-gray-900 to-black">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;