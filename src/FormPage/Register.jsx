import React, { useState } from "react";
import { Link } from "react-router-dom";
import GroceryLogos from "/img/Grocery_Logos.png";
import axios from "axios";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here (e.g., check if fields are not empty, passwords match, etc.)
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make an HTTP POST request to your API to register the user
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          formData
        );

        console.log("Registration successful:", response.data);

        // Redirect to the login page or show a success message as needed
      } catch (error) {
        // Handle API request errors (e.g., display an error message)
        console.error("Registration error:", error);
      }
    }
  };

  // Form validation function (customize this based on your requirements)
  const validateForm = (formData) => {
    const errors = {};

    // Example: Check if email is empty
    if (!formData.email) {
      errors.email = "Email is required";
    }

    // Add more validation rules as needed (e.g., check password strength, etc.)

    return errors;
  };

  return (
    <div className="bg-gradient-to-b from-sky-700 via-sky-800 bg-sky-800 min-h-screen flex flex-col items-center justify-center">
      <div className="font-inter text-white text-center mb-16">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={GroceryLogos} alt="Logo" />
          <h1
            className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontSize: "45px", fontFamily: "Inter" }}
          >
            Mini Grocery
          </h1>
        </div>
        <h2
          className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4"
          style={{ fontSize: "30px", fontFamily: "Inter" }}
        >
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              placeholder="Email"
              style={{ fontFamily: "Inter", fontSize: "30px" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-96 h-16 text-black"
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              placeholder="Password"
              style={{ fontFamily: "Inter", fontSize: "30px" }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-96 h-16 text-black"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"></label>
            <input
              placeholder="Confirm Password"
              style={{ fontFamily: "Inter", fontSize: "30px" }}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-96 h-16 text-black"
            />
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label className="block text-white mr-5 font-bold">
                User Type:{" "}
              </label>
              <label
                className={`mr-4 ${
                  formData.userType === "user" ? "text-black" : ""
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={formData.userType === "user"}
                  onChange={handleChange}
                  style={{ marginRight: "4px" }}
                />
                User
              </label>
              <label
                className={`${
                  formData.userType === "admin" ? "text-black" : ""
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={formData.userType === "admin"}
                  onChange={handleChange}
                  style={{ marginRight: "4px" }}
                />
                Admin
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-white text-black rounded-full w-40 sm:w-48 md:w-60 lg:w-72 xl:w-80 h-12 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-5"
              style={{ fontFamily: "Inter", fontSize: "20px" }}
            >
              Sign up
            </button>
          </div>
          <div className="mt-4">
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="mt-4">
            <Link to="/login" className="text-white">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
