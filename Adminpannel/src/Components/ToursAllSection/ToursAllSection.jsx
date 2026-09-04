import React, { useState, useRef } from "react";
import {
  FiEye,
  FiSave,
  FiSend,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiBriefcase,
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiCalendar,
  FiGrid,
  FiActivity,
  FiInfo, // Replaced non-existent FiLightbulb
  FiEdit2,
} from "react-icons/fi";
import "./ToursAllSection.css";

const ToursAllSection = () => {
  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    publish: true,
    seo: true,
    tourDetails: true,
    quickTips: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Publish Status States
  const [status, setStatus] = useState("Draft");
  const [visibility, setVisibility] = useState("Public");
  const [publishDate, setPublishDate] = useState("Immediately");

  // SEO Form States
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [seoImage, setSeoImage] = useState(null);
  const fileInputRef = useRef(null);

  // Tour Details States
  const [price, setPrice] = useState("299");
  const [discountPrice, setDiscountPrice] = useState("249");
  const [maxPeople, setMaxPeople] = useState("20");
  const [difficulty, setDifficulty] = useState("Easy");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("March to May");
  const [category, setCategory] = useState("");

  // Tag Lists
  const [includes, setIncludes] = useState([
    "Hotel Accommodation",
    "Meals",
    "Transportation",
    "Sightseeing",
  ]);
  const [excludes, setExcludes] = useState([
    "Personal Expenses",
    "Travel Insurance",
  ]);
  const [tags, setTags] = useState(["summer", "beach", "adventure"]);

  // Tag Input States
  const [newInclude, setNewInclude] = useState("");
  const [newExclude, setNewExclude] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddBadge = (value, setValue, list, setList) => {
    if (value.trim() && !list.includes(value.trim())) {
      setList([...list, value.trim()]);
      setValue("");
    }
  };

  const handleRemoveBadge = (itemToRemove, list, setList) => {
    setList(list.filter((item) => item !== itemToRemove));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSeoImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="tours-all-section">
      {/* Top Floating Actions */}
      <div className="tours-all-section__top-actions">
        <button type="button" className="tours-all-section__btn-secondary">
          <FiEye className="tours-all-section__btn-icon" /> Preview Tour
        </button>
        <button type="button" className="tours-all-section__btn-primary">
          <FiSave className="tours-all-section__btn-icon" /> Save Draft
        </button>
      </div>

      {/* 1. PUBLISH SECTION */}
      <div className="tours-all-section__card">
        <div
          className="tours-all-section__card-header clickable"
          onClick={() => toggleSection("publish")}
        >
          <div className="tours-all-section__header-group">
            <span className="tours-all-section__badge-icon">
              <FiSend />
            </span>
            <div>
              <h3 className="tours-all-section__heading">Publish</h3>
              <p className="tours-all-section__subheading">
                Publish your tour when you're ready
              </p>
            </div>
          </div>
          <div className="tours-all-section__chevron">
            {openSections.publish ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {openSections.publish && (
          <div className="tours-all-section__card-body">
            <div className="tours-all-section__publish-grid">
              <div className="tours-all-section__publish-left">
                <div className="tours-all-section__quick-actions">
                  <button
                    type="button"
                    className="tours-all-section__btn-action-light"
                  >
                    <FiSave /> Save Draft
                  </button>
                  <button
                    type="button"
                    className="tours-all-section__btn-action-light"
                  >
                    <FiEye /> Preview
                  </button>
                </div>

                <div className="tours-all-section__attr-list">
                  <div className="tours-all-section__attr-item">
                    <span className="tours-all-section__dot"></span>
                    <span className="tours-all-section__attr-label">Status:</span>
                    <strong className="tours-all-section__attr-value">
                      {status}
                    </strong>
                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setStatus(status === "Draft" ? "Published" : "Draft")
                      }
                    >
                      <FiEdit2 size={12} /> Edit
                    </button>
                  </div>

                  <div className="tours-all-section__attr-item">
                    <FiEye className="tours-all-section__attr-icon" />
                    <span className="tours-all-section__attr-label">
                      Visibility:
                    </span>
                    <strong className="tours-all-section__attr-value">
                      {visibility}
                    </strong>
                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setVisibility(
                          visibility === "Public" ? "Private" : "Public"
                        )
                      }
                    >
                      <FiEdit2 size={12} /> Edit
                    </button>
                  </div>

                  <div className="tours-all-section__attr-item">
                    <FiCalendar className="tours-all-section__attr-icon" />
                    <span className="tours-all-section__attr-label">Publish:</span>
                    <strong className="tours-all-section__attr-value">
                      {publishDate}
                    </strong>
                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setPublishDate(
                          publishDate === "Immediately"
                            ? "Scheduled"
                            : "Immediately"
                        )
                      }
                    >
                      <FiEdit2 size={12} /> Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="tours-all-section__graphic-container">
                <div className="tours-all-section__rocket-bubble">
                  <span className="tours-all-section__rocket-emoji">🚀</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="tours-all-section__btn-full-primary"
            >
              <FiSend /> Publish
            </button>
          </div>
        )}
      </div>

      {/* 2. SEO SETTINGS */}
      <div className="tours-all-section__card">
        <div
          className="tours-all-section__card-header clickable"
          onClick={() => toggleSection("seo")}
        >
          <div className="tours-all-section__header-group">
            <span className="tours-all-section__badge-icon">
              <FiSearch />
            </span>
            <div>
              <h3 className="tours-all-section__heading">SEO Settings</h3>
              <p className="tours-all-section__subheading">
                Optimize your tour for search engines
              </p>
            </div>
          </div>
          <div className="tours-all-section__chevron">
            {openSections.seo ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {openSections.seo && (
          <div className="tours-all-section__card-body">
            <div className="tours-all-section__seo-grid">
              <div className="tours-all-section__seo-inputs">
                <div className="tours-all-section__form-field">
                  <label className="tours-all-section__label">Meta Title</label>
                  <input
                    type="text"
                    className="tours-all-section__control"
                    maxLength={60}
                    placeholder="Enter meta title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                  <div className="tours-all-section__counter">
                    {metaTitle.length}/60
                  </div>
                </div>

                <div className="tours-all-section__form-field">
                  <label className="tours-all-section__label">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    className="tours-all-section__control tours-all-section__control--textarea"
                    maxLength={160}
                    placeholder="Enter meta description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                  <div className="tours-all-section__counter">
                    {metaDescription.length}/160
                  </div>
                </div>

                <div className="tours-all-section__form-field">
                  <label className="tours-all-section__label">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    className="tours-all-section__control"
                    placeholder="Enter focus keyword"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                  />
                </div>
              </div>

              <div className="tours-all-section__seo-media">
                <label className="tours-all-section__label">Meta Image</label>
                <div
                  className="tours-all-section__upload-box"
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="tours-all-section__file-input"
                    onChange={handleImageChange}
                  />
                  {seoImage ? (
                    <div className="tours-all-section__preview-box">
                      <img
                        src={seoImage}
                        alt="SEO Meta Preview"
                        className="tours-all-section__preview-img"
                      />
                      <span className="tours-all-section__preview-link">
                        Click to change
                      </span>
                    </div>
                  ) : (
                    <div className="tours-all-section__upload-placeholder">
                      <FiUploadCloud className="tours-all-section__upload-icon" />
                      <span className="tours-all-section__upload-title">
                        Click to upload SEO image
                      </span>
                      <span className="tours-all-section__upload-subtitle">
                        Recommended: 1200x630px
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. TOUR DETAILS */}
      <div className="tours-all-section__card">
        <div
          className="tours-all-section__card-header clickable"
          onClick={() => toggleSection("tourDetails")}
        >
          <div className="tours-all-section__header-group">
            <span className="tours-all-section__badge-icon">
              <FiBriefcase />
            </span>
            <div>
              <h3 className="tours-all-section__heading">Tour Details</h3>
              <p className="tours-all-section__subheading">
                Add pricing, availability and tour information
              </p>
            </div>
          </div>
          <div className="tours-all-section__chevron">
            {openSections.tourDetails ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {openSections.tourDetails && (
          <div className="tours-all-section__card-body">
            {/* Price Row */}
            <div className="tours-all-section__row-2">
              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">
                  Price <span className="tours-all-section__required">*</span>
                </label>
                <div className="tours-all-section__affix-wrapper">
                  <input
                    type="number"
                    className="tours-all-section__control tours-all-section__control--affix"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="tours-all-section__affix-unit">USD</span>
                </div>
              </div>

              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Discount Price</label>
                <div className="tours-all-section__affix-wrapper">
                  <input
                    type="number"
                    className="tours-all-section__control tours-all-section__control--affix"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                  <span className="tours-all-section__affix-unit">USD</span>
                </div>
              </div>
            </div>

            {/* Includes & Excludes */}
            <div className="tours-all-section__row-2">
              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Price Includes</label>
                <div className="tours-all-section__tag-box">
                  <div className="tours-all-section__tag-cluster">
                    {includes.map((item) => (
                      <span key={item} className="tours-all-section__chip">
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveBadge(item, includes, setIncludes)
                          }
                        >
                          <FiX />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tours-all-section__tag-inline">
                    <input
                      type="text"
                      placeholder="Add new..."
                      value={newInclude}
                      onChange={(e) => setNewInclude(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleAddBadge(
                          newInclude,
                          setNewInclude,
                          includes,
                          setIncludes
                        )
                      }
                    />
                    <FiChevronDown className="tours-all-section__input-icon" />
                  </div>
                </div>
              </div>

              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Price Excludes</label>
                <div className="tours-all-section__tag-box">
                  <div className="tours-all-section__tag-cluster">
                    {excludes.map((item) => (
                      <span key={item} className="tours-all-section__chip">
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveBadge(item, excludes, setExcludes)
                          }
                        >
                          <FiX />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tours-all-section__tag-inline">
                    <input
                      type="text"
                      placeholder="Add new..."
                      value={newExclude}
                      onChange={(e) => setNewExclude(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleAddBadge(
                          newExclude,
                          setNewExclude,
                          excludes,
                          setExcludes
                        )
                      }
                    />
                    <FiChevronDown className="tours-all-section__input-icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Max People & Difficulty */}
            <div className="tours-all-section__row-2">
              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Maximum People</label>
                <input
                  type="number"
                  className="tours-all-section__control"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(e.target.value)}
                />
              </div>

              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Difficulty Level</label>
                <div className="tours-all-section__select-wrapper">
                  <FiActivity className="tours-all-section__select-prefix" />
                  <select
                    className="tours-all-section__control tours-all-section__control--select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                  <FiChevronDown className="tours-all-section__select-suffix" />
                </div>
              </div>
            </div>

            {/* Best Time & Category */}
            <div className="tours-all-section__row-2">
              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">
                  Best Time to Visit
                </label>
                <div className="tours-all-section__select-wrapper">
                  <FiCalendar className="tours-all-section__select-prefix" />
                  <select
                    className="tours-all-section__control tours-all-section__control--select"
                    value={bestTimeToVisit}
                    onChange={(e) => setBestTimeToVisit(e.target.value)}
                  >
                    <option value="March to May">March to May</option>
                    <option value="June to August">June to August</option>
                    <option value="September to November">
                      September to November
                    </option>
                    <option value="December to February">
                      December to February
                    </option>
                  </select>
                  <FiChevronDown className="tours-all-section__select-suffix" />
                </div>
              </div>

              <div className="tours-all-section__form-field">
                <label className="tours-all-section__label">Tour Category</label>
                <div className="tours-all-section__select-wrapper">
                  <FiGrid className="tours-all-section__select-prefix" />
                  <select
                    className="tours-all-section__control tours-all-section__control--select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                  <FiChevronDown className="tours-all-section__select-suffix" />
                </div>
              </div>
            </div>

            {/* Tags Input */}
            <div className="tours-all-section__form-field">
              <label className="tours-all-section__label">Tags</label>
              <div className="tours-all-section__tag-box">
                <div className="tours-all-section__tag-cluster">
                  {tags.map((tag) => (
                    <span key={tag} className="tours-all-section__chip">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveBadge(tag, tags, setTags)}
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="tours-all-section__tag-inline">
                  <input
                    type="text"
                    placeholder="Add new tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleAddBadge(newTag, setNewTag, tags, setTags)
                    }
                  />
                  <FiChevronDown className="tours-all-section__input-icon" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. QUICK TIPS */}
      <div className="tours-all-section__card">
        <div
          className="tours-all-section__card-header clickable"
          onClick={() => toggleSection("quickTips")}
        >
          <div className="tours-all-section__header-group">
            <span className="tours-all-section__badge-icon">
              <FiInfo />
            </span>
            <div>
              <h3 className="tours-all-section__heading">Quick Tips</h3>
            </div>
          </div>
          <div className="tours-all-section__chevron">
            {openSections.quickTips ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        {openSections.quickTips && (
          <div className="tours-all-section__card-body">
            <div className="tours-all-section__tips-grid">
              <ul className="tours-all-section__tips-list">
                <li>
                  <FiCheckCircle className="tours-all-section__tip-icon" />
                  <span>Use high quality images for better engagement</span>
                </li>
                <li>
                  <FiCheckCircle className="tours-all-section__tip-icon" />
                  <span>Write unique meta title and description</span>
                </li>
                <li>
                  <FiCheckCircle className="tours-all-section__tip-icon" />
                  <span>Add detailed itinerary for better SEO</span>
                </li>
                <li>
                  <FiCheckCircle className="tours-all-section__tip-icon" />
                  <span>Include FAQs to reduce customer queries</span>
                </li>
              </ul>

              <div className="tours-all-section__graphic-container">
                <div className="tours-all-section__clipboard-bubble">
                  <span className="tours-all-section__clipboard-emoji">📋</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursAllSection;