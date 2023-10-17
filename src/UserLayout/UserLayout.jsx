import { Outlet } from "react-router-dom";
import NavAdmin from "./NavUser";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = "1/7"; // Set the width of the sidebar

  return (
    <div className="relative flex bg-gray-200">
      <button
        onClick={toggleSidebar}
        className={`fixed bottom-2 left-2 p-2 rounded bg-gray-800 text-white  ${
          isSidebarOpen ? "transform translate-x-full" : ""
        }`}
      >
        >
      </button>

      <div
        className={`bg-sky-800 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "" : "hidden md:block"
        }`}
        style={{
          width: isSidebarOpen ? sidebarWidth : 0,
          minWidth: isSidebarOpen ? "14rem" : 0, // Optional: Set a minimum width when the sidebar is open
        }}
      >
        {isSidebarOpen && <NavAdmin />}
      </div>

      <div
        className={`${
          isSidebarOpen ? `md:ml-${sidebarWidth}` : ""
        } w-full overflow-y-auto transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: isSidebarOpen ? sidebarWidth : 0,
        }}
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
