import React, { useState } from "react";
import { Link } from "react-router-dom";
import GroceryLogos from "/img/Grocery_Logos.png";
import axios from "axios";
import Cookies from "js-cookie"; // A library for working with cookies

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const [error, setError] = useState(""); // State for displaying login errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the loginData matches the fake admin account
    if (loginData.email === "admin@gmail.com" && loginData.password === "123") {
      // If it's the fake admin account, set the token in a cookie and redirect
      Cookies.set("token", "fakeAdminToken", { expires: 1 }); // Set a fake admin token with a 1-day expiration
      window.location.href = "/admin/stock"; // Redirect to the admin page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        loginData
      );

      if (response.status === 200 && response.data.token) {
        // Store the token in a secure HttpOnly cookie
        Cookies.set("token", response.data.token, { expires: 1 }); // Set the token with a 1-day expiration

        // Redirect to the user's dashboard or another protected route
        window.location.href = "/user/pos";
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login Error:", error); // Log any errors
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-700 via-sky-800 bg-sky-800 min-h-screen flex flex-col items-center justify-center">
      <div className="font-inter text-white text-center mb-16">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={GroceryLogos} alt="Logo" />
          <h1
            className="font-bold text-4xl md-text-5xl lg-text-6xl xl-text-7xl"
            style={{ fontSize: "45px", fontFamily: "Inter" }}
          >
            Mini Grocery
          </h1>
        </div>
        <h2
          className="text-xl md-text-2xl lg-text-3xl xl-text-4xl font-semibold mb-4"
          style={{ fontSize: "30px", fontFamily: "Inter" }}
        >
          Inventory Management System
        </h2>
        <form onSubmit={handleLogin} className="text-center">
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              placeholder="Email"
              style={{ fontFamily: "Inter", fontSize: "30px" }}
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-96 h-16 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              placeholder="Password"
              style={{ fontFamily: "Inter", fontSize: "30px" }}
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-96 h-16 text-black"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-white text-black rounded-full w-40 sm-w-48 md-w-60 lg-w-72 xl-w-80 h-12 text-xs sm-text-base md-text-lg lg-text-xl xl-text-2xl mt-5"
              style={{ fontFamily: "Inter", fontSize: "20px" }}
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div className="mt-4">
            <Link to="/" className="text-white">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
