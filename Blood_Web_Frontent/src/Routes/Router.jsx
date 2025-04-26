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
          <Route path="/admin" element={<AdminAuth><Admin /></AdminAuth>}/>
          <Route path="/ticket-raiser" element={<AdminAuth><TicketRaiser /></AdminAuth>}/>
          <Route path="/allUsers" element={<AdminAuth><SeeAllUsers /></AdminAuth>}/>
          <Route path="/maintanence" element={<Maintanence />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <UserAuth>
                <Routes>
                  <Route path="/users/profile" element={<Profile />} />
                  <Route path="/map/:id" element={<MapView />} />
                  <Route path="/users/contactUs" element={<ContactUs />} />
                  <Route path="/reciver/blood" element={<Blood />} />
                  <Route path="/donate/request-list" element={<Donate />} />
                </Routes>
              </UserAuth>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRouter;
