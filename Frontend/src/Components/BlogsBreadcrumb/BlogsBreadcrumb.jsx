import React from "react";
import { Link } from "react-router-dom";
import "./BlogsBreadcrumb.css";

import blogsBreadcrumbImage from "../../assets/Breadcrumb.webp";

const BlogsBreadcrumb = () => {
  return (
    <section
      className="BlogsBreadcrumb"
      style={{ backgroundImage: `url(${blogsBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="BlogsBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="BlogsBreadcrumb__container">
        <div className="BlogsBreadcrumb__content">
          <h1 className="BlogsBreadcrumb__title">Our Blogs</h1>

          <nav
            className="BlogsBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="BlogsBreadcrumb__home"
            >
              Home
            </Link>

            <span className="BlogsBreadcrumb__arrow" aria-hidden="true">
              →
            </span>

            <span className="BlogsBreadcrumb__current" aria-current="page">
              Blogs
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default BlogsBreadcrumb;