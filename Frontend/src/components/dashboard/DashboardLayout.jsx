import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-black border-r border-white/10">
            <Sidebar closeSidebar={() => setOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">

        <Topbar toggleSidebar={() => setOpen(!open)} />

        <main className="flex-1 p-6 bg-gradient-to-br from-black via-gray-900 to-black">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;