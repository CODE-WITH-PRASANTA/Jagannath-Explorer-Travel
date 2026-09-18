import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  ChevronDown,
  Bell,
  Mail,
  Search,
  User,
  LogOut,
  Shield,
  Maximize,
  Minimize,
  X,
} from 'lucide-react';
import './Topbar.css';

const BACKEND_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = `${BACKEND_BASE_URL}/api/profiles`;

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';

// Avatar URL helper
const getAvatarUrl = (path) => {
  if (!path) return DEFAULT_AVATAR;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  return `${BACKEND_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Profile data states
  const [currentProfile, setCurrentProfile] = useState({
    name: 'Admin User',
    email: 'admin@jagannathexplorer.com',
    travelerType: 'Super Admin',
    avatar: DEFAULT_AVATAR,
  });

  const dropdownRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Fetch initial profile on mount
  const fetchTopProfile = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const result = await res.json();
      if (result.success && result.data?.length > 0) {
        setCurrentProfile(result.data[0]);
      }
    } catch (err) {
      console.error('Failed to load profile in topbar:', err);
    }
  };

  useEffect(() => {
    fetchTopProfile();

    // Listen for updates triggered by Myprofile.jsx
    const handleProfileUpdate = (e) => {
      if (e.detail) {
        setCurrentProfile(e.detail);
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  const closeAllMenus = () => {
    setDropdownOpen(false);
    setNotificationsOpen(false);
    setMailOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllMenus();
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Autofocus the mobile search field
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const openMenu = (setter) => {
    closeAllMenus();
    setter(true);
  };

  return (
    <>
      <header className="Topbar">
        <div className={`Topbar-inner ${mobileSearchOpen ? 'is-hidden' : ''}`}>
          <div className="Topbar-left">
            <button
              className="Topbar-toggle-btn"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="Topbar-search-box">
              <Search size={16} className="Topbar-search-icon" />
              <input
                type="text"
                placeholder="Search here..."
                className="Topbar-search-input"
                aria-label="Search"
              />
              <kbd className="Topbar-search-shortcut">Ctrl /</kbd>
            </div>
          </div>

          <div className="Topbar-right" ref={dropdownRef}>
            {/* Mobile search trigger */}
            <button
              className="Topbar-action-btn Topbar-mobile-search-btn"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* Notifications */}
            <div className="Topbar-action-wrapper">
              <button
                className={`Topbar-action-btn ${notificationsOpen ? 'active' : ''}`}
                onClick={() =>
                  notificationsOpen ? closeAllMenus() : openMenu(setNotificationsOpen)
                }
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={18} />
                <span className="Topbar-badge">3</span>
              </button>

              {notificationsOpen && (
                <div className="Topbar-dropdown Topbar-notifications-dropdown">
                  <div className="Topbar-dropdown-header">
                    <span className="Topbar-dropdown-title">Notifications</span>
                    <span className="Topbar-dropdown-badge">3 New</span>
                  </div>
                  <div className="Topbar-notification-list">
                    <div className="Topbar-notification-item">
                      <div className="Topbar-notification-dot" />
                      <div>
                        <p className="Topbar-notification-text">
                          New order <strong>#WDMS-9402</strong> placed.
                        </p>
                        <span className="Topbar-notification-time">5 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="Topbar-action-wrapper">
              <button
                className={`Topbar-action-btn ${mailOpen ? 'active' : ''}`}
                onClick={() => (mailOpen ? closeAllMenus() : openMenu(setMailOpen))}
                aria-label="Messages"
                aria-expanded={mailOpen}
              >
                <Mail size={18} />
                <span className="Topbar-badge">2</span>
              </button>

              {mailOpen && (
                <div className="Topbar-dropdown Topbar-notifications-dropdown">
                  <div className="Topbar-dropdown-header">
                    <span className="Topbar-dropdown-title">Messages</span>
                    <span className="Topbar-dropdown-badge">2 New</span>
                  </div>
                  <div className="Topbar-notification-list">
                    <div className="Topbar-notification-item">
                      <div className="Topbar-notification-dot" />
                      <div>
                        <p className="Topbar-notification-text">
                          <strong>Support Team</strong> replied to your ticket.
                        </p>
                        <span className="Topbar-notification-time">10 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen toggle */}
            <button
              className="Topbar-action-btn Topbar-fullscreen-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>

            {/* User Profile Menu */}
            <div
              className={`Topbar-user ${dropdownOpen ? 'active' : ''}`}
              onClick={() => (dropdownOpen ? closeAllMenus() : openMenu(setDropdownOpen))}
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  dropdownOpen ? closeAllMenus() : openMenu(setDropdownOpen);
                }
              }}
            >
              <div className="Topbar-avatar-wrapper">
                <img
                  src={getAvatarUrl(currentProfile.avatar)}
                  alt={`${currentProfile.name} avatar`}
                  className="Topbar-avatar"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
                <span className="Topbar-status-indicator" />
              </div>

              <div className="Topbar-user-info">
                <span className="Topbar-username">{currentProfile.name || 'Admin User'}</span>
                <span className="Topbar-role">{currentProfile.travelerType || 'Super Admin'}</span>
              </div>

              <ChevronDown size={15} className={`Topbar-chevron ${dropdownOpen ? 'open' : ''}`} />

              {dropdownOpen && (
                <div
                  className="Topbar-dropdown Topbar-user-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="Topbar-user-card">
                    <p className="Topbar-card-name">{currentProfile.name}</p>
                    <p className="Topbar-card-email">{currentProfile.email}</p>
                  </div>

                  <div className="Topbar-dropdown-divider" />

                  <Link
                    to="/profile"
                    className="Topbar-dropdown-item"
                    onClick={closeAllMenus}
                  >
                    <User size={16} /> My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="Topbar-dropdown-item"
                    onClick={closeAllMenus}
                  >
                    <Shield size={16} /> Security &amp; Settings
                  </Link>

                  <div className="Topbar-dropdown-divider" />

                  <Link
                    to="/logout"
                    className="Topbar-dropdown-item logout"
                    onClick={closeAllMenus}
                  >
                    <LogOut size={16} /> Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search overlay */}
        {mobileSearchOpen && (
          <div className="Topbar-mobile-search-overlay">
            <Search size={16} className="Topbar-search-icon" />
            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Search here..."
              className="Topbar-mobile-search-input"
              aria-label="Search"
            />
            <button
              className="Topbar-mobile-search-close"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </header>

      <div className="Topbar-spacer" aria-hidden="true" />
    </>
  );
};

export default Topbar;