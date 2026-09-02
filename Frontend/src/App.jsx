import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Footer from "./Components/footer/footer";


// Pages

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
    <Navbar/>
      {/* Navbar will appear on every page */}

      <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;