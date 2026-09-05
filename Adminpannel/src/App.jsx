import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Blogs from "./Components/Blogs/Blogs";
import Tours from "./Pages/Tours/Tours";
 
import Hotel from "./Pages/Hotel/Hotel";
import Testimonial from "./Components/Testimonial/Testimonial";
import Settings from "./Components/Settings/Settings";
import AllUsers from "./Components/AllUsers/AllUsers";
import RoleandPermission from "./Components/RoleandPermission/RoleandPermission";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bypass ProtectedRoute temporarily to test if layout shows */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/tours" element={<Tours />} />

          <Route path="/hotels"element={<Hotel/>}/>
          <Route path="/testimonials" element={<Testimonial/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/users" element={<AllUsers/>}/>
          <Route path="/users/roles" element={<RoleandPermission/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;