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

import "./ReviewTable.css";

const ReviewTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const [reviews, setReviews] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      name: "Priya Sharma",
      location: "New Delhi, India",
      message:
        "Amazing experience with this travel service. Highly recommended!",
      rating: 5,
      date: "12 Aug 2025",
      time: "10:30 AM",
      platform: "Google",
      status: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      name: "Rahul Mehta",
      location: "Mumbai, India",
      message:
        "Well organized trip and great support from the team throughout.",
      rating: 5,
      date: "10 Aug 2025",
      time: "09:15 AM",
      platform: "Facebook",
      status: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80",
      name: "Ananya Das",
      location: "Kolkata, India",
      message:
        "Beautiful destinations and excellent service. Will book again.",
      rating: 4,
      date: "10 Aug 2025",
      time: "09:15 AM",
      platform: "TripAdvisor",
      status: false,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      name: "Vikram Singh",
      location: "Bangalore, India",
      message:
        "Had a wonderful time. Highly recommended for everyone.",
      rating: 5,
      date: "08 Aug 2025",
      time: "06:45 PM",
      platform: "Google",
      status: true,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      name: "Sneha Patil",
      location: "Pune, India",
      message:
        "Everything was perfect from booking to travel. Great service.",
      rating: 5,
      date: "01 Aug 2025",
      time: "05:30 PM",
      platform: "Instagram",
      status: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      name: "Amit Kumar",
      location: "Hyderabad, India",
      message:
        "Great team and support. Will travel again soon with them.",
      rating: 4,
      date: "05 Aug 2025",
      time: "11:25 AM",
      platform: "Google",
      status: false,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
      name: "Neha Verma",
      location: "Chennai, India",
      message:
        "Memorable journey with amazing people and excellent service.",
      rating: 5,
      date: "03 Aug 2025",
      time: "08:50 AM",
      platform: "Facebook",
      status: true,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1507002262328-0a8e5b7f8b44?w=150&q=80",
      name: "Karan Malhotra",
      location: "Jaipur, India",
      message:
        "Good service and well-planned itinerary. Highly satisfied.",
      rating: 5,
      date: "01 Aug 2025",
      time: "05:30 PM",
      platform: "TripAdvisor",
      status: true,
    },
  ]);

  // ==========================================
  // SELECTED REVIEWS
  // ==========================================

  const [selectedReviews, setSelectedReviews] = useState([]);

  const selectAllRef = useRef(null);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.max(
    1,
    Math.ceil(reviews.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentReviews = reviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ==========================================
  // CURRENT PAGE SELECTION STATUS
  // ==========================================

  const currentPageIds = currentReviews.map(
    (review) => review.id
  );

  const selectedCurrentPageCount =
    currentPageIds.filter((id) =>
      selectedReviews.includes(id)
    ).length;

  const isAllCurrentPageSelected =
    currentReviews.length > 0 &&
    selectedCurrentPageCount === currentReviews.length;

  const isSomeCurrentPageSelected =
    selectedCurrentPageCount > 0 &&
    selectedCurrentPageCount < currentReviews.length;

  // ==========================================
  // INDETERMINATE SELECT ALL CHECKBOX
  // ==========================================

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

  // ==========================================
  // SELECT ALL
  // ==========================================

  const handleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      // Deselect all current page rows
      setSelectedReviews((prev) =>
        prev.filter(
          (id) => !currentPageIds.includes(id)
        )
      );
    } else {
      // Select all current page rows
      setSelectedReviews((prev) => [
        ...new Set([...prev, ...currentPageIds]),
      ]);
    }
  };

  // ==========================================
  // INDIVIDUAL CHECKBOX
  // ==========================================

  const handleSelectReview = (id) => {
    setSelectedReviews((prev) => {
      if (prev.includes(id)) {
        return prev.filter(
          (selectedId) => selectedId !== id
        );
      }

      return [...prev, id];
    });
  };

  // ==========================================
  // STATUS TOGGLE
  // ==========================================

  const toggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status: !review.status,
            }
          : review
      )
    );
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmDelete) return;

    setReviews((prev) =>
      prev.filter((review) => review.id !== id)
    );

    // Remove from selected list
    setSelectedReviews((prev) =>
      prev.filter((selectedId) => selectedId !== id)
    );

    // Keep pagination valid
    setCurrentPage((prevPage) => {
      const remainingReviews = reviews.length - 1;

      const newTotalPages = Math.max(
        1,
        Math.ceil(
          remainingReviews / itemsPerPage
        )
      );

      return Math.min(
        prevPage,
        newTotalPages
      );
    });
  };

  // ==========================================
  // PLATFORM CLASS
  // ==========================================

  const getPlatformClass = (platform) => {
    return platform
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // ==========================================
  // RATING STARS
  // ==========================================

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

  return (
    <div className="ReviewTable">

      {/* ======================================
          TABLE
      ====================================== */}

      <div className="ReviewTableWrapper">

        <table className="ReviewTableTable">

          <thead>
            <tr>

              {/* SELECT ALL */}
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
              currentReviews.map(
                (review, index) => {

                  const isSelected =
                    selectedReviews.includes(
                      review.id
                    );

                  return (
                    <tr
                      key={review.id}
                      className={
                        isSelected
                          ? "ReviewTableRowSelected"
                          : ""
                      }
                    >

                      {/* ROW CHECKBOX */}
                      <td>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            handleSelectReview(
                              review.id
                            )
                          }
                          aria-label={`Select ${review.name}`}
                        />
                      </td>

                      {/* NUMBER */}
                      <td>
                        <span className="ReviewTableNumber">
                          {String(
                            startIndex +
                              index +
                              1
                          ).padStart(2, "0")}
                        </span>
                      </td>

                      {/* IMAGE */}
                      <td>
                        <div className="ReviewTableImage">

                          <img
                            src={review.image}
                            alt={review.name}
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";

                              e.currentTarget.parentElement.classList.add(
                                "ReviewTableImageFallback"
                              );
                            }}
                          />

                        </div>
                      </td>

                      {/* NAME */}
                      <td>
                        <div className="ReviewTableName">
                          {review.name}
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td>
                        <div className="ReviewTableLocation">

                          <MapPin size={17} />

                          <span>
                            {review.location}
                          </span>

                        </div>
                      </td>

                      {/* MESSAGE */}
                      <td>
                        <div
                          className="ReviewTableMessage"
                          title={review.message}
                        >
                          {review.message}
                        </div>
                      </td>

                      {/* RATING */}
                      <td>
                        {renderStars(
                          review.rating
                        )}
                      </td>

                      {/* DATE & TIME */}
                      <td>

                        <div className="ReviewTableDate">

                          <div>
                            <CalendarDays size={15} />

                            <span>
                              {review.date}
                            </span>
                          </div>

                          <div>
                            <Clock3 size={15} />

                            <span>
                              {review.time}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* PLATFORM */}
                      <td>

                        <span
                          className={`ReviewTablePlatform ReviewTablePlatform-${getPlatformClass(
                            review.platform
                          )}`}
                        >
                          {review.platform}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td>

                        <div className="ReviewTableStatus">

                          <button
                            type="button"
                            className={`ReviewTableToggle ${
                              review.status
                                ? "ReviewTableToggleActive"
                                : ""
                            }`}
                            onClick={() =>
                              toggleStatus(
                                review.id
                              )
                            }
                            aria-label={
                              review.status
                                ? "Unpublish"
                                : "Publish"
                            }
                          >
                            <span />
                          </button>

                          <small>
                            {review.status
                              ? "Published"
                              : "Unpublished"}
                          </small>

                        </div>

                      </td>

                      {/* DELETE ONLY */}
                      <td>

                        <div className="ReviewTableActions">

                          <button
                            type="button"
                            className="ReviewTableDeleteButton"
                            title="Delete"
                            aria-label={`Delete ${review.name}`}
                            onClick={() =>
                              handleDelete(
                                review.id
                              )
                            }
                          >
                            <Trash2 size={17} />
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
                  colSpan="11"
                  className="ReviewTableEmpty"
                >

                  <MessageCircle size={42} />

                  <h3>
                    No testimonials found
                  </h3>

                  <p>
                    There are no testimonials
                    available.
                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="ReviewTableFooter">

        <p>
          Showing{" "}
          <strong>
            {reviews.length === 0
              ? 0
              : startIndex + 1}
          </strong>{" "}
          to{" "}
          <strong>
            {Math.min(
              startIndex + itemsPerPage,
              reviews.length
            )}
          </strong>{" "}
          of{" "}
          <strong>
            {reviews.length}
          </strong>{" "}
          testimonials
        </p>

        <div className="ReviewTablePagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(
                  1,
                  prev - 1
                )
              )
            }
          >
            <ChevronLeft size={18} />

            <span>Prev</span>
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, index) =>
              index + 1
          ).map((page) => (

            <button
              key={page}
              className={
                currentPage === page
                  ? "ReviewTablePageActive"
                  : ""
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}

          <button
            disabled={
              currentPage >=
              totalPages
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  totalPages,
                  prev + 1
                )
              )
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