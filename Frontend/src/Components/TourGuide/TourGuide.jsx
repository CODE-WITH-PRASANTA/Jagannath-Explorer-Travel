
import React, { useEffect, useRef, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./TourGuide.css";
import API, { IMG_URL } from "../../api/axios";

const TourGuide = () => {
  /* =====================================================
     STATES
  ====================================================== */

  const [guides, setGuides] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     CAROUSEL REF
  ====================================================== */

  const carouselRef = useRef(null);

  /* =====================================================
     IMAGE URL HELPER
  ====================================================== */

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder-guide.jpg";
    }

    // Already a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    const baseUrl =
      IMG_URL || "http://localhost:5000";

    // Prevent double slash
    if (image.startsWith("/")) {
      return `${baseUrl}${image}`;
    }

    return `${baseUrl}/${image}`;
  };

  /* =====================================================
     SOCIAL URL HELPERS
  ====================================================== */

  const getInstagramUrl = (instagram) => {
    if (!instagram) {
      return "#";
    }

    const value = instagram.trim();

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `https://instagram.com/${value.replace(/^@/, "")}`;
  };

  const getFacebookUrl = (facebook) => {
    if (!facebook) {
      return "#";
    }

    const value = facebook.trim();

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `https://facebook.com/${value.replace(/^@/, "")}`;
  };

  const getWhatsappUrl = (whatsapp) => {
    if (!whatsapp) {
      return "#";
    }

    const phoneNumber = String(whatsapp).replace(
      /[^0-9]/g,
      ""
    );

    if (!phoneNumber) {
      return "#";
    }

    return `https://wa.me/${phoneNumber}`;
  };

  /* =====================================================
     FETCH TOUR GUIDES
     
     IMPORTANT:
     axios.js already has /api in baseURL.
     
     Correct:
     API.get("/team")
     
     This calls:
     http://localhost:5000/api/team
  ====================================================== */

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);

        const response = await API.get("/team");

        console.log(
          "Tour Guide API Response:",
          response.data
        );

        if (response.data?.success) {
          setGuides(
            Array.isArray(response.data.data)
              ? response.data.data
              : []
          );
        } else {
          setGuides([]);
        }
      } catch (error) {
        console.error(
          "Error fetching tour guides:",
          error
        );

        console.error(
          "Status:",
          error.response?.status
        );

        console.error(
          "Response:",
          error.response?.data
        );

        console.error(
          "Request URL:",
          error.config?.url
        );

        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  /* =====================================================
     RESPONSIVE VISIBLE CARDS
  ====================================================== */

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 950) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener(
      "resize",
      updateVisibleCards
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCards
      );
    };
  }, []);

  /* =====================================================
     TOTAL PAGES
     
     We move one card at a time.
  ====================================================== */

  const totalPages = guides.length;

  /* =====================================================
     KEEP CURRENT PAGE VALID
  ====================================================== */

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage >= totalPages
    ) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  /* =====================================================
     SCROLL ONE CARD AT A TIME
  ====================================================== */

  useEffect(() => {
    if (
      !carouselRef.current ||
      totalPages === 0
    ) {
      return;
    }

    const carousel = carouselRef.current;

    const card = carousel.querySelector(
      ".TourGuide__card"
    );

    if (!card) {
      return;
    }

    const cardWidth =
      card.getBoundingClientRect().width;

    const carouselStyle =
      window.getComputedStyle(carousel);

    const gap =
      parseFloat(carouselStyle.columnGap) ||
      parseFloat(carouselStyle.gap) ||
      0;

    const moveAmount = cardWidth + gap;

    carousel.scrollTo({
      left: currentPage * moveAmount,
      behavior: "smooth",
    });
  }, [
    currentPage,
    visibleCards,
    totalPages,
  ]);

  /* =====================================================
     AUTOMATIC SLIDE
     
     Moves one card every 4.5 seconds.
  ====================================================== */

  useEffect(() => {
    if (
      isPaused ||
      totalPages <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentPage(
        (previousPage) => {
          if (
            previousPage >=
            totalPages - 1
          ) {
            return 0;
          }

          return previousPage + 1;
        }
      );
    }, 4500);

    return () => {
      clearInterval(interval);
    };
  }, [
    isPaused,
    totalPages,
  ]);

  /* =====================================================
     PREVIOUS BUTTON
  ====================================================== */

  const handlePrevious = () => {
    if (totalPages === 0) {
      return;
    }

    setCurrentPage(
      (previousPage) => {
        if (previousPage === 0) {
          return totalPages - 1;
        }

        return previousPage - 1;
      }
    );
  };

  /* =====================================================
     NEXT BUTTON
  ====================================================== */

  const handleNext = () => {
    if (totalPages === 0) {
      return;
    }

    setCurrentPage(
      (previousPage) => {
        if (
          previousPage >=
          totalPages - 1
        ) {
          return 0;
        }

        return previousPage + 1;
      }
    );
  };

  /* =====================================================
     PAGINATION
  ====================================================== */

  const handlePagination = (index) => {
    setCurrentPage(index);
  };

  /* =====================================================
     JSX
  ====================================================== */

  return (
    <section className="TourGuide">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="TourGuide__header">

        <div className="TourGuide__label">
          <span>Tour Guide</span>
        </div>

        <h2 className="TourGuide__heading">
          Our Travel Guide
        </h2>

      </div>

      {/* =================================================
          CAROUSEL WRAPPER
      ================================================== */}

      <div
        className="TourGuide__carousel-wrapper"
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
      >

        {/* =================================================
            LEFT ARROW
        ================================================== */}

        {guides.length > 0 && (
          <button
            type="button"
            className="TourGuide__arrow TourGuide__arrow--left"
            onClick={handlePrevious}
            aria-label="Previous tour guide"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* =================================================
            CAROUSEL
        ================================================== */}

        <div
          className="TourGuide__carousel"
          ref={carouselRef}
        >

          {/* LOADING */}
          {loading ? (
            <div className="TourGuide__empty">
              Loading tour guides...
            </div>
          ) : guides.length > 0 ? (

            guides.map((guide) => {

              const avatarUrl =
                getImageUrl(
                  guide.image
                );

              const instagramUrl =
                getInstagramUrl(
                  guide.instagram
                );

              const facebookUrl =
                getFacebookUrl(
                  guide.facebook
                );

              const whatsappUrl =
                getWhatsappUrl(
                  guide.whatsapp
                );

              return (
                <article
                  className="TourGuide__card"
                  key={
                    guide._id ||
                    guide.id
                  }
                >

                  {/* =========================================
                      IMAGE
                  ========================================== */}

                  <div className="TourGuide__image-wrapper">

                    <img
                      src={avatarUrl}
                      alt={
                        guide.name ||
                        "Tour Guide"
                      }
                      className="TourGuide__image"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder-guide.jpg";
                      }}
                    />

                    <div className="TourGuide__image-overlay" />

                  </div>

                  {/* =========================================
                      SOCIAL ICONS
                  ========================================== */}

                  <div className="TourGuide__socials">

                    {/* INSTAGRAM */}

                    {guide.instagram && (
                      <a
                        href={
                          instagramUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="TourGuide__social TourGuide__social--instagram"
                        aria-label={`${guide.name} Instagram`}
                      >
                        <FaInstagram />
                      </a>
                    )}

                    {/* FACEBOOK */}

                    {guide.facebook && (
                      <a
                        href={
                          facebookUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="TourGuide__social TourGuide__social--facebook"
                        aria-label={`${guide.name} Facebook`}
                      >
                        <FaFacebookF />
                      </a>
                    )}

                    {/* WHATSAPP */}

                    {guide.whatsapp && (
                      <a
                        href={
                          whatsappUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="TourGuide__social TourGuide__social--whatsapp"
                        aria-label={`${guide.name} WhatsApp`}
                      >
                        <FaWhatsapp />
                      </a>
                    )}

                  </div>

                  {/* =========================================
                      INFORMATION
                  ========================================== */}

                  <div className="TourGuide__info">

                    <h3 className="TourGuide__name">
                      {guide.name ||
                        "Tour Guide"}
                    </h3>

                    <p className="TourGuide__designation">
                      {guide.designation ||
                        "Travel Guide"}
                    </p>

                  </div>

                </article>
              );
            })

          ) : (

            /* ===============================================
               EMPTY STATE
            ================================================ */

            <div className="TourGuide__empty">
              No tour guides available.
            </div>
          )}

        </div>

        {/* =================================================
            RIGHT ARROW
        ================================================== */}

        {guides.length > 0 && (
          <button
            type="button"
            className="TourGuide__arrow TourGuide__arrow--right"
            onClick={handleNext}
            aria-label="Next tour guide"
          >
            <FaChevronRight />
          </button>
        )}

      </div>

      {/* =================================================
          PAGINATION
      ================================================== */}

      {guides.length > 0 && (
        <div className="TourGuide__pagination">

          {guides.map(
            (guide, index) => (
              <button
                type="button"
                key={
                  guide._id ||
                  guide.id ||
                  index
                }
                aria-label={`Go to ${
                  guide.name ||
                  `guide ${index + 1}`
                }`}
                className={`TourGuide__pagination-dot ${
                  currentPage === index
                    ? "TourGuide__pagination-dot--active"
                    : ""
                }`}
                onClick={() =>
                  handlePagination(
                    index
                  )
                }
              />
            )
          )}

        </div>
      )}

    </section>
  );
};

export default TourGuide;

