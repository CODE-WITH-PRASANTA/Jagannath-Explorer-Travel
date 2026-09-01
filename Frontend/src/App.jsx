import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";


// Pages

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
    <Navbar/>
      {/* Navbar will appear on every page */}

      <Routes>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;