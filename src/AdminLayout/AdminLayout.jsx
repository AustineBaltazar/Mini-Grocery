import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <div>hello this is nav!</div>
      <Outlet />
    </>
  );
}
