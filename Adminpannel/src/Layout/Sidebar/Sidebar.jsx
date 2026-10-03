import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FiGrid,
  FiMap,
  FiHome,
  FiEdit3,
  FiBookOpen,
  FiTruck,
  FiCalendar,
  FiTag,
  FiSend,
  FiStar,
  FiImage,
  FiMessageSquare,
  FiClipboard,
  FiHeadphones,
  FiUsers,
  FiX,
  FiChevronDown,
  FiFileText,
  FiPlusSquare,
} from "react-icons/fi";

import "./Sidebar.css";

/* =========================================================
   BRAND LOGO
========================================================= */

const BrandMark = ({ className = "" }) => (
  <div
    className={className}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "11px",
      background:
        "linear-gradient(160deg, #1b2438 0%, #0d1320 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <FiTruck
      size={21}
      color="#22c55e"
      strokeWidth={2}
    />
  </div>
);

/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar = ({
  isCollapsed,
  isMobileOpen,
  onClose,
}) => {
  const location = useLocation();

  /* =======================================================
     BLOG PAGE CHECK
  ======================================================= */

  const isBlogPage =
    location.pathname === "/blog" ||
    location.pathname.startsWith("/blog/");

  const [blogOpen, setBlogOpen] = useState(isBlogPage);

  /* =======================================================
     MENU ITEMS
  ======================================================= */

  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
      icon: <FiGrid size={20} />,
    },

    {
      text: "Tour",
      path: "/tours",
      icon: <FiMap size={20} />,
    },

    {
      text: "Hotel",
      path: "/hotels",
      icon: <FiHome size={20} />,
    },

    /* =====================================================
       BLOG DROPDOWN
    ===================================================== */

    {
      type: "dropdown",
      text: "Blog",
      icon: <FiEdit3 size={20} />,
    },

    {
      text: "Our Guide",
      path: "/our-guide",
      icon: <FiBookOpen size={20} />,
    },

    {
      text: "Car Booking",
      path: "/booklead",
      icon: <FiTruck size={20} />,
    },

    {
      text: "Hotel Booking",
      path: "/bookingdetails",
      icon: <FiCalendar size={20} />,
    },

    {
      text: "Coupen",
      path: "/coupen",
      icon: <FiTag size={20} />,
    },

    {
      text: "Tour Booking",
      path: "/tourbooking",
      icon: <FiSend size={20} />,
    },

    {
      text: "Review Table",
      path: "/review",
      icon: <FiStar size={20} />,
    },

    {
      text: "Gallary",
      path: "/gallary",
      icon: <FiImage size={20} />,
    },

    {
      text: "Testimonial",
      path: "/testimonials",
      icon: <FiMessageSquare size={20} />,
    },

    {
      text: "Enquiries",
      path: "/enquiries",
      icon: <FiClipboard size={20} />,
    },

    {
      text: "Support",
      path: "/need-help",
      icon: <FiHeadphones size={20} />,
    },

    {
      text: "Coupons",
      path: "/coupons",
      icon: <FiTag size={20} />,
    },

    {
      text: "User",
      path: "/users",
      icon: <FiUsers size={20} />,
    },
  ];

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const handleNavClick = () => {
    if (isMobileOpen && onClose) {
      onClose();
    }
  };

  /* =======================================================
     BLOG DROPDOWN
  ======================================================= */

  const handleBlogToggle = () => {
    if (!isCollapsed || isMobileOpen) {
      setBlogOpen((prev) => !prev);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <aside
      className={`Sidebar ${
        isCollapsed ? "collapsed" : ""
      } ${
        isMobileOpen ? "mobile-open" : ""
      }`}
    >
      {/* ===================================================
          SIDEBAR SHEEN
      =================================================== */}

      <div
        className="Sidebar-sheen"
        aria-hidden="true"
      />

      {/* ===================================================
          LOGO
      =================================================== */}

      <div className="Sidebar-logo">
        <div className="Sidebar-logo-iconWrap">
          <BrandMark className="Sidebar-logo-icon" />
        </div>

        {(!isCollapsed || isMobileOpen) && (
          <div className="Sidebar-logo-text-group">
            <span className="Sidebar-logo-text">
              Jagannath Explorer
            </span>

            <span className="Sidebar-logo-tagline">
              Admin Panel
            </span>
          </div>
        )}

        {/* =================================================
            MOBILE CLOSE
        ================================================= */}

        {isMobileOpen && (
          <button
            type="button"
            className="Sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <nav className="Sidebar-nav">
        {menuItems.map((item) => {
          /* =================================================
             BLOG DROPDOWN
          ================================================= */

          if (item.type === "dropdown") {
            return (
              <div
                key={item.text}
                className={`Sidebar-dropdown-wrapper ${
                  blogOpen || isBlogPage
                    ? "is-open"
                    : ""
                }`}
              >
                {/* BLOG BUTTON */}

                <button
                  type="button"
                  className={`Sidebar-link Sidebar-dropdown-toggle ${
                    isBlogPage ? "active" : ""
                  }`}
                  onClick={handleBlogToggle}
                  title={
                    isCollapsed
                      ? item.text
                      : undefined
                  }
                  aria-expanded={
                    blogOpen || isBlogPage
                  }
                >
                  <span className="Sidebar-icon">
                    {item.icon}
                  </span>

                  {(!isCollapsed ||
                    isMobileOpen) && (
                    <>
                      <span className="Sidebar-text">
                        {item.text}
                      </span>

                      <FiChevronDown
                        size={16}
                        className={`Sidebar-chevron ${
                          blogOpen || isBlogPage
                            ? "rotated"
                            : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {/* =================================================
                    BLOG SUBMENU
                ================================================= */}

                {(!isCollapsed ||
                  isMobileOpen) &&
                  (blogOpen || isBlogPage) && (
                    <div className="Sidebar-submenu">

                      {/* BLOG MANAGEMENT */}

                      <NavLink
                        to="/blog"
                        end
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `Sidebar-submenu-link ${
                            isActive
                              ? "active"
                              : ""
                          }`
                        }
                      >
                        <FiFileText size={16} />

                        <span>
                          Blog Management
                        </span>
                      </NavLink>

                      {/* BLOG POST */}

                      <NavLink
                        to="/blog/new"
                        end
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `Sidebar-submenu-link ${
                            isActive
                              ? "active"
                              : ""
                          }`
                        }
                      >
                        <FiPlusSquare size={16} />

                        <span>
                          Blog Post
                        </span>
                      </NavLink>
                    </div>
                  )}
              </div>
            );
          }

          /* =================================================
             NORMAL MENU LINK
          ================================================= */

          return (
            <NavLink
              key={item.text}
              to={item.path}
              end={item.path === "/"}
              title={
                isCollapsed
                  ? item.text
                  : undefined
              }
              onClick={handleNavClick}
              className={({ isActive }) =>
                `Sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="Sidebar-icon">
                {item.icon}
              </span>

              {(!isCollapsed ||
                isMobileOpen) && (
                <span className="Sidebar-text">
                  {item.text}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;