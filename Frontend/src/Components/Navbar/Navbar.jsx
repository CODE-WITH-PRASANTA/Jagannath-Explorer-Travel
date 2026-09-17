import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [carRentalOpen, setCarRentalOpen] = useState(false);

  const closeMenu = () => {
    setMobileOpen(false);
    setCarRentalOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="navbar-logo-link" onClick={closeMenu}>
          <img
            src={logo}
            alt="Jagannath Explorer Travels"
            className="navbar-logo"
          />
        </NavLink>

        <nav className={`navbar-nav ${mobileOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/tours"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Tours
          </NavLink>

          <NavLink
            to="/hotel"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Hotel
          </NavLink>

          <div
            className={`nav-dropdown ${
              carRentalOpen ? "dropdown-open" : ""
            }`}
          >
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => setCarRentalOpen(!carRentalOpen)}
            >
              Car Rental
              <svg viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div className="dropdown-menu">
              <NavLink to="/car-rental/sedan-cars" onClick={closeMenu}>
                Sedan Cars
              </NavLink>

              <NavLink to="/car-rental/suv-cars" onClick={closeMenu}>
                SUV Cars
              </NavLink>

              <NavLink to="/car-rental/luxury-cars" onClick={closeMenu}>
                Luxury Cars
              </NavLink>

              <NavLink
                to="/car-rental/tempo-travellers"
                onClick={closeMenu}
              >
                Tempo Travellers
              </NavLink>

              <NavLink
                to="/car-rental/urbania-travellers"
                onClick={closeMenu}
              >
                Urbania Travellers
              </NavLink>

              <NavLink to="/car-rental/small-coach" onClick={closeMenu}>
                Small Coach
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/blog"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/gallery"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/faq"
            onClick={closeMenu}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            FAQ
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="mobile-contact"
          >
            Contact Us
            <span>→</span>
          </NavLink>
        </nav>

        <NavLink to="/contact" className="contact-btn">
          <span>Contact Us</span>
          <span className="contact-arrow">→</span>
        </NavLink>

        <button
          type="button"
          className={`menu-btn ${mobileOpen ? "menu-active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;