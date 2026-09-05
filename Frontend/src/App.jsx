import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/footer/footer";
import FloatingForm from "./Components/FloatingForm/FloatingForm";

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
import Gallery from "./Page/Gallery/Gallery";
import Blogs from "./Page/Blogs/Blogs";
import BLogDetails from "./Page/BLogDetails/BLogDetails";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";

const App = () => {
  // Manage popup state at root
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <BrowserRouter>
      {/* Topbar: scrolls away naturally */}
      <Topbar />

      {/* Navbar: sticky header */}
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
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blogdetails" element={<BLogDetails />} />
      </Routes>

      {/* Footer */}
      <Footer />
      <FloatingIcons />
      {/* Fixed Interactive Form Modal */}
      <FloatingForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Floating launcher trigger shown when modal is dismissed */}
      {!isModalOpen && (
        <button
          type="button"
          className="floating-form-launcher"
          onClick={() => setIsModalOpen(true)}
          aria-label="Enquire Now"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
            <path d="M7 9h10v2H7zm0-3h10v2H7z"/>
          </svg>
          <span>Enquire Now</span>
        </button>
      )}
    </BrowserRouter>
  );
};

export default App;