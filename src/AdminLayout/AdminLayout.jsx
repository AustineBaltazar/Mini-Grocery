import { Outlet } from "react-router-dom";
import NavAdmin from "./NavAdmin";

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-200">
      <NavAdmin className="bg-black-100 pointer-events-none" />
      <div className="flex-grow w-full max-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
