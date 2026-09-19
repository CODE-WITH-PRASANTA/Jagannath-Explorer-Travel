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
     HELPERS FOR DEFAULT DATE & TIME
  ========================================================= */

  const getTodayDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const getCurrentTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  /* =========================================================
     STATE
  ========================================================= */

  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Form inputs
  const [reviewerName, setReviewerName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewDate, setReviewDate] = useState(getTodayDate());
  const [reviewTime, setReviewTime] = useState(getCurrentTime());
  const [platform, setPlatform] = useState("All Reviews");
  const [status, setStatus] = useState("Published");

  // Image handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Status indicators
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Modal inspection
  const [viewingReview, setViewingReview] = useState(null);

  const itemsPerPage = 5;
  const fileInputRef = useRef(null);

  /* =========================================================
     FETCH TESTIMONIALS (ADMIN)
  ========================================================= */

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await API.get("/testimonials?all=true");

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* =========================================================
     AVATAR FORMATTER
  ========================================================= */

  const getFullAvatarUrl = (avatarPath) => {
    if (!avatarPath) {
      return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
    }

    if (
      avatarPath.startsWith("http://") ||
      avatarPath.startsWith("https://") ||
      avatarPath.startsWith("blob:") ||
      avatarPath.startsWith("data:")
    ) {
      return avatarPath;
    }

    const baseUrl = IMG_URL?.replace(/\/$/, "") || "http://localhost:5000";
    const cleanPath = avatarPath.startsWith("/") ? avatarPath : `/${avatarPath}`;

    return `${baseUrl}${cleanPath}`;
  };

  /* =========================================================
     IMAGE UPLOAD & PREVIEW
  ========================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5MB.");
      return;
    }

    if (profileImage && profileImage.startsWith("blob:")) {
      URL.revokeObjectURL(profileImage);
    }

    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const handleClear = () => {
    if (profileImage && profileImage.startsWith("blob:")) {
      URL.revokeObjectURL(profileImage);
    }

    setEditingId(null);
    setReviewerName("");
    setEmail("");
    setLocation("");
    setReviewText("");
    setRating(5);
    setReviewDate(getTodayDate());
    setReviewTime(getCurrentTime());
    setPlatform("All Reviews");
    setStatus("Published");
    setSelectedFile(null);
    setProfileImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     SAVE OR UPDATE TESTIMONIAL
  ========================================================= */

  const handleSaveReview = async (e) => {
    e.preventDefault();

    if (
      !reviewerName.trim() ||
      !location.trim() ||
      !reviewText.trim() ||
      !reviewDate ||
      !reviewTime
    ) {
      alert("Please fill out all required fields marked with *.");
      return;
    }

    if (reviewText.trim().length > 500) {
      alert("Review text cannot exceed 500 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("reviewer", reviewerName.trim());
    formData.append("email", email.trim());
    formData.append("location", location.trim());
    formData.append("reviewText", reviewText.trim());
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
        response = await API.put(`/testimonials/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("/testimonials", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
        alert(response.data?.message || "Failed to save testimonial.");
      }
    } catch (error) {
      console.error(
        "Error saving testimonial:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to save testimonial. Check your connection."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     POPULATE FORM FOR EDITING
  ========================================================= */

  const handleEdit = (item) => {
    setEditingId(item._id);
    setReviewerName(item.reviewer || "");
    setEmail(item.email || "");
    setLocation(item.location || "");
    setReviewText(item.reviewText || "");
    setRating(item.rating || 5);
    setReviewDate(item.date || getTodayDate());
    setReviewTime(item.time || getCurrentTime());
    setPlatform(item.platform || "All Reviews");
    setStatus(item.status || "Published");

    setSelectedFile(null);
    setProfileImage(getFullAvatarUrl(item.avatar));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DELETE ACTION
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this testimonial?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const response = await API.delete(`/testimonials/${id}`);

      if (response.data?.success) {
        setReviews((prev) => prev.filter((item) => item._id !== id));

        if (viewingReview?._id === id) {
          setViewingReview(null);
        }

        if (editingId === id) {
          handleClear();
        }

        alert("Testimonial deleted successfully.");
      } else {
        alert(response.data?.message || "Failed to delete testimonial.");
      }
    } catch (error) {
      console.error(
        "Error deleting testimonial:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "Failed to delete testimonial."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     SEARCH & PAGINATION COMPUTATIONS
  ========================================================= */

  const filteredReviews = reviews.filter((item) => {
    const reviewer = (item.reviewer || "").toLowerCase();
    const itemLocation = (item.location || "").toLowerCase();
    const message = (item.reviewText || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      reviewer.includes(search) ||
      itemLocation.includes(search) ||
      message.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="Testimonial">
      {/* HEADER BANNER */}
      <div className="Testimonial-top-banner">
        <div className="Testimonial-banner-left">
          <div className="Testimonial-banner-icon">
            <FaCommentAlt />
          </div>
          <div>
            <h1>Testimonial Management</h1>
            <p>Add, edit, and organize customer reviews for your site</p>
          </div>
        </div>

        <div className="Testimonial-total-badge">
          <FaCommentAlt className="badge-user-icon" />
          <span>{reviews.length} Total Testimonials</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="Testimonial-main-grid">
        {/* FORM CARD */}
        <div
          className={`Testimonial-card form-card${
            editingId ? " is-editing" : ""
          }`}
        >
          <div className="card-header-flex">
            <div className="card-title-icon-wrapper">
              <span className="add-icon-circle">
                {editingId ? <FaEdit /> : <FaPlus />}
              </span>
              <div>
                <h2>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
                <p>
                  {editingId
                    ? "Update the details and save changes"
                    : "Fill in the fields below to create a testimonial"}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveReview}>
            {/* Reviewer Name */}
            <div className="Testimonial-form-group">
              <label>Name *</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter traveler/customer name"
                required
              />
            </div>

            {/* Email */}
            <div className="Testimonial-form-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reviewer@example.com"
              />
            </div>

            {/* Location */}
            <div className="Testimonial-form-group">
              <label>Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Puri, Odisha"
                required
              />
            </div>

            {/* Message Body */}
            <div className="Testimonial-form-group">
              <label>Message *</label>
              <div className="textarea-wrapper">
                <textarea
                  rows="4"
                  maxLength="500"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Enter testimonial message..."
                  required
                />
                <span className="char-count">{reviewText.length}/500</span>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="Testimonial-form-group">
              <label>Rating *</label>
              <div className="Testimonial-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className="star-btn"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    <FaStar
                      className={`star-icon ${
                        star <= rating ? "selected" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="Testimonial-form-row-datetime">
              <div className="Testimonial-form-group">
                <label>Date *</label>
                <div className="input-icon-group">
                  <input
                    type="date"
                    value={reviewDate}
                    onChange={(e) => setReviewDate(e.target.value)}
                    required
                  />
                  <FaCalendarAlt className="inline-field-icon" />
                </div>
              </div>

              <div className="Testimonial-form-group time-group">
                <label>Time *</label>
                <div className="input-icon-group">
                  <input
                    type="time"
                    value={reviewTime}
                    onChange={(e) => setReviewTime(e.target.value)}
                    required
                  />
                  <FaClock className="inline-field-icon" />
                </div>
              </div>
            </div>

            {/* Platform & Status */}
            <div className="Testimonial-form-row-datetime">
              <div className="Testimonial-form-group">
                <label>Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="All Reviews">All Reviews</option>
                  <option value="Google">Google</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TripAdvisor">TripAdvisor</option>
                  <option value="Website">Website</option>
                </select>
              </div>

              <div className="Testimonial-form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="Testimonial-form-group">
              <label>Profile Image</label>
              <div className="Testimonial-file-upload-box">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  className="choose-file-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaUpload /> Choose Image
                </button>

                <span className="file-chosen-text">
                  {selectedFile
                    ? selectedFile.name
                    : profileImage
                    ? "Image selected"
                    : "No file chosen"}
                </span>

                <div className="avatar-mini-preview">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              </div>
              <span className="Testimonial-helper-text">
                JPG, PNG, or WebP. Automatically converted to WebP on upload.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="Testimonial-form-actions-bottom">
              <button
                type="button"
                className="Testimonial-clear-btn"
                onClick={handleClear}
                disabled={saving}
              >
                <FaSyncAlt /> Clear
              </button>

              <button
                type="submit"
                className="Testimonial-submit-btn"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <FaSyncAlt className="spin-icon" />
                    {editingId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {editingId ? <FaEdit /> : <FaPlus />}
                    {editingId ? "Update Testimonial" : "Add Testimonial"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="Testimonial-card table-card">
          <div className="table-card-top-header">
            <div className="table-title-left">
              <span className="list-icon-badge">
                <FaListUl />
              </span>
              <div>
                <h2>Testimonials List</h2>
                <p>View and manage all customer submissions</p>
              </div>
            </div>

            <div className="table-search-wrapper">
              <FaSearch className="table-search-icon" />
              <input
                type="text"
                placeholder="Search by name, location, or message..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="Testimonial-table-container">
            <table className="Testimonial-table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Message</th>
                  <th>Rating</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="no-data-row">
                      Loading testimonials...
                    </td>
                  </tr>
                ) : paginatedReviews.length > 0 ? (
                  paginatedReviews.map((item, index) => (
                    <tr key={item._id || item.id}>
                      <td className="sl-no-col" data-label="Sl. No.">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </td>

                      <td data-label="Image">
                        <img
                          src={getFullAvatarUrl(item.avatar)}
                          alt={item.reviewer || "Reviewer"}
                          className="table-avatar-img"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/150";
                          }}
                        />
                      </td>

                      <td className="name-col" data-label="Name">
                        {item.reviewer}
                      </td>

                      <td data-label="Location">{item.location}</td>

                      <td
                        className="message-col"
                        data-label="Message"
                        title={item.reviewText}
                      >
                        “
                        {(item.reviewText || "").length > 55
                          ? `${item.reviewText.substring(0, 55)}...`
                          : item.reviewText}
                        ”
                      </td>

                      <td data-label="Rating">
                        <div className="table-stars-row">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`star-icon ${
                                star <= item.rating ? "selected" : ""
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="datetime-col" data-label="Date & Time">
                        <div>
                          {item.formattedDate || item.date || "-"}
                        </div>
                        <small>
                          {item.formattedTime || item.time || "-"}
                        </small>
                      </td>

                      <td data-label="Action">
                        <div className="table-action-buttons">
                          <button
                            type="button"
                            className="action-icon-btn view-bg"
                            title="View details"
                            aria-label="View testimonial details"
                            onClick={() => setViewingReview(item)}
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            className="action-icon-btn edit-bg"
                            title="Edit"
                            aria-label="Edit testimonial"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            className="action-icon-btn delete-bg"
                            title="Delete"
                            aria-label="Delete testimonial"
                            disabled={deletingId === item._id}
                            onClick={() =>
                              handleDelete(item._id || item.id)
                            }
                          >
                            {deletingId === item._id ? (
                              <FaSyncAlt className="spin-icon" />
                            ) : (
                              <FaTrashAlt />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data-row">
                      {searchTerm
                        ? "No testimonials found matching your search."
                        : "No testimonials available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="Testimonial-table-footer">
            <span className="footer-showing-text">
              Showing{" "}
              {filteredReviews.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
              {filteredReviews.length} testimonials
            </span>

            <div className="footer-pagination-controls">
              <button
                type="button"
                className="pagination-arrow-btn"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`pagination-page-btn ${
                      safeCurrentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                className="pagination-arrow-btn"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
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

      {/* DETAILS VIEW MODAL */}
      {viewingReview && (
        <div
          className="Testimonial-modal-overlay"
          onClick={() => setViewingReview(null)}
        >
          <div
            className="Testimonial-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-x"
              onClick={() => setViewingReview(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="modal-user-info-row">
              <img
                src={getFullAvatarUrl(viewingReview.avatar)}
                alt={viewingReview.reviewer || "Reviewer"}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }}
              />
              <div>
                <h3>{viewingReview.reviewer}</h3>
                <p>{viewingReview.location}</p>
                {viewingReview.email && (
                  <small style={{ color: "#718096" }}>
                    {viewingReview.email}
                  </small>
                )}
              </div>
            </div>

            <div className="modal-rating-display">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar
                  key={s}
                  className={`star-icon ${
                    s <= viewingReview.rating ? "selected" : ""
                  }`}
                />
              ))}
            </div>

            <p className="modal-review-body">
              “{viewingReview.reviewText}”
            </p>

            <div className="modal-meta-info">
              <span>
                <strong>Platform:</strong>{" "}
                {viewingReview.platform || "All Reviews"}
              </span>

              <span>
                <strong>Status:</strong>{" "}
                {viewingReview.status || "Published"}
              </span>

              <span>
                <strong>Date:</strong>{" "}
                {viewingReview.formattedDate || viewingReview.date || "-"}{" "}
                at{" "}
                {viewingReview.formattedTime || viewingReview.time || "-"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;