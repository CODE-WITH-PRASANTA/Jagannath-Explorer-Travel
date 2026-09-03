import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./Page/Tours/Tours";
import TourDetails from "./Page/TourDetails/TourDetails";
import Hotel from "./Page/Hotel/Hotel";
import HotelRoomDetails from "./Page/HotelRoomDetails/HotelRoomDetails";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Page/Home/Home";
import Footer from "./Components/footer/footer";
import About from "./Page/About/About";
import UrbaniaTraveller from "./Page/UrbaniaTraveller/UrbaniaTraveller";
import Blogs from "./Page/Blogs/Blogs";
import BLogDetails from "./Page/BLogDetails/BLogDetails";
import Gallery from "./Components/Gallery/Gallery";
 
// Pages

const App = () => {
  return (
    <BrowserRouter>
    <Topbar/>
    <Navbar/>
     

      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/tours" element={<Tours/>}/>
        <Route path="/tourdetails" element={<TourDetails/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/hotelroomdetails" element={<HotelRoomDetails/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/UrbaniaTraveller" element={<UrbaniaTraveller />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogsdetails" element={<BLogDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;