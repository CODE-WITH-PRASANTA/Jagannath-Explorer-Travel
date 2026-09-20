import React, { useState, useRef } from "react";
import {
  FiEye,
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
  FiInfo,
  FiEdit2,
} from "react-icons/fi";
import "./ToursAllSection.css";

const ToursAllSection = ({
  status: externalStatus,
  setStatus: externalSetStatus,

  visibility: externalVisibility,
  setVisibility: externalSetVisibility,

  publishDate: externalPublishDate,
  setPublishDate: externalSetPublishDate,

  metaTitle: externalMetaTitle,
  setMetaTitle: externalSetMetaTitle,

  metaDescription: externalMetaDescription,
  setMetaDescription: externalSetMetaDescription,

  focusKeyword: externalFocusKeyword,
  setFocusKeyword: externalSetFocusKeyword,

  seoImage: externalSeoImage,
  setSeoImage: externalSetSeoImage,

  onSeoFileChange,

  price: externalPrice,
  setPrice: externalSetPrice,

  discountPrice: externalDiscountPrice,
  setDiscountPrice: externalSetDiscountPrice,

  maxPeople: externalMaxPeople,
  setMaxPeople: externalSetMaxPeople,

  difficulty: externalDifficulty,
  setDifficulty: externalSetDifficulty,

  bestTimeToVisit: externalBestTimeToVisit,
  setBestTimeToVisit: externalSetBestTimeToVisit,

  category: externalCategory,
  setCategory: externalSetCategory,

  includes: externalIncludes,
  setIncludes: externalSetIncludes,

  excludes: externalExcludes,
  setExcludes: externalSetExcludes,

  tags: externalTags,
  setTags: externalSetTags,

  onSubmit,

  isSubmitting: externalIsSubmitting,

  toastMessage: externalToastMessage,
  showToast: externalShowToast,
}) => {
  /* =========================================================
     ACCORDION STATES
     ========================================================= */

  const [openSections, setOpenSections] = useState({
    publish: true,
    seo: true,
    tourDetails: true,
    quickTips: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* =========================================================
     INTERNAL FALLBACK STATES
     ========================================================= */

  const [internalIsSubmitting, setInternalIsSubmitting] =
    useState(false);

  const [internalToastMessage, setInternalToastMessage] =
    useState(null);

  const isSubmitting =
    externalIsSubmitting !== undefined
      ? externalIsSubmitting
      : internalIsSubmitting;

  const toastMessage =
    externalToastMessage !== undefined
      ? externalToastMessage
      : internalToastMessage;

  const showToast =
    externalShowToast ||
    ((message) => {
      setInternalToastMessage(message);

      setTimeout(() => {
        setInternalToastMessage(null);
      }, 3000);
    });

  /* =========================================================
     PUBLISH STATUS
     ========================================================= */

  const [internalStatus, setInternalStatus] =
    useState("Draft");

  const [internalVisibility, setInternalVisibility] =
    useState("Public");

  const [internalPublishDate, setInternalPublishDate] =
    useState("Immediately");

  const status =
    externalStatus !== undefined
      ? externalStatus
      : internalStatus;

  const setStatus =
    externalSetStatus || setInternalStatus;

  const visibility =
    externalVisibility !== undefined
      ? externalVisibility
      : internalVisibility;

  const setVisibility =
    externalSetVisibility || setInternalVisibility;

  const publishDate =
    externalPublishDate !== undefined
      ? externalPublishDate
      : internalPublishDate;

  const setPublishDate =
    externalSetPublishDate || setInternalPublishDate;

  /* =========================================================
     SUBMIT
     ========================================================= */

  const handleSubmitAction = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      if (isSubmitting) return;

      setInternalIsSubmitting(true);

      setTimeout(() => {
        setInternalIsSubmitting(false);
        setStatus("Published");

        showToast(
          "Tour submitted and published successfully!"
        );
      }, 1000);
    }
  };

  /* =========================================================
     SEO STATES
     ========================================================= */

  const [internalMetaTitle, setInternalMetaTitle] =
    useState("");

  const [internalMetaDescription, setInternalMetaDescription] =
    useState("");

  const [internalFocusKeyword, setInternalFocusKeyword] =
    useState("");

  const [internalSeoImage, setInternalSeoImage] =
    useState(null);

  const metaTitle =
    externalMetaTitle !== undefined
      ? externalMetaTitle
      : internalMetaTitle;

  const setMetaTitle =
    externalSetMetaTitle || setInternalMetaTitle;

  const metaDescription =
    externalMetaDescription !== undefined
      ? externalMetaDescription
      : internalMetaDescription;

  const setMetaDescription =
    externalSetMetaDescription ||
    setInternalMetaDescription;

  const focusKeyword =
    externalFocusKeyword !== undefined
      ? externalFocusKeyword
      : internalFocusKeyword;

  const setFocusKeyword =
    externalSetFocusKeyword ||
    setInternalFocusKeyword;

  const seoImage =
    externalSeoImage !== undefined
      ? externalSeoImage
      : internalSeoImage;

  const setSeoImage =
    externalSetSeoImage || setInternalSeoImage;

  const fileInputRef = useRef(null);

  /* =========================================================
     TOUR DETAILS
     ========================================================= */

  const [internalPrice, setInternalPrice] =
    useState("");

  const [internalDiscountPrice, setInternalDiscountPrice] =
    useState("");

  const [internalMaxPeople, setInternalMaxPeople] =
    useState("");

  const [internalDifficulty, setInternalDifficulty] =
    useState("Easy");

  const [internalBestTimeToVisit, setInternalBestTimeToVisit] =
    useState("");

  const [internalCategory, setInternalCategory] =
    useState("");

  const price =
    externalPrice !== undefined
      ? externalPrice
      : internalPrice;

  const setPrice =
    externalSetPrice || setInternalPrice;

  const discountPrice =
    externalDiscountPrice !== undefined
      ? externalDiscountPrice
      : internalDiscountPrice;

  const setDiscountPrice =
    externalSetDiscountPrice ||
    setInternalDiscountPrice;

  const maxPeople =
    externalMaxPeople !== undefined
      ? externalMaxPeople
      : internalMaxPeople;

  const setMaxPeople =
    externalSetMaxPeople || setInternalMaxPeople;

  const difficulty =
    externalDifficulty !== undefined
      ? externalDifficulty
      : internalDifficulty;

  const setDifficulty =
    externalSetDifficulty ||
    setInternalDifficulty;

  const bestTimeToVisit =
    externalBestTimeToVisit !== undefined
      ? externalBestTimeToVisit
      : internalBestTimeToVisit;

  const setBestTimeToVisit =
    externalSetBestTimeToVisit ||
    setInternalBestTimeToVisit;

  const category =
    externalCategory !== undefined
      ? externalCategory
      : internalCategory;

  const setCategory =
    externalSetCategory || setInternalCategory;

  /* =========================================================
     TAG STATES
     ========================================================= */

  const [internalIncludes, setInternalIncludes] =
    useState([]);

  const [internalExcludes, setInternalExcludes] =
    useState([]);

  const [internalTags, setInternalTags] =
    useState([]);

  const includes =
    externalIncludes !== undefined
      ? externalIncludes
      : internalIncludes;

  const setIncludes =
    externalSetIncludes || setInternalIncludes;

  const excludes =
    externalExcludes !== undefined
      ? externalExcludes
      : internalExcludes;

  const setExcludes =
    externalSetExcludes || setInternalExcludes;

  const tags =
    externalTags !== undefined
      ? externalTags
      : internalTags;

  const setTags =
    externalSetTags || setInternalTags;

  const [newInclude, setNewInclude] =
    useState("");

  const [newExclude, setNewExclude] =
    useState("");

  const [newTag, setNewTag] =
    useState("");

  /* =========================================================
     TAG HANDLERS
     ========================================================= */

  const handleAddBadge = (
    value,
    setValue,
    list,
    setList
  ) => {
    const cleanValue = value.trim();

    if (
      cleanValue &&
      !list.includes(cleanValue)
    ) {
      setList([...list, cleanValue]);
      setValue("");
    }
  };

  const handleRemoveBadge = (
    itemToRemove,
    list,
    setList
  ) => {
    setList(
      list.filter(
        (item) => item !== itemToRemove
      )
    );
  };

  /* =========================================================
     SEO IMAGE HANDLER
     ========================================================= */

  const handleImageChange = (e) => {
    if (
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];

      if (onSeoFileChange) {
        onSeoFileChange(file);
      } else {
        setSeoImage(
          URL.createObjectURL(file)
        );
      }
    }
  };

  return (
    <div className="tours-all-section">

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toastMessage && (
        <div className="tours-all-section__toast">
          <div className="tours-all-section__toast-check">
            <FiCheckCircle />
          </div>

          <span>{toastMessage}</span>

          <button
            type="button"
            onClick={() =>
              externalShowToast
                ? null
                : setInternalToastMessage(null)
            }
            className="tours-all-section__toast-close"
            aria-label="Close notification"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* =====================================================
          TOP ACTIONS
      ===================================================== */}

      <div className="tours-all-section__top-actions">

        <button
          type="button"
          className="tours-all-section__btn-secondary"
          onClick={() =>
            showToast("Opening live preview...")
          }
        >
          <FiEye />
          <span>Preview</span>
        </button>

        <button
          type="button"
          className="tours-all-section__btn-submit"
          onClick={handleSubmitAction}
          disabled={isSubmitting}
        >
          <FiSend />

          <span>
            {isSubmitting
              ? "Submitting..."
              : "Submit"}
          </span>
        </button>
      </div>

      {/* =====================================================
          1. PUBLISH
      ===================================================== */}

      <div className="tours-all-section__card">

        <div
          className="tours-all-section__card-header clickable"
          onClick={() =>
            toggleSection("publish")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();
              toggleSection("publish");
            }
          }}
        >
          <div className="tours-all-section__header-group">

            <span className="tours-all-section__badge-icon">
              <FiSend />
            </span>

            <div>
              <h3 className="tours-all-section__heading">
                Publish
              </h3>

              <p className="tours-all-section__subheading">
                Publish your tour when you're ready
              </p>
            </div>
          </div>

          <div className="tours-all-section__chevron">
            {openSections.publish ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>
        </div>

        {openSections.publish && (
          <div className="tours-all-section__card-body">

            <div className="tours-all-section__publish-panel">

              <div className="tours-all-section__publish-content">

                <button
                  type="button"
                  className="tours-all-section__btn-action-light"
                  onClick={() =>
                    showToast(
                      "Opening live preview..."
                    )
                  }
                >
                  <FiEye />
                  Preview
                </button>

                <div className="tours-all-section__attr-list">

                  <div className="tours-all-section__attr-item">

                    <span
                      className={`tours-all-section__dot ${
                        status === "Published"
                          ? "published"
                          : ""
                      }`}
                    />

                    <span className="tours-all-section__attr-label">
                      Status
                    </span>

                    <strong className="tours-all-section__attr-value">
                      {status}
                    </strong>

                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setStatus(
                          status === "Draft"
                            ? "Published"
                            : "Draft"
                        )
                      }
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </div>

                  <div className="tours-all-section__attr-item">

                    <FiEye className="tours-all-section__attr-icon" />

                    <span className="tours-all-section__attr-label">
                      Visibility
                    </span>

                    <strong className="tours-all-section__attr-value">
                      {visibility}
                    </strong>

                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setVisibility(
                          visibility ===
                            "Public"
                            ? "Private"
                            : "Public"
                        )
                      }
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </div>

                  <div className="tours-all-section__attr-item">

                    <FiCalendar className="tours-all-section__attr-icon" />

                    <span className="tours-all-section__attr-label">
                      Publish
                    </span>

                    <strong className="tours-all-section__attr-value">
                      {publishDate}
                    </strong>

                    <button
                      type="button"
                      className="tours-all-section__inline-edit"
                      onClick={() =>
                        setPublishDate(
                          publishDate ===
                            "Immediately"
                            ? "Scheduled"
                            : "Immediately"
                        )
                      }
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </div>

                </div>
              </div>

              <div className="tours-all-section__publish-visual">
                <div className="tours-all-section__rocket-bubble">
                  <span>🚀</span>
                </div>

                <span className="tours-all-section__visual-label">
                  Ready to publish
                </span>
              </div>
            </div>

            <button
              type="button"
              className="tours-all-section__btn-full-primary"
              onClick={handleSubmitAction}
              disabled={isSubmitting}
            >
              <FiSend />

              {isSubmitting
                ? "Submitting Tour..."
                : "Submit Tour"}
            </button>

          </div>
        )}
      </div>

      {/* =====================================================
          2. SEO SETTINGS
      ===================================================== */}
     <div className="tours-all-section__card tours-all-section__seo-card">

  <div
    className="tours-all-section__card-header clickable"
    onClick={() => toggleSection("seo")}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        toggleSection("seo");
      }
    }}
  >

    <div className="tours-all-section__header-group">

      <span className="tours-all-section__badge-icon">
        <FiSearch />
      </span>

      <div className="tours-all-section__header-copy">

        <h3 className="tours-all-section__heading">
          SEO Settings
        </h3>

        <p className="tours-all-section__subheading">
          Optimize your tour for search engines
        </p>

      </div>

    </div>

    <div className="tours-all-section__chevron">
      {openSections.seo ? (
        <FiChevronUp />
      ) : (
        <FiChevronDown />
      )}
    </div>

  </div>


  {openSections.seo && (
    <div className="tours-all-section__card-body">

      <div className="tours-all-section__seo-grid">


        {/* =================================================
            SEO INFORMATION
            ================================================= */}

        <div className="tours-all-section__seo-inputs">


          {/* META TITLE */}

          <div className="tours-all-section__form-field">

            <div className="tours-all-section__field-top">

              <label
                htmlFor="meta-title"
                className="tours-all-section__label"
              >
                Meta Title
              </label>

              <span className="tours-all-section__field-count">
                {metaTitle.length}/60
              </span>

            </div>

            <input
              id="meta-title"
              type="text"
              className="tours-all-section__control"
              maxLength={60}
              placeholder="Enter a compelling meta title"
              value={metaTitle}
              onChange={(e) =>
                setMetaTitle(e.target.value)
              }
            />

            <span className="tours-all-section__field-help">
              Keep your title short, clear and relevant to the tour.
            </span>

          </div>


          {/* META DESCRIPTION */}

          <div className="tours-all-section__form-field">

            <div className="tours-all-section__field-top">

              <label
                htmlFor="meta-description"
                className="tours-all-section__label"
              >
                Meta Description
              </label>

              <span className="tours-all-section__field-count">
                {metaDescription.length}/160
              </span>

            </div>

            <textarea
              id="meta-description"
              rows={5}
              className="tours-all-section__control tours-all-section__control--textarea"
              maxLength={160}
              placeholder="Write a short description that explains what makes this tour special..."
              value={metaDescription}
              onChange={(e) =>
                setMetaDescription(e.target.value)
              }
            />

            <span className="tours-all-section__field-help">
              A useful description helps visitors understand your tour before clicking.
            </span>

          </div>


          {/* FOCUS KEYWORD */}

          <div className="tours-all-section__form-field tours-all-section__form-field--last">

            <label
              htmlFor="focus-keyword"
              className="tours-all-section__label"
            >
              Focus Keyword
            </label>

            <div className="tours-all-section__keyword-wrapper">

              <FiSearch />

              <input
                id="focus-keyword"
                type="text"
                className="tours-all-section__keyword-input"
                placeholder="e.g. Odisha tour package"
                value={focusKeyword}
                onChange={(e) =>
                  setFocusKeyword(e.target.value)
                }
              />

            </div>

            <span className="tours-all-section__field-help">
              Use the main search phrase you want this tour to rank for.
            </span>

          </div>

        </div>


        {/* =================================================
            META IMAGE
            ================================================= */}

        <div className="tours-all-section__seo-media">

          <div className="tours-all-section__media-header">

            <div>

              <label className="tours-all-section__label">
                Meta Image
              </label>

              <span className="tours-all-section__media-description">
                The image displayed when your tour is shared on social platforms and search results.
              </span>

            </div>

            <span className="tours-all-section__recommended-badge">
              Recommended
            </span>

          </div>


          <div
            className={`tours-all-section__upload-box ${
              seoImage
                ? "tours-all-section__upload-box--has-image"
                : ""
            }`}
            onClick={() =>
              fileInputRef.current?.click()
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" ||
                e.key === " "
              ) {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="tours-all-section__file-input"
              onChange={handleImageChange}
            />


            {seoImage ? (

              /* ==========================================
                 IMAGE PREVIEW
                 ========================================== */

              <div className="tours-all-section__preview-box">

                <img
                  src={seoImage}
                  alt="SEO Meta Preview"
                  className="tours-all-section__preview-img"
                />

                <div className="tours-all-section__preview-gradient" />

                <div className="tours-all-section__preview-overlay">

                  <div className="tours-all-section__preview-edit">

                    <FiEdit2 />

                  </div>

                  <div>

                    <strong>
                      Change SEO image
                    </strong>

                    <span>
                      Click to upload another image
                    </span>

                  </div>

                </div>

              </div>

            ) : (

              /* ==========================================
                 EMPTY UPLOAD STATE
                 ========================================== */

              <div className="tours-all-section__upload-placeholder">

                <div className="tours-all-section__upload-icon-wrap">

                  <FiUploadCloud />

                </div>


                <strong className="tours-all-section__upload-title">
                  Upload SEO image
                </strong>


                <span className="tours-all-section__upload-subtitle">
                  Drag & drop or click to browse
                </span>


                <div className="tours-all-section__upload-spec">

                  <span>
                    1200 × 630px
                  </span>

                  <i />

                  <span>
                    JPG, PNG or WebP
                  </span>

                </div>

              </div>

            )}

          </div>


          {/* IMAGE NOTE */}

          <div className="tours-all-section__image-note">

            <FiInfo />

            <span>
              Use a high-quality landscape image for the best social preview.
            </span>

          </div>

        </div>

      </div>

    </div>
  )}

</div>
      {/* =====================================================
          3. TOUR DETAILS
      ===================================================== */}

      <div className="tours-all-section__card">

        <div
          className="tours-all-section__card-header clickable"
          onClick={() =>
            toggleSection("tourDetails")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();
              toggleSection("tourDetails");
            }
          }}
        >
          <div className="tours-all-section__header-group">

            <span className="tours-all-section__badge-icon">
              <FiBriefcase />
            </span>

            <div>
              <h3 className="tours-all-section__heading">
                Tour Details
              </h3>

              <p className="tours-all-section__subheading">
                Add pricing, availability and tour information
              </p>
            </div>
          </div>

          <div className="tours-all-section__chevron">
            {openSections.tourDetails ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>
        </div>

        {openSections.tourDetails && (
          <div className="tours-all-section__card-body">

            {/* PRICE */}

            <div className="tours-all-section__row-2">

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Price
                  <span className="tours-all-section__required">
                    *
                  </span>
                </label>

                <div className="tours-all-section__affix-wrapper">

                  <span className="tours-all-section__currency-symbol">
                    ₹
                  </span>

                  <input
                    type="number"
                    className="tours-all-section__control tours-all-section__control--currency"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                  />

                  <span className="tours-all-section__affix-unit">
                    INR
                  </span>
                </div>
              </div>

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Discount Price
                </label>

                <div className="tours-all-section__affix-wrapper">

                  <span className="tours-all-section__currency-symbol">
                    ₹
                  </span>

                  <input
                    type="number"
                    className="tours-all-section__control tours-all-section__control--currency"
                    placeholder="0.00"
                    value={discountPrice}
                    onChange={(e) =>
                      setDiscountPrice(
                        e.target.value
                      )
                    }
                  />

                  <span className="tours-all-section__affix-unit">
                    INR
                  </span>
                </div>
              </div>
            </div>

            {/* INCLUDE / EXCLUDE */}

            <div className="tours-all-section__row-2">

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Price Includes
                </label>

                <div className="tours-all-section__tag-box">

                  <div className="tours-all-section__tag-cluster">

                    {includes.map((item) => (
                      <span
                        key={item}
                        className="tours-all-section__chip tours-all-section__chip--include"
                      >
                        <FiCheckCircle />

                        <span>{item}</span>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveBadge(
                              item,
                              includes,
                              setIncludes
                            )
                          }
                          aria-label={`Remove ${item}`}
                        >
                          <FiX />
                        </button>
                      </span>
                    ))}

                  </div>

                  <div className="tours-all-section__tag-inline">

                    <input
                      type="text"
                      placeholder="Add included item..."
                      value={newInclude}
                      onChange={(e) =>
                        setNewInclude(
                          e.target.value
                        )
                      }
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

                    <span className="tours-all-section__input-add">
                      +
                    </span>
                  </div>
                </div>
              </div>

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Price Excludes
                </label>

                <div className="tours-all-section__tag-box">

                  <div className="tours-all-section__tag-cluster">

                    {excludes.map((item) => (
                      <span
                        key={item}
                        className="tours-all-section__chip tours-all-section__chip--exclude"
                      >
                        <span>{item}</span>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveBadge(
                              item,
                              excludes,
                              setExcludes
                            )
                          }
                          aria-label={`Remove ${item}`}
                        >
                          <FiX />
                        </button>
                      </span>
                    ))}

                  </div>

                  <div className="tours-all-section__tag-inline">

                    <input
                      type="text"
                      placeholder="Add excluded item..."
                      value={newExclude}
                      onChange={(e) =>
                        setNewExclude(
                          e.target.value
                        )
                      }
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

                    <span className="tours-all-section__input-add">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PEOPLE / DIFFICULTY */}

            <div className="tours-all-section__row-2">

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Maximum People
                </label>

                <input
                  type="number"
                  className="tours-all-section__control"
                  placeholder="e.g. 20"
                  value={maxPeople}
                  onChange={(e) =>
                    setMaxPeople(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="tours-all-section__form-field">

                <label className="tours-all-section__label">
                  Difficulty Level
                </label>

                <div className="tours-all-section__select-wrapper">

                  <FiActivity className="tours-all-section__select-prefix" />

                  <select
                    className="tours-all-section__control tours-all-section__control--select"
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(
                        e.target.value
                      )
                    }
                  >
                    <option value="Easy">
                      Easy
                    </option>

                    <option value="Moderate">
                      Moderate
                    </option>

                    <option value="Difficult">
                      Difficult
                    </option>
                  </select>

                  <FiChevronDown className="tours-all-section__select-suffix" />
                </div>
              </div>
            </div>

            {/* BEST TIME / CATEGORY */}

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
                    onChange={(e) =>
                      setBestTimeToVisit(
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select best time
                    </option>

                    <option value="March to May">
                      March to May
                    </option>

                    <option value="June to August">
                      June to August
                    </option>

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

                <label className="tours-all-section__label">
                  Tour Category
                </label>

                <div className="tours-all-section__select-wrapper">

                  <FiGrid className="tours-all-section__select-prefix" />

                  <select
                    className="tours-all-section__control tours-all-section__control--select"
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Adventure">
                      Adventure
                    </option>

                    <option value="Culture">
                      Culture
                    </option>

                    <option value="Relaxation">
                      Relaxation
                    </option>

                    <option value="Wildlife">
                      Wildlife
                    </option>
                  </select>

                  <FiChevronDown className="tours-all-section__select-suffix" />
                </div>
              </div>
            </div>

            {/* TAGS */}

            <div className="tours-all-section__form-field tours-all-section__form-field--last">

              <label className="tours-all-section__label">
                Tour Tags
              </label>

              <div className="tours-all-section__tag-box">

                <div className="tours-all-section__tag-cluster">

                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="tours-all-section__chip tours-all-section__chip--tag"
                    >
                      <span>#</span>
                      {tag}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveBadge(
                            tag,
                            tags,
                            setTags
                          )
                        }
                        aria-label={`Remove ${tag}`}
                      >
                        <FiX />
                      </button>
                    </span>
                  ))}

                </div>

                <div className="tours-all-section__tag-inline">

                  <input
                    type="text"
                    placeholder="Add a new tag and press Enter..."
                    value={newTag}
                    onChange={(e) =>
                      setNewTag(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleAddBadge(
                        newTag,
                        setNewTag,
                        tags,
                        setTags
                      )
                    }
                  />

                  <span className="tours-all-section__input-add">
                    +
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* =====================================================
          4. QUICK TIPS
      ===================================================== */}

      <div className="tours-all-section__card">

        <div
          className="tours-all-section__card-header clickable"
          onClick={() =>
            toggleSection("quickTips")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();
              toggleSection("quickTips");
            }
          }}
        >
          <div className="tours-all-section__header-group">

            <span className="tours-all-section__badge-icon">
              <FiInfo />
            </span>

            <div>
              <h3 className="tours-all-section__heading">
                Quick Tips
              </h3>

              <p className="tours-all-section__subheading">
                Improve the quality and visibility of your tour
              </p>
            </div>
          </div>

          <div className="tours-all-section__chevron">
            {openSections.quickTips ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>
        </div>

        {openSections.quickTips && (
          <div className="tours-all-section__card-body">

            <div className="tours-all-section__tips-grid">

              <ul className="tours-all-section__tips-list">

                <li>
                  <span className="tours-all-section__tip-icon">
                    <FiCheckCircle />
                  </span>

                  <div>
                    <strong>
                      Use high-quality images
                    </strong>

                    <span>
                      Use clear and attractive images
                      to improve visitor engagement.
                    </span>
                  </div>
                </li>

                <li>
                  <span className="tours-all-section__tip-icon">
                    <FiCheckCircle />
                  </span>

                  <div>
                    <strong>
                      Optimize your SEO
                    </strong>

                    <span>
                      Write a unique meta title,
                      description and focus keyword.
                    </span>
                  </div>
                </li>

                <li>
                  <span className="tours-all-section__tip-icon">
                    <FiCheckCircle />
                  </span>

                  <div>
                    <strong>
                      Add detailed itinerary
                    </strong>

                    <span>
                      Give visitors enough information
                      about each day of the tour.
                    </span>
                  </div>
                </li>

                <li>
                  <span className="tours-all-section__tip-icon">
                    <FiCheckCircle />
                  </span>

                  <div>
                    <strong>
                      Include useful FAQs
                    </strong>

                    <span>
                      Answer common questions before
                      customers need to ask.
                    </span>
                  </div>
                </li>

              </ul>

              <div className="tours-all-section__tips-visual">

                <div className="tours-all-section__clipboard-bubble">
                  <span>📋</span>
                </div>

                <span>
                  Complete your tour details
                </span>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default ToursAllSection;