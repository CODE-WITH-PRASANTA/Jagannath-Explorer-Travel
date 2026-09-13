import React from 'react';
import './ToursBreadCrumb.css';

// React Icons
import { FaChevronRight } from 'react-icons/fa';

// Background image import path
import breadcrumbBg from '../../assets/mainbreadcrumb.webp';

const ToursBreadCrumb = () => {
  return (
    <div 
      className="ToursBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      <div className="ToursBreadCrumb-hero">
        <h1 className="ToursBreadCrumb-title">Package Top Search</h1>
        <div className="ToursBreadCrumb-nav">
          <span className="ToursBreadCrumb-home">Home</span>
          <FaChevronRight className="ToursBreadCrumb-arrow" />
          <span className="ToursBreadCrumb-current">Package Top Search</span>
        </div>
      </div>
    </div>
  );
};

export default ToursBreadCrumb;