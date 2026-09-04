import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Blogs from "./Components/Blogs/Blogs";
import Tours from "./Pages/Tours/Tours";
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bypass ProtectedRoute temporarily to test if layout shows */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/tours" element={<Tours />} />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;