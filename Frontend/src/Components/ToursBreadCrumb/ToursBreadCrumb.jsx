import React, { useState, useRef, useEffect } from 'react';
import './ToursBreadCrumb.css';

// React Icons imports
import { 
  FaMapMarkerAlt, 
  FaSuitcase, 
  FaUserFriends, 
  FaChevronDown 
} from 'react-icons/fa';

// Background image import path
import breadcrumbBg from '../../assets/background.webp';

const ToursBreadCrumb = () => {
  // Dropdown States
  const [location, setLocation] = useState('Afghanistan');
  const [tourType, setTourType] = useState('Family Tour');
  const [category, setCategory] = useState('Economy');
  const [guests, setGuests] = useState('1 Adults, 0 Child');

  // Open/Close Dropdown State
  const [openDropdown, setOpenDropdown] = useState(null);

  // Dummy Data
  const locationOptions = ['Afghanistan', 'India', 'Thailand', 'Dubai', 'Maldives', 'Indonesia'];
  const tourTypeOptions = ['Family Tour', 'Honeymoon Package', 'Adventure Tour', 'Solo Trip', 'Luxury Cruise'];
  const categoryOptions = ['Economy', 'Premium', 'Business Class', 'Luxury', 'Budget'];
  const guestOptions = ['1 Adults, 0 Child', '2 Adults, 0 Child', '2 Adults, 1 Child', '4 Adults, 2 Child'];

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, tourType, category, guests });
  };

  return (
    <div 
      className="ToursBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${breadcrumbBg})` }}
    >
      {/* Title & Navigation */}
      <div className="ToursBreadCrumb-hero">
        <h1 className="ToursBreadCrumb-title">Package Top Search</h1>
        <div className="ToursBreadCrumb-nav">
          <span className="ToursBreadCrumb-home">Home</span>
          <span className="ToursBreadCrumb-arrow">--&gt;</span>
          <span className="ToursBreadCrumb-current">Package Top Search</span>
        </div>
      </div>

      {/* Floating Card */}
      <div className="ToursBreadCrumb-searchCard" ref={dropdownRef}>
        <form onSubmit={handleSearch} className="ToursBreadCrumb-form">
          
          {/* 1. Location Dropdown */}
          <div 
            className={`ToursBreadCrumb-field ${openDropdown === 'location' ? 'ToursBreadCrumb-activeField' : ''}`}
            onClick={() => toggleDropdown('location')}
          >
            <div className="ToursBreadCrumb-iconBox">
              <FaMapMarkerAlt className="ToursBreadCrumb-greenIcon" />
            </div>
            <div className="ToursBreadCrumb-inputGroup">
              <span className="ToursBreadCrumb-selectedValue">{location}</span>
            </div>
            <FaChevronDown className={`ToursBreadCrumb-arrowIcon ${openDropdown === 'location' ? 'ToursBreadCrumb-rotate' : ''}`} />

            {openDropdown === 'location' && (
              <ul className="ToursBreadCrumb-menu">
                {locationOptions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`ToursBreadCrumb-option ${location === item ? 'ToursBreadCrumb-selected' : ''}`}
                    onClick={() => setLocation(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 2. Tour Type Dropdown */}
          <div 
            className={`ToursBreadCrumb-field ${openDropdown === 'tourType' ? 'ToursBreadCrumb-activeField' : ''}`}
            onClick={() => toggleDropdown('tourType')}
          >
            <div className="ToursBreadCrumb-iconBox">
              <FaSuitcase className="ToursBreadCrumb-greenIcon" />
            </div>
            <div className="ToursBreadCrumb-inputGroup">
              <label className="ToursBreadCrumb-label">Destination</label>
              <span className="ToursBreadCrumb-selectedValue">{tourType}</span>
            </div>
            <FaChevronDown className={`ToursBreadCrumb-arrowIcon ${openDropdown === 'tourType' ? 'ToursBreadCrumb-rotate' : ''}`} />

            {openDropdown === 'tourType' && (
              <ul className="ToursBreadCrumb-menu">
                {tourTypeOptions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`ToursBreadCrumb-option ${tourType === item ? 'ToursBreadCrumb-selected' : ''}`}
                    onClick={() => setTourType(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. Category Dropdown */}
          <div 
            className={`ToursBreadCrumb-field ${openDropdown === 'category' ? 'ToursBreadCrumb-activeField' : ''}`}
            onClick={() => toggleDropdown('category')}
          >
            <div className="ToursBreadCrumb-iconBox">
              <FaUserFriends className="ToursBreadCrumb-greenIcon" />
            </div>
            <div className="ToursBreadCrumb-inputGroup">
              <label className="ToursBreadCrumb-label">Destination</label>
              <span className="ToursBreadCrumb-selectedValue">{category}</span>
            </div>
            <FaChevronDown className={`ToursBreadCrumb-arrowIcon ${openDropdown === 'category' ? 'ToursBreadCrumb-rotate' : ''}`} />

            {openDropdown === 'category' && (
              <ul className="ToursBreadCrumb-menu">
                {categoryOptions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`ToursBreadCrumb-option ${category === item ? 'ToursBreadCrumb-selected' : ''}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 4. Guest Dropdown */}
          <div 
            className={`ToursBreadCrumb-field ${openDropdown === 'guests' ? 'ToursBreadCrumb-activeField' : ''}`}
            onClick={() => toggleDropdown('guests')}
          >
            <div className="ToursBreadCrumb-iconBox">
              <FaSuitcase className="ToursBreadCrumb-greenIcon" />
            </div>
            <div className="ToursBreadCrumb-inputGroup">
              <label className="ToursBreadCrumb-label">Guest</label>
              <span className="ToursBreadCrumb-selectedValue">{guests}</span>
            </div>
            <FaChevronDown className={`ToursBreadCrumb-arrowIcon ${openDropdown === 'guests' ? 'ToursBreadCrumb-rotate' : ''}`} />

            {openDropdown === 'guests' && (
              <ul className="ToursBreadCrumb-menu">
                {guestOptions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`ToursBreadCrumb-option ${guests === item ? 'ToursBreadCrumb-selected' : ''}`}
                    onClick={() => setGuests(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="ToursBreadCrumb-searchBtn">
            Search
          </button>

        </form>
      </div>
    </div>
  );
};

export default ToursBreadCrumb;