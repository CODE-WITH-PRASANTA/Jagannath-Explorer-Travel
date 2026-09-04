import React from "react";

import ToursBasicInformation from "../../Components/ToursBasicInformation/ToursBasicInformation";
import ToursImagesMedia from "../../Components/ToursImagesMedia/ToursImagesMedia";
import ToursItinerary from "../../Components/ToursItinerary/ToursItinerary";
import ToursLocation from "../../Components/ToursLocation/ToursLocation";
import ToursFAQSection from "../../Components/ToursFAQSection/ToursFAQSection";
import ToursAllSection from "../../Components/ToursAllSection/ToursAllSection";

import "./Tours.css";

const Tours = () => {
  return (
    <div className="tours-page">
 
      {/* LEFT CONTENT */}
      <main className="tours-main-content">
        <ToursBasicInformation />
        <ToursImagesMedia />
        <ToursItinerary />
        <ToursLocation />
        <ToursFAQSection />
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="tours-right-sidebar">
        <ToursAllSection />
      </aside>

    </div>
  );
};

export default Tours;