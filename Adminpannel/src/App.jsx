import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Blogs from "./Components/Blogs/Blogs";
import Tours from "./Pages/Tours/Tours";
  
import Hotel from "./Pages/Hotel/Hotel";
import Enquiries from "./Components/Enquiries/Enquiries";
import Coupons from "./Components/Coupons/Coupons";
import Customers from "./Components/Customers/Customers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bypass ProtectedRoute temporarily to test if layout shows */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/hotels"element={<Hotel/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;