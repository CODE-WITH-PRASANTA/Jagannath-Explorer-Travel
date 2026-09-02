import React from "react";
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
} from "react-icons/fa";

import logo from "../../assets/Logo 006 (2).png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* ================= TOP WAVE ================= */}
      <div className="footer-wave">
        <div className="footer-wave-dark"></div>
        <div className="footer-wave-blue"></div>
        <div className="footer-wave-light"></div>
        <div className="footer-wave-gold"></div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="footer-main">

        <div className="footer-container">

          {/* BRAND */}
          <div className="footer-brand">

            <div className="footer-logo-box">
              <img
                src={logo}
                alt="Travel Logo"
                className="footer-logo"
              />
            </div>

            <p className="footer-description">
              We craft unforgettable journeys that bring the world
              closer to you. Explore more. Worry less.
            </p>

            <div className="footer-social">

              <a href="#" className="footer-social-link facebook">
                <FaFacebookF />
              </a>

              <a href="#" className="footer-social-link instagram">
                <FaInstagram />
              </a>

              <a href="#" className="footer-social-link twitter">
                <FaTwitter />
              </a>

              <a href="#" className="footer-social-link youtube">
                <FaYoutube />
              </a>

              <a href="#" className="footer-social-link linkedin">
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">

            <h3 className="footer-title">
              Quick Links
            </h3>

            <ul className="footer-links">

              <li>
                <a href="#">
                  <FaArrowRight />
                  Home
                </a>
              </li>

              <li>
                <a href="#">
                  <FaArrowRight />
                  About Us
                </a>
              </li>

              <li>
                <a href="#">
                  <FaArrowRight />
                  Tour Packages
                </a>
              </li>

              <li>
                <a href="#">
                  <FaArrowRight />
                  Destinations
                </a>
              </li>

              <li>
                <a href="#">
                  <FaArrowRight />
                  Blog
                </a>
              </li>

              <li>
                <a href="#">
                  <FaArrowRight />
                  Contact Us
                </a>
              </li>

            </ul>

          </div>

          {/* DESTINATIONS */}
          <div className="footer-column">

            <h3 className="footer-title">
              Top Destinations
            </h3>

            <ul className="footer-links footer-destination-links">

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Maldives
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Bali, Indonesia
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Dubai, UAE
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Switzerland
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Thailand
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="footer-location-dot">●</span>
                  Singapore
                </a>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div className="footer-column footer-contact">

            <h3 className="footer-title">
              Contact Us
            </h3>

            <div className="footer-contact-item">

              <div className="footer-contact-icon phone">
                <FaPhoneAlt />
              </div>

              <div>
                <a href="tel:+911234567890">
                  +91 123 456 7890
                </a>

                <a href="tel:+911234567891">
                  +91 123 456 7891
                </a>
              </div>

            </div>

            <div className="footer-contact-item">

              <div className="footer-contact-icon email">
                <FaEnvelope />
              </div>

              <div>
                <a href="mailto:info@example.com">
                  info@example.com
                </a>

                <a href="mailto:support@example.com">
                  support@example.com
                </a>
              </div>

            </div>

            <div className="footer-contact-item">

              <div className="footer-contact-icon location">
                <FaMapMarkerAlt />
              </div>

              <p>
                Bhubaneswar, Odisha,
                <br />
                India
              </p>

            </div>

            <div className="footer-contact-item">

              <div className="footer-contact-icon clock">
                <FaClock />
              </div>

              <p>
                Mon - Sat: 9:00 AM - 6:00 PM
                <br />
                Sunday: Closed
              </p>

            </div>

          </div>

        </div>

        {/* ================= CTA ================= */}

        <div className="footer-cta">

          <div className="footer-cta-content">

            <div className="footer-cta-icon">
              <FaSuitcaseRolling />
            </div>

            <div className="footer-cta-text">
              <h4>
                Let's Plan Your Next Adventure!
              </h4>

              <p>
                Find the best deals and exclusive offers
                on amazing destinations.
              </p>
            </div>

          </div>

          <a href="#" className="footer-cta-button">
            Explore Packages
            <FaArrowRight />
          </a>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © {new Date().getFullYear()} Your Travel Company.
            All Rights Reserved.
          </p>

          <p className="footer-made">
            ♥ Made with passion for travelers
          </p>

          <div className="footer-bottom-links">

            <a href="#">
              Privacy Policy
            </a>

            <span>•</span>

            <a href="#">
              Terms & Conditions
            </a>

            <span>•</span>

            <a href="#">
              Sitemap
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;