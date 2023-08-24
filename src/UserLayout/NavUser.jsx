import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";

export default function NavUser() {
  return (
    <div
      className="bg-sky-900 text-white w-60 h-screen flex flex-col fixed top-0 left-0 overflow-y-auto"
      style={{ fontFamily: "Poppins" }}
    >
      <div className="p-4 text-center">
        <img
          src={Logo} // Make sure to provide a valid image source
          alt="logo"
          className="w-22 h-24 rounded-full mb-2 mx-auto"
        />
        <h1 className="text-xl font-bold">STAFF USER</h1>
      </div>
      <nav className="mt-20 ml-8">
        <Link to="pos" className="block py-2">
          POS
        </Link>
        <Link to="userReport" className="block py-2">
          Report
        </Link>
        <Link to="userStock" className="block py-2">
          Stock
        </Link>
        <div className="mt-96">
          <Link to="userSetting" className="block py-2">
            Setting
          </Link>
        </div>
      </nav>
    </div>
  );
}
