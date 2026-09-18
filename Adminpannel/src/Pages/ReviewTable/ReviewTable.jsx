import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";
import "./ReviewTable.css";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedReviews, setSelectedReviews] = useState([]);
  const selectAllRef = useRef(null);

  // ==========================================
  // FETCH ALL REVIEWS (ADMIN VIEW)
  // ==========================================
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await API.get("/testimonials/admin");

      if (res.data?.success) {
        const formatted = res.data.data.map((item) => ({
          id: item._id,
          image: item.avatar
            ? item.avatar.startsWith("http")
              ? item.avatar
              : `${IMG_URL || "http://localhost:5000"}${item.avatar}`
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
          name: item.reviewer || "Traveler",
          location: item.location || "",
          message: item.reviewText || "",
          rating: Number(item.rating) || 5,
          date: item.formattedDate || item.date || "",
          time: item.formattedTime || item.time || "",
          platform: item.platform || "All Reviews",
          status: item.status === "Published",
        }));

        setReviews(formatted);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
      setError("Failed to load reviews from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ==========================================
  // PAGINATION
  // ==========================================
  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  const currentPageIds = currentReviews.map((review) => review.id);

  const selectedCurrentPageCount = currentPageIds.filter((id) =>
    selectedReviews.includes(id)
  ).length;

  const isAllCurrentPageSelected =
    currentReviews.length > 0 &&
    selectedCurrentPageCount === currentReviews.length;

  const isSomeCurrentPageSelected =
    selectedCurrentPageCount > 0 &&
    selectedCurrentPageCount < currentReviews.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

  // ==========================================
  // SELECTION HANDLERS
  // ==========================================
  const handleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      setSelectedReviews((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedReviews((prev) => [
        ...new Set([...prev, ...currentPageIds]),
      ]);
    }
  };

  const handleSelectReview = (id) => {
    setSelectedReviews((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // ==========================================
  // STATUS TOGGLE (PUBLISH / UNPUBLISH)
  // ==========================================
  const toggleStatus = async (id) => {
    try {
      const res = await API.patch(`/testimonials/${id}/status`);

      if (res.data?.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review.id === id
              ? {
                  ...review,
                  status: res.data.data.status === "Published",
                }
              : review
          )
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
      alert("Failed to update status on server.");
    }
  };

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/testimonials/${id}`);

      if (res.data?.success) {
        setReviews((prev) => prev.filter((review) => review.id !== id));
        setSelectedReviews((prev) =>
          prev.filter((selectedId) => selectedId !== id)
        );

        setCurrentPage((prevPage) => {
          const remainingReviews = reviews.length - 1;
          const newTotalPages = Math.max(
            1,
            Math.ceil(remainingReviews / itemsPerPage)
          );
          return Math.min(prevPage, newTotalPages);
        });
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("Failed to delete testimonial.");
    }
  };

  const getPlatformClass = (platform) => {
    return (platform || "all-reviews")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const renderStars = (rating) => {
    return (
      <div className="ReviewTableStars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "ReviewTableStar ReviewTableStarActive"
                : "ReviewTableStar"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="ReviewTable" style={{ padding: "40px", textAlign: "center" }}>
        <p>Loading testimonial reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ReviewTable" style={{ padding: "40px", textAlign: "center", color: "#e63946" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="ReviewTable">
      <div className="ReviewTableWrapper">
        <table className="ReviewTableTable">
          <thead>
            <tr>
              <th className="ReviewTableCheckboxColumn">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={isAllCurrentPageSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all testimonials"
                />
              </th>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Date & Time</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => {
                const isSelected = selectedReviews.includes(review.id);

                return (
                  <tr
                    key={review.id}
                    className={isSelected ? "ReviewTableRowSelected" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectReview(review.id)}
                        aria-label={`Select ${review.name}`}
                      />
                    </td>

                    <td>
                      <span className="ReviewTableNumber">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </span>
                    </td>

                    <td>
                      <div className="ReviewTableImage">
                        <img
                          src={review.image}
                          alt={review.name}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.classList.add(
                              "ReviewTableImageFallback"
                            );
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      <div className="ReviewTableName">{review.name}</div>
                    </td>

                    <td>
                      <div className="ReviewTableLocation">
                        <MapPin size={17} />
                        <span>{review.location}</span>
                      </div>
                    </td>

                    <td>
                      <div
                        className="ReviewTableMessage"
                        title={review.message}
                      >
                        {review.message}
                      </div>
                    </td>

                    <td>{renderStars(review.rating)}</td>

                    <td>
                      <div className="ReviewTableDate">
                        <div>
                          <CalendarDays size={15} />
                          <span>{review.date}</span>
                        </div>
                        <div>
                          <Clock3 size={15} />
                          <span>{review.time}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`ReviewTablePlatform ReviewTablePlatform-${getPlatformClass(
                          review.platform
                        )}`}
                      >
                        {review.platform}
                      </span>
                    </td>

                    <td>
                      <div className="ReviewTableStatus">
                        <button
                          type="button"
                          className={`ReviewTableToggle ${
                            review.status ? "ReviewTableToggleActive" : ""
                          }`}
                          onClick={() => toggleStatus(review.id)}
                          aria-label={
                            review.status ? "Unpublish" : "Publish"
                          }
                        >
                          <span />
                        </button>
                        <small>
                          {review.status ? "Published" : "Unpublished"}
                        </small>
                      </div>
                    </td>

                    <td>
                      <div className="ReviewTableActions">
                        <button
                          type="button"
                          className="ReviewTableDeleteButton"
                          title="Delete"
                          aria-label={`Delete ${review.name}`}
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11" className="ReviewTableEmpty">
                  <MessageCircle size={42} />
                  <h3>No testimonials found</h3>
                  <p>There are no testimonials available.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="ReviewTableFooter">
        <p>
          Showing{" "}
          <strong>
            {reviews.length === 0 ? 0 : startIndex + 1}
          </strong>{" "}
          to{" "}
          <strong>
            {Math.min(startIndex + itemsPerPage, reviews.length)}
          </strong>{" "}
          of <strong>{reviews.length}</strong> testimonials
        </p>

        <div className="ReviewTablePagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft size={18} />
            <span>Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={currentPage === page ? "ReviewTablePageActive" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTable;