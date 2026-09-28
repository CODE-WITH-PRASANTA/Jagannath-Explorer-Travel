import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "./Settings.css";

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
  FaSave,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaExternalLinkAlt,
  FaFilter,
  FaLightbulb,
} from "react-icons/fa";

// Backend base URL (nijara port anusare change kariparibe)
const API_BASE = "http://localhost:5000";

const DEFAULT_LOGO =
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=250";

const Settings = () => {
  // =====================================================
  // FORM & UPLOAD STATES
  // =====================================================

  const [logoPreview, setLogoPreview] = useState(DEFAULT_LOGO);
  const [logoFile, setLogoFile] = useState(null);

  const [companyName, setCompanyName] = useState("Jagannath Tours & Travels");
  const [tagline, setTagline] = useState("Explore. Discover. Travel Again...");
  const [aboutUs, setAboutUs] = useState(
    "Jagannath Tours & Travels is your trusted travel partner for memorable journeys across India and beyond. We provide customized tour packages, hotel bookings, and hassle-free travel experiences."
  );

  const [phone, setPhone] = useState("+91 98654 32100");
  const [email, setEmail] = useState("info@jagannathtours.com");
  const [address, setAddress] = useState(
    "Plot No. 123, Bapuji Nagar,\nBhubaneswar, Odisha - 751009, India"
  );
  const [websiteUrl, setWebsiteUrl] = useState("https://www.jagannathtours.com");

  const [facebook, setFacebook] = useState("https://facebook.com/jagannathtours");
  const [instagram, setInstagram] = useState("https://instagram.com/jagannathtours");
  const [youtube, setYoutube] = useState("https://youtube.com/@jagannathtours");
  const [twitter, setTwitter] = useState("https://twitter.com/jagannathtours");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/jagannathtours");

  const [websiteStatus, setWebsiteStatus] = useState(true);
  const [allowBookings, setAllowBookings] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [currency, setCurrency] = useState("INR (₹)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeZone, setTimeZone] = useState("(GMT+05:30) Asia/Kolkata");

  const [metaTitle, setMetaTitle] = useState(
    "Jagannath Tours & Travels | Best Travel Packages"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Explore amazing travel packages, hotel bookings, and customized tours with Jagannath Tours & Travels. Your trusted travel partner in India."
  );
  const [metaKeywords, setMetaKeywords] = useState(
    "tour packages, travel, hotels, jagannath tours, odisha tours, holiday packages"
  );

  // Focus / suggestion state
  const [activeSuggestion, setActiveSuggestion] = useState(null);

  // Backend data & table states
  const [savedSettings, setSavedSettings] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const [tableFilter, setTableFilter] = useState("all");
  const [viewRecord, setViewRecord] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // =====================================================
  // SUGGESTIONS DATA
  // =====================================================

  const suggestions = {
    companyName: [
      "Jagannath Tours & Travels",
      "Odisha Explorer Travels",
      "Jagannath Holiday Tours",
      "Odisha Travel & Tours",
    ],
    tagline: [
      "Explore. Discover. Travel Again...",
      "Your Journey, Our Responsibility",
      "Travel Beyond Boundaries",
      "Discover More. Travel Better.",
    ],
    phone: [
      "+91 98654 32100",
      "+91 98765 43210",
      "+91 90909 80808",
      "+91 94370 12345",
    ],
    email: [
      "info@jagannathtours.com",
      "support@jagannathtours.com",
      "booking@jagannathtours.com",
      "hello@jagannathtours.com",
    ],
    address: [
      "Plot No. 123, Bapuji Nagar,\nBhubaneswar, Odisha - 751009, India",
      "Jayadev Vihar, Bhubaneswar, Odisha - 751013, India",
      "Saheed Nagar, Bhubaneswar, Odisha - 751007, India",
    ],
    websiteUrl: [
      "https://www.jagannathtours.com",
      "https://jagannathtours.com",
    ],
    facebook: [
      "https://facebook.com/jagannathtours",
      "https://facebook.com/jagannathtoursindia",
    ],
    instagram: [
      "https://instagram.com/jagannathtours",
      "https://instagram.com/jagannathtoursindia",
    ],
    youtube: [
      "https://youtube.com/@jagannathtours",
      "https://youtube.com/@jagannathtoursindia",
    ],
    twitter: [
      "https://twitter.com/jagannathtours",
      "https://x.com/jagannathtours",
    ],
    linkedin: [
      "https://linkedin.com/company/jagannathtours",
      "https://linkedin.com/company/jagannath-tours",
    ],
    metaTitle: [
      "Jagannath Tours & Travels | Best Travel Packages",
      "Jagannath Tours | Odisha Travel Packages",
      "Best Tours & Travels in Odisha",
    ],
    metaDescription: [
      "Explore amazing travel packages, hotel bookings, and customized tours with Jagannath Tours & Travels.",
      "Discover Odisha and India with customized tour packages, hotels and travel services.",
    ],
    metaKeywords: [
      "tour packages, travel, hotels, jagannath tours, odisha tours",
      "odisha tour packages, travel agency, holiday packages, hotels",
      "india travel, odisha tourism, jagannath tours, holiday tours",
    ],
  };

  // Helper to format logo path
  const formatLogoUrl = (url) => {
    if (!url) return DEFAULT_LOGO;
    if (url.startsWith("/uploads")) return `${API_BASE}${url}`;
    return url;
  };

  // =====================================================
  // API CALL: FETCH SETTINGS
  // =====================================================

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/settings`);
      if (res.data && res.data.success) {
        setSavedSettings(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =====================================================
  // LOGO UPLOAD & PREVIEW
  // =====================================================

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo size should be less than 5MB.");
      return;
    }

    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // =====================================================
  // HANDLE SUGGESTIONS
  // =====================================================

  const handleSuggestionClick = (field, value) => {
    const map = {
      companyName: setCompanyName,
      tagline: setTagline,
      phone: setPhone,
      email: setEmail,
      address: setAddress,
      websiteUrl: setWebsiteUrl,
      facebook: setFacebook,
      instagram: setInstagram,
      youtube: setYoutube,
      twitter: setTwitter,
      linkedin: setLinkedin,
      metaTitle: setMetaTitle,
      metaDescription: setMetaDescription,
      metaKeywords: setMetaKeywords,
    };

    if (map[field]) {
      map[field](value);
    }
    setActiveSuggestion(null);
  };

  const SuggestionBox = ({ field }) => {
    if (activeSuggestion !== field) return null;
    const list = suggestions[field] || [];

    return (
      <div className="Settings-suggestion-box">
        <div className="Settings-suggestion-header">
          <div className="Settings-suggestion-title">
            <FaLightbulb />
            <span>Suggested values</span>
          </div>
          <button type="button" onClick={() => setActiveSuggestion(null)}>
            <FaTimes />
          </button>
        </div>
        <div className="Settings-suggestion-list">
          {list.map((item, index) => (
            <button
              type="button"
              className="Settings-suggestion-item"
              key={`${field}-${index}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(field, item)}
            >
              <span>{item}</span>
              <FaCheckCircle />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // =====================================================
  // SAVE / UPDATE TO BACKEND (FORMDATA)
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Multer checks "logoFile"
      if (logoFile) {
        formData.append("logoFile", logoFile);
      } else {
        formData.append("logo", logoPreview);
      }

      formData.append("companyName", companyName);
      formData.append("tagline", tagline);
      formData.append("aboutUs", aboutUs);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("websiteUrl", websiteUrl);

      formData.append("facebook", facebook);
      formData.append("instagram", instagram);
      formData.append("youtube", youtube);
      formData.append("twitter", twitter);
      formData.append("linkedin", linkedin);

      formData.append("websiteStatus", String(websiteStatus));
      formData.append("allowBookings", String(allowBookings));
      formData.append("emailNotifications", String(emailNotifications));

      formData.append("currency", currency);
      formData.append("dateFormat", dateFormat);
      formData.append("timeZone", timeZone);

      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("metaKeywords", metaKeywords);

      if (editingId) {
        // UPDATE
        await axios.put(`${API_BASE}/api/settings/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Settings updated successfully!");
        setEditingId(null);
      } else {
        // CREATE
        await axios.post(`${API_BASE}/api/settings`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Settings saved successfully!");
      }

      setLogoFile(null);
      setActiveSuggestion(null);
      await fetchSettings();

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.response?.data?.message || "Failed to save settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    const targetId = item._id || item.id;
    setEditingId(targetId);

    setLogoPreview(formatLogoUrl(item.logo));
    setLogoFile(null);

    setCompanyName(item.companyName || "");
    setTagline(item.tagline || "");
    setAboutUs(item.aboutUs || "");
    setPhone(item.phone || "");
    setEmail(item.email || "");
    setAddress(item.address || "");
    setWebsiteUrl(item.websiteUrl || item.website || "");

    setFacebook(item.facebook || "");
    setInstagram(item.instagram || "");
    setYoutube(item.youtube || "");
    setTwitter(item.twitter || "");
    setLinkedin(item.linkedin || "");

    setWebsiteStatus(item.websiteStatus ?? true);
    setAllowBookings(item.allowBookings ?? true);
    setEmailNotifications(item.emailNotifications ?? true);

    setCurrency(item.currency || "INR (₹)");
    setDateFormat(item.dateFormat || "DD/MM/YYYY");
    setTimeZone(item.timeZone || "(GMT+05:30) Asia/Kolkata");

    setMetaTitle(item.metaTitle || "");
    setMetaDescription(item.metaDescription || "");
    setMetaKeywords(item.metaKeywords || "");

    setActiveSuggestion(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE FROM BACKEND
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this saved settings record?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/api/settings/${id}`);
      setSavedSettings((previous) =>
        previous.filter((item) => (item._id || item.id) !== id)
      );

      if (editingId === id) {
        setEditingId(null);
      }
      alert("Settings record deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete settings record.");
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setEditingId(null);
    setLogoFile(null);
    setLogoPreview(DEFAULT_LOGO);

    setCompanyName("Jagannath Tours & Travels");
    setTagline("Explore. Discover. Travel Again...");
    setAboutUs(
      "Jagannath Tours & Travels is your trusted travel partner for memorable journeys across India and beyond. We provide customized tour packages, hotel bookings, and hassle-free travel experiences."
    );
    setPhone("+91 98654 32100");
    setEmail("info@jagannathtours.com");
    setAddress(
      "Plot No. 123, Bapuji Nagar,\nBhubaneswar, Odisha - 751009, India"
    );
    setWebsiteUrl("https://www.jagannathtours.com");

    setFacebook("https://facebook.com/jagannathtours");
    setInstagram("https://instagram.com/jagannathtours");
    setYoutube("https://youtube.com/@jagannathtours");
    setTwitter("https://twitter.com/jagannathtours");
    setLinkedin("https://linkedin.com/company/jagannathtours");

    setWebsiteStatus(true);
    setAllowBookings(true);
    setEmailNotifications(true);

    setCurrency("INR (₹)");
    setDateFormat("DD/MM/YYYY");
    setTimeZone("(GMT+05:30) Asia/Kolkata");

    setMetaTitle("Jagannath Tours & Travels | Best Travel Packages");
    setMetaDescription(
      "Explore amazing travel packages, hotel bookings, and customized tours with Jagannath Tours & Travels. Your trusted travel partner in India."
    );
    setMetaKeywords(
      "tour packages, travel, hotels, jagannath tours, odisha tours, holiday packages"
    );

    setActiveSuggestion(null);
  };

  // =====================================================
  // SEARCH & FILTER LOGIC
  // =====================================================

  const filteredSettings = useMemo(() => {
    return savedSettings.filter((item) => {
      const search = searchTable.toLowerCase();

      const matchesSearch =
        item.companyName?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.phone?.toLowerCase().includes(search);

      const matchesFilter =
        tableFilter === "all" ||
        (tableFilter === "live" && item.websiteStatus) ||
        (tableFilter === "offline" && !item.websiteStatus);

      return matchesSearch && matchesFilter;
    });
  }, [savedSettings, searchTable, tableFilter]);

  return (
    <div className="Settings">
      {/* HEADER */}
      <div className="Settings-header-banner">
        <div className="Settings-title-area">
          <div className="Settings-title-badge">
            <FaCog />
            <span>ADMIN SETTINGS</span>
          </div>
          <h1>Website Settings</h1>
          <p>
            Manage your travel website details, preferences, social profiles and
            SEO configuration.
          </p>
        </div>

        <div className="Settings-banner-illustration">
          <div className="Settings-travel-text">
            <span>Travel</span>
            <strong>Beyond Boundaries</strong>
          </div>
          <svg
            className="Settings-airplane-path"
            viewBox="0 0 150 80"
            fill="none"
          >
            <path
              d="M5 65 C45 10 90 15 135 28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <path d="M132 21 L148 28 L132 35 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="Settings-form">
        <div className="Settings-grid">
          {/* COMPANY CARD */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box purple">
                <FaBuilding />
              </div>
              <div>
                <h2>Website / Company Info</h2>
                <p>Update your travel company information</p>
              </div>
            </div>

            <div className="Settings-company-layout">
              {/* LOGO BLOCK */}
              <div className="Settings-logo-block">
                <label className="Settings-label">Company Logo</label>
                <div className="Settings-logo-frame">
                  <img src={logoPreview} alt="Company Logo" />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  hidden
                />

                <button
                  type="button"
                  className="Settings-logo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaUpload /> Change Logo
                </button>
                <span className="Settings-subtext">
                  JPG, PNG, WEBP · Max 5MB
                </span>
              </div>

              {/* COMPANY FIELDS */}
              <div className="Settings-company-fields">
                <div className="Settings-field">
                  <label className="Settings-label">
                    Company Name <span className="Settings-required">*</span>
                  </label>
                  <div className="Settings-input-wrapper">
                    <input
                      type="text"
                      className="Settings-input"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      onFocus={() => setActiveSuggestion("companyName")}
                      autoComplete="organization"
                      required
                    />
                    <SuggestionBox field="companyName" />
                  </div>
                </div>

                <div className="Settings-field">
                  <label className="Settings-label">Tagline</label>
                  <div className="Settings-input-wrapper">
                    <input
                      type="text"
                      className="Settings-input"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      onFocus={() => setActiveSuggestion("tagline")}
                    />
                    <SuggestionBox field="tagline" />
                  </div>
                </div>

                <div className="Settings-field">
                  <label className="Settings-label">About Us</label>
                  <div className="Settings-input-wrapper">
                    <textarea
                      rows="5"
                      className="Settings-textarea"
                      value={aboutUs}
                      onChange={(e) => setAboutUs(e.target.value)}
                    />
                  </div>
                  <div className="Settings-character-count">
                    {aboutUs.length} characters
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box green">
                <FaPhoneAlt />
              </div>
              <div>
                <h2>Contact Information</h2>
                <p>Manage your business contact details</p>
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">
                Phone Number <span className="Settings-required">*</span>
              </label>
              <div className="Settings-input-wrapper">
                <div className="Settings-input-icon-group">
                  <FaPhoneAlt className="Settings-input-icon" />
                  <input
                    type="tel"
                    className="Settings-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setActiveSuggestion("phone")}
                    autoComplete="tel"
                    required
                  />
                </div>
                <SuggestionBox field="phone" />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">
                Email Address <span className="Settings-required">*</span>
              </label>
              <div className="Settings-input-wrapper">
                <div className="Settings-input-icon-group">
                  <FaEnvelope className="Settings-input-icon" />
                  <input
                    type="email"
                    className="Settings-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveSuggestion("email")}
                    autoComplete="email"
                    required
                  />
                </div>
                <SuggestionBox field="email" />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Address</label>
              <div className="Settings-input-wrapper">
                <div className="Settings-input-icon-group Settings-icon-top">
                  <FaMapMarkerAlt className="Settings-input-icon" />
                  <textarea
                    rows="3"
                    className="Settings-textarea"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => setActiveSuggestion("address")}
                    autoComplete="street-address"
                  />
                </div>
                <SuggestionBox field="address" />
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Website URL</label>
              <div className="Settings-input-wrapper">
                <div className="Settings-input-icon-group">
                  <FaGlobe className="Settings-input-icon" />
                  <input
                    type="url"
                    className="Settings-input"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onFocus={() => setActiveSuggestion("websiteUrl")}
                    autoComplete="url"
                  />
                </div>
                <SuggestionBox field="websiteUrl" />
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box pink">
                <FaShareAlt />
              </div>
              <div>
                <h2>Social Media Links</h2>
                <p>Connect your social media profiles</p>
              </div>
            </div>

            <div className="Settings-social-list">
              <div className="Settings-social-row">
                <div className="Settings-social-icon fb">
                  <FaFacebookF />
                </div>
                <div className="Settings-input-wrapper">
                  <input
                    type="url"
                    className="Settings-input"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    onFocus={() => setActiveSuggestion("facebook")}
                    autoComplete="url"
                  />
                  <SuggestionBox field="facebook" />
                </div>
              </div>

              <div className="Settings-social-row">
                <div className="Settings-social-icon insta">
                  <FaInstagram />
                </div>
                <div className="Settings-input-wrapper">
                  <input
                    type="url"
                    className="Settings-input"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    onFocus={() => setActiveSuggestion("instagram")}
                    autoComplete="url"
                  />
                  <SuggestionBox field="instagram" />
                </div>
              </div>

              <div className="Settings-social-row">
                <div className="Settings-social-icon yt">
                  <FaYoutube />
                </div>
                <div className="Settings-input-wrapper">
                  <input
                    type="url"
                    className="Settings-input"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    onFocus={() => setActiveSuggestion("youtube")}
                    autoComplete="url"
                  />
                  <SuggestionBox field="youtube" />
                </div>
              </div>

              <div className="Settings-social-row">
                <div className="Settings-social-icon tw">
                  <FaTwitter />
                </div>
                <div className="Settings-input-wrapper">
                  <input
                    type="url"
                    className="Settings-input"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    onFocus={() => setActiveSuggestion("twitter")}
                    autoComplete="url"
                  />
                  <SuggestionBox field="twitter" />
                </div>
              </div>

              <div className="Settings-social-row">
                <div className="Settings-social-icon li">
                  <FaLinkedinIn />
                </div>
                <div className="Settings-input-wrapper">
                  <input
                    type="url"
                    className="Settings-input"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    onFocus={() => setActiveSuggestion("linkedin")}
                    autoComplete="url"
                  />
                  <SuggestionBox field="linkedin" />
                </div>
              </div>
            </div>
          </div>

          {/* GENERAL SETTINGS */}
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

            <div className="Settings-setting-row">
              <div>
                <strong>Website Status</strong>
                <span>Control website visibility</span>
              </div>
              <div className="Settings-toggle-wrapper">
                <label className="Settings-switch">
                  <input
                    type="checkbox"
                    checked={websiteStatus}
                    onChange={(e) => setWebsiteStatus(e.target.checked)}
                  />
                  <span className="Settings-slider" />
                </label>
                <span
                  className={
                    websiteStatus
                      ? "Settings-toggle-status active"
                      : "Settings-toggle-status"
                  }
                >
                  {websiteStatus ? "Live" : "Offline"}
                </span>
              </div>
            </div>

            <div className="Settings-setting-row">
              <div>
                <strong>Allow Bookings</strong>
                <span>Allow customers to submit bookings</span>
              </div>
              <div className="Settings-toggle-wrapper">
                <label className="Settings-switch">
                  <input
                    type="checkbox"
                    checked={allowBookings}
                    onChange={(e) => setAllowBookings(e.target.checked)}
                  />
                  <span className="Settings-slider" />
                </label>
                <span
                  className={
                    allowBookings
                      ? "Settings-toggle-status active"
                      : "Settings-toggle-status"
                  }
                >
                  {allowBookings ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="Settings-setting-row">
              <div>
                <strong>Email Notifications</strong>
                <span>Receive admin email notifications</span>
              </div>
              <div className="Settings-toggle-wrapper">
                <label className="Settings-switch">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className="Settings-slider" />
                </label>
                <span
                  className={
                    emailNotifications
                      ? "Settings-toggle-status active"
                      : "Settings-toggle-status"
                  }
                >
                  {emailNotifications ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="Settings-select-grid">
              <div className="Settings-select-group">
                <label>Currency</label>
                <select
                  className="Settings-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div className="Settings-select-group">
                <label>Date Format</label>
                <select
                  className="Settings-select"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                >
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div className="Settings-select-group">
                <label>Time Zone</label>
                <select
                  className="Settings-select"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  <option>(GMT+05:30) Asia/Kolkata</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEO SETTINGS */}
          <div className="Settings-card">
            <div className="Settings-card-header">
              <div className="Settings-icon-box blue">
                <FaSearch />
              </div>
              <div>
                <h2>SEO Settings</h2>
                <p>Optimize your website for search engines</p>
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Title</label>
              <div className="Settings-input-wrapper">
                <input
                  type="text"
                  className="Settings-input"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  onFocus={() => setActiveSuggestion("metaTitle")}
                  maxLength="60"
                />
                <SuggestionBox field="metaTitle" />
              </div>
              <div className="Settings-character-count">
                {metaTitle.length}/60
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Description</label>
              <div className="Settings-input-wrapper">
                <textarea
                  rows="4"
                  className="Settings-textarea"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  onFocus={() => setActiveSuggestion("metaDescription")}
                  maxLength="160"
                />
                <SuggestionBox field="metaDescription" />
              </div>
              <div className="Settings-character-count">
                {metaDescription.length}/160
              </div>
            </div>

            <div className="Settings-field">
              <label className="Settings-label">Meta Keywords</label>
              <div className="Settings-input-wrapper">
                <textarea
                  rows="3"
                  className="Settings-textarea"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  onFocus={() => setActiveSuggestion("metaKeywords")}
                />
                <SuggestionBox field="metaKeywords" />
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="Settings-action-bar">
          <div className="Settings-action-info">
            <div className="Settings-action-icon">
              <FaCheckCircle />
            </div>
            <div>
              <strong>
                {editingId
                  ? "Editing Saved Settings"
                  : "Ready to save your settings"}
              </strong>
              <span>
                {editingId
                  ? "Update the details and save your changes to the database."
                  : "All changes will persist directly to the database."}
              </span>
            </div>
          </div>

          <div className="Settings-action-buttons">
            {editingId && (
              <button
                type="button"
                className="Settings-cancel-button"
                onClick={() => setEditingId(null)}
              >
                <FaTimes /> Cancel
              </button>
            )}

            <button
              type="button"
              className="Settings-reset-button"
              onClick={resetForm}
            >
              Reset
            </button>

            <button
              type="submit"
              className="Settings-save-button"
              disabled={isSubmitting}
            >
              <FaSave />{" "}
              {isSubmitting
                ? "Saving..."
                : editingId
                ? "Update Settings"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </form>

      {/* SAVED SETTINGS TABLE */}
      <section className="Settings-table-section">
        <div className="Settings-table-header">
          <div className="Settings-table-title">
            <div className="Settings-table-icon">
              <FaCheckCircle />
            </div>
            <div>
              <h2>Saved Website Settings</h2>
              <p>View and manage previously saved configurations</p>
            </div>
          </div>
          <div className="Settings-table-count">
            <span>{filteredSettings.length}</span> Records
          </div>
        </div>

        <div className="Settings-table-toolbar">
          <div className="Settings-search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search company, email or phone..."
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
            />
            {searchTable && (
              <button type="button" onClick={() => setSearchTable("")}>
                <FaTimes />
              </button>
            )}
          </div>

          <div className="Settings-filter-box">
            <FaFilter />
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="live">Live</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="Settings-table-wrapper">
          <table className="Settings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Website</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Saved At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSettings.length > 0 ? (
                filteredSettings.map((item, index) => {
                  const recordId = item._id || item.id;
                  const displayLogo = formatLogoUrl(item.logo);
                  const displayDate = item.createdAt
                    ? new Date(item.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : item.savedAt || "—";

                  return (
                    <tr key={recordId}>
                      <td>
                        <span className="Settings-row-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>

                      <td>
                        <div className="Settings-company-cell">
                          <div className="Settings-company-avatar">
                            {item.companyName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <strong>{item.companyName}</strong>
                            <span>
                              {item.metaTitle?.substring(0, 35)}
                              {item.metaTitle?.length > 35 ? "..." : ""}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="Settings-contact-cell">
                          <span>
                            <FaPhoneAlt /> {item.phone}
                          </span>
                          <span>
                            <FaEnvelope /> {item.email}
                          </span>
                        </div>
                      </td>

                      <td>
                        {(item.website || item.websiteUrl) && (
                          <a
                            href={item.websiteUrl || item.website}
                            target="_blank"
                            rel="noreferrer"
                            className="Settings-website-link"
                          >
                            <FaGlobe /> Visit <FaExternalLinkAlt />
                          </a>
                        )}
                      </td>

                      <td>
                        <span className="Settings-currency-badge">
                          {item.currency}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            item.websiteStatus
                              ? "Settings-status-badge live"
                              : "Settings-status-badge offline"
                          }
                        >
                          <span className="Settings-status-dot" />
                          {item.websiteStatus ? "Live" : "Offline"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            item.allowBookings
                              ? "Settings-booking-badge enabled"
                              : "Settings-booking-badge disabled"
                          }
                        >
                          {item.allowBookings ? "Enabled" : "Disabled"}
                        </span>
                      </td>

                      <td>
                        <div className="Settings-date-cell">
                          <FaClock />
                          {displayDate}
                        </div>
                      </td>

                      <td>
                        <div className="Settings-table-actions">
                          <button
                            type="button"
                            className="Settings-view-action"
                            onClick={() =>
                              setViewRecord({ ...item, logo: displayLogo })
                            }
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            className="Settings-edit-action"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            className="Settings-delete-action"
                            onClick={() => handleDelete(recordId)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="Settings-empty-table">
                    <FaSearch />
                    <h3>{loading ? "Loading..." : "No settings found"}</h3>
                    <p>Try changing your search or filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* VIEW MODAL */}
      {viewRecord && (
        <div
          className="Settings-modal-overlay"
          onClick={() => setViewRecord(null)}
        >
          <div
            className="Settings-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="Settings-modal-header">
              <div>
                <span>SAVED CONFIGURATION</span>
                <h2>{viewRecord.companyName}</h2>
              </div>
              <button type="button" onClick={() => setViewRecord(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="Settings-modal-body">
              <div className="Settings-modal-logo">
                <img
                  src={formatLogoUrl(viewRecord.logo)}
                  alt="Company Logo Preview"
                />
              </div>

              <div className="Settings-modal-grid">
                <div>
                  <span>Tagline</span>
                  <strong>{viewRecord.tagline || "—"}</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>{viewRecord.phone}</strong>
                </div>
                <div>
                  <span>Email</span>
                  <strong>{viewRecord.email}</strong>
                </div>
                <div>
                  <span>Currency</span>
                  <strong>{viewRecord.currency}</strong>
                </div>
                <div>
                  <span>Website</span>
                  <strong>
                    {viewRecord.websiteUrl || viewRecord.website || "—"}
                  </strong>
                </div>
                <div>
                  <span>Date Format</span>
                  <strong>{viewRecord.dateFormat || "—"}</strong>
                </div>
                <div>
                  <span>Bookings</span>
                  <strong>
                    {viewRecord.allowBookings ? "Enabled" : "Disabled"}
                  </strong>
                </div>
                <div>
                  <span>Notifications</span>
                  <strong>
                    {viewRecord.emailNotifications ? "Enabled" : "Disabled"}
                  </strong>
                </div>
              </div>

              <div className="Settings-modal-description">
                <span>Address</span>
                <p>{viewRecord.address || "—"}</p>
              </div>

              <div className="Settings-modal-description">
                <span>SEO Meta Title</span>
                <p>{viewRecord.metaTitle || "—"}</p>
              </div>
            </div>

            <div className="Settings-modal-footer">
              <button
                type="button"
                className="Settings-modal-close"
                onClick={() => setViewRecord(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="Settings-modal-edit"
                onClick={() => {
                  handleEdit(viewRecord);
                  setViewRecord(null);
                }}
              >
                <FaEdit /> Edit Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;