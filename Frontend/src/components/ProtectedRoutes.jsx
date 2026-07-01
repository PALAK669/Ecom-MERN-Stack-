import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.auth.user);

  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // admin only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;