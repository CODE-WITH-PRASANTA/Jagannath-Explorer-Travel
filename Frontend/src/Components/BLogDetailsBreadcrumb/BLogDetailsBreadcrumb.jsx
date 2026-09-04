import React from "react";
import { Link } from "react-router-dom";
import "./BlogDetailsBreadcrumb.css";

import blogBreadcrumbImage from "../../assets/Breadcrumb.webp";

const BlogDetailsBreadcrumb = ({ title = "Blog Details", category = "Blog" }) => {
  return (
    <section
      className="BlogDetailsBreadcrumb"
      style={{ backgroundImage: `url(${blogBreadcrumbImage})` }}
    >
      {/* Dark Overlay */}
      <div className="BlogDetailsBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="BlogDetailsBreadcrumb__container">
        <div className="BlogDetailsBreadcrumb__content">
          <h1 className="BlogDetailsBreadcrumb__title">{title}</h1>

          <nav
            className="BlogDetailsBreadcrumb__navigation"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="BlogDetailsBreadcrumb__link">
              Home
            </Link>

            <span className="BlogDetailsBreadcrumb__arrow">→</span>

            <Link to="/blog" className="BlogDetailsBreadcrumb__link">
              {category}
            </Link>

            <span className="BlogDetailsBreadcrumb__arrow">→</span>

            <span className="BlogDetailsBreadcrumb__current">
              {title}
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsBreadcrumb;