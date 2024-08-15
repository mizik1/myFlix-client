import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const LogoffView = ({ onLogoff }) => {
  useEffect(() => {
    // Perform logoff actions such as clearing user data
    onLogoff();
  }, [onLogoff]);

  // Redirect to login page after logging off
  return <Navigate to="/login" />;
};
