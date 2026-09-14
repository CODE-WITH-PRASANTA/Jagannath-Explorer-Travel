import React, { useState } from "react";
import "./ToursBasicInformation.css";

const ToursBasicInformation = ({
  formData: externalFormData,
  setFormData: externalSetFormData,
  onSave,
  isSubmitting = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [internalFormData, setInternalFormData] = useState({
    title: "",
    slug: "",
    destination: "",
    duration: "",
    shortDescription: "",
    detailedDescription: "",
  });

  const formData = externalFormData || internalFormData;
  const setFormData = externalSetFormData || setInternalFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Auto-generate slug from title
      if (
        name === "title" &&
        (!prev.slug ||
          prev.slug ===
            prev.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, ""))
      ) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      return updated;
    });
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      title: "",
      slug: "",
      destination: "",
      duration: "",
      shortDescription: "",
      detailedDescription: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave();
    } else {
      console.log("Saved Package Data:", formData);
    }
  };

  return (
    <div className="tbi-admin-page-container">

      {/* ================= PAGE HEADER ================= */}
      <div className="tbi-page-header">
        <h1 className="tbi-page-title">Add New Tour Package</h1>

        <nav className="tbi-breadcrumbs" aria-label="breadcrumb">
          <span>Dashboard</span>
          <span className="tbi-separator">›</span>
          <span>Tour Packages</span>
          <span className="tbi-separator">›</span>
          <span className="tbi-current">Add New</span>
        </nav>
      </div>


      {/* ================= BASIC INFORMATION CARD ================= */}
      <div className="tbi-section-card">

        {/* HEADER */}
        <div
          className="tbi-section-header"
          onClick={() => setIsOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen((prev) => !prev);
            }
          }}
        >

          <div className="tbi-header-left">

            {/* ICON */}
            <div className="tbi-icon-badge">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            {/* TITLE + SUBTITLE */}
            <div className="tbi-header-content">

              <h2 className="tbi-header-title">
                1. Basic Information
              </h2>

              <p className="tbi-header-subtitle">
                Enter the essential details about your tour package
              </p>

            </div>
          </div>


          {/* CHEVRON */}
          <button
            type="button"
            className={`tbi-chevron-btn ${
              isOpen ? "tbi-open" : ""
            }`}
            aria-label="Toggle section"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

        </div>


        {/* ================= FORM ================= */}
        {isOpen && (
          <form
            onSubmit={handleSubmit}
            className="tbi-form-content"
          >

            {/* TOP GRID */}
            <div className="tbi-form-grid">

              {/* TOUR TITLE */}
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

                  <span className="tbi-counter">
                    {formData.title.length}/100
                  </span>
                </div>
              </div>


              {/* SLUG */}
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

                  <span className="tbi-counter">
                    {formData.slug.length}/100
                  </span>
                </div>
              </div>


              {/* DESTINATION */}
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


              {/* DURATION */}
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


            {/* SHORT DESCRIPTION */}
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

                <span className="tbi-counter">
                  {formData.shortDescription.length}/160
                </span>

              </div>
            </div>


            {/* DETAILED DESCRIPTION */}
            <div className="tbi-form-group tbi-full-width">

              <label className="tbi-input-label">
                Detailed Description <span className="tbi-req">*</span>
              </label>

              <div className="tbi-rich-editor-wrapper">

                {/* TOOLBAR */}
                <div className="tbi-editor-toolbar">

                  <div className="tbi-toolbar-left">

                    <span className="tbi-mock-select">
                      Normal ▾
                    </span>

                    <span className="tbi-divider" />

                    <button
                      type="button"
                      className="tbi-tool-btn tbi-bold"
                    >
                      B
                    </button>

                    <button
                      type="button"
                      className="tbi-tool-btn tbi-italic"
                    >
                      I
                    </button>

                    <button
                      type="button"
                      className="tbi-tool-btn tbi-underline"
                    >
                      U
                    </button>

                    <span className="tbi-divider" />

                    <button type="button" className="tbi-tool-btn">
                      ☰
                    </button>

                    <button type="button" className="tbi-tool-btn">
                      ☷
                    </button>

                    <button type="button" className="tbi-tool-btn">
                      ☑
                    </button>

                    <span className="tbi-divider" />

                    <button type="button" className="tbi-tool-btn">
                      🔗
                    </button>

                    <button type="button" className="tbi-tool-btn">
                      ▧
                    </button>

                  </div>

                </div>


                {/* EDITOR */}
                <div className="tbi-editor-body">

                  <textarea
                    name="detailedDescription"
                    maxLength={10000}
                    rows={8}
                    placeholder="Write detailed tour description..."
                    value={formData.detailedDescription}
                    onChange={handleChange}
                  />

                  <span className="tbi-counter">
                    {formData.detailedDescription.length}/10000
                  </span>

                </div>

              </div>
            </div>


            {/* ACTION BUTTONS */}
            <div className="tbi-form-actions">

              <button
                type="button"
                className="tbi-btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="tbi-btn-save"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : "Save Tour Package"}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default ToursBasicInformation;