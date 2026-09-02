import React from 'react';
import './TourDetailsBreadCrumb.css';

// Background image import path
import breadcrumbBg from '../../assets/background.webp';

const TourDetailsBreadCrumb = () => {
  return (
    <div 
      className="TourDetailsBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      {/* Title & Navigation */}
      <div className="TourDetailsBreadCrumb-hero">
        <h1 className="TourDetailsBreadCrumb-title">Package Details</h1>
        <div className="TourDetailsBreadCrumb-nav">
          <span className="TourDetailsBreadCrumb-home">Home</span>
          <span className="TourDetailsBreadCrumb-arrow">--&gt;</span>
          <span className="TourDetailsBreadCrumb-current">Package Details</span>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsBreadCrumb;