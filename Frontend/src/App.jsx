import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Page/About/About";
import UrbaniaTraveller from "./Page/UrbaniaTraveller/UrbaniaTraveller";


// Pages

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
    <Navbar/>
     

      <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/UrbaniaTraveller" element={<UrbaniaTraveller />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;