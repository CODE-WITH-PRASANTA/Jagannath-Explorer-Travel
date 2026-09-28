import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/footer/footer";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";

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
import FloatingSupport from "./Components/FloatingSupport/FloatingSupport";

// ==========================================
// SCROLL TO TOP
// ==========================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

// ==========================================
// APP
// ==========================================
const App = () => {
  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Topbar */}
      <Topbar />

      {/* Navbar */}
      <Navbar />

      {/* ==========================================
          ROUTES
      ========================================== */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Car Rental */}
        <Route
          path="/car-rental/sedan-cars"
          element={<SedanCar />}
        />

        <Route
          path="/car-rental/suv-cars"
          element={<Suvcars />}
        />

        <Route
          path="/car-rental/luxury-cars"
          element={<LuxuryCars />}
        />

        <Route
          path="/car-rental/tempo-travellers"
          element={<TempoTravell />}
        />

        <Route
          path="/car-rental/small-coach"
          element={<SmlCoach />}
        />

        <Route
          path="/car-rental/urbania-travellers"
          element={<UrbaniaTraveller />}
        />

        {/* Tours */}
        <Route
          path="/tours"
          element={<Tours />}
        />

        <Route
          path="/tours/:slug"
          element={<TourDetails />}
        />

        <Route
          path="/tourdetails"
          element={<TourDetails />}
        />

        <Route
          path="/tourdetails/:slug"
          element={<TourDetails />}
        />

        {/* Hotels */}
        <Route
          path="/hotel"
          element={<Hotel />}
        />

        <Route
          path="/hotel/:slug"
          element={<HotelRoomDetails />}
        />

        <Route
          path="/hotelroomdetails"
          element={<HotelRoomDetails />}
        />

        <Route
          path="/hotelroomdetails/:id"
          element={<HotelRoomDetails />}
        />

        {/* Other Pages */}
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faq"
          element={<Faqs />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={<Blogs />}
        />

        <Route
          path="/blogdetails"
          element={<BLogDetails />}
        />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Floating Social Icons */}
      <FloatingIcons />

      {/* ==========================================
          FLOATING ENQUIRY
          
          Button automatically appears on the
          RIGHT SIDE when popup is closed.
      ========================================== */}
      <FloatingForm
        triggerOnLoad={false}
      />
      <FloatingSupport />
      
    </BrowserRouter>
  );
};

export default App;