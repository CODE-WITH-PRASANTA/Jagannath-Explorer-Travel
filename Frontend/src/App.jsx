import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/footer/footer";

// Pages
import Home from "./Page/Home/Home";
import Tours from "./Page/Tours/Tours";
import TourDetails from "./Page/TourDetails/TourDetails";
import Hotel from "./Page/Hotel/Hotel";
import HotelRoomDetails from "./Page/HotelRoomDetails/HotelRoomDetails";
import SedanCar from "./Page/SedanCar/SedanCar";
import Suvcars from "./Page/Suvcars/Suvcars";
import LuxuryCars from "./Page/LuxuryCars/LuxuryCars";
import TempoTravell from "./Page/TempoTravell/TempoTravell";
import SmlCoach from "./Page/SmlCoach/SmlCoach";
import UrbaniaTraveller from "./Page/UrbaniaTraveller/UrbaniaTraveller";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import Faqs from "./Page/Faqs/Faqs";

const App = () => {
  return (
    <BrowserRouter>
      {/* Topbar सामान्य रहेगा (स्क्रॉल होने पर ऊपर छिप जाएगा) */}
      <Topbar />

      {/* Navbar हमेशा टॉप पर चिपका रहेगा */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-rental/sedan-cars" element={<SedanCar />} />
        <Route path="/car-rental/suv-cars" element={<Suvcars />} />
        <Route path="/car-rental/luxury-cars" element={<LuxuryCars />} />
        <Route path="/car-rental/tempo-travellers" element={<TempoTravell />} />
        <Route path="/car-rental/small-coach" element={<SmlCoach />} />
        <Route path="/car-rental/urbania-travellers" element={<UrbaniaTraveller />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tourdetails" element={<TourDetails />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/hotelroomdetails" element={<HotelRoomDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faqs />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;