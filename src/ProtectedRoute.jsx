import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedOtp = localStorage.getItem("otp");

  if (!storedOtp || storedOtp.length !== 6) {
    // Redirect to OTP login if OTP is invalid or absent
    return <Navigate to="/tenantloginOTP" replace />;
  }

  // If OTP is valid, render the child component
  return children;
};

export default ProtectedRoute;
