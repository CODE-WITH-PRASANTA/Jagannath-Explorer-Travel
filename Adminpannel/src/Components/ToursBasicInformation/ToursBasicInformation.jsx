import React, { useState } from 'react';
import './ToursBasicInformation.css';

const ToursBasicInformation = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    destination: '',
    duration: '',
    shortDescription: '',
    detailedDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      slug: '',
      destination: '',
      duration: '',
      shortDescription: '',
      detailedDescription: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Package Data:', formData);
  };

  return (
    <div className="tbi-admin-page-container">
      {/* Top Header & Breadcrumbs */}
      <div className="tbi-page-header">
        <h1 className="tbi-page-title">Add New Tour Package</h1>
        <nav className="tbi-breadcrumbs" aria-label="breadcrumb">
          <span>Dashboard</span>
          <span className="tbi-separator">&gt;</span>
          <span>Tour Packages</span>
          <span className="tbi-separator">&gt;</span>
          <span className="tbi-current">Add New</span>
        </nav>
      </div>

      {/* Accordion Card */}
      <div className="tbi-section-card">
        {/* Accordion Header */}
        <div
          className="tbi-section-header"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
        >
          <div className="tbi-header-left">
            <div className="tbi-icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span className="tbi-header-title">1. Basic Information</span>
          </div>
          <button
            type="button"
            className={`tbi-chevron-btn ${isOpen ? 'tbi-open' : ''}`}
            aria-label="Toggle section"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <form onSubmit={handleSubmit} className="tbi-form-content">
            <div className="tbi-form-grid">
              {/* Tour Title */}
              <div className="tbi-form-group">
                <label className="tbi-input-label">
                  Tour Title <span className="tbi-req">*</span>
                </label>
                <div className="tbi-input-with-counter">
                  <input
                    type="text"
                    name="title"
                    maxLength={100}
                    placeholder="Enter attractive tour title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <span className="tbi-counter">{formData.title.length}/100</span>
                </div>
              </div>

              {/* Slug */}
              <div className="tbi-form-group">
                <label className="tbi-input-label">
                  Slug <span className="tbi-req">*</span>
                </label>
                <div className="tbi-input-with-counter">
                  <input
                    type="text"
                    name="slug"
                    maxLength={100}
                    placeholder="tour-slug-url"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                  <span className="tbi-counter">{formData.slug.length}/100</span>
                </div>
              </div>

              {/* Destination */}
              <div className="tbi-form-group">
                <label className="tbi-input-label">
                  Destination <span className="tbi-req">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  className="tbi-plain-input"
                  placeholder="Enter destination"
                  value={formData.destination}
                  onChange={handleChange}
                />
              </div>

              {/* Tour Duration */}
              <div className="tbi-form-group">
                <label className="tbi-input-label">
                  Tour Duration <span className="tbi-req">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  className="tbi-plain-input"
                  placeholder="Enter duration (e.g. 5 Days 4 Nights)"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="tbi-form-group tbi-full-width">
              <label className="tbi-input-label">
                Short Description <span className="tbi-req">*</span>
              </label>
              <div className="tbi-textarea-with-counter">
                <textarea
                  name="shortDescription"
                  maxLength={160}
                  rows={4}
                  placeholder="Enter short description for tour (will be visible on tour card)"
                  value={formData.shortDescription}
                  onChange={handleChange}
                />
                <span className="tbi-counter">{formData.shortDescription.length}/160</span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="tbi-form-group tbi-full-width">
              <label className="tbi-input-label">
                Detailed Description <span className="tbi-req">*</span>
              </label>
              <div className="tbi-rich-editor-wrapper">
                <div className="tbi-editor-toolbar">
                  <div className="tbi-toolbar-left">
                    <span className="tbi-mock-select">Normal ▾</span>
                    <span className="tbi-divider"></span>
                    <button type="button" className="tbi-tool-btn tbi-bold">B</button>
                    <button type="button" className="tbi-tool-btn tbi-italic">I</button>
                    <button type="button" className="tbi-tool-btn tbi-underline">U</button>
                    <span className="tbi-divider"></span>
                    <button type="button" className="tbi-tool-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </button>
                    <button type="button" className="tbi-tool-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="10" y1="6" x2="21" y2="6"></line>
                        <line x1="10" y1="12" x2="21" y2="12"></line>
                        <line x1="10" y1="18" x2="21" y2="18"></line>
                        <path d="M4 6h1v4"></path>
                        <path d="M4 10h2"></path>
                      </svg>
                    </button>
                    <button type="button" className="tbi-tool-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                    </button>
                    <span className="tbi-divider"></span>
                    <button type="button" className="tbi-tool-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </button>
                    <button type="button" className="tbi-tool-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="tbi-editor-body">
                  <textarea
                    name="detailedDescription"
                    maxLength={10000}
                    rows={8}
                    placeholder="Write detailed tour description..."
                    value={formData.detailedDescription}
                    onChange={handleChange}
                  />
                  <span className="tbi-counter">{formData.detailedDescription.length}/10000</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="tbi-form-actions">
              <button type="button" className="tbi-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="tbi-btn-save">
                Save Tour Package
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ToursBasicInformation;