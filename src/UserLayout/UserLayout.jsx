import { Outlet } from "react-router-dom";
import NavUser from "./NavUser";

export default function UserLayout() {
  return (
    <>
      <NavUser />
      <Outlet />
    </>
  );
}
