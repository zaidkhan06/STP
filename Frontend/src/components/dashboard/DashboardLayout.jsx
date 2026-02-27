import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white">

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-black border-r border-white/10">
            <Sidebar closeSidebar={() => setOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Right Side Layout */}
      <div className="md:ml-64">

        {/* Fixed Topbar */}
        <div className="fixed top-0 md:left-64 left-0 right-0 h-16 z-30">
          <Topbar toggleSidebar={() => setOpen(!open)} />
        </div>

        {/* Scrollable Content */}
        <main className="pt-26 min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;