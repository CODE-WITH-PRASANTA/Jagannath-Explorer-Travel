import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Map,
  Hotel,
  Edit3,
  Image,
  MessageSquareQuote,
  Mail,
  Tag,
  User,
  Settings,
  Bus,
  X,
  ChevronDown,
  BookOpen,
} from "lucide-react";

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
    <Bus
      size={20}
      color="#22c55e"
      strokeWidth={2.2}
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

  /* Blog dropdown automatically opens on Blog pages */
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
      icon: <LayoutDashboard size={20} />,
    },

    {
      text: "Tour",
      path: "/tours",
      icon: <Map size={20} />,
    },

    {
      text: "Hotel",
      path: "/hotels",
      icon: <Hotel size={20} />,
    },

    /* =====================================================
       BLOG DROPDOWN
    ===================================================== */

    {
      type: "dropdown",
      text: "Blog",
      icon: <Edit3 size={20} />,
    },

    {
      text: "Our Guide",
      path: "/our-guide",
      icon: <BookOpen size={20} />,
    },
    {
      text: "Car Booking",
      path: "/booklead",
      icon: <BookOpen size={20} />,
    },
{
      text: "Hotel Booking",
      path: "/bookingdetails",
      icon: <BookOpen size={20} />,
    },
    {
      text: "Tour Booking",
      path: "/tourbooking",
      icon: <BookOpen size={20} />,
    },


    {
      text: "Gallary",
      path: "/gallary",
      icon: <Image size={20} />,
    },

    {
      text: "Testimonial",
      path: "/testimonials",
      icon: <MessageSquareQuote size={20} />,
    },

    {
      text: "Enquiries",
      path: "/enquiries",
      icon: <Mail size={20} />,
    },

    {
      text: "Coupons",
      path: "/coupons",
      icon: <Tag size={20} />,
    },

    {
      text: "User",
      path: "/users",
      icon: <User size={20} />,
    },

    {
      text: "Setting",
      path: "/settings",
      icon: <Settings size={20} />,
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
     BLOG DROPDOWN TOGGLE
  ======================================================= */

  const handleBlogToggle = () => {
    if (!isCollapsed || isMobileOpen) {
      setBlogOpen((prev) => !prev);
    }
  };

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

        {/* Mobile close button */}

        {isMobileOpen && (
          <button
            type="button"
            className="Sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
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
                {/* Blog Main Button */}

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
                >
                  <span className="Sidebar-icon">
                    {item.icon}
                  </span>

                  {(!isCollapsed ||
                    isMobileOpen) && (
                    <>
                      <span className="Sidebar-text">
                        Blog
                      </span>

                      <ChevronDown
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

                      {/* Blog Management */}

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
                        Blog Management
                      </NavLink>

                      {/* Blog Post */}

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
                        Blog Post
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