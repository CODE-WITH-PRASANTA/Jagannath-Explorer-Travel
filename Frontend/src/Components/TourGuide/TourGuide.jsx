import React, { useEffect, useRef, useState } from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./TourGuide.css";

const TourGuide = () => {
  /* =====================================================
     TOUR GUIDE DATA
  ====================================================== */

  const guides = [
    {
      id: 1,
      name: "Josiah Caleb",
      designation: "Tour Guide",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 2,
      name: "David Luis",
      designation: "Tour Guide",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 3,
      name: "Alison Bekkar",
      designation: "Tour Guide",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 4,
      name: "Arthur Morgan",
      designation: "Tour Guide",
      image:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 5,
      name: "Daniel Cooper",
      designation: "Senior Tour Guide",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 6,
      name: "Michael James",
      designation: "Adventure Guide",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 7,
      name: "Oliver Smith",
      designation: "Travel Expert",
      image:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=85",
    },

    {
      id: 8,
      name: "Ryan Wilson",
      designation: "Travel Guide",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=85",
    },
  ];


  /* =====================================================
     STATES
  ====================================================== */

  const [currentPage, setCurrentPage] = useState(0);

  const [visibleCards, setVisibleCards] = useState(4);

  const [isPaused, setIsPaused] = useState(false);


  /* =====================================================
     CAROUSEL REF
  ====================================================== */

  const carouselRef = useRef(null);


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
     TOTAL POSITIONS

     IMPORTANT:
     One position = one card movement.

     Example:
     4 visible cards

     1 → 2 → 3 → 4 → 5 → 6...
  ====================================================== */

  const totalPages = guides.length;


  /* =====================================================
     KEEP CURRENT PAGE VALID
  ====================================================== */

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);


  /* =====================================================
     SCROLL ONE CARD AT A TIME
  ====================================================== */

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;

    const card =
      carousel.querySelector(
        ".TourGuide__card"
      );

    if (!card) return;

    const cardWidth =
      card.getBoundingClientRect().width;

    const carouselStyle =
      window.getComputedStyle(carousel);

    const gap =
      parseFloat(carouselStyle.columnGap) ||
      parseFloat(carouselStyle.gap) ||
      0;

    const moveAmount =
      cardWidth + gap;

    carousel.scrollTo({
      left:
        currentPage * moveAmount,
      behavior: "smooth",
    });
  }, [
    currentPage,
    visibleCards,
  ]);


  /* =====================================================
     AUTOMATIC 1-BY-1 SLIDE
  ====================================================== */

  useEffect(() => {
    if (isPaused) return;

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
     PREVIOUS CARD
  ====================================================== */

  const handlePrevious = () => {
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
     NEXT CARD
  ====================================================== */

  const handleNext = () => {
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
     GO TO SPECIFIC CARD
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
      ================================================= */}

      <div className="TourGuide__header">

        <div className="TourGuide__label">
          <span>
            Tour Guide
          </span>
        </div>

        <h2 className="TourGuide__heading">
          Our Travel Guide
        </h2>

      </div>


      {/* =================================================
          CAROUSEL WRAPPER
      ================================================= */}

      <div
        className="TourGuide__carousel-wrapper"

        onMouseEnter={() =>
          setIsPaused(true)
        }

        onMouseLeave={() =>
          setIsPaused(false)
        }
      >

        {/* ===============================================
            LEFT ARROW
        ================================================ */}

        <button
          type="button"

          className="
            TourGuide__arrow
            TourGuide__arrow--left
          "

          onClick={
            handlePrevious
          }

          aria-label="
            Previous tour guide
          "
        >
          <FaChevronLeft />
        </button>


        {/* ===============================================
            CAROUSEL
        ================================================ */}

        <div
          className="TourGuide__carousel"

          ref={carouselRef}
        >

          {guides.map(
            (guide) => (
              <article
                className="TourGuide__card"

                key={guide.id}
              >

                {/* =====================================
                    IMAGE
                ====================================== */}

                <div className="TourGuide__image-wrapper">

                  <img
                    src={guide.image}

                    alt={
                      guide.name
                    }

                    className="
                      TourGuide__image
                    "

                    loading="lazy"
                  />

                  <div
                    className="
                      TourGuide__image-overlay
                    "
                  />

                </div>


                {/* =====================================
                    SOCIAL ICONS
                ====================================== */}

                <div
                  className="
                    TourGuide__socials
                  "
                >

                  {/* INSTAGRAM */}

                  <a
                    href="#instagram"

                    className="
                      TourGuide__social
                      TourGuide__social--instagram
                    "

                    aria-label={`
                      ${guide.name}
                      Instagram
                    `}
                  >
                    <FaInstagram />
                  </a>


                  {/* FACEBOOK */}

                  <a
                    href="#facebook"

                    className="
                      TourGuide__social
                      TourGuide__social--facebook
                    "

                    aria-label={`
                      ${guide.name}
                      Facebook
                    `}
                  >
                    <FaFacebookF />
                  </a>


                  {/* WHATSAPP */}

                  <a
                    href="#whatsapp"

                    className="
                      TourGuide__social
                      TourGuide__social--whatsapp
                    "

                    aria-label={`
                      ${guide.name}
                      WhatsApp
                    `}
                  >
                    <FaWhatsapp />
                  </a>

                </div>


                {/* =====================================
                    INFORMATION
                ====================================== */}

                <div
                  className="
                    TourGuide__info
                  "
                >

                  <h3
                    className="
                      TourGuide__name
                    "
                  >
                    {guide.name}
                  </h3>

                  <p
                    className="
                      TourGuide__designation
                    "
                  >
                    {
                      guide.designation
                    }
                  </p>

                </div>

              </article>
            )
          )}

        </div>


        {/* ===============================================
            RIGHT ARROW
        ================================================ */}

        <button
          type="button"

          className="
            TourGuide__arrow
            TourGuide__arrow--right
          "

          onClick={
            handleNext
          }

          aria-label="
            Next tour guide
          "
        >
          <FaChevronRight />
        </button>

      </div>


      {/* =================================================
          PAGINATION
      ================================================= */}

      <div
        className="
          TourGuide__pagination
        "
      >

        {guides.map(
          (guide, index) => (
            <button
              type="button"

              key={guide.id}

              aria-label={`
                Go to
                ${guide.name}
              `}

              className={`
                TourGuide__pagination-dot

                ${
                  currentPage === index
                    ? "TourGuide__pagination-dot--active"
                    : ""
                }
              `}

              onClick={() =>
                handlePagination(index)
              }
            />
          )
        )}

      </div>

    </section>
  );
};

export default TourGuide;