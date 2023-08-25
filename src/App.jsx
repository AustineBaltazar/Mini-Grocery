import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./FormPage/Register";
import LoginForm from "./FormPage/Login";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";
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
  const monthlySalesData = "Monthly sales data here";
  const todaysReportData = "Today's report data here";
  const gridData = [
    { label: "TOTAL CUSTOMER" },
    { label: "TOTAL SUPPLIER" },
    { label: "TOTAL PRODUCT" },
    { label: "ADD PRODUCT" },
    { label: "SALES REPORT" },
    { label: "STACK REPORT" },
    { label: "PURCHASE REPORT" },
    { label: "TODAY'S REPORT" },
  ];

  const stockItems = ["ITEM 1", "ITEM 2", "ITEM 3", "ITEM 4"];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="supplier" element={<Supplier />} />
          <Route path="staff" element={<Staff />} />

          <Route
            path="report"
            element={
              <Report
                monthlySales={monthlySalesData}
                todaysReport={todaysReportData}
                data={gridData}
              />
            }
          />

          <Route path="stock" element={<Stock stockItems={stockItems} />} />
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
