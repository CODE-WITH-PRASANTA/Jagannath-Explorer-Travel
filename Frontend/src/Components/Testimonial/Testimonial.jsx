import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaGoogle,
  FaStar,
  FaRegStar,
  FaUser,
  FaEnvelope,
  FaCommentAlt,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";

import "./Testimonial.css";
import API, { IMG_URL } from "../../api/axios";

const Testimonial = () => {
  /* =========================================================
     REVIEWS
  ========================================================= */

  const [allReviewsData, setAllReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  /* =========================================================
     FORM
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    date: "",
    message: "",
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState("");

  /* =========================================================
     CUSTOM CALENDAR
  ========================================================= */

  const today = new Date();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(
    today.getMonth()
  );

  const [calendarYear, setCalendarYear] = useState(
    today.getFullYear()
  );

  const calendarRef = useRef(null);

  /* =========================================================
     FETCH TESTIMONIALS
     BACKEND CONNECTION UNCHANGED
  ========================================================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const response = await API.get("/testimonials");

        if (response.data && response.data.success) {
          const formattedReviews = response.data.data.map((item) => ({
            id: item._id,

            platform: item.platform
              ? item.platform.toLowerCase()
              : "all",

            name: item.reviewer || "Traveler",

            location: item.location || "",

            date: item.formattedDate || item.date || "",

            time: item.formattedTime || item.time || "",

            rating: Number(item.rating) || 5,

            text: item.reviewText || "",

            avatar:
              item.avatar && item.avatar.startsWith("http")
                ? item.avatar
                : `${IMG_URL || "http://localhost:5000"}${
                    item.avatar || ""
                  }`,
          }));

          setAllReviewsData(formattedReviews);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);

        setError(
          "Failed to load testimonials. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* =========================================================
     SCREEN SIZE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     CLOSE CALENDAR WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [isCalendarOpen]);

  /* =========================================================
     CARDS PER PAGE
  ========================================================= */

  const cardsPerPage =
    screenWidth <= 650
      ? 1
      : screenWidth <= 1050
      ? 2
      : 3;

  const isMobile = screenWidth <= 650;

  /* =========================================================
     FILTER REVIEWS
  ========================================================= */

  const filteredReviews =
    activeTab === "all"
      ? allReviewsData
      : allReviewsData.filter(
          (item) =>
            item.platform === activeTab ||
            item.platform === activeTab.toLowerCase()
        );

  const maxStartIndex = Math.max(
    0,
    filteredReviews.length - cardsPerPage
  );

  /* =========================================================
     RESET SLIDER
  ========================================================= */

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab, cardsPerPage]);

  /* =========================================================
     FORM INPUT
  ========================================================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormMessage("");
  };

  /* =========================================================
     RATING
  ========================================================= */

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setFormMessage("");
  };

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormMessage(
        "Please upload a JPG, PNG or WebP image."
      );
      setFormMessageType("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormMessage(
        "Image size should not exceed 5MB."
      );
      setFormMessageType("error");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setFormMessage("");
  };

  const removeSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");
  };

  /* =========================================================
     CALENDAR HELPERS
  ========================================================= */

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(
      year,
      month + 1,
      0
    ).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(
      year,
      month,
      1
    ).getDay();

    return day === 0 ? 6 : day - 1;
  };

  const getDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] =
      dateString.split("-");

    return `${day}/${month}/${year}`;
  };

  const selectedDateObject = formData.date
    ? new Date(`${formData.date}T00:00:00`)
    : null;

  /* =========================================================
     CALENDAR DAYS
  ========================================================= */

  const calendarDays = [];

  const firstDay = getFirstDayOfMonth(
    calendarYear,
    calendarMonth
  );

  const daysInMonth = getDaysInMonth(
    calendarYear,
    calendarMonth
  );

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  /* =========================================================
     DATE CHECK
  ========================================================= */

  const isToday = (day) => {
    if (!day) return false;

    return (
      day === today.getDate() &&
      calendarMonth === today.getMonth() &&
      calendarYear === today.getFullYear()
    );
  };

  const isSelectedDate = (day) => {
    if (!day || !selectedDateObject) {
      return false;
    }

    return (
      day === selectedDateObject.getDate() &&
      calendarMonth ===
        selectedDateObject.getMonth() &&
      calendarYear ===
        selectedDateObject.getFullYear()
    );
  };

  const isPastDate = (day) => {
    if (!day) return false;

    const date = new Date(
      calendarYear,
      calendarMonth,
      day
    );

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return date < todayStart;
  };

  /* =========================================================
     OPEN CALENDAR
  ========================================================= */

  const handleCalendarOpen = () => {
    if (formData.date) {
      const [year, month] =
        formData.date.split("-");

      setCalendarYear(Number(year));
      setCalendarMonth(Number(month) - 1);
    } else {
      setCalendarYear(today.getFullYear());
      setCalendarMonth(today.getMonth());
    }

    setIsCalendarOpen((prev) => !prev);
  };

  /* =========================================================
     MONTH NAVIGATION
  ========================================================= */

  const goToPreviousMonth = () => {
    if (
      calendarYear === today.getFullYear() &&
      calendarMonth === today.getMonth()
    ) {
      return;
    }

    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((prev) => prev - 1);
    } else {
      setCalendarMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((prev) => prev + 1);
    } else {
      setCalendarMonth((prev) => prev + 1);
    }
  };

  /* =========================================================
     SELECT DATE
  ========================================================= */

  const handleDateSelect = (day) => {
    if (!day || isPastDate(day)) {
      return;
    }

    const dateKey = getDateKey(
      calendarYear,
      calendarMonth,
      day
    );

    setFormData((prev) => ({
      ...prev,
      date: dateKey,
    }));

    setIsCalendarOpen(false);
    setFormMessage("");
  };

  /* =========================================================
     SUBMIT
     BACKEND NOT CHANGED
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormMessage("Please enter your name.");
      setFormMessageType("error");
      return;
    }

    if (!formData.email.trim()) {
      setFormMessage("Please enter your email.");
      setFormMessageType("error");
      return;
    }

    if (!formData.location.trim()) {
      setFormMessage(
        "Please enter your travel location."
      );
      setFormMessageType("error");
      return;
    }

    if (!formData.date) {
      setFormMessage(
        "Please select your travel date."
      );
      setFormMessageType("error");
      return;
    }

    if (!selectedRating) {
      setFormMessage(
        "Please select your rating."
      );
      setFormMessageType("error");
      return;
    }

    if (!formData.message.trim()) {
      setFormMessage(
        "Please write your experience."
      );
      setFormMessageType("error");
      return;
    }

    /*
      BACKEND SUBMISSION WILL BE CONNECTED LATER.

      Existing backend GET connection remains unchanged.

      Example POST later:

      const data = new FormData();

      data.append("reviewer", formData.name);
      data.append("email", formData.email);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("rating", selectedRating);
      data.append("reviewText", formData.message);

      if (selectedImage) {
        data.append("avatar", selectedImage);
      }

      await API.post("/testimonials", data);
    */

    setFormMessage(
      "Thank you! Your testimonial is ready to be submitted."
    );

    setFormMessageType("success");
  };

  /* =========================================================
     SLIDER
  ========================================================= */

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (filteredReviews.length <= cardsPerPage) {
      return;
    }

    if (isMobile) {
      setCurrentIndex((prev) =>
        prev > 0
          ? prev - 1
          : filteredReviews.length - 1
      );

      return;
    }

    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxStartIndex;
      }

      return Math.max(
        0,
        prev - cardsPerPage
      );
    });
  };

  const handleNext = () => {
    if (filteredReviews.length <= cardsPerPage) {
      return;
    }

    if (isMobile) {
      setCurrentIndex((prev) =>
        prev < filteredReviews.length - 1
          ? prev + 1
          : 0
      );

      return;
    }

    setCurrentIndex((prev) => {
      if (prev >= maxStartIndex) {
        return 0;
      }

      return Math.min(
        maxStartIndex,
        prev + cardsPerPage
      );
    });
  };

  /* =========================================================
     AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    if (
      isPaused ||
      filteredReviews.length <= cardsPerPage
    ) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    isPaused,
    filteredReviews.length,
    cardsPerPage,
    maxStartIndex,
  ]);

  const displayedReviews = filteredReviews.slice(
    currentIndex,
    currentIndex + cardsPerPage
  );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="testimonial-section">
        <div className="testimonial-loading">
          <div className="testimonial-loader"></div>
          <p>Loading traveler reviews...</p>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <section className="testimonial-section">
        <div className="testimonial-error">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <section className="testimonial-section">

      <div className="testimonial-container">

        {/* =====================================================
            FORM
        ===================================================== */}

        <div className="testimonial-form-section">

          {/* Decorative elements */}

          <div className="travel-decoration airplane">
            ✈
          </div>

          <div className="travel-decoration mountain">
            ◢
          </div>

          <div className="travel-decoration compass">
            ✥
          </div>

          <div className="travel-decoration trees">
            ▲ ▲ ▲
          </div>

          <div className="travel-word-decoration">
            Travel
            <br />
            Explore
            <br />
            Repeat
          </div>

          {/* ================= HEADER ================= */}

          <div className="testimonial-form-header">

            <div className="testimonial-form-badge">
              <span>✦</span>
              <span>Share Your Experience</span>
              <span>✦</span>
            </div>

            <h2>
              Leave a Testimonial
            </h2>

            <p>
              Your feedback helps us grow and inspires
              other travelers. Share your experience with
              us and be a part of our journey!
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            className="testimonial-form"
            onSubmit={handleSubmit}
          >

            {/* =================================================
                ROW ONE
            ================================================= */}

            <div className="testimonial-form-grid">

              {/* NAME */}

              <div className="form-field">

                <label htmlFor="testimonial-name">
                  Your Name <span>*</span>
                </label>

                <div className="form-input-wrapper">

                  <FaUser className="form-input-icon" />

                  <input
                    id="testimonial-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="form-field">

                <label htmlFor="testimonial-email">
                  Your Email <span>*</span>
                </label>

                <div className="form-input-wrapper">

                  <FaEnvelope className="form-input-icon" />

                  <input
                    id="testimonial-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />

                </div>

              </div>

              {/* RATING */}

              <div className="form-field">

                <label>
                  Your Rating <span>*</span>
                </label>

                <div className="rating-selector">

                  <div className="rating-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <button
                          key={star}
                          type="button"
                          className="rating-star-btn"
                          onMouseEnter={() =>
                            setHoverRating(star)
                          }
                          onMouseLeave={() =>
                            setHoverRating(0)
                          }
                          onClick={() =>
                            handleRatingClick(star)
                          }
                        >
                          {star <=
                          (hoverRating ||
                            selectedRating) ? (
                            <FaStar />
                          ) : (
                            <FaRegStar />
                          )}
                        </button>
                      )
                    )}

                  </div>

                  <span className="rating-value">
                    {selectedRating
                      ? `${selectedRating}/5`
                      : "Rate us"}
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                ROW TWO
            ================================================= */}

            <div className="testimonial-form-grid second-row">

              {/* LOCATION */}

              <div className="form-field">

                <label htmlFor="testimonial-location">
                  Travel Location <span>*</span>
                </label>

                <div className="form-input-wrapper">

                  <FaMapMarkerAlt className="form-input-icon location-icon" />

                  <input
                    id="testimonial-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Puri, Odisha"
                  />

                </div>

              </div>

              {/* =================================================
                  CUSTOM CALENDAR
              ================================================= */}

              <div
                className="form-field calendar-field"
                ref={calendarRef}
              >

                <label>
                  Travel Date <span>*</span>
                </label>

                <button
                  type="button"
                  className={`calendar-input ${
                    isCalendarOpen
                      ? "calendar-input-active"
                      : ""
                  }`}
                  onClick={handleCalendarOpen}
                >

                  <FaCalendarAlt className="form-input-icon date-icon" />

                  <span
                    className={
                      formData.date
                        ? "selected-date-text"
                        : "date-placeholder"
                    }
                  >
                    {formData.date
                      ? formatDateDisplay(
                          formData.date
                        )
                      : "Select travel date"}
                  </span>

                  <FaChevronDownIcon />

                </button>

                {/* =================================================
                    PREMIUM EMBOSSED CALENDAR
                ================================================= */}

                {isCalendarOpen && (
                  <div className="premium-calendar">

                    {/* Calendar Header */}

                    <div className="calendar-header">

                      <button
                        type="button"
                        className="calendar-nav-btn"
                        onClick={
                          goToPreviousMonth
                        }
                        disabled={
                          calendarYear ===
                            today.getFullYear() &&
                          calendarMonth ===
                            today.getMonth()
                        }
                        aria-label="Previous month"
                      >
                        <FaChevronLeft />
                      </button>

                      <div className="calendar-month-title">

                        <strong>
                          {
                            monthNames[
                              calendarMonth
                            ]
                          }
                        </strong>

                        <span>
                          {calendarYear}
                        </span>

                      </div>

                      <button
                        type="button"
                        className="calendar-nav-btn"
                        onClick={
                          goToNextMonth
                        }
                        aria-label="Next month"
                      >
                        <FaChevronRight />
                      </button>

                    </div>

                    {/* Calendar Top Shadow */}

                    <div className="calendar-emboss-line"></div>

                    {/* Weekdays */}

                    <div className="calendar-weekdays">

                      {weekDays.map(
                        (day) => (
                          <span key={day}>
                            {day}
                          </span>
                        )
                      )}

                    </div>

                    {/* Dates */}

                    <div className="calendar-days">

                      {calendarDays.map(
                        (day, index) => {

                          if (!day) {
                            return (
                              <span
                                key={`empty-${index}`}
                                className="calendar-empty"
                              ></span>
                            );
                          }

                          const selected =
                            isSelectedDate(
                              day
                            );

                          const current =
                            isToday(day);

                          const past =
                            isPastDate(day);

                          return (
                            <button
                              type="button"
                              key={day}
                              className={`calendar-day ${
                                selected
                                  ? "selected"
                                  : ""
                              } ${
                                current
                                  ? "today"
                                  : ""
                              } ${
                                past
                                  ? "past"
                                  : ""
                              }`}
                              onClick={() =>
                                handleDateSelect(
                                  day
                                )
                              }
                              disabled={past}
                            >
                              <span>
                                {day}
                              </span>
                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* Calendar Footer */}

                    <div className="calendar-footer">

                      <button
                        type="button"
                        className="calendar-today-btn"
                        onClick={() => {
                          setCalendarMonth(
                            today.getMonth()
                          );

                          setCalendarYear(
                            today.getFullYear()
                          );
                        }}
                      >
                        Today
                      </button>

                      {formData.date && (
                        <span>
                          {formatDateDisplay(
                            formData.date
                          )}
                        </span>
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="form-field">

                <label>
                  Upload Image{" "}
                  <small>(Optional)</small>
                </label>

                <div className="upload-box">

                  <input
                    id="testimonial-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="testimonial-image"
                    className="upload-content"
                  >

                    {imagePreview ? (
                      <div className="image-preview-wrapper">

                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="upload-preview-image"
                        />

                        <div className="upload-preview-text">

                          <strong>
                            Image selected
                          </strong>

                          <span>
                            Click to change
                          </span>

                        </div>

                      </div>
                    ) : (
                      <>
                        <div className="upload-icon-box">
                          <FaImage />
                        </div>

                        <div className="upload-text">

                          <strong>
                            Click to upload an image
                          </strong>

                          <span>
                            JPG, PNG or WebP
                            <b> (Max 5MB)</b>
                          </span>

                        </div>
                      </>
                    )}

                  </label>

                  {imagePreview && (
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={removeSelectedImage}
                    >
                      <FaTimes />
                    </button>
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                ROW THREE
            ================================================= */}

            <div className="testimonial-form-bottom">

              <div className="form-field message-field">

                <label htmlFor="testimonial-message">
                  Your Message <span>*</span>
                </label>

                <div className="form-textarea-wrapper">

                  <FaCommentAlt className="form-textarea-icon" />

                  <textarea
                    id="testimonial-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your travel experience..."
                    rows="4"
                  ></textarea>

                </div>

              </div>

              <button
                type="submit"
                className="testimonial-submit-btn"
              >
                <span>
                  Submit Testimonial
                </span>

                <FaPaperPlane />
              </button>

            </div>

            {/* FORM MESSAGE */}

            {formMessage && (
              <div
                className={`testimonial-form-message ${
                  formMessageType
                }`}
              >
                <span>
                  {formMessageType === "success"
                    ? "✓"
                    : "!"}
                </span>

                {formMessage}
              </div>
            )}

          </form>

        </div>

        {/* =====================================================
            REVIEWS HEADER
        ===================================================== */}

        <div className="testimonial-header">

          <div className="testimonial-badge">

            <span className="badge-arrow">
              ➜
            </span>

            <span>
              Testimonial
            </span>

            <span className="badge-sparkle">
              ✦
            </span>

          </div>

          <h2 className="testimonial-main-title">
            Regards From Travelers
          </h2>

          <p className="testimonial-subtitle">
            Real stories and memorable experiences
            shared by our travelers.
          </p>

        </div>

        {/* =====================================================
            PLATFORM FILTER
        ===================================================== */}

        <div className="platform-nav-pill">

          <button
            type="button"
            className={`pill-btn ${
              activeTab === "all"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleTabChange("all")
            }
          >
            All Reviews
          </button>

          <button
            type="button"
            className={`pill-btn ${
              activeTab === "tripadvisor"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleTabChange("tripadvisor")
            }
          >
            <SiTripadvisor className="platform-icon tripadvisor-color" />
            <span>Tripadvisor</span>
          </button>

          <button
            type="button"
            className={`pill-btn ${
              activeTab === "facebook"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleTabChange("facebook")
            }
          >
            <span className="circle-fb-icon">
              <FaFacebookF />
            </span>

            <span>Facebook</span>
          </button>

          <button
            type="button"
            className={`pill-btn ${
              activeTab === "google"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleTabChange("google")
            }
          >
            <span className="circle-g-icon">
              <FaGoogle />
            </span>

            <span>Google</span>
          </button>

        </div>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        {allReviewsData.length > 0 && (
          <div
            className="slider-wrapper"
            onMouseEnter={() =>
              setIsPaused(true)
            }
            onMouseLeave={() =>
              setIsPaused(false)
            }
          >

            <button
              type="button"
              className="nav-arrow-btn left-arrow"
              onClick={handlePrev}
              disabled={
                filteredReviews.length <=
                cardsPerPage
              }
              aria-label="Previous reviews"
            >
              <FaChevronLeft />
            </button>

            <div
              className={`reviews-grid ${
                cardsPerPage === 1
                  ? "one-card"
                  : cardsPerPage === 2
                  ? "two-cards"
                  : "three-cards"
              }`}
            >

              {displayedReviews.map(
                (review) => (
                  <div
                    key={review.id}
                    className="review-unit"
                  >

                    <div className="speech-bubble-box">

                      <div className="review-content">

                        <div className="review-quote-mark">
                          “
                        </div>

                        <p className="review-quote-text">
                          {review.text}
                        </p>

                      </div>

                      <div className="card-meta-bottom">

                        <div className="stars-row">

                          {[1, 2, 3, 4, 5].map(
                            (star) =>
                              star <=
                              review.rating ? (
                                <FaStar
                                  key={star}
                                  className="star-filled"
                                />
                              ) : (
                                <FaRegStar
                                  key={star}
                                  className="star-empty"
                                />
                              )
                          )}

                        </div>

                        <div className="quote-watermark-icon">
                          “
                        </div>

                        <div className="timestamp-block">

                          <span className="date-str">
                            {review.date}
                          </span>

                          <span className="time-str">
                            {review.time}
                          </span>

                        </div>

                      </div>

                      <div className="bubble-pointer-tail"></div>

                    </div>

                    <div className="traveler-profile-row">

                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="traveler-avatar"
                      />

                      <div className="traveler-details">

                        <h4 className="traveler-name">
                          {review.name}
                        </h4>

                        <span className="traveler-country">
                          {review.location}
                        </span>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

            <button
              type="button"
              className="nav-arrow-btn right-arrow"
              onClick={handleNext}
              disabled={
                filteredReviews.length <=
                cardsPerPage
              }
              aria-label="Next reviews"
            >
              <FaChevronRight />
            </button>

          </div>
        )}

        {/* MOBILE DOTS */}

        {isMobile &&
          filteredReviews.length > 1 && (
            <div className="mobile-dots-container">

              {filteredReviews.map(
                (_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`mobile-dot ${
                      currentIndex === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentIndex(index)
                    }
                    aria-label={`Review ${
                      index + 1
                    }`}
                  />
                )
              )}

            </div>
          )}

      </div>

    </section>
  );
};

/* =========================================================
   SMALL CHEVRON DOWN COMPONENT
========================================================= */

const FaChevronDownIcon = () => (
  <svg
    className="calendar-dropdown-icon"
    viewBox="0 0 24 24"
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default Testimonial;