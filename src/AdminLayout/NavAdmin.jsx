import { Link } from "react-router-dom";

export default function NavAdmin() {
  return (
    <div className="sideNav">
      <img src="" alt="logo" />
      <h1>ADMIN USER</h1>
      <nav>
        <Link to="supplier">Supplier</Link>
        <Link to="staff">Staff</Link>
        <Link to="report">Report</Link>
        <Link to="stock">Stock</Link>
        <Link to="role">Role Permission</Link>
        <Link to="setting">Settings</Link>
      </nav>
    </div>
  );
}
