import React from "react";
import { Link } from "react-router-dom";
import "./GalleryBreadcrumb.css";

import galleryBreadcrumbImage from "../../assets/Breadcrumb.webp";

const GalleryBreadcrumb = () => {
  return (
    <section
      className="GalleryBreadcrumb"
      style={{ backgroundImage: `url(${galleryBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="GalleryBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="GalleryBreadcrumb__container">
        <div className="GalleryBreadcrumb__content">
          <h1 className="GalleryBreadcrumb__title">Gallery</h1>

          <nav
            className="GalleryBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="GalleryBreadcrumb__home"
            >
              Home
            </Link>

            <span className="GalleryBreadcrumb__arrow">→</span>

            <span className="GalleryBreadcrumb__current">
              Gallery
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default GalleryBreadcrumb;