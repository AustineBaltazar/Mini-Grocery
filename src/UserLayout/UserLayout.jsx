import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <div>Hello this is NAV!</div>
      <Outlet />
    </>
  );
}
