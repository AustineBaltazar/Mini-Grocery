import { Outlet } from "react-router-dom";
import NavAdmin from "./NavAdmin";

export default function AdminLayout() {
  return (
    <>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
        <NavAdmin className="bg-black-100" />
        <Outlet />
      </div>
    </>
  );
}
