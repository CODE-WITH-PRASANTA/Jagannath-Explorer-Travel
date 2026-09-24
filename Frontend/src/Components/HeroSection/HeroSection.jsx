import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import { API } from "../../api/axios";

import {
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Building2,
  Briefcase,
  ChevronUp,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Nandankanan from "../../assets/Nandankanan.webp";
import Jaganathmandir from "../../assets/ShriJaganath.webp";
import kalijaee from "../../assets/kalijaee.webp";
import Dhauli from "../../assets/Bhubaneswar.webp";
import SunTemple from "../../assets/Kohinur.webp";

/* =====================================================
   DEFAULT DESTINATIONS
===================================================== */

const defaultOdishaDestinations = [
  "Puri",
  "Bhubaneswar",
  "Konark",
  "Chilika Lake",
  "Gopalpur",
  "Cuttack",
  "Daringbadi",
];

/* =====================================================
   HERO SLIDER
===================================================== */

const sliderImages = [
  {
    url: Jaganathmandir,
    location: "Puri, Odisha",
    eyebrow: "Sacred & Timeless",
    title: "Seek Blessings at\nShree Jagannath Dham.",
    subtitle:
      "Step into the divine energy of one of India's holiest shrines. Witness centuries-old rituals, the majestic Ratna Singhasana, and the golden shores of Puri.",
    position: "center 20%",
  },
  {
    url: Nandankanan,
    location: "Nandankanan, Bhubaneswar",
    eyebrow: "Wildlife & Nature",
    title: "Discover the\nWild Side of Odisha.",
    subtitle:
      "Explore Odisha's famous wildlife, beautiful landscapes and unforgettable family experiences.",
    position: "center center",
  },
  {
    url: kalijaee,
    location: "Chilika Lake, Odisha",
    eyebrow: "Nature Escape",
    title: "Where Nature Meets\nSacred Serenity.",
    subtitle:
      "Discover the peaceful beauty of Chilika Lake and Kalijai Temple.",
    position: "center center",
  },
  {
    url: Dhauli,
    location: "Dhauli, Bhubaneswar",
    eyebrow: "History & Heritage",
    title: "Walk Through\nOdisha's Living History.",
    subtitle:
      "From ancient heritage to peaceful landmarks, discover the culture that shaped Odisha.",
    position: "center 30%",
  },
  {
    url: SunTemple,
    location: "Konark, Odisha",
    eyebrow: "UNESCO World Heritage Site",
    title: "The Sun Temple —\nA Marvel Carved in Stone.",
    subtitle:
      "Marvel at the 13th-century Sun Temple, shaped like a colossal chariot with twenty-four intricately carved wheels.",
    position: "center 15%",
  },
];

/* =====================================================
   CUSTOM DROPDOWN
===================================================== */

const CustomDropdown = ({
  label,
  value,
  options = [],
  onChange,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`hero-section__field ${
        isOpen ? "hero-section__field--active" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="hero-section__field-icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div
        className="hero-section__field-body"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="hero-section__field-label">{label}</span>

        <div className="hero-section__custom-trigger">
          <span className="hero-section__selected-val">
            {value || "Select"}
          </span>

          <ChevronDown
            size={17}
            className={`hero-section__field-caret ${
              isOpen
                ? "hero-section__field-caret--rotated"
                : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="hero-section__dropdown-menu">
          <ul className="hero-section__dropdown-list">
            {options.map((option) => (
              <li
                key={option}
                className={`hero-section__dropdown-item ${
                  option === value
                    ? "hero-section__dropdown-item--selected"
                    : ""
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <span>{option}</span>

                {option === value && (
                  <Check
                    size={16}
                    className="hero-section__check-icon"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* =====================================================
   DATE PICKER
===================================================== */

const TourDatePicker = ({ value, onChange }) => {
  const pickerRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isOpen, setIsOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

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

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const dateKey = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const selectedDate = value ? new Date(value) : null;

  const handleDateSelect = (date) => {
    const formatted = dateKey(date);

    onChange(formatted);
    setCurrentMonth(
      new Date(date.getFullYear(), date.getMonth(), 1)
    );
    setIsOpen(false);
  };

  const handleQuickSelect = (type) => {
    if (type === "Anyday") {
      onChange("");
      setIsOpen(false);
      return;
    }

    const selected = new Date(today);

    if (type === "Tomorrow") {
      selected.setDate(selected.getDate() + 1);
    }

    if (type === "This Weekend") {
      const day = selected.getDay();

      if (day === 0) {
        // Sunday
      } else if (day === 6) {
        // Saturday
      } else {
        selected.setDate(
          selected.getDate() + (6 - day)
        );
      }
    }

    handleDateSelect(selected);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthDays - i
        ),
        currentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextDay),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  };

  const isPastDate = (date) => {
    return date < today;
  };

  const isToday = (date) => {
    return dateKey(date) === dateKey(today);
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;

    return (
      dateKey(date) === dateKey(selectedDate)
    );
  };

  const goPreviousMonth = () => {
    const previous = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const minimumMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= minimumMonth) {
      setCurrentMonth(previous);
    }
  };

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  return (
    <div
      className={`hero-section__field hero-section__date-field ${
        isOpen
          ? "hero-section__field--active"
          : ""
      }`}
      ref={pickerRef}
    >
      <div className="hero-section__field-icon">
        <Calendar
          size={20}
          strokeWidth={1.8}
        />
      </div>

      <div
        className="hero-section__field-body"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
      >
        <span className="hero-section__field-label">
          When
        </span>

        <div className="hero-section__custom-trigger">
          <span className="hero-section__selected-val">
            {value
              ? formatDate(selectedDate)
              : "Anyday"}
          </span>

          <ChevronDown
            size={17}
            className={`hero-section__field-caret ${
              isOpen
                ? "hero-section__field-caret--rotated"
                : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="hero-section__calendar-popup">
          <div className="hero-section__calendar-sidebar">
            <div className="hero-section__calendar-sidebar-title">
              Choose Date
            </div>

            <button
              type="button"
              className={`hero-section__quick-date ${
                !value
                  ? "hero-section__quick-date--active"
                  : ""
              }`}
              onClick={() =>
                handleQuickSelect("Anyday")
              }
            >
              <span>Anyday</span>

              {!value && (
                <Check size={15} />
              )}
            </button>

            <button
              type="button"
              className="hero-section__quick-date"
              onClick={() =>
                handleQuickSelect("Today")
              }
            >
              <span>Today</span>
            </button>

            <button
              type="button"
              className="hero-section__quick-date"
              onClick={() =>
                handleQuickSelect("Tomorrow")
              }
            >
              <span>Tomorrow</span>
            </button>

            <button
              type="button"
              className="hero-section__quick-date"
              onClick={() =>
                handleQuickSelect("This Weekend")
              }
            >
              <span>This Weekend</span>
            </button>
          </div>

          <div className="hero-section__calendar-main">
            <div className="hero-section__calendar-header">
              <div>
                <span className="hero-section__calendar-month">
                  {monthNames[
                    currentMonth.getMonth()
                  ]}
                </span>

                <span className="hero-section__calendar-year">
                  {currentMonth.getFullYear()}
                </span>
              </div>

              <div className="hero-section__calendar-nav">
                <button
                  type="button"
                  onClick={goPreviousMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={goNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            <div className="hero-section__calendar-weekdays">
              {weekDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="hero-section__calendar-days">
              {generateCalendarDays().map(
                ({ date, currentMonth: isCurrentMonth }) => {
                  const disabled =
                    isPastDate(date);

                  return (
                    <button
                      type="button"
                      key={dateKey(date)}
                      disabled={disabled}
                      className={`
                        hero-section__calendar-day
                        ${
                          !isCurrentMonth
                            ? "hero-section__calendar-day--muted"
                            : ""
                        }
                        ${
                          isToday(date)
                            ? "hero-section__calendar-day--today"
                            : ""
                        }
                        ${
                          isSelected(date)
                            ? "hero-section__calendar-day--selected"
                            : ""
                        }
                      `}
                      onClick={() =>
                        !disabled &&
                        handleDateSelect(date)
                      }
                    >
                      {date.getDate()}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =====================================================
   HERO SECTION
===================================================== */

const HeroSection = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("tour");

  const [currentSlide, setCurrentSlide] =
    useState(0);

  /* ===================================================
     BACKEND DATA
  =================================================== */

  const [backendTours, setBackendTours] =
    useState([]);

  const [backendHotels, setBackendHotels] =
    useState([]);

  /* ===================================================
     TOUR FORM
  =================================================== */

  const [tourDest, setTourDest] =
    useState("");

  const [tourType, setTourType] =
    useState("All");

  const [tourDate, setTourDate] =
    useState("");

  const [tourCategory, setTourCategory] =
    useState("All");

  /* ===================================================
     HOTEL FORM
  =================================================== */

  const [hotelLocation, setHotelLocation] =
    useState("");

  const [hotelDates, setHotelDates] =
    useState("Flexible Dates");

  const [rooms, setRooms] =
    useState(1);

  const [guests, setGuests] =
    useState("2 Adults, 0 Child");

  /* ===================================================
     FETCH TOURS + HOTELS
  =================================================== */

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [
          tourRes,
          hotelRes,
        ] = await Promise.allSettled([
          API.get("/tours"),
          API.get("/hotels"),
        ]);

        if (
          tourRes.status === "fulfilled" &&
          tourRes.value.data
        ) {
          const list =
            tourRes.value.data.data ||
            tourRes.value.data ||
            [];

          setBackendTours(
            Array.isArray(list) ? list : []
          );
        }

        if (
          hotelRes.status === "fulfilled" &&
          hotelRes.value.data
        ) {
          const list =
            hotelRes.value.data.data ||
            hotelRes.value.data ||
            [];

          setBackendHotels(
            Array.isArray(list) ? list : []
          );
        }
      } catch (err) {
        console.error(
          "Error fetching hero dropdown data:",
          err
        );
      }
    };

    fetchDropdownData();
  }, []);

  /* ===================================================
     TOUR DESTINATIONS
  =================================================== */

  const dynamicTourDestinations =
    useMemo(() => {
      const unique = Array.from(
        new Set(
          backendTours
            .map((t) => t.destination)
            .filter(Boolean)
        )
      );

      return unique.length > 0
        ? unique
        : defaultOdishaDestinations;
    }, [backendTours]);

  /* ===================================================
     TOUR TYPES
  =================================================== */

  const dynamicTourTypes =
    useMemo(() => {
      const unique = Array.from(
        new Set(
          backendTours
            .map(
              (t) =>
                t.tourType || t.type
            )
            .filter(Boolean)
        )
      );

      return [
        "All",
        ...(unique.length > 0
          ? unique
          : [
              "Family Tour",
              "Adventure Tour",
              "Spiritual Tour",
              "Heritage Tour",
            ]),
      ];
    }, [backendTours]);

  /* ===================================================
     TOUR CATEGORIES
  =================================================== */

  const dynamicTourCategories =
    useMemo(() => {
      const unique = Array.from(
        new Set(
          backendTours
            .map((t) => t.category)
            .filter(Boolean)
        )
      );

      return [
        "All",
        ...(unique.length > 0
          ? unique
          : [
              "Economy",
              "Standard",
              "Luxury",
              "Premium",
            ]),
      ];
    }, [backendTours]);

  /* ===================================================
     HOTEL CITIES
  =================================================== */

  const dynamicHotelCities =
    useMemo(() => {
      const unique = Array.from(
        new Set(
          backendHotels
            .map((h) =>
              h.city?.trim()
            )
            .filter(Boolean)
        )
      );

      return unique.length > 0
        ? unique
        : defaultOdishaDestinations;
    }, [backendHotels]);

  /* ===================================================
     INITIAL VALUES
  =================================================== */

  useEffect(() => {
    if (
      !tourDest &&
      dynamicTourDestinations.length > 0
    ) {
      setTourDest(
        dynamicTourDestinations[0]
      );
    }
  }, [
    dynamicTourDestinations,
    tourDest,
  ]);

  useEffect(() => {
    if (
      !hotelLocation &&
      dynamicHotelCities.length > 0
    ) {
      setHotelLocation(
        dynamicHotelCities[0]
      );
    }
  }, [
    dynamicHotelCities,
    hotelLocation,
  ]);

  /* ===================================================
     SLIDER AUTOPLAY
  =================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) =>
          (prev + 1) %
          sliderImages.length
      );
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  /* ===================================================
     TOUR SEARCH
  =================================================== */

  const handleTourSearch = () => {
    const params =
      new URLSearchParams();

    if (
      tourDest &&
      tourDest !== "All"
    ) {
      params.set(
        "location",
        tourDest
      );
    }

    if (
      tourType &&
      tourType !== "All"
    ) {
      params.set(
        "tourType",
        tourType
      );
    }

    if (
      tourCategory &&
      tourCategory !== "All"
    ) {
      params.set(
        "category",
        tourCategory
      );
    }

    if (tourDate) {
      params.set(
        "date",
        tourDate
      );
    }

    navigate(
      `/tours?${params.toString()}`
    );
  };

  /* ===================================================
     HOTEL SEARCH
  =================================================== */

  const handleHotelSearch = () => {
    const params =
      new URLSearchParams();

    if (
      hotelLocation &&
      hotelLocation !== "All"
    ) {
      params.set(
        "search",
        hotelLocation
      );
    }

    if (rooms) {
      params.set(
        "rooms",
        rooms
      );
    }

    if (guests) {
      params.set(
        "guests",
        guests
      );
    }

    if (
      hotelDates &&
      hotelDates !==
        "Flexible Dates"
    ) {
      params.set(
        "dates",
        hotelDates
      );
    }

    navigate(
      `/hotels?${params.toString()}`
    );
  };

  const currentContent =
    sliderImages[currentSlide];

  /* ===================================================
     JSX
  =================================================== */

  return (
    <section className="hero-section">
      <div className="hero-section__wrapper">

        {/* BACKGROUND */}
        <div className="hero-section__slides">
          {sliderImages.map(
            (slide, index) => (
              <div
                key={slide.location}
                className={`hero-section__slide ${
                  index === currentSlide
                    ? "hero-section__slide--active"
                    : ""
                }`}
                style={{
                  backgroundImage: `url("${slide.url}")`,
                  backgroundPosition:
                    slide.position,
                }}
              />
            )
          )}
        </div>

        <div className="hero-section__overlay" />
        <div className="hero-section__image-vignette" />
        <div className="hero-section__film-grain" />

        {/* TOP BADGE */}
        <div className="hero-section__top-badge">
          <Sparkles size={14} />
          <span>
            Discover Odisha With Us
          </span>
        </div>

        {/* SLIDER ARROWS */}
        <button
          type="button"
          className="hero-section__arrow hero-section__arrow--left"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                prev === 0
                  ? sliderImages.length - 1
                  : prev - 1
            )
          }
        >
          <ChevronLeft size={21} />
        </button>

        <button
          type="button"
          className="hero-section__arrow hero-section__arrow--right"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev + 1) %
                sliderImages.length
            )
          }
        >
          <ChevronRight size={21} />
        </button>

        {/* HERO CONTENT */}
        <div
          className="hero-section__content"
          key={currentSlide}
        >
          <div className="hero-section__tag">
            <MapPin size={15} />
            <span>
              {currentContent.location}
            </span>
          </div>

          <span className="hero-section__eyebrow">
            {currentContent.eyebrow}
          </span>

          <div className="hero-section__eyebrow-divider" />

          <h1 className="hero-section__title">
            {currentContent.title}
          </h1>

          <p className="hero-section__description">
            {currentContent.subtitle}
          </p>
        </div>

        {/* SLIDER DOTS */}
        <div className="hero-section__dots">
          {sliderImages.map(
            (_, index) => (
              <button
                type="button"
                key={index}
                onClick={() =>
                  setCurrentSlide(index)
                }
                className={`hero-section__dot ${
                  currentSlide === index
                    ? "hero-section__dot--active"
                    : ""
                }`}
              />
            )
          )}
        </div>

        {/* =================================================
            BOOKING MODULE
        ================================================= */}

        <div className="hero-section__booking-container">

          {/* TABS */}
          <div className="hero-section__tabs-header">

            <button
              type="button"
              className={`hero-section__tab-btn ${
                activeTab === "tour"
                  ? "hero-section__tab-btn--active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("tour")
              }
            >
              <Compass size={17} />
              <span>Tour</span>
            </button>

            <button
              type="button"
              className={`hero-section__tab-btn ${
                activeTab === "hotel"
                  ? "hero-section__tab-btn--active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("hotel")
              }
            >
              <Building2 size={17} />
              <span>Hotel</span>
            </button>

          </div>

          {/* FORM CARD */}
          <div className="hero-section__form-card">

            {/* TOUR */}
            {activeTab === "tour" && (
              <div className="hero-section__form-grid hero-section__form-grid--tour">

                <CustomDropdown
                  label="Destination"
                  value={tourDest}
                  options={
                    dynamicTourDestinations
                  }
                  onChange={setTourDest}
                  icon={MapPin}
                />

                <CustomDropdown
                  label="Tour Type"
                  value={tourType}
                  options={
                    dynamicTourTypes
                  }
                  onChange={setTourType}
                  icon={Briefcase}
                />

                {/* NEW DATE PICKER */}
                <TourDatePicker
                  value={tourDate}
                  onChange={setTourDate}
                />

                <CustomDropdown
                  label="Tour Category"
                  value={tourCategory}
                  options={
                    dynamicTourCategories
                  }
                  onChange={
                    setTourCategory
                  }
                  icon={Sparkles}
                />

                <button
                  type="button"
                  className="hero-section__search-btn"
                  onClick={
                    handleTourSearch
                  }
                >
                  <span>Search</span>
                  <ArrowRight size={17} />
                </button>

              </div>
            )}

            {/* HOTEL */}
            {activeTab === "hotel" && (
              <div className="hero-section__form-grid hero-section__form-grid--hotel">

                <CustomDropdown
                  label="Location"
                  value={hotelLocation}
                  options={
                    dynamicHotelCities
                  }
                  onChange={
                    setHotelLocation
                  }
                  icon={MapPin}
                />

                <CustomDropdown
                  label="Check in - Check out"
                  value={hotelDates}
                  options={[
                    "Flexible Dates",
                    "This Weekend",
                    "Next Weekend",
                    "Next 30 Days",
                  ]}
                  onChange={
                    setHotelDates
                  }
                  icon={Calendar}
                />

                <div className="hero-section__field">

                  <div className="hero-section__field-icon">
                    <Building2 size={20} />
                  </div>

                  <div className="hero-section__field-body">
                    <label className="hero-section__field-label">
                      Rooms
                    </label>

                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="hero-section__field-number"
                      value={rooms}
                      onChange={(e) =>
                        setRooms(
                          Math.max(
                            1,
                            parseInt(
                              e.target.value,
                              10
                            ) || 1
                          )
                        )
                      }
                    />
                  </div>

                  <div className="hero-section__spinner-arrows">
                    <ChevronUp
                      size={14}
                      onClick={() =>
                        setRooms(
                          (prev) =>
                            Math.min(
                              10,
                              prev + 1
                            )
                        )
                      }
                    />

                    <ChevronDown
                      size={14}
                      onClick={() =>
                        setRooms(
                          (prev) =>
                            Math.max(
                              1,
                              prev - 1
                            )
                        )
                      }
                    />
                  </div>

                </div>

                <CustomDropdown
                  label="Guests"
                  value={guests}
                  options={[
                    "1 Adults, 0 Child",
                    "2 Adults, 0 Child",
                    "2 Adults, 1 Child",
                    "3 Adults, 2 Child",
                  ]}
                  onChange={setGuests}
                  icon={Users}
                />

                <button
                  type="button"
                  className="hero-section__search-btn"
                  onClick={
                    handleHotelSearch
                  }
                >
                  <span>Search</span>
                  <ArrowRight size={17} />
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;