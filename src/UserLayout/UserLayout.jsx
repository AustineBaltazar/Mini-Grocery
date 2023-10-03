import { Outlet } from "react-router-dom";
import NavUser from "./NavUser";

export default function UserLayout() {
  return (
    <>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden bg-gray-200">
        <NavUser className="bg-black-100" />
        <Outlet />
      </div>
    </>
  );
}
