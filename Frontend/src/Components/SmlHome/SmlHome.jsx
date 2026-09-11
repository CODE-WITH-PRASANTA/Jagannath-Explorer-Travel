import React from "react";
import "./SmlHome.css";

const SmlHome = () => {
  return (
    <section className="sml-home-hero">
      {/* Dynamic Background Overlay */}
      <div className="sml-home-overlay"></div>
      
      {/* Floating Animated Light Flares */}
      <div className="sml-home-flare sml-flare-1"></div>
      <div className="sml-home-flare sml-flare-2"></div>

      <div className="sml-home-container">
        <div className="sml-home-content">
          
          <span className="sml-home-subtitle">✦ PREMIUM TRANSPORT FLEET ✦</span>
          
          <h1 className="sml-home-title">SML Coach</h1>
          
          <p className="sml-home-description">
            Exquisite chauffeur-driven fleet for weddings, corporate galas, and VIP group travel.
          </p>
          
          <div className="sml-home-breadcrumb-box">
            <span className="sml-home-breadcrumb-link">Home</span>
            <span className="sml-home-arrow">→</span>
            <span className="sml-home-breadcrumb-current">SML Coach</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SmlHome;