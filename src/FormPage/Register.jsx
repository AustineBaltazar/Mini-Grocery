import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "" });
      setIsFormValid(false);
    } else {
      setErrors({});
      setIsFormValid(!!formData.email && !!formData.password);
    }
  }, [formData.password, formData.confirmPassword, formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({
        ...errors,
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
        confirmPassword: !formData.confirmPassword
          ? "Confirm Password is required"
          : "",
      });
      setIsFormValid(false);
      return;
    }

    console.log("Registration data:", formData);

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted && isFormValid) {
      window.location.href = `/login?userType=${formData.userType}`;
    }
  }, [isSubmitted, isFormValid, formData.userType]);

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 min-h-screen flex flex-col items-center justify-center">
      <div className="font-inter text-white text-center">
        <h1
          className="font-bold text-4xl md:text-5xl mb-4"
          style={{ fontSize: "45px", fontFamily: "Inter" }}
        >
          Mini Grocery
        </h1>
        <h2
          className="text-xl md:text-2xl font-semibold mb-4"
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
            <label className="block text-gray-700">User Type:</label>
            <div>
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
            {/* Render the submit button only if the form is valid */}
            {isFormValid && (
              <button
                type="submit"
                className="bg-white text-black rounded-full w-40 h-12 text-xs md:text-base mt-5"
                style={{ fontFamily: "Inter", fontSize: "20px" }}
              >
                Sign up
              </button>
            )}
          </div>
          <div className="mt-4">
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <div className="mt-4">
            {/* Use the Link component to navigate to the login page */}
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
