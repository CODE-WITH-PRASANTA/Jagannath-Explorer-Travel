import React, { useState, useEffect, useRef } from "react";
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
} from "react-icons/fa";

const Testimonial = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [reviewerName, setReviewerName] = useState("");
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewDate, setReviewDate] = useState("2025-08-14");
  const [reviewTime, setReviewTime] = useState("04:15");
  const [platform, setPlatform] = useState("All Reviews");
  const [status, setStatus] = useState("Published");

  // Image state
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  // Search & pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Loading
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // View modal
  const [viewingReview, setViewingReview] = useState(null);

  const itemsPerPage = 5;

  const fileInputRef = useRef(null);

  /* =========================================================
     FETCH TESTIMONIALS
  ========================================================= */

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      // IMPORTANT:
      // Axios baseURL should already be:
      // http://localhost:5000/api
      //
      // Therefore use:
      // /testimonials
      //
      // NOT:
      // /api/testimonials

      const response = await API.get("/testimonials");

      if (response.data?.success) {
        setReviews(response.data.data || []);
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

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic image validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Optional size validation - 5MB
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

  /* =========================================================
     CLEAR FORM
  ========================================================= */

  const handleClear = () => {
    setEditingId(null);

    setReviewerName("");
    setLocation("");
    setReviewText("");
    setRating(5);

    setReviewDate("2025-08-14");
    setReviewTime("04:15");

    setPlatform("All Reviews");
    setStatus("Published");

    setSelectedFile(null);
    setProfileImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     SAVE / UPDATE TESTIMONIAL
  ========================================================= */

  const handleSaveReview = async (e) => {
    e.preventDefault();

    // Validation
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

    const formData = new FormData();

    formData.append("reviewer", reviewerName.trim());
    formData.append("location", location.trim());
    formData.append("reviewText", reviewText.trim());
    formData.append("rating", rating);
    formData.append("date", reviewDate);
    formData.append("time", reviewTime);
    formData.append("platform", platform);
    formData.append("status", status);

    // Add image only if a new image was selected
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      setSaving(true);

      let response;

      /* ---------------------------------------------------------
         UPDATE
      --------------------------------------------------------- */

      if (editingId) {
        response = await API.put(
          `/testimonials/${editingId}`,
          formData
        );
      }

      /* ---------------------------------------------------------
         CREATE
      --------------------------------------------------------- */

      else {
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

  /* =========================================================
     EDIT TESTIMONIAL
  ========================================================= */

  const handleEdit = (item) => {
    setEditingId(item._id);

    setReviewerName(item.reviewer || "");
    setLocation(item.location || "");
    setReviewText(item.reviewText || "");

    setRating(item.rating || 5);

    setReviewDate(
      item.date ||
        new Date().toISOString().split("T")[0]
    );

    setReviewTime(item.time || "12:00");

    setPlatform(item.platform || "All Reviews");
    setStatus(item.status || "Published");

    // No new file selected yet
    setSelectedFile(null);

    // Show existing image
    setProfileImage(
      getFullAvatarUrl(item.avatar)
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE TESTIMONIAL
  ========================================================= */

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
          prev.filter((item) => item._id !== id)
        );

        if (viewingReview?._id === id) {
          setViewingReview(null);
        }

        if (editingId === id) {
          handleClear();
        }

        alert("Testimonial deleted successfully.");
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

  /* =========================================================
     AVATAR URL
  ========================================================= */

  const getFullAvatarUrl = (avatarPath) => {
    if (!avatarPath) {
      return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
    }

    // Absolute URL
    if (
      avatarPath.startsWith("http://") ||
      avatarPath.startsWith("https://") ||
      avatarPath.startsWith("data:")
    ) {
      return avatarPath;
    }

    // Prevent double slash
    const baseUrl = IMG_URL?.replace(/\/$/, "") || "";

    const path = avatarPath.startsWith("/")
      ? avatarPath
      : `/${avatarPath}`;

    return `${baseUrl}${path}`;
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredReviews = reviews.filter((item) => {
    const reviewer = (
      item.reviewer || ""
    ).toLowerCase();

    const itemLocation = (
      item.location || ""
    ).toLowerCase();

    const message = (
      item.reviewText || ""
    ).toLowerCase();

    const search = searchTerm.toLowerCase();

    return (
      reviewer.includes(search) ||
      itemLocation.includes(search) ||
      message.includes(search)
    );
  });

  /* =========================================================
     PAGINATION
  ========================================================= */

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

  /* =========================================================
     RENDER
  ========================================================= */

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
            <h1>
              Testimonial Management
            </h1>

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
          MAIN GRID
      ===================================================== */}

      <div className="Testimonial-main-grid">

        {/* ===================================================
            LEFT FORM
        =================================================== */}

        <div
          className={`Testimonial-card form-card${
            editingId ? " is-editing" : ""
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
                Name *
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
                Location *
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
                Message *
              </label>

              <div className="textarea-wrapper">

                <textarea
                  rows="4"
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
                Rating *
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

            {/* Date & Time */}

            <div className="Testimonial-form-row-datetime">

              <div className="Testimonial-form-group">

                <label>
                  Date & Time
                </label>

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

              <div className="Testimonial-form-group time-group">

                <label>
                  &nbsp;
                </label>

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

              <label>
                Platform
              </label>

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

                <option value="TripAdvisor">
                  TripAdvisor
                </option>

                <option value="Website">
                  Website
                </option>

              </select>

            </div>

            {/* Status */}

            <div className="Testimonial-form-group">

              <label>
                Status
              </label>

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

              <label>
                Profile Image
              </label>

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
                      "https://via.placeholder.com/150"
                    }
                    alt="Preview"
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
            RIGHT TABLE
        =================================================== */}

        <div className="Testimonial-card table-card">

          {/* Table Header */}

          <div className="table-card-top-header">

            <div className="table-title-left">

              <span className="list-icon-badge">
                <FaListUl />
              </span>

              <div>

                <h2>
                  Testimonials List
                </h2>

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

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="Testimonial-table-container">

            <table className="Testimonial-table">

              <thead>

                <tr>

                  <th>
                    Sl. No.
                  </th>

                  <th>
                    Image
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Message
                  </th>

                  <th>
                    Rating
                  </th>

                  <th>
                    Date & Time
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="no-data-row"
                    >
                      Loading testimonials...
                    </td>

                  </tr>

                ) : paginatedReviews.length > 0 ? (

                  paginatedReviews.map(
                    (item, index) => (

                      <tr
                        key={
                          item._id ||
                          item.id
                        }
                      >

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
                                "https://via.placeholder.com/150";
                            }}
                          />

                        </td>

                        {/* Name */}

                        <td
                          className="name-col"
                          data-label="Name"
                        >
                          {item.reviewer}
                        </td>

                        {/* Location */}

                        <td data-label="Location">
                          {item.location}
                        </td>

                        {/* Message */}

                        <td
                          className="message-col"
                          data-label="Message"
                          title={
                            item.reviewText
                          }
                        >

                          “
                          {(
                            item.reviewText ||
                            ""
                          ).length > 55
                            ? item.reviewText.substring(
                                0,
                                55
                              ) + "..."
                            : item.reviewText}
                          ”

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
                                    item.rating
                                      ? "selected"
                                      : ""
                                  }`}
                                />

                              )
                            )}

                          </div>

                        </td>

                        {/* Date / Time */}

                        <td
                          className="datetime-col"
                          data-label="Date & Time"
                        >

                          <div>
                            {item.formattedDate ||
                              item.date ||
                              "-"}
                          </div>

                          <small>
                            {item.formattedTime ||
                              item.time ||
                              "-"}
                          </small>

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
                                item._id
                              }
                              onClick={() =>
                                handleDelete(
                                  item._id ||
                                    item.id
                                )
                              }
                            >

                              {deletingId ===
                              item._id ? (
                                <FaSyncAlt className="spin-icon" />
                              ) : (
                                <FaTrashAlt />
                              )}

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="no-data-row"
                    >
                      {searchTerm
                        ? "No testimonials found matching your search."
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
                startIndex +
                  itemsPerPage,
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
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
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
                    setCurrentPage(page)
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
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
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
                  viewingReview.reviewer
                }
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/150";
                }}
              />

              <div>

                <h3>
                  {viewingReview.reviewer}
                </h3>

                <p>
                  {viewingReview.location}
                </p>

              </div>

            </div>

            {/* Rating */}

            <div className="modal-rating-display">

              {[1, 2, 3, 4, 5].map(
                (s) => (

                  <FaStar
                    key={s}
                    className={`star-icon ${
                      s <=
                      viewingReview.rating
                        ? "selected"
                        : ""
                    }`}
                  />

                )
              )}

            </div>

            {/* Review */}

            <p className="modal-review-body">

              “
              {viewingReview.reviewText}
              ”

            </p>

            {/* Meta */}

            <div className="modal-meta-info">

              <span>

                <strong>
                  Platform:
                </strong>{" "}

                {viewingReview.platform ||
                  "All Reviews"}

              </span>

              <span>

                <strong>
                  Status:
                </strong>{" "}

                {viewingReview.status ||
                  "Published"}

              </span>

              <span>

                <strong>
                  Date:
                </strong>{" "}

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