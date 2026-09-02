import React, { useState } from 'react';
import { FiUser, FiGrid, FiPhoneCall, FiMenu, FiX } from 'react-icons/fi';
import { IoIosCall } from 'react-icons/io';
import './Navbar.css';


import logoImg from '../../assets/Logo 006.webp';

const Navbar = ({ logoSrc }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        
        {/* 1. Logo Section */}
        <div className="navbar-logo">
          <a href="/" className="logo-link">
            {logoSrc ? (
              <img src={logoSrc} alt="TripRex Logo" className="custom-logo-img" />
            ) : (
              /* Fallback SVG Icon + Brand Name matching the reference */
              <div className="brand-wrapper">
                <svg className="brand-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Clover / Propeller Shape */}
                  <path d="M24 20C24 16 20 12 16 16C12 20 16 24 20 24" fill="#5cb82b" />
                  <path d="M28 24C32 24 36 20 32 16C28 12 24 16 24 20" fill="#5cb82b" />
                  <path d="M24 28C24 32 28 36 32 32C36 28 32 24 28 24" fill="#5cb82b" />
                  <path d="M20 24C16 24 12 28 16 32C20 36 24 32 24 28" fill="#5cb82b" />
                  {/* Small Plane */}
                  <path d="M27 19L23 23M23 23L21 21M23 23L25 25M27 19L28 16L25 17L23 23" stroke="#5cb82b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="brand-name">Trip<span className="brand-bold">Rex</span></span>
              </div>
            )}
          </a>
        </div>

        {/* 2. Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link">HOME </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">ABOUT</a>
            </li>
            <li className="nav-item">
              <a href="#tours" className="nav-link">TOURS </a>
            </li>
            <li className="nav-item">
              <a href="#destination" className="nav-link">Car rental all</a>
            </li>
            <li className="nav-item">
              <a href="#hotel" className="nav-link">Hotel</a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">Gallery</a>
            </li>
            <li className="nav-item">
                <a href="faq" className="nav-link">Faq</a>
            </li>
            <li className="nav-item">
                <a href="contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>

        {/* 3. Action Buttons & Contact Info */}
        <div className="navbar-actions">
          <button className="action-btn" aria-label="User Account" onClick={() => alert('Account clicked')}>
            <FiUser />
          </button>
          
          <button className="action-btn" aria-label="Menu Grid" onClick={() => alert('Grid menu clicked')}>
            <FiGrid />
          </button>

          <div className="contact-info">
            <div className="phone-icon-wrapper">
              <IoIosCall className="phone-icon" />
            </div>
            <div className="phone-details">
              <span className="inquiry-title">To More Inquiry</span>
              <a href="tel:+990737621432" className="phone-number">+990-737 621 432</a>
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button className="mobile-toggle-btn" onClick={toggleMobileMenu} aria-label="Toggle Navigation">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;