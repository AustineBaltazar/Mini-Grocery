import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ element, path }) {
  // Check if a valid token is present in the cookie
  const token = Cookies.get("token");

  if (token) {
    // If a valid token is present, allow access to the route
    return <Route path={path} element={element} />;
  } else {
    // If no valid token is found, redirect to the login page
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
