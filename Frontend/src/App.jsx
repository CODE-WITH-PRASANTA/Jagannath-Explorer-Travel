import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./Page/Tours/Tours";
import TourDetails from "./Page/TourDetails/TourDetails";
import Hotel from "./Page/Hotel/Hotel";
import HotelRoomDetails from "./Page/HotelRoomDetails/HotelRoomDetails";

// Pages

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar will appear on every page */}

      <Routes>
        <Route path="/tours" element={<Tours/>}/>
        <Route path="/tourdetails" element={<TourDetails/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/hotelroomdetails" element={<HotelRoomDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;