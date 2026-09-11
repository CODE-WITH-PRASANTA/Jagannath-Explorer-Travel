import React from "react";
import { Link } from "react-router-dom";
import "./ContactBreadcrumb.css";

// Import your breadcrumb image
import contactBreadcrumbImage from "../../assets/Breadcrumb.webp";

const ContactBreadcrumb = () => {
  return (
    <section
      className="ContactBreadcrumb"
      style={{ backgroundImage: `url(${contactBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="ContactBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="ContactBreadcrumb__container">
        <div className="ContactBreadcrumb__content">
          <h1 className="ContactBreadcrumb__title">Contact Us</h1>

          <nav
            className="ContactBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="ContactBreadcrumb__home"
            >
              Home
            </Link>

            <span className="ContactBreadcrumb__arrow">→</span>

            <span className="ContactBreadcrumb__current">
              Contact Us
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;