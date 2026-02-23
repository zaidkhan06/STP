
import Sidebar from "./SideBar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 flex-1 bg-gradient-to-br from-black via-gray-900 to-black">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default DashboardLayout;