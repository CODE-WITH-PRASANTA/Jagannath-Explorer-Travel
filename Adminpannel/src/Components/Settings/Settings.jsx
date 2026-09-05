import React, { useState, useRef } from 'react';
import './Settings.css';
import {
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaUpload,
  FaShareAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaCog,
  FaSearch,
  FaSave
} from 'react-icons/fa';

const Settings = () => {
  // Website / Company Info State
  const [logo, setLogo] = useState(
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=250'
  );
  const [companyName, setCompanyName] = useState('Jagannath Tours & Travels');
  const [tagline, setTagline] = useState('Explore. Discover. Travel Again...');
  const [aboutUs, setAboutUs] = useState(
    'Jagannath Tours & Travels is your trusted travel partner for memorable journeys across India and beyond. We provide customized tour packages, hotel bookings, and hassle-free travel experiences.'
  );

  // Contact Information State
  const [phone, setPhone] = useState('+91 98654 32100');
  const [email, setEmail] = useState('info@jagannathtours.com');
  const [address, setAddress] = useState(
    'Plot No. 123, Bapuji Nagar,\nBhubaneswar, Odisha - 751009, India'
  );
  const [websiteUrl, setWebsiteUrl] = useState('https://www.jagannathtours.com');

  // Social Media Links State
  const [facebook, setFacebook] = useState('https://facebook.com/jagannathtours');
  const [instagram, setInstagram] = useState('https://instagram.com/jagannathtours');
  const [youtube, setYoutube] = useState('https://youtube.com/@jagannathtours');
  const [twitter, setTwitter] = useState('https://twitter.com/jagannathtours');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/company/jagannathtours');

  // General Settings State
  const [websiteStatus, setWebsiteStatus] = useState(true);
  const [allowBookings, setAllowBookings] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [currency, setCurrency] = useState('INR (₹)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeZone, setTimeZone] = useState('(GMT+05:30) Asia/Kolkata');

  // SEO Settings State
  const [metaTitle, setMetaTitle] = useState(
    'Jagannath Tours & Travels | Best Travel Packages'
  );
  const [metaDescription, setMetaDescription] = useState(
    'Explore amazing travel packages, hotel bookings, and customized tours with Jagannath Tours & Travels. Your trusted travel partner in India.'
  );
  const [metaKeywords, setMetaKeywords] = useState(
    'tour packages, travel, hotels, jagannath tours, odisha tours, holiday packages'
  );

  const fileInputRef = useRef(null);

  // Change Logo Handler
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Changes Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="Settings">
      {/* Top Banner Header matching the reference photo background */}
      <div className="Settings-header-banner">
        <div className="Settings-title-area">
          <h1>Settings</h1>
          <p>Manage your website details, preferences and configurations</p>
        </div>

        {/* Travel Slogan and Flight Path Illustration */}
        <div className="Settings-banner-illustration">
          <div className="travel-text-wrapper">
            <span className="travel-script-line1">Travel</span>
            <span className="travel-script-line2">Makes Life Better</span>
          </div>
          <svg className="airplane-path-svg" viewBox="0 0 120 60" fill="none">
            <path
              d="M 10 45 Q 60 10 100 20"
              stroke="#0f172a"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <path
              d="M 98 16 L 110 22 L 98 26 Z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="Settings-form">
        <div className="Settings-grid">
          {/* Section 1: Website / Company Info */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box purple">
                <FaBuilding />
              </div>
              <div>
                <h2>Website / Company Info</h2>
                <p>Update your travel company details</p>
              </div>
            </div>

            <div className="Settings-company-layout">
              <div className="Settings-logo-block">
                <label className="Settings-label">Company Logo</label>
                <div className="Settings-logo-frame">
                  <img src={logo} alt="Company Logo" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="Settings-logo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaUpload /> Change Logo
                </button>
                <span className="Settings-subtext">
                  Recommended size: 300 x 100 px
                </span>
              </div>

              <div className="Settings-company-fields">
                <div className="Settings-field">
                  <label className="Settings-label">Company Name <span className="req">*</span></label>
                  <input
                    type="text"
                    className="Settings-input"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className="Settings-field">
                  <label className="Settings-label">Tagline</label>
                  <input
                    type="text"
                    className="Settings-input"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div className="Settings-field">
                  <label className="Settings-label">About Us</label>
                  <textarea
                    rows="4"
                    className="Settings-textarea"
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box green">
                <FaPhoneAlt />
              </div>
              <div>
                <h2>Contact Information</h2>
                <p>Update your contact details</p>
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Phone Number <span className="req">*</span></label>
              <div className="Settings-input-icon-group">
                <FaPhoneAlt className="icon" />
                <input
                  type="text"
                  className="Settings-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Email Address <span className="req">*</span></label>
              <div className="Settings-input-icon-group">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  className="Settings-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Address</label>
              <div className="Settings-input-icon-group icon-top">
                <FaMapMarkerAlt className="icon" />
                <textarea
                  rows="3"
                  className="Settings-textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Website URL</label>
              <div className="Settings-input-icon-group">
                <FaGlobe className="icon" />
                <input
                  type="url"
                  className="Settings-input"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Social Media Links */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box pink">
                <FaShareAlt />
              </div>
              <div>
                <h2>Social Media Links</h2>
                <p>Add your social media profiles</p>
              </div>
            </div>

            <div className="Settings-social-list">
              <div className="Settings-social-row">
                <div className="social-icon-btn fb"><FaFacebookF /></div>
                <input
                  type="url"
                  className="Settings-input"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>

              <div className="Settings-social-row">
                <div className="social-icon-btn insta"><FaInstagram /></div>
                <input
                  type="url"
                  className="Settings-input"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>

              <div className="Settings-social-row">
                <div className="social-icon-btn yt"><FaYoutube /></div>
                <input
                  type="url"
                  className="Settings-input"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>

              <div className="Settings-social-row">
                <div className="social-icon-btn tw"><FaTwitter /></div>
                <input
                  type="url"
                  className="Settings-input"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>

              <div className="Settings-social-row">
                <div className="social-icon-btn li"><FaLinkedinIn /></div>
                <input
                  type="url"
                  className="Settings-input"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 4: General Settings */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box orange">
                <FaCog />
              </div>
              <div>
                <h2>General Settings</h2>
                <p>Manage website preferences</p>
              </div>
            </div>

            <div className="Settings-inline-toggle">
              <span className="toggle-title">Website Status</span>
              <div className="toggle-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={websiteStatus}
                    onChange={(e) => setWebsiteStatus(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-status">
                  {websiteStatus ? 'Live (Online)' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="Settings-inline-toggle">
              <span className="toggle-title">Allow Bookings</span>
              <div className="toggle-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={allowBookings}
                    onChange={(e) => setAllowBookings(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-status">
                  {allowBookings ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="Settings-inline-toggle">
              <span className="toggle-title">Email Notifications</span>
              <div className="toggle-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-status">
                  {emailNotifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="Settings-inline-select">
              <label>Currency</label>
              <select
                className="Settings-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
              </select>
            </div>

            <div className="Settings-inline-select">
              <label>Date Format</label>
              <select
                className="Settings-select"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="Settings-inline-select">
              <label>Time Zone</label>
              <select
                className="Settings-select"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <option value="(GMT+05:30) Asia/Kolkata">
                  (GMT+05:30) Asia/Kolkata
                </option>
                <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
              </select>
            </div>
          </div>

          {/* Section 5: SEO Settings */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box blue">
                <FaSearch />
              </div>
              <div>
                <h2>SEO Settings</h2>
                <p>Update SEO meta details</p>
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Title</label>
              <input
                type="text"
                className="Settings-input"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Description</label>
              <textarea
                rows="3"
                className="Settings-textarea"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Keywords</label>
              <textarea
                rows="2"
                className="Settings-textarea"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer Decorative Background Graphic */}
        <div className="Settings-footer-graphic">
          <div className="footer-skyline-bg"></div>
          <div className="footer-tagline-wrapper">
            <span className="footer-script">Travel Beyond Boundaries</span>
            <svg className="footer-plane" viewBox="0 0 60 30" fill="none">
              <path d="M0 20 Q 30 5 50 10" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 48 8 L 56 11 L 48 14 Z" fill="#3b82f6" />
            </svg>
          </div>
        </div>

        <div className="Settings-submit-wrapper">
          <button type="submit" className="Settings-save-button">
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;