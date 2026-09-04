import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Map,
  Car,
  MapPin,
  Users,
  FileText,
  Edit3,
  Mail,
  Tag,
  UserCog,
  Settings,
  ChevronDown,
  Bus,
  X,
} from 'lucide-react';

import './Sidebar.css';

/* Brand Logo Mark — bus icon in a rounded dark tile with green glow */
const BrandMark = ({ className = '' }) => (
  <div
    className={className}
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '11px',
      background: 'linear-gradient(160deg, #1b2438 0%, #0d1320 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    <Bus size={20} color="#22c55e" strokeWidth={2.2} />
  </div>
);

const Sidebar = ({ isCollapsed, isMobileOpen, onClose }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Tapping any nav link on mobile should close the sidebar, same as the
  // cross button and the backdrop tap already do.
  const handleNavClick = () => {
    if (isMobileOpen && onClose) onClose();
  }; 

  const menuItems = [
    { type: 'link', icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/' },

    {
      type: 'dropdown',
      icon: <CalendarCheck size={20} />,
      text: 'Bookings',
      subItems: [
        { text: 'All Bookings', path: '/bookings' },
        { text: 'New Booking', path: '/bookings/new' },
        { text: 'Booking Requests', path: '/bookings/requests' },
      ],
    },

    { type: 'link', icon: <Map size={20} />, text: 'Tours', path: '/tours' },
    { type: 'link', icon: <Car size={20} />, text: 'Vehicles', path: '/vehicles' },
    { type: 'link', icon: <MapPin size={20} />, text: 'Destinations', path: '/destinations' },
    { type: 'link', icon: <Users size={20} />, text: 'Customers', path: '/customers' },

    {
      type: 'dropdown',
      icon: <FileText size={20} />,
      text: 'Pages',
      subItems: [
        { text: 'Home Page', path: '/pages/home' },
        { text: 'About Us', path: '/pages/about' },
        { text: 'Contact Us', path: '/pages/contact' },
      ],
    },

    {
      type: 'dropdown',
      icon: <Edit3 size={20} />,
      text: 'Blog',
      subItems: [
        { text: 'All Posts', path: '/blog' },
        { text: 'Add New Post', path: '/blog/new' },
        { text: 'Categories', path: '/blog/categories' },
      ],
    },

    { type: 'link', icon: <Mail size={20} />, text: 'Enquiries', path: '/enquiries' },
    { type: 'link', icon: <Tag size={20} />, text: 'Coupons', path: '/coupons' },

    {
      type: 'dropdown',
      icon: <UserCog size={20} />,
      text: 'Users',
      subItems: [
        { text: 'All Users', path: '/users' },
        { text: 'Roles & Permissions', path: '/users/roles' },
      ],
    },

    { type: 'link', icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="Sidebar-sheen" aria-hidden="true" />

      <div className="Sidebar-logo">
        <div className="Sidebar-logo-iconWrap">
          <BrandMark className="Sidebar-logo-icon" />
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="Sidebar-logo-text-group">
            <span className="Sidebar-logo-text">Jagannath Explorer</span>
            <span className="Sidebar-logo-tagline">Admin Panel</span>
          </div>
        )}

        {/* Mobile-only close button — only rendered while the mobile
            drawer is open, and hidden by CSS above the mobile breakpoint
            as a second safety net. */}
        {isMobileOpen && (
          <button
            className="Sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="Sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.type === 'link') {
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === '/'}
                title={isCollapsed ? item.text : undefined}
                onClick={handleNavClick}
                className={({ isActive }) => `Sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {(!isCollapsed || isMobileOpen) && <span className="Sidebar-text">{item.text}</span>}
              </NavLink>
            );
          }

          const isDropdownOpen = !!openDropdowns[item.text];
          return (
            <div key={index} className={`Sidebar-dropdown-wrapper ${isDropdownOpen ? 'is-open' : ''}`}>
              <button
                onClick={() => (!isCollapsed || isMobileOpen) && toggleDropdown(item.text)}
                title={isCollapsed ? item.text : undefined}
                className="Sidebar-link Sidebar-dropdown-toggle"
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {(!isCollapsed || isMobileOpen) && (
                  <>
                    <span className="Sidebar-text">{item.text}</span>
                    <ChevronDown size={16} className={`Sidebar-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                  </>
                )}
              </button>

              {(!isCollapsed || isMobileOpen) && (
                <div className="Sidebar-submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      onClick={handleNavClick}
                      className={({ isActive }) => `Sidebar-submenu-link ${isActive ? 'active' : ''}`}
                    >
                      {subItem.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;