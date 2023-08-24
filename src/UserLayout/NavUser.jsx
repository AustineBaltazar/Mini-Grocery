import { Link } from "react-router-dom";

export default function NavUser() {
  return (
    <div className="sideNav">
      <img src="" alt="logo" />
      <h1>STAFF USER</h1>
      <nav>
        <Link to="pos">POS</Link>
        <Link to="userReport">Report</Link>
        <Link to="userStock">Stock</Link>
        <Link to="userSetting">Setting</Link>
      </nav>
    </div>
  );
}
