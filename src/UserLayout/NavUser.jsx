import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";
import setting from "/img/setting.png";
import bags from "/img/bags.png";
import id from "/img/ids.png";
import graph from "/img/graph.png";
import user from "/img/users.png";
import Cookies from "js-cookie";
import SignOut from "/img/sign-out.png";

export default function NavUser() {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-sky-800 w-1/7 h-screen flex flex-col">
      <div className="flex flex-col items-center justify-start p-4">
        <img src={Logo} alt="logo" className="w-2/4 mb-4" />
        <h1 className="text-white text-2xl font-bold">STAFF</h1>
      </div>

      <nav className="flex flex-col items-center text-white text-xl font-semibold">
        <div className="flex flex-col">
          <div className="flex items-center mt-8">
            <img src={user} alt="custom icon" className="w-4 h-4 mr-2" />
            <Link to="pos">Pos</Link>
          </div>
          <div className="flex items-center mt-2">
            <img src={id} alt="custom icon" className="w-4 h-4 mr-2" />
            <Link to="userReport">Report</Link>
          </div>
          <div className="flex items-center mt-2">
            <img src={graph} alt="custom icon" className="w-4 h-4 mr-2" />
            <Link to="userStock">Stock</Link>
          </div>
          <div className="flex items-center mt-14">
            <button
              onClick={handleLogout}
              className="text-white text-lg font-semibold hover:bg-sky-700  rounded flex items-center"
            >
              <img src={SignOut} alt="logout icon" className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
