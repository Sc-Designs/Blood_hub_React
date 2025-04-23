import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAxios from "../config/AdminAxios";
import { AdminContext } from "../context/admin.context";

const AdminAuth = ({ children }) => {
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    const fetchAdmin = async () => {
      if (!adminToken) {
        navigate("/admin/login");
        return;
      }

      try {
        const res = await AdminAxios.get("/admin/admin-profile", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setAdmin(res.data.user);
        setIsAdminLoading(false);
      } catch (err) {
        console.log("Admin auth failed:", err.message);
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    };

    fetchAdmin();
  }, [navigate, setAdmin]);

  if (isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        <h1>Admin Data Loading...</h1>
      </div>
    );
  }

    return <>{children}</>
};

export default AdminAuth;
