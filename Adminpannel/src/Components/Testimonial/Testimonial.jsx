import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Testimonial.css";

import API, { IMG_URL } from "../../api/axios";

import {
  FaPlus,
  FaUpload,
  FaTrashAlt,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEye,
  FaEdit,
  FaCommentAlt,
  FaListUl,
  FaSyncAlt,
  FaFilter,
  FaDownload,
  FaQuoteRight,
  FaGlobe,
} from "react-icons/fa";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";

const EMPTY_IMAGE = "https://via.placeholder.com/150";

const Testimonial = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [reviews, setReviews] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // Form
  const [reviewerName, setReviewerName] = useState("");
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reviewTime, setReviewTime] = useState("12:00");
  const [platform, setPlatform] = useState("All Reviews");
  const [status, setStatus] = useState("Published");

  // Image
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  // Search / Filter / Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Preview
  const [activeTab, setActiveTab] = useState("All Reviews");
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Loading
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Modal
  const [viewingReview, setViewingReview] = useState(null);

  const itemsPerPage = 5;

  const fileInputRef = useRef(null);

  // =========================================================
  // FORMAT DATE / TIME
  // =========================================================

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) {
      return {
        formattedDate: "",
        formattedTime: "",
      };
    }

    const dateObj = new Date(
      `${dateStr}T${timeStr || "12:00"}`
    );

    if (Number.isNaN(dateObj.getTime())) {
      return {
        formattedDate: dateStr,
        formattedTime: timeStr || "",
      };
    }

    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    let hours = dateObj.getHours();
    const minutes = dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedTime = `${hours
      .toString()
      .padStart(2, "0")}:${minutes} ${ampm}`;

    return {
      formattedDate,
      formattedTime,
    };
  };

  // =========================================================
  // AVATAR URL
  // =========================================================

  const getFullAvatarUrl = (avatarPath) => {
    if (!avatarPath) {
      return DEFAULT_IMAGE;
    }

    if (
      avatarPath.startsWith("http://") ||
      avatarPath.startsWith("https://") ||
      avatarPath.startsWith("data:")
    ) {
      return avatarPath;
    }

    const baseUrl = (IMG_URL || "").replace(/\/$/, "");

    const path = avatarPath.startsWith("/")
      ? avatarPath
      : `/${avatarPath}`;

    return `${baseUrl}${path}`;
  };

  // =========================================================
  // PLATFORM ICON
  // =========================================================

  const getPlatformIcon = (platformName) => {
    switch (platformName) {
      case "Google":
        return <span className="platform-letter google-letter">G</span>;

      case "Facebook":
        return <span className="platform-letter facebook-letter">f</span>;

      case "Tripadvisor":
      case "TripAdvisor":
        return <span className="platform-letter tripadvisor-letter">TA</span>;

      case "Website":
        return <FaGlobe />;

      default:
        return <FaCommentAlt />;
    }
  };

  // =========================================================
  // FETCH TESTIMONIALS
  // =========================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const response = await API.get("/testimonials");

      if (response.data?.success) {
        const apiData = response.data.data || [];

        const formattedData = apiData.map((item) => {
          const dateTime = formatDateTime(
            item.date,
            item.time
          );

          return {
            ...item,
            formattedDate:
              item.formattedDate || dateTime.formattedDate,
            formattedTime:
              item.formattedTime || dateTime.formattedTime,
            avatar: getFullAvatarUrl(item.avatar),
          };
        });

        setReviews(formattedData);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error(
        "Error fetching testimonials:",
        error.response?.data || error.message
      );

      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5MB.");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // CLEAR FORM
  // =========================================================

  const handleClear = () => {
    setEditingId(null);
    setReviewerName("");
    setLocation("");
    setReviewText("");
    setRating(5);

    setReviewDate(
      new Date().toISOString().split("T")[0]
    );

    setReviewTime("12:00");
    setPlatform("All Reviews");
    setStatus("Published");

    setSelectedFile(null);
    setProfileImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // EDIT TESTIMONIAL
  // =========================================================

  const handleEdit = (item) => {
    const id = item?._id || item?.id;

    setEditingId(id || null);

    setReviewerName(item?.reviewer || "");
    setLocation(item?.location || "");
    setReviewText(item?.reviewText || "");
    setRating(Number(item?.rating) || 5);

    setReviewDate(
      item?.date ||
        new Date().toISOString().split("T")[0]
    );

    setReviewTime(item?.time || "12:00");

    setPlatform(item?.platform || "All Reviews");

    setStatus(item?.status || "Published");

    setSelectedFile(null);

    setProfileImage(
      item?.avatar
        ? getFullAvatarUrl(item.avatar)
        : ""
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SAVE / UPDATE TESTIMONIAL
  // =========================================================

  const handleSaveReview = async (e) => {
    e.preventDefault();

    if (
      !reviewerName.trim() ||
      !location.trim() ||
      !reviewText.trim() ||
      !reviewDate ||
      !reviewTime
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (reviewText.trim().length > 500) {
      alert("Review cannot exceed 500 characters.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "reviewer",
      reviewerName.trim()
    );

    formData.append(
      "location",
      location.trim()
    );

    formData.append(
      "reviewText",
      reviewText.trim()
    );

    formData.append("rating", rating);
    formData.append("date", reviewDate);
    formData.append("time", reviewTime);
    formData.append("platform", platform);
    formData.append("status", status);

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      setSaving(true);

      let response;

      if (editingId) {
        response = await API.put(
          `/testimonials/${editingId}`,
          formData
        );
      } else {
        response = await API.post(
          "/testimonials",
          formData
        );
      }

      if (response.data?.success) {
        alert(
          editingId
            ? "Testimonial updated successfully!"
            : "Testimonial added successfully!"
        );

        await fetchTestimonials();

        handleClear();
      } else {
        alert(
          response.data?.message ||
            "Failed to save testimonial."
        );
      }
    } catch (error) {
      console.error(
        "Error saving testimonial:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to save testimonial."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE TESTIMONIAL
  // =========================================================

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid testimonial ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await API.delete(
        `/testimonials/${id}`
      );

      if (response.data?.success) {
        setReviews((prev) =>
          prev.filter(
            (item) =>
              item._id !== id &&
              item.id !== id
          )
        );

        if (
          viewingReview?._id === id ||
          viewingReview?.id === id
        ) {
          setViewingReview(null);
        }

        if (editingId === id) {
          handleClear();
        }

        alert(
          "Testimonial deleted successfully."
        );
      } else {
        alert(
          response.data?.message ||
            "Failed to delete testimonial."
        );
      }
    } catch (error) {
      console.error(
        "Error deleting testimonial:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete testimonial."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // FILTER REVIEWS
  // =========================================================

  const filteredReviews = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return reviews.filter((item) => {
      const reviewer = (
        item.reviewer || ""
      ).toLowerCase();

      const itemLocation = (
        item.location || ""
      ).toLowerCase();

      const message = (
        item.reviewText || ""
      ).toLowerCase();

      const itemPlatform =
        item.platform || "All Reviews";

      const matchesSearch =
        !search ||
        reviewer.includes(search) ||
        itemLocation.includes(search) ||
        message.includes(search);

      const matchesPlatform =
        filterPlatform === "All" ||
        itemPlatform === filterPlatform;

      const matchesTab =
        activeTab === "All Reviews" ||
        itemPlatform.toLowerCase() ===
          activeTab.toLowerCase();

      return (
        matchesSearch &&
        matchesPlatform &&
        matchesTab
      );
    });
  }, [
    reviews,
    searchTerm,
    filterPlatform,
    activeTab,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages =
    Math.ceil(
      filteredReviews.length / itemsPerPage
    ) || 1;

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    itemsPerPage;

  const paginatedReviews =
    filteredReviews.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // =========================================================
  // PREVIEW
  // =========================================================

  const previewItems =
    filteredReviews.length > 0
      ? filteredReviews
      : reviews;

  const currentPreview =
    previewItems.length > 0
      ? previewItems[
          activePreviewIndex %
            previewItems.length
        ]
      : null;

  // =========================================================
  // EXPORT
  // =========================================================

  const handleExport = () => {
    if (!reviews.length) {
      alert("There are no testimonials to export.");
      return;
    }

    const exportData = reviews.map((item) => ({
      reviewer: item.reviewer,
      location: item.location,
      reviewText: item.reviewText,
      rating: item.rating,
      platform: item.platform,
      status: item.status,
      date: item.date,
      time: item.time,
    }));

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(exportData, null, 2)
      );

    const downloadAnchor =
      document.createElement("a");

    downloadAnchor.setAttribute(
      "href",
      dataStr
    );

    downloadAnchor.setAttribute(
      "download",
      "traveler_reviews.json"
    );

    document.body.appendChild(downloadAnchor);

    downloadAnchor.click();

    downloadAnchor.remove();
  };

  // =========================================================
  // CHANGE PAGE
  // =========================================================

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="Testimonial">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="Testimonial-top-banner">
        <div className="Testimonial-banner-left">
          <div className="Testimonial-banner-icon">
            <FaCommentAlt />
          </div>

          <div>
            <h1>Testimonial Management</h1>

            <p>
              Add and manage customer
              testimonials for your website
            </p>
          </div>
        </div>

        <div className="Testimonial-total-badge">
          <FaCommentAlt className="badge-user-icon" />

          <span>
            {reviews.length} Total Testimonials
          </span>
        </div>
      </div>

      {/* =====================================================
          ADD BUTTON
      ===================================================== */}

      <div className="Testimonial-top-bar">
        <div className="Testimonial-header">
          <h1>Regards From Travelers</h1>

          <p>
            Manage and showcase traveler reviews.
          </p>
        </div>

        <button
          type="button"
          className="Testimonial-add-btn"
          onClick={handleClear}
        >
          <FaPlus />
          Add New Review
        </button>
      </div>

      {/* =====================================================
          PLATFORM TABS
      ===================================================== */}

      <div className="Testimonial-tabs">

        <button
          type="button"
          className={`Testimonial-tab ${
            activeTab === "All Reviews"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("All Reviews");
            setCurrentPage(1);
          }}
        >
          All Reviews
        </button>

        <button
          type="button"
          className={`Testimonial-tab ${
            activeTab === "Tripadvisor"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("Tripadvisor");
            setCurrentPage(1);
          }}
        >
          <span className="tab-platform-icon tripadvisor">
            TA
          </span>
          Tripadvisor
        </button>

        <button
          type="button"
          className={`Testimonial-tab ${
            activeTab === "Facebook"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("Facebook");
            setCurrentPage(1);
          }}
        >
          <span className="tab-platform-icon facebook">
            f
          </span>
          Facebook
        </button>

        <button
          type="button"
          className={`Testimonial-tab ${
            activeTab === "Google"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("Google");
            setCurrentPage(1);
          }}
        >
          <span className="tab-platform-icon google">
            G
          </span>
          Google
        </button>
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="Testimonial-main-grid">

        {/* ===================================================
            LEFT FORM
        =================================================== */}

        <div
          className={`Testimonial-card form-card ${
            editingId ? "is-editing" : ""
          }`}
        >

          {/* Form Header */}

          <div className="card-header-flex">
            <div className="card-title-icon-wrapper">

              <span className="add-icon-circle">
                {editingId ? (
                  <FaEdit />
                ) : (
                  <FaPlus />
                )}
              </span>

              <div>
                <h2>
                  {editingId
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p>
                  {editingId
                    ? "Update the details below and save your changes"
                    : "Fill in the details to add a new testimonial"}
                </p>
              </div>

            </div>
          </div>

          {/* Form */}

          <form onSubmit={handleSaveReview}>

            {/* Name */}

            <div className="Testimonial-form-group">
              <label>
                Name <span>*</span>
              </label>

              <input
                type="text"
                value={reviewerName}
                onChange={(e) =>
                  setReviewerName(
                    e.target.value
                  )
                }
                placeholder="Enter customer name"
                required
              />
            </div>

            {/* Location */}

            <div className="Testimonial-form-group">
              <label>
                Location <span>*</span>
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                placeholder="Enter location (e.g. London, UK)"
                required
              />
            </div>

            {/* Review */}

            <div className="Testimonial-form-group">
              <label>
                Review Text <span>*</span>
              </label>

              <div className="textarea-wrapper">
                <textarea
                  rows="5"
                  maxLength="500"
                  value={reviewText}
                  onChange={(e) =>
                    setReviewText(
                      e.target.value
                    )
                  }
                  placeholder="Enter testimonial message"
                  required
                />

                <span className="char-count">
                  {reviewText.length}/500
                </span>
              </div>
            </div>

            {/* Rating */}

            <div className="Testimonial-form-group">
              <label>
                Rating <span>*</span>
              </label>

              <div className="Testimonial-rating-stars">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-btn"
                      aria-label={`Rate ${star} star${
                        star > 1 ? "s" : ""
                      }`}
                      onClick={() =>
                        setRating(star)
                      }
                    >
                      <FaStar
                        className={`star-icon ${
                          star <= rating
                            ? "selected"
                            : ""
                        }`}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Date and Time */}

            <div className="Testimonial-form-row-datetime">

              <div className="Testimonial-form-group">
                <label>Date</label>

                <div className="input-icon-group">
                  <input
                    type="date"
                    value={reviewDate}
                    onChange={(e) =>
                      setReviewDate(
                        e.target.value
                      )
                    }
                    required
                  />

                  <FaCalendarAlt className="inline-field-icon" />
                </div>
              </div>

              <div className="Testimonial-form-group">
                <label>Time</label>

                <div className="input-icon-group">
                  <input
                    type="time"
                    value={reviewTime}
                    onChange={(e) =>
                      setReviewTime(
                        e.target.value
                      )
                    }
                    required
                  />

                  <FaClock className="inline-field-icon" />
                </div>
              </div>

            </div>

            {/* Platform */}

            <div className="Testimonial-form-group">
              <label>Platform</label>

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(
                    e.target.value
                  )
                }
              >
                <option value="All Reviews">
                  All Reviews
                </option>

                <option value="Google">
                  Google
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Tripadvisor">
                  Tripadvisor
                </option>

                <option value="Website">
                  Website
                </option>
              </select>
            </div>

            {/* Status */}

            <div className="Testimonial-form-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option value="Published">
                  Published
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Archived">
                  Archived
                </option>
              </select>
            </div>

            {/* Profile Image */}

            <div className="Testimonial-form-group">
              <label>Profile Image</label>

              <div className="Testimonial-file-upload-box">

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  style={{
                    display: "none",
                  }}
                />

                <button
                  type="button"
                  className="choose-file-btn"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  <FaUpload />
                  Choose Image
                </button>

                <span className="file-chosen-text">
                  {selectedFile
                    ? selectedFile.name
                    : profileImage
                    ? "Image uploaded"
                    : "No file chosen"}
                </span>

                <div className="avatar-mini-preview">
                  <img
                    src={
                      profileImage ||
                      EMPTY_IMAGE
                    }
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.src =
                        EMPTY_IMAGE;
                    }}
                  />
                </div>

              </div>

              <span className="Testimonial-helper-text">
                Recommended size: 200x200px
                (JPG, PNG, WEBP) — processed
                to WebP via server middleware
              </span>
            </div>

            {/* Form Actions */}

            <div className="Testimonial-form-actions-bottom">

              <button
                type="button"
                className="Testimonial-clear-btn"
                onClick={handleClear}
                disabled={saving}
              >
                <FaSyncAlt />
                Clear
              </button>

              <button
                type="submit"
                className="Testimonial-submit-btn"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <FaSyncAlt className="spin-icon" />

                    {editingId
                      ? "Updating..."
                      : "Saving..."}
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <FaEdit />
                    ) : (
                      <FaPlus />
                    )}

                    {editingId
                      ? "Update Testimonial"
                      : "Add Testimonial"}
                  </>
                )}
              </button>

            </div>

          </form>
        </div>

        {/* ===================================================
            RIGHT PREVIEW
        =================================================== */}

        <div className="Testimonial-card Testimonial-preview-card">

          <h2 className="Testimonial-card-title">
            Live Preview
          </h2>

          {/* Preview Tabs */}

          <div className="Testimonial-preview-tabs">

            {[
              "All Reviews",
              "Tripadvisor",
              "Facebook",
              "Google",
            ].map((tab) => (
              <button
                type="button"
                key={tab}
                className={`pv-tab ${
                  activeTab === tab
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
              >
                {tab === "All Reviews" ? (
                  <FaCommentAlt />
                ) : (
                  <span
                    className={`tab-platform-icon ${tab.toLowerCase()}`}
                  >
                    {tab === "Facebook"
                      ? "f"
                      : tab === "Google"
                      ? "G"
                      : "TA"}
                  </span>
                )}

                {tab}
              </button>
            ))}

          </div>

          {/* Preview Box */}

          <div className="Testimonial-preview-box">

            <div className="preview-quote-icon">
              <FaQuoteRight />
            </div>

            <div className="Testimonial-preview-stars">

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <FaStar
                    key={star}
                    className={`star-icon ${
                      star <=
                      (currentPreview?.rating ||
                        rating)
                        ? "selected"
                        : ""
                    }`}
                  />
                )
              )}

            </div>

            <p className="Testimonial-preview-text">
              "
              {currentPreview?.reviewText ||
                reviewText ||
                "Your testimonial will appear here..."}
              "
            </p>

            <div className="Testimonial-preview-user">

              <img
                src={
                  currentPreview?.avatar ||
                  profileImage ||
                  DEFAULT_IMAGE
                }
                alt={
                  currentPreview?.reviewer ||
                  reviewerName ||
                  "Traveler"
                }
                className="Testimonial-preview-avatar"
                onError={(e) => {
                  e.currentTarget.src =
                    DEFAULT_IMAGE;
                }}
              />

              <div className="Testimonial-preview-user-info">

                <h4>
                  {currentPreview?.reviewer ||
                    reviewerName ||
                    "Sophia Reynolds"}
                </h4>

                <p>
                  {currentPreview?.location ||
                    location ||
                    "London, UK"}
                </p>

              </div>

            </div>

            <div className="Testimonial-preview-datetime">

              <span>
                {currentPreview?.formattedDate ||
                  currentPreview?.date ||
                  formatDateTime(
                    reviewDate,
                    reviewTime
                  ).formattedDate}
              </span>

              <small>
                {currentPreview?.formattedTime ||
                  currentPreview?.time ||
                  formatDateTime(
                    reviewDate,
                    reviewTime
                  ).formattedTime}
              </small>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          REVIEWS TABLE
      ===================================================== */}

      <div className="Testimonial-card Testimonial-table-card">

        {/* Table Header */}

        <div className="Testimonial-table-header">

          <div className="table-title-left">

            <span className="list-icon-badge">
              <FaListUl />
            </span>

            <div>
              <h2>Testimonials List</h2>

              <p>
                View and manage all customer
                testimonials
              </p>
            </div>

          </div>

          {/* Search */}

          <div className="table-search-wrapper">

            <FaSearch className="table-search-icon" />

            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            />

          </div>

          {/* Filter */}

          <div className="Testimonial-filter-dropdown">

            <FaFilter className="filter-icon" />

            <select
              value={filterPlatform}
              onChange={(e) => {
                setFilterPlatform(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            >
              <option value="All">
                Filter Platform
              </option>

              <option value="All Reviews">
                All Reviews
              </option>

              <option value="Tripadvisor">
                Tripadvisor
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="Google">
                Google
              </option>

              <option value="Website">
                Website
              </option>
            </select>

          </div>

          {/* Export */}

          <button
            type="button"
            className="Testimonial-export-btn"
            onClick={handleExport}
          >
            <FaDownload />
            Export
          </button>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="Testimonial-table-responsive">

          <table className="Testimonial-table">

            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Message</th>
                <th>Rating</th>
                <th>Platform</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="10"
                    className="no-data-row"
                  >
                    <FaSyncAlt className="spin-icon" />
                    Loading testimonials...
                  </td>
                </tr>
              ) : paginatedReviews.length > 0 ? (
                paginatedReviews.map(
                  (item, index) => {

                    const itemId =
                      item._id || item.id;

                    const dateTime =
                      formatDateTime(
                        item.date,
                        item.time
                      );

                    return (
                      <tr key={itemId}>

                        {/* Serial */}

                        <td
                          className="sl-no-col"
                          data-label="Sl. No."
                        >
                          {String(
                            startIndex +
                              index +
                              1
                          ).padStart(2, "0")}
                        </td>

                        {/* Image */}

                        <td data-label="Image">

                          <img
                            src={getFullAvatarUrl(
                              item.avatar
                            )}
                            alt={
                              item.reviewer ||
                              "Reviewer"
                            }
                            className="table-avatar-img"
                            onError={(e) => {
                              e.currentTarget.src =
                                EMPTY_IMAGE;
                            }}
                          />

                        </td>

                        {/* Name */}

                        <td
                          className="name-col"
                          data-label="Name"
                        >
                          {item.reviewer || "-"}
                        </td>

                        {/* Location */}

                        <td data-label="Location">
                          {item.location || "-"}
                        </td>

                        {/* Message */}

                        <td
                          className="message-col"
                          data-label="Message"
                          title={
                            item.reviewText || ""
                          }
                        >
                          "
                          {(item.reviewText ||
                            "").length > 55
                            ? item.reviewText.substring(
                                0,
                                55
                              ) + "..."
                            : item.reviewText || "-"}
                          "
                        </td>

                        {/* Rating */}

                        <td data-label="Rating">

                          <div className="table-stars-row">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <FaStar
                                  key={star}
                                  className={`star-icon ${
                                    star <=
                                    Number(
                                      item.rating
                                    )
                                      ? "selected"
                                      : ""
                                  }`}
                                />
                              )
                            )}

                          </div>

                        </td>

                        {/* Platform */}

                        <td data-label="Platform">

                          <span
                            className={`platform-badge ${
                              (
                                item.platform ||
                                "all"
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  ""
                                )
                            }`}
                          >
                            {getPlatformIcon(
                              item.platform
                            )}

                            {item.platform ||
                              "All Reviews"}
                          </span>

                        </td>

                        {/* Date / Time */}

                        <td
                          className="datetime-col"
                          data-label="Date & Time"
                        >
                          <div>
                            {item.formattedDate ||
                              item.date ||
                              dateTime.formattedDate ||
                              "-"}
                          </div>

                          <small>
                            {item.formattedTime ||
                              item.time ||
                              dateTime.formattedTime ||
                              "-"}
                          </small>
                        </td>

                        {/* Status */}

                        <td data-label="Status">

                          <span
                            className={`status-badge ${
                              (
                                item.status ||
                                "Published"
                              ).toLowerCase()
                            }`}
                          >
                            •{" "}
                            {item.status ||
                              "Published"}
                          </span>

                        </td>

                        {/* Actions */}

                        <td data-label="Action">

                          <div className="table-action-buttons">

                            {/* View */}

                            <button
                              type="button"
                              className="action-icon-btn view-bg"
                              title="View details"
                              aria-label="View testimonial details"
                              onClick={() =>
                                setViewingReview(
                                  item
                                )
                              }
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}

                            <button
                              type="button"
                              className="action-icon-btn edit-bg"
                              title="Edit"
                              aria-label="Edit testimonial"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <FaEdit />
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              className="action-icon-btn delete-bg"
                              title="Delete"
                              aria-label="Delete testimonial"
                              disabled={
                                deletingId ===
                                itemId
                              }
                              onClick={() =>
                                handleDelete(
                                  itemId
                                )
                              }
                            >
                              {deletingId ===
                              itemId ? (
                                <FaSyncAlt className="spin-icon" />
                              ) : (
                                <FaTrashAlt />
                              )}
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )
              ) : (
                <tr>

                  <td
                    colSpan="10"
                    className="no-data-row"
                  >
                    {searchTerm ||
                    filterPlatform !== "All" ||
                    activeTab !== "All Reviews"
                      ? "No testimonials found matching your filters."
                      : "No testimonials available."}
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            TABLE FOOTER
        ================================================= */}

        <div className="Testimonial-table-footer">

          <span className="footer-showing-text">

            Showing{" "}

            {filteredReviews.length === 0
              ? 0
              : startIndex + 1}

            {" "}to{" "}

            {Math.min(
              startIndex + itemsPerPage,
              filteredReviews.length
            )}

            {" "}of{" "}

            {filteredReviews.length}

            {" "}testimonials

          </span>

          <div className="footer-pagination-controls">

            {/* Previous */}

            <button
              type="button"
              className="pagination-arrow-btn"
              disabled={
                safeCurrentPage === 1
              }
              onClick={() =>
                changePage(
                  Math.max(
                    safeCurrentPage - 1,
                    1
                  )
                )
              }
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>

            {/* Pages */}

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`pagination-page-btn ${
                  safeCurrentPage === page
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  changePage(page)
                }
              >
                {page}
              </button>
            ))}

            {/* Next */}

            <button
              type="button"
              className="pagination-arrow-btn"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                changePage(
                  Math.min(
                    safeCurrentPage + 1,
                    totalPages
                  )
                )
              }
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}

      {viewingReview && (
        <div
          className="Testimonial-modal-overlay"
          onClick={() =>
            setViewingReview(null)
          }
        >

          <div
            className="Testimonial-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close */}

            <button
              type="button"
              className="modal-close-x"
              onClick={() =>
                setViewingReview(null)
              }
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* User */}

            <div className="modal-user-info-row">

              <img
                src={getFullAvatarUrl(
                  viewingReview.avatar
                )}
                alt={
                  viewingReview.reviewer ||
                  "Reviewer"
                }
                onError={(e) => {
                  e.currentTarget.src =
                    EMPTY_IMAGE;
                }}
              />

              <div>

                <h3>
                  {viewingReview.reviewer ||
                    "Unknown Reviewer"}
                </h3>

                <p>
                  {viewingReview.location ||
                    "Unknown Location"}
                </p>

              </div>

            </div>

            {/* Rating */}

            <div className="modal-rating-display">

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <FaStar
                    key={star}
                    className={`star-icon ${
                      star <=
                      Number(
                        viewingReview.rating
                      )
                        ? "selected"
                        : ""
                    }`}
                  />
                )
              )}

            </div>

            {/* Review */}

            <p className="modal-review-body">
              "
              {viewingReview.reviewText ||
                "No review text available."}
              "
            </p>

            {/* Meta */}

            <div className="modal-meta-info">

              <span>
                <strong>Platform:</strong>{" "}
                {viewingReview.platform ||
                  "All Reviews"}
              </span>

              <span>
                <strong>Status:</strong>{" "}
                {viewingReview.status ||
                  "Published"}
              </span>

              <span>
                <strong>Date:</strong>{" "}
                {viewingReview.formattedDate ||
                  viewingReview.date ||
                  "-"}
                {" "}at{" "}
                {viewingReview.formattedTime ||
                  viewingReview.time ||
                  "-"}
              </span>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Testimonial;