import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";

export default function NavUser() {
  return (
    <div>
      <div>
        <img src={Logo} alt="logo" />
        <h1>STAFF USER</h1>
      </div>
      <nav>
        <Link to="pos">POS</Link>
        <Link to="userReport">Report</Link>
        <Link to="userStock">Stock</Link>
        <div>
          <Link to="userSetting">Setting</Link>
        </div>
      </nav>
    </div>
  );
}
