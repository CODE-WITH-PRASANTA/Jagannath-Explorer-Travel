import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaSuitcaseRolling,
  FaArrowRight,
  FaExternalLinkAlt,
  FaUmbrellaBeach,
  FaPlaceOfWorship,
  FaWater,
  FaBuilding,
  FaTree,
  FaWhatsapp,
} from "react-icons/fa";

import logo from "../../assets/logooooo.jpeg";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  /* =========================================================
     QUICK LINKS
  ========================================================= */

  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Tours",
      path: "/tours",
    },
    {
      name: "Hotel",
      path: "/hotel",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  /* =========================================================
     SMOOTH ROUTE + TOP SCROLL
     
     First navigate to the selected page.
     Then smoothly move the page to the top.
  ========================================================= */

  const handleNavigation = (path) => {
    navigate(path);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 80);
  };

  /* =========================================================
     ODISHA LOCATIONS
  ========================================================= */

  const odishaLocations = [
    {
      name: "Puri",
      icon: <FaUmbrellaBeach />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Puri%2C%20Odisha%2C%20India",
    },
    {
      name: "Konark",
      icon: <FaPlaceOfWorship />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Konark%2C%20Odisha%2C%20India",
    },
    {
      name: "Chilika",
      icon: <FaWater />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Chilika%20Lake%2C%20Odisha%2C%20India",
    },
    {
      name: "Bhubaneswar",
      icon: <FaBuilding />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Bhubaneswar%2C%20Odisha%2C%20India",
    },
    {
      name: "Dhauli",
      icon: <FaPlaceOfWorship />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Dhauli%2C%20Bhubaneswar%2C%20Odisha%2C%20India",
    },
    {
      name: "Similipal",
      icon: <FaTree />,
      url:
        "https://www.google.com/maps/search/?api=1&query=Similipal%20National%20Park%2C%20Odisha%2C%20India",
    },
  ];

  return (
    <footer className="footer">

      {/* =====================================================
          TOP WAVE
      ====================================================== */}

      <div className="footer-wave" aria-hidden="true">
        <div className="footer-wave-blue"></div>
        <div className="footer-wave-light"></div>

        <div className="footer-wave-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="footer-main">

        <div className="footer-container">

          {/* =================================================
              BRAND
          ================================================== */}

          <div className="footer-brand">

            <div className="footer-logo-box">
              <img
                src={logo}
                alt="Jagannath Explorer Travels"
                className="footer-logo"
              />
            </div>

            <h2 className="footer-brand-title">
              Jagannath Explorer Travels
            </h2>

            <p className="footer-description">
              Your trusted travel partner for memorable journeys
              across Odisha and beyond. Travel with comfort,
              care and confidence.
            </p>

            <div className="footer-social">

              <a
                href="#"
                className="facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="whatsapp"
                aria-label="whatsapp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="#"
                className="youtube"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <div className="footer-column">

            <h3 className="footer-title">
              Quick Links
            </h3>

            <span className="footer-title-line"></span>

            <ul className="footer-links">

              {quickLinks.map((link) => (
                <li key={link.name}>

                  <Link
                    to={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.path);
                    }}
                  >
                    <span className="footer-arrow">
                      <FaArrowRight />
                    </span>

                    <span>
                      {link.name}
                    </span>
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =================================================
              EXPLORE ODISHA
          ================================================== */}

          <div className="footer-column">

            <h3 className="footer-title">
              Explore Odisha
            </h3>

            <span className="footer-title-line"></span>

            <div className="footer-destinations">

              {odishaLocations.map((location) => (
                <a
                  key={location.name}
                  href={location.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-destination"
                >

                  <span className="destination-icon">
                    {location.icon}
                  </span>

                  <span className="destination-name">
                    {location.name}
                  </span>

                  <FaArrowRight className="destination-arrow" />

                </a>
              ))}

            </div>

          </div>

          {/* =================================================
              CONTACT
          ================================================== */}

          <div className="footer-column footer-contact">

            <h3 className="footer-title">
              Contact Us
            </h3>

            <span className="footer-title-line"></span>

            {/* PHONE */}

            <div className="contact-item">

              <div className="contact-icon phone-icon">
                <FaPhoneAlt />
              </div>

              <div className="contact-content">

                <a href="tel:+919668892441">
                  +91 96688 92441
                </a>

                <a href="tel:+919556355446">
                  +91 95563 55446
                </a>

              </div>

            </div>

            {/* EMAIL */}

            <div className="contact-item">

              <div className="contact-icon email-icon">
                <FaEnvelope />
              </div>

              <div className="contact-content">

                <a href="mailto:Jagannathexplore99@gmail.com">
                  jagannathexplorertravels@gmail.com
                </a>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="contact-item">

              <div className="contact-icon location-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="contact-content">

                <p>
                  Plot No - 001, Mahaveer Nagar,
                  <br />
                  Road No. - 18, Samantray Pur,
                  <br />
                  Bhubaneswar, Odisha - 751002
                </p>

              </div>

            </div>

            {/* WORKING HOURS */}

            <div className="contact-item">

              <div className="contact-icon clock-icon">
                <FaClock />
              </div>

              <div className="contact-content">

                <p>
                  Mon - Sat: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            CTA
        ==================================================== */}

        <div className="footer-cta">

          <div className="footer-cta-left">

            <div className="footer-cta-icon">
              <FaSuitcaseRolling />
            </div>

            <div className="footer-cta-content">

              <h4>
                Plan Your Next Journey
              </h4>

              <p>
                Discover unforgettable Odisha tours with us.
              </p>

            </div>

          </div>

          <Link
            to="/tours"
            className="footer-cta-button"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/contact");
            }}
          >
            <span>
              Contact Us
            </span>

            <FaArrowRight />
          </Link>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="footer-bottom">

        <p className="copyright-text">
          2026 &copy; Copyright by{" "}
          <a
            href="https://prwebstock.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="powered-by"
          >
            <strong>PR WEBSTOCK</strong>
            <FaExternalLinkAlt />
          </a>
        </p>

      </div>

    </footer>
  );
};

export default Footer;