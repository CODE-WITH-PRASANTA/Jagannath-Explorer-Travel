import React from "react";
import "./TempoHome.css";

const TempoHome = () => {
  return (
    <section className="tempo-home-hero">
      {/* Dark overlay to match reference image contrast */}
      <div className="tempo-home-overlay"></div>

      <div className="tempo-home-container">
        <div className="tempo-home-content">
          <h1 className="tempo-home-title">Tempo Traveller</h1>
          
          <div className="tempo-home-breadcrumb">
            <span className="tempo-home-breadcrumb-link">Home</span>
            <span className="tempo-home-arrow">→</span>
            <span className="tempo-home-breadcrumb-current">Tempo Traveller</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempoHome;