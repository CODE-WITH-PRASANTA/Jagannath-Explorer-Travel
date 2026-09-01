import React from 'react';
import './HotelRoomBreadCrumb.css';

// Background image import path
import breadcrumbBg from '../../assets/background.webp';

const HotelRoomBreadCrumb = () => {
  return (
    <div 
      className="HotelRoomBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      {/* Title & Navigation */}
      <div className="HotelRoomBreadCrumb-hero">
        <h1 className="HotelRoomBreadCrumb-title">Room Details</h1>
        <div className="HotelRoomBreadCrumb-nav">
          <span className="HotelRoomBreadCrumb-home">Home</span>
          <span className="HotelRoomBreadCrumb-arrow">--&gt;</span>
          <span className="HotelRoomBreadCrumb-current">Room Details</span>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomBreadCrumb;