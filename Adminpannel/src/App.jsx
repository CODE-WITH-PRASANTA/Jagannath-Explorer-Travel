import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Dashboard
import DashBoard from "./Pages/DashBoard/DashBoard";

// Components / Pages
import Blogs from "./Components/Blogs/Blogs";
import Tours from "./Pages/Tours/Tours";
import Hotel from "./Pages/Hotel/Hotel";
import Testimonial from "./Components/Testimonial/Testimonial";
import Settings from "./Components/Settings/Settings";
import AllUsers from "./Components/AllUsers/AllUsers";
import RoleandPermission from "./Components/RoleandPermission/RoleandPermission";
import Enquiries from "./Components/Enquiries/Enquiries";
import Coupons from "./Components/Coupons/Coupons";
import Customers from "./Components/Customers/Customers";
import Gallary from "./Components/Gallary/Gallary";

// Authentication
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Login from "./Components/Login/Login";
import Blogmanagement from "./Pages/Blogmanagement/Blogmanagement";
import OurGuide from "./Pages/OurGuide/OurGuide";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
        ===================================================== */}
        <Route path="/login" element={<Login />} />

        {/* =====================================================
            PROTECTED ADMIN ROUTES
        ===================================================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Dashboard */}
            <Route path="/" element={<DashBoard />} />

            {/* Travel Management */}
            <Route path="/tours" element={<Tours />} />
            <Route path="/hotels" element={<Hotel />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/coupons" element={<Coupons />} />

            {/* Content Management */}
            <Route path="/blog/new" element={<Blogs />} />
            <Route path="/Blog"element={<Blogmanagement/>}/>
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/gallary" element={<Gallary />} />

            {/* User Management */}
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/roles" element={<RoleandPermission />} />

            {/* System */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/our-guide"element={<OurGuide/>}/>
          </Route>
        </Route>

        {/* =====================================================
            FALLBACK ROUTE
        ===================================================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;