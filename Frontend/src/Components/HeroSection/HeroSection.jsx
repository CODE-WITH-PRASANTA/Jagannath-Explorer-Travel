import React, { useState, useEffect, useRef } from "react";
import "./HeroSection.css";

import {
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Building2,
  Car,
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

// ======================================================
// ODISHA DESTINATIONS
// ======================================================

const odishaDestinations = [
  "Puri",
  "Bhubaneswar",
  "Konark",
  "Chilika Lake",
  "Gopalpur",
  "Cuttack",
  "Daringbadi",
  "Sambalpur",
  "Simlipal National Park",
];

// ======================================================
// HERO SLIDES
// ======================================================

const sliderImages = [
  {
    url: Jaganathmandir,
    location: "Puri, Odisha",
    eyebrow: "Sacred & Timeless",
    title: "Seek Blessings at\nShree Jagannath Dham.",
    subtitle:
      "Step into the divine energy of one of India's holiest shrines. Witness centuries-old rituals, the majestic Ratna Singhasana, and the golden shores of Puri — a journey that touches both soul and spirit.",
    position: "center 20%",
  },
  {
    url: Nandankanan,
    location: "Nandankanan, Bhubaneswar",
    eyebrow: "Wildlife & Nature",
    title: "Discover the\nWild Side of Odisha.",
    subtitle:
      "Explore Odisha's famous wildlife, beautiful landscapes and unforgettable family experiences with comfortable journeys planned around you.",
    position: "center center",
  },
  {
    url: kalijaee,
    location: "Chilika Lake, Odisha",
    eyebrow: "Nature Escape",
    title: "Where Nature Meets\nSacred Serenity.",
    subtitle:
      "Discover the peaceful beauty of Chilika Lake, Kalijai Temple and the spectacular landscapes that make Odisha truly special.",
    position: "center center",
  },
  {
    url: Dhauli,
    location: "Dhauli, Bhubaneswar",
    eyebrow: "History & Heritage",
    title: "Walk Through\nOdisha's Living History.",
    subtitle:
      "From ancient heritage to peaceful Buddhist landmarks, discover the stories, culture and architecture that shaped Odisha.",
    position: "center 30%",
  },
  {
    url: SunTemple,
    location: "Konark, Odisha",
    eyebrow: "UNESCO World Heritage Site",
    title: "The Sun Temple —\nA Marvel Carved in Stone.",
    subtitle:
      "Marvel at the 13th-century Sun Temple, shaped like a colossal chariot with twenty-four intricately carved wheels. A masterpiece of Odisha's stone architecture, standing timeless against the Bay of Bengal.",
    position: "center 15%",
  },
];

// ======================================================
// CUSTOM DROPDOWN
// ======================================================

const CustomDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
          <span className="hero-section__selected-val">{value}</span>

          <ChevronDown
            size={17}
            className={`hero-section__field-caret ${
              isOpen ? "hero-section__field-caret--rotated" : ""
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
                  option === value ? "hero-section__dropdown-item--selected" : ""
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <span>{option}</span>

                {option === value && (
                  <Check size={16} className="hero-section__check-icon" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ======================================================
// HERO COMPONENT
// ======================================================

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("tour");
  const [currentSlide, setCurrentSlide] = useState(0);

  // TOUR
  const [tourDest, setTourDest] = useState("Puri");
  const [tourType, setTourType] = useState("Family Tour");
  const [tourDay, setTourDay] = useState("Monday");
  const [tourCategory, setTourCategory] = useState("Economy");

  // HOTEL
  const [hotelLocation, setHotelLocation] = useState("Bhubaneswar");
  const [hotelDates, setHotelDates] = useState("Sep 4 - Sep 7");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState("1 Adults, 0 Child");

  // TRANSPORT
  const [fromLoc, setFromLoc] = useState("Bhubaneswar");
  const [toLoc, setToLoc] = useState("Puri");
  const [departDate, setDepartDate] = useState("Sep 4 - Sep 4");
  const [returnDate, setReturnDate] = useState("Sep 5 - Sep 5");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const currentContent = sliderImages[currentSlide];

  return (
    <section className="hero-section">
      <div className="hero-section__wrapper">
        {/* BACKGROUND IMAGES */}
        <div className="hero-section__slides">
          {sliderImages.map((slide, index) => (
            <div
              key={slide.location}
              className={`hero-section__slide ${
                index === currentSlide ? "hero-section__slide--active" : ""
              }`}
              style={{
                backgroundImage: `url("${slide.url}")`,
                backgroundPosition: slide.position,
              }}
            />
          ))}
        </div>

        {/* 4K PREMIUM ENHANCED OVERLAYS */}
        <div className="hero-section__overlay" />
        <div className="hero-section__image-vignette" />
        <div className="hero-section__film-grain" />

        {/* TOP MINI BRAND */}
        <div className="hero-section__top-badge">
          <Sparkles size={14} />
          <span>Discover Odisha With Us</span>
        </div>

        {/* SLIDER ARROWS */}
        <button
          type="button"
          className="hero-section__arrow hero-section__arrow--left"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={21} />
        </button>

        <button
          type="button"
          className="hero-section__arrow hero-section__arrow--right"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={21} />
        </button>

        {/* HERO CONTENT */}
        <div className="hero-section__content" key={currentSlide}>
          <div className="hero-section__tag">
            <MapPin size={15} />
            <span>{currentContent.location}</span>
          </div>

          <span className="hero-section__eyebrow">{currentContent.eyebrow}</span>
          <div className="hero-section__eyebrow-divider" />
          <h1 className="hero-section__title">{currentContent.title}</h1>
          <p className="hero-section__description">{currentContent.subtitle}</p>
        </div>

        {/* SLIDER DOTS */}
        <div className="hero-section__dots">
          {sliderImages.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`hero-section__dot ${
                currentSlide === index ? "hero-section__dot--active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* BOOKING MODULE */}
        <div className="hero-section__booking-container">
          <div className="hero-section__tabs-header">
            <button
              type="button"
              className={`hero-section__tab-btn ${
                activeTab === "tour" ? "hero-section__tab-btn--active" : ""
              }`}
              onClick={() => setActiveTab("tour")}
            >
              <Compass size={17} />
              <span>Tour</span>
            </button>

            <button
              type="button"
              className={`hero-section__tab-btn ${
                activeTab === "hotel" ? "hero-section__tab-btn--active" : ""
              }`}
              onClick={() => setActiveTab("hotel")}
            >
              <Building2 size={17} />
              <span>Hotel</span>
            </button>

            <button
              type="button"
              className={`hero-section__tab-btn ${
                activeTab === "transport" ? "hero-section__tab-btn--active" : ""
              }`}
              onClick={() => setActiveTab("transport")}
            >
              <Car size={17} />
              <span>Transport</span>
            </button>
          </div>

          <div className="hero-section__form-card">
            {activeTab === "tour" && (
              <div className="hero-section__form-grid hero-section__form-grid--tour">
                <CustomDropdown
                  label="Destination"
                  value={tourDest}
                  options={odishaDestinations}
                  onChange={setTourDest}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Tour Type"
                  value={tourType}
                  options={["Family Tour", "Adventure Tour", "Spiritual Tour", "Heritage Tour"]}
                  onChange={setTourType}
                  icon={Briefcase}
                />
                <CustomDropdown
                  label="When"
                  value={tourDay}
                  options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                  onChange={setTourDay}
                  icon={Calendar}
                />
                <CustomDropdown
                  label="Tour Category"
                  value={tourCategory}
                  options={["Economy", "Standard", "Luxury", "Premium"]}
                  onChange={setTourCategory}
                  icon={Sparkles}
                />
                <button type="button" className="hero-section__search-btn">
                  <span>Search</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {activeTab === "hotel" && (
              <div className="hero-section__form-grid hero-section__form-grid--hotel">
                <CustomDropdown
                  label="Location"
                  value={hotelLocation}
                  options={odishaDestinations}
                  onChange={setHotelLocation}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Check in - Check out"
                  value={hotelDates}
                  options={["Sep 4 - Sep 4", "Sep 4 - Sep 7", "Sep 8 - Sep 12", "Sep 15 - Sep 20"]}
                  onChange={setHotelDates}
                  icon={Calendar}
                />
                <div className="hero-section__field">
                  <div className="hero-section__field-icon">
                    <Building2 size={20} />
                  </div>
                  <div className="hero-section__field-body">
                    <label className="hero-section__field-label">Rooms</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="hero-section__field-number"
                      value={rooms}
                      onChange={(e) =>
                        setRooms(Math.max(1, parseInt(e.target.value, 10) || 1))
                      }
                    />
                  </div>
                  <div className="hero-section__spinner-arrows">
                    <ChevronUp size={14} onClick={() => setRooms((prev) => Math.min(10, prev + 1))} />
                    <ChevronDown size={14} onClick={() => setRooms((prev) => Math.max(1, prev - 1))} />
                  </div>
                </div>
                <CustomDropdown
                  label="Guests"
                  value={guests}
                  options={["1 Adults, 0 Child", "2 Adults, 0 Child", "2 Adults, 1 Child", "3 Adults, 2 Child"]}
                  onChange={setGuests}
                  icon={Users}
                />
                <button type="button" className="hero-section__search-btn">
                  <span>Search</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {activeTab === "transport" && (
              <div className="hero-section__form-grid hero-section__form-grid--transport">
                <CustomDropdown
                  label="From"
                  value={fromLoc}
                  options={odishaDestinations}
                  onChange={setFromLoc}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="To"
                  value={toLoc}
                  options={odishaDestinations}
                  onChange={setToLoc}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Journey date"
                  value={departDate}
                  options={["Sep 4 - Sep 4", "Sep 5 - Sep 5", "Sep 10 - Sep 10"]}
                  onChange={setDepartDate}
                  icon={Calendar}
                />
                <CustomDropdown
                  label="Return date"
                  value={returnDate}
                  options={["Sep 4 - Sep 4", "Sep 6 - Sep 6", "Sep 12 - Sep 12"]}
                  onChange={setReturnDate}
                  icon={Calendar}
                />
                <button type="button" className="hero-section__search-btn">
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