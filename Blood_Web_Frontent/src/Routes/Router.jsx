import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Donate from "../pages/Donate";
import Blood from "../pages/Blood";
import ContactUs from "../pages/ContactUs";
import UserAuth from "../auth/UserAuth";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import AdminAuth from "../auth/AdminAuth";
import AdminLogin from "../pages/AdminLogin";
import Maintanence from "../pages/Maintanence";
import ProtectedRoute from "../components/ProtectedRoute";
import SeeAllUsers from "../pages/SeeAllUsers";
import Otp from "../pages/Otp";
import MapView from "../pages/MapView";
import Register from "../pages/Register";
import TicketRaiser from "../pages/TicketRaiser";

const AllRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <Admin />
            </AdminAuth>
          }
        />
        <Route
          path="/ticket-raiser"
          element={
            <AdminAuth>
              <TicketRaiser />
            </AdminAuth>
          }
        />
        <Route
          path="/allUsers"
          element={
            <AdminAuth>
              <SeeAllUsers />
            </AdminAuth>
          }
        />
        <Route path="/maintanence" element={<Maintanence />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/otp" element={<Otp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/map/:id" element={<MapView />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/users/profile"
                  element={
                    <UserAuth>
                      <Profile />
                    </UserAuth>
                  }
                />
                <Route
                  path="/users/contactUs"
                  element={
                    <UserAuth>
                      <ContactUs />
                    </UserAuth>
                  }
                />
                <Route
                  path="/reciver/blood"
                  element={
                    <UserAuth>
                      <Blood />
                    </UserAuth>
                  }
                />
                <Route
                  path="/donate/request-list"
                  element={
                    <UserAuth>
                      <Donate />
                    </UserAuth>
                  }
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRouter;
