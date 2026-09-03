import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if user is authenticated in storage
  const isAuth = sessionStorage.getItem("isAdminAuthenticated") === "true";

  // If not authenticated, redirect to root or a fallback. 
  // (If you don't have a login page, redirecting to "/" or handling it gracefully prevents infinite loops)
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;