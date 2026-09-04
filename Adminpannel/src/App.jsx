import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
<<<<<<< HEAD
import Blogs from "./Components/Blogs/Blogs";
import Tours from "./Pages/Tours/Tours";
 
=======
import Hotel from "./Pages/Hotel/Hotel";

>>>>>>> eb483eb6b6bc8c030b5654d9bdb97054841edffe
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bypass ProtectedRoute temporarily to test if layout shows */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashBoard />} />
<<<<<<< HEAD
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/tours" element={<Tours />} />

=======
          <Route path="/hotels"element={<Hotel/>}/>
>>>>>>> eb483eb6b6bc8c030b5654d9bdb97054841edffe
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;