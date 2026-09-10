import React from 'react';
import { Link } from 'react-router-dom';
import './TourDetailsBreadCrumb.css';

// Background image import path
import breadcrumbBg from '../../assets/background.webp';

const TourDetailsBreadCrumb = ({ title, destination }) => {
  return (
    <div 
      className="TourDetailsBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      {/* Title & Navigation */}
      <div className="TourDetailsBreadCrumb-hero">
        <h1 className="TourDetailsBreadCrumb-title">{title || "Package Details"}</h1>
        <div className="TourDetailsBreadCrumb-nav">
          <Link to="/" className="TourDetailsBreadCrumb-home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          <span className="TourDetailsBreadCrumb-arrow">--&gt;</span>
          <Link to="/tours" className="TourDetailsBreadCrumb-home" style={{ textDecoration: 'none', color: 'inherit' }}>Tours</Link>
          <span className="TourDetailsBreadCrumb-arrow">--&gt;</span>
          <span className="TourDetailsBreadCrumb-current">{title || (destination ? `${destination} Tour` : "Package Details")}</span>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsBreadCrumb;