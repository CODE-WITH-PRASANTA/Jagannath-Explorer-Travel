import React from "react";
import { Link } from "react-router-dom";
import "./FaqBreadcrumb.css";

// Import your breadcrumb image
import faqBreadcrumbImage from "../../assets/Breadcrumb.webp";

const FaqBreadcrumb = () => {
  return (
    <section
      className="FaqBreadcrumb"
      style={{ backgroundImage: `url(${faqBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="FaqBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="FaqBreadcrumb__container">
        <div className="FaqBreadcrumb__content">
          <h1 className="FaqBreadcrumb__title">FAQ</h1>

          <nav
            className="FaqBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="FaqBreadcrumb__home"
            >
              Home
            </Link>

            <span className="FaqBreadcrumb__arrow">→</span>

            <span className="FaqBreadcrumb__current">
              FAQ
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default FaqBreadcrumb;