import React from 'react';
import './HotelBreadCrumb.css';

// Background image import path
import breadcrumbBg from '../../assets/background.webp';

const HotelBreadCrumb = () => {
  return (
    <div 
      className="HotelBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      {/* Title & Navigation */}
      <div className="HotelBreadCrumb-hero">
        <h1 className="HotelBreadCrumb-title">Room & Suits</h1>
        <div className="HotelBreadCrumb-nav">
          <span className="HotelBreadCrumb-home">Home</span>
          <span className="HotelBreadCrumb-arrow">--&gt;</span>
          <span className="HotelBreadCrumb-current">Room & Suits</span>
        </div>
      </div>
    </div>
  );
};

export default HotelBreadCrumb;