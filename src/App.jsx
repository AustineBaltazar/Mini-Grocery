import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./FormPage/Register";
import LoginForm from "./FormPage/Login";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import Supplier from "./AdminPage/Supplier";
import Stock from "./AdminPage/Stock";
import Staff from "./AdminPage/Staff";
import Setting from "./AdminPage/Settings";
import Role from "./AdminPage/Role";
import Report from "./AdminPage/Report";
import Pos from "./UserPage/Pos";
import UserReport from "./UserPage/UserReport";
import UserStock from "./UserPage/UserStock";
import UserSetting from "./UserPage/UserSetting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Use ProtectedRoute to secure admin and user routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="supplier" element={<Supplier />} />
          <Route path="staff" element={<Staff />} />
          <Route path="report" element={<Report />} />
          <Route path="stock" element={<Stock />} />
          <Route path="role" element={<Role />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route path="pos" element={<Pos />} />
          <Route path="userReport" element={<UserReport />} />
          <Route path="userStock" element={<UserStock />} />
          <Route path="userSetting" element={<UserSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
