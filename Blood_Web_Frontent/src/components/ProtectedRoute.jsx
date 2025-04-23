import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AdminContext } from "../context/admin.context";
import { receiveMessage } from "../config/Socket";

const ProtectedRoute = ({ children }) => {
  const { admin, setAdmin } = useContext(AdminContext);
  const location = useLocation();
  const [serverStatus, setServerStatus] = useState(admin?.serverOnOff);

  useEffect(() => {
    receiveMessage("server-res", (data) => {
      setServerStatus(data.serverOnOff);
      setAdmin(data);
    });
    
  }, [setAdmin]);

  useEffect(() => {
    if (!serverStatus) {
      localStorage.setItem("lastValidRoute", location.pathname);
    }
  }, [serverStatus, location.pathname]);

  // If server is OFF, redirect to /maintanence
  if (serverStatus) {
    return <Navigate to="/maintanence" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
