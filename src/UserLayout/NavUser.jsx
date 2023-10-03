import { Link } from "react-router-dom";
import Logo from "/img/Grocery_Logos.png";
import setting from "/img/setting.png";
import bags from "/img/bags.png";
import id from "/img/ids.png";
import graph from "/img/graph.png";
import user from "/img/users.png"; // Import your custom icon

export default function NavAdmin() {
  return (
    <div className="bg-sky-800 w-1/7 h-screen flex flex-col">
      <div className="flex flex-col items-center justify-start p-4">
        <img src={Logo} alt="logo" className="w-2/4 mb-4" />
        <h1 className="text-white text-2xl font-bold">STAFF PANEL</h1>
      </div>

      <nav className="flex flex-col items-center text-white text-xl font-semibold">
        <div className="flex flex-col">
          <div className="flex items-center mt-2">
            <img src={id} alt="custom icon" className="w-4 h-4 mr-2" />

            <Link to="pos">Pos</Link>
          </div>
          <div className="flex items-center mt-2">
            <img src={graph} alt="custom icon" className="w-4 h-4 mr-2" />

            <Link to="userReport">Report</Link>
          </div>
          <div className="flex items-center mt-2">
            <img src={bags} alt="custom icon" className="w-4 h-4 mr-2" />

            <Link to="userStock">Stock</Link>
          </div>
        </div>
      </nav>

      <div className="mt-auto mb-20 text-xl text-white font-bold">
        <nav className="flex flex-col items-center">
          <div className="flex flex-col">
            <div className="flex items-center mt-2">
              <img src={setting} alt="custom icon" className="w-4 h-4 mr-2" />
              <Link to="userSetting">Settings</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
