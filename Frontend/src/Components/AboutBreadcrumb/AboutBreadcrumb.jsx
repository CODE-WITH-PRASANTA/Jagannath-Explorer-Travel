import React from "react";
import { Link } from "react-router-dom";
import "./AboutBreadcrumb.css";

// Import your breadcrumb image
import aboutBreadcrumbImage from "../../assets/Breadcrumb.webp";

const AboutBreadcrumb = () => {
  return (
    <section
      className="AboutBreadcrumb"
      style={{ backgroundImage: `url(${aboutBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="AboutBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="AboutBreadcrumb__container">
        <div className="AboutBreadcrumb__content">
          <h1 className="AboutBreadcrumb__title">About Us</h1>

          <nav
            className="AboutBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="AboutBreadcrumb__home"
            >
              Home
            </Link>

            <span className="AboutBreadcrumb__arrow">→</span>

            <span className="AboutBreadcrumb__current">
              About Us
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default AboutBreadcrumb;