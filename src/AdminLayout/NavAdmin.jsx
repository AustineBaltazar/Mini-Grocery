import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";

export default function NavAdmin() {
  return (
    <div
      className="bg-sky-900 text-white w-60 h-screen flex flex-col fixed top-0 left-0 overflow-y-auto"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="p-4 text-center">
        <img
          src={Logo}
          alt="logo"
          className="w-22 h-24 rounded-full mb-2 mx-auto"
        />
        <h1 className="text-xl font-bold">ADMIN USER</h1>
      </div>
      <nav className="mt-20 ml-8">
        <Link to="supplier" className="block py-2">
          Supplier
        </Link>
        <Link to="staff" className="block py-2">
          Staff
        </Link>
        <Link to="report" className="block py-2">
          Report
        </Link>
        <Link to="stock" className="block py-2">
          Stock
        </Link>
        <div className="mt-96 ">
          <Link to="role" className="block py-2">
            Role Permission
          </Link>
          <Link to="setting" className="block py-2">
            Settings
          </Link>
        </div>
      </nav>
    </div>
  );
}
