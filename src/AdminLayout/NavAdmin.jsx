import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";

export default function NavAdmin() {
  return (
    <div x>
      <div>
        <img src={Logo} alt="logo" />
        <h1>ADMIN USER</h1>
      </div>
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
