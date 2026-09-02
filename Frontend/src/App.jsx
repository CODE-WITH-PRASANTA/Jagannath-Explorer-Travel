import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import SedanHome from "./Components/SedanHome/SedanHome";
import SedanCar from "./Page/SedanCar/SedanCar";
import Suvcars from "./Page/Suvcars/Suvcars";
import LuxuryCars from "./Page/LuxuryCars/LuxuryCars";
import TempoTravell from "./Page/TempoTravell/TempoTravell";
import SmlCoach from "./Page/SmlCoach/SmlCoach";


// Pages

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
    <Navbar/>
      {/* Navbar will appear on every page */}

      <Routes>
        <Route path="/sedan-car"element={<SedanCar/>}/>
        <Route path="/suv-cars"element={<Suvcars/>}/>
        <Route path="/luxury-car"element={<LuxuryCars/>}/>
        <Route path="/tempo-cars"element={<TempoTravell/>}/>
        <Route path="/sml-cars"element={<SmlCoach/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;