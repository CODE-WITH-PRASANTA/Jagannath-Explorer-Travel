
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// Logo
import logo from "../../assets/Logo 006 (2).png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCarRentalOpen, setIsCarRentalOpen] = useState(false);

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCarRentalOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle car rental dropdown
  const toggleCarRental = () => {
    setIsCarRentalOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}
        <NavLink
          to="/"
          className="navbar-logo-link"
          onClick={closeMobileMenu}
        >
          <div className="navbar-logo-wrapper">
            <img
              src={logo}
              alt="Jagannath Explorer Travel"
              className="navbar-logo"
            />
          </div>
        </NavLink>

        {/* =========================
            NAVIGATION
        ========================= */}
        <nav
          className={`navbar-navigation ${
            isMobileMenuOpen ? "navbar-navigation-open" : ""
          }`}
        >
          <div className="navbar-navigation-inner">

            {/* Home */}
            <NavLink
              to="/"
              end
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">Home</span>
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">About</span>
            </NavLink>

            {/* Tours */}
            <NavLink
              to="/tours"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">Tours</span>
            </NavLink>

            {/* Hotel */}
            <NavLink
              to="/hotel"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">Hotel</span>
            </NavLink>

            {/* =========================
                CAR RENTAL DROPDOWN
            ========================= */}
            <div
              className={`navbar-dropdown ${
                isCarRentalOpen ? "navbar-dropdown-open" : ""
              }`}
            >
              <button
                type="button"
                className="navbar-dropdown-button"
                onClick={toggleCarRental}
                aria-expanded={isCarRentalOpen}
              >
                <span className="navbar-link-text">Car Rental</span>

                <svg
                  className="navbar-dropdown-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="navbar-dropdown-menu">

                <NavLink
                  to="/car-rental/sedan-cars"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>Sedan Cars</span>
                </NavLink>

                <NavLink
                  to="/car-rental/suv-cars"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>SUV Cars</span>
                </NavLink>

                <NavLink
                  to="/car-rental/luxury-cars"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>Luxury Cars</span>
                </NavLink>

                <NavLink
                  to="/car-rental/tempo-travellers"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>Tempo Travellers</span>
                </NavLink>

                <NavLink
                  to="/car-rental/urbania-travellers"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>Urbania Travellers</span>
                </NavLink>

                <NavLink
                  to="/car-rental/small-coach"
                  onClick={closeMobileMenu}
                  className="navbar-dropdown-link"
                >
                  <span className="navbar-dropdown-icon">
                    <span></span>
                  </span>
                  <span>Small Coach</span>
                </NavLink>

              </div>
            </div>

            {/* Blog */}
            <NavLink
              to="/blog"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">Blog</span>
            </NavLink>

            {/* Gallery */}
            <NavLink
              to="/gallery"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">Gallery</span>
            </NavLink>

            {/* FAQ */}
            <NavLink
              to="/faq"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-link-text">FAQ</span>
            </NavLink>

            {/* =========================
                MOBILE CONTACT
            ========================= */}
            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className="navbar-mobile-contact"
            >
              <span>Contact Us</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

          </div>
        </nav>

        {/* =========================
            DESKTOP CONTACT BUTTON
        ========================= */}
        <NavLink
          to="/contact"
          className="navbar-contact-button"
        >
          <span className="navbar-contact-button-text">
            Contact Us
          </span>

          <span className="navbar-contact-button-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </NavLink>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          type="button"
          className={`navbar-menu-button ${
            isMobileMenuOpen ? "navbar-menu-button-open" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="navbar-menu-line"></span>
          <span className="navbar-menu-line"></span>
          <span className="navbar-menu-line"></span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;

