import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
 
// =====================================================
// Layout
// =====================================================
import MainLayout from "./Layout/MainLayout/MainLayout";

// =====================================================
// Authentication
// =====================================================
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Login from "./Components/Login/Login";

// =====================================================
// Dashboard
// =====================================================
import DashBoard from "./Pages/DashBoard/DashBoard";

// =====================================================
// Travel Management
// =====================================================
import Tours from "./Pages/Tours/Tours";
import Hotel from "./Pages/Hotel/Hotel";
import Customers from "./Components/Customers/Customers";
import Enquiries from "./Components/Enquiries/Enquiries";
import Coupons from "./Components/Coupons/Coupons";
import BookingDetails from "./Components/BookingDetails/BookingDetails";

// =====================================================
// Content Management
// =====================================================
import Blogs from "./Components/Blogs/Blogs";
import Blogmanagement from "./Pages/Blogmanagement/Blogmanagement";
import Testimonial from "./Components/Testimonial/Testimonial";
import Gallary from "./Components/Gallary/Gallary";
import OurGuide from "./Pages/OurGuide/OurGuide";

// =====================================================
// User Management
// =====================================================
import AllUsers from "./Components/AllUsers/AllUsers";
import RoleandPermission from "./Components/RoleandPermission/RoleandPermission";
import Myprofile from "./Components/Myprofile/Myprofile";

// =====================================================
// System
// =====================================================
import Settings from "./Components/Settings/Settings";

// =====================================================
// Other
// =====================================================
import Booklead from "./Pages/Booklead/Booklead";
import TourBookings from "./Pages/TourBookings/TourBookings";

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

            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route path="/" element={<DashBoard />} />


            {/* =================================================
                TRAVEL MANAGEMENT
            ================================================= */}

            <Route path="/tours" element={<Tours />} />

            <Route path="/hotels" element={<Hotel />} />

            <Route path="/customers" element={<Customers />} />

            <Route path="/enquiries" element={<Enquiries />} />

            <Route path="/coupons" element={<Coupons />} />

            <Route path="/tourbooking" element={<TourBookings />} />

            <Route
              path="/bookingdetails"
              element={<BookingDetails />}
            />

            <Route
              path="/booklead"
              element={<Booklead />}
            />


            {/* =================================================
                CONTENT MANAGEMENT
            ================================================= */}

            {/* Create New Blog */}
            <Route
              path="/blog/new"
              element={<Blogs />}
            />

            {/* Blog Management */}
            <Route
              path="/blog"
              element={<Blogmanagement />}
            />

            {/* Testimonials */}
            <Route
              path="/testimonials"
              element={<Testimonial />}
            />

            {/* Gallery */}
            <Route
              path="/gallary"
              element={<Gallary />}
            />

            {/* Our Guide */}
            <Route
              path="/our-guide"
              element={<OurGuide />}
            />


            {/* =================================================
                USER MANAGEMENT
            ================================================= */}

            <Route
              path="/users"
              element={<AllUsers />}
            />

            <Route
              path="/users/roles"
              element={<RoleandPermission />}
            />

            <Route
              path="/profile"
              element={<Myprofile />}
            />


            {/* =================================================
                SYSTEM
            ================================================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>
        </Route>


        {/* =====================================================
            FALLBACK ROUTE
        ===================================================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;