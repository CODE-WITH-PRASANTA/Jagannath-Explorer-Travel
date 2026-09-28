import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, IMG_URL } from "../../api/axios";
import "./Experience.css";

// ======================================================
// TOUR FALLBACK IMAGES
// ======================================================
import tour1 from "../../assets/img2.webp";
import tour2 from "../../assets/img3.webp";
import tour3 from "../../assets/bed5.webp";
import tour4 from "../../assets/img4.webp";
import tour5 from "../../assets/bed6.webp";
import tour6 from "../../assets/img7.webp";

// ======================================================
// HOTEL FALLBACK IMAGES
// ======================================================
import hotel1 from "../../assets/bed1.webp";
import hotel2 from "../../assets/bed2.webp";
import hotel3 from "../../assets/bed3.webp";
import hotel4 from "../../assets/bed5.webp";
import hotel5 from "../../assets/bed6.webp";
import hotel6 from "../../assets/bed5.webp";

// ======================================================
// VEHICLE IMAGES
// ======================================================
import swiftDzire from "../../assets/Swift-Dezire.webp";
import ertiga from "../../assets/Suv1.webp";
import audiA4 from "../../assets/Wedding-car-Audi-A4-1.webp";
import tempoTraveller from "../../assets/TempoTraveller1 - Copy.webp";
import urbania from "../../assets/Urbania-Traveller.webp";
import smlCoach from "../../assets/SML-COACH-13-SEATER.webp";
import innovaCrysta from "../../assets/Suv2.webp";

// ======================================================
// VEHICLE DATA
// ======================================================
const transportItems = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    image: swiftDzire,
    price: 2200,
    path: "/car-rental/sedan-cars",
    seats: "5 Seater",
    feature: "Automatic Climate Control",
    luggage: "378 L",
    fuel: "Petrol",
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Suzuki Ertiga",
    image: ertiga,
    price: 3000,
    path: "/car-rental/suv-cars",
    seats: "7 Seater",
    feature: "Rear AC Vents",
    luggage: "209 Litres",
    fuel: "Petrol",
  },
  {
    id: "audi-a4",
    name: "Audi A4",
    image: audiA4,
    price: 9500,
    path: "/car-rental/luxury-wedding-cars",
    seats: "5 Seater",
    feature: "Premium Leather Interior",
    luggage: "Luxury Wedding / VIP",
    fuel: "Smooth Ride",
    showMoreCars: true,
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    image: tempoTraveller,
    price: 3800,
    path: "/car-rental/tempo-travellers",
    seats: "12 Seater",
    feature: "Fully Air Conditioned",
    luggage: "Large Luggage Space",
    fuel: "Diesel",
  },
  {
    id: "urbania",
    name: "10 Seater Urbania",
    image: urbania,
    price: 3500,
    path: "/car-rental/urbania-travellers",
    seats: "10 Seater",
    feature: "Dual Zone FATC",
    luggage: "460 Litres",
    fuel: "Diesel",
  },
  {
    id: "sml-coach",
    name: "SML Coach - 13 Seater",
    image: smlCoach,
    price: 5500,
    path: "/car-rental/coach-buses",
    seats: "13 Seater",
    feature: "Premium Comfortable Seats",
    luggage: "VIP & Corporate",
    fuel: "First-Class Comfort",
    showMoreCars: true,
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    image: innovaCrysta,
    price: 4200,
    path: "/car-rental/suv-cars",
    seats: "7 Seater",
    feature: "Automatic Climate Control",
    luggage: "300 Litres",
    fuel: "Diesel",
  },
];

const tourFallbackImages = [tour1, tour2, tour3, tour4, tour5, tour6];
const hotelFallbackImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];

// ======================================================
// HELPERS
// ======================================================
const safeArray = (value) => (Array.isArray(value) ? value : []);

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return "₹0";
  const numericValue = Number(String(value).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numericValue)) return `₹${value}`;
  return `₹${numericValue.toLocaleString("en-IN")}`;
};

const cleanText = (value) => {
  if (!value) return "";
  return String(value)
    .replace(/^Day\s*\d+\s*[:\-]?\s*/i, "")
    .trim();
};

const getImageUrl = (imagePath, fallback) => {
  if (!imagePath) return fallback;

  const image = String(imagePath).trim();
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:image")
  ) {
    return image;
  }

  const baseUrl = IMG_URL || "";
  return `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`;
};

// ======================================================
// COMPONENT
// ======================================================
const Experience = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tour");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 650 : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth > 650 && window.innerWidth <= 992
      : false
  );

  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [tourLoading, setTourLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true);

  const [transportIndex, setTransportIndex] = useState(0);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    pickUp: "",
    dropOff: "",
    pickUpDateTime: "",
    dropDateTime: "",
    fullName: "",
    mobile: "",
    message: "",
    agree: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 650);
      setIsTablet(width > 650 && width <= 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transportVisibleCount = isMobile ? 1 : isTablet ? 2 : 3;
  const transportMaxIndex = Math.max(
    0,
    transportItems.length - transportVisibleCount
  );

  useEffect(() => {
    setTransportIndex((prev) => Math.min(prev, transportMaxIndex));
  }, [transportMaxIndex]);

  // ====================================================
  // FETCH TOURS & HOTELS
  // ====================================================
  useEffect(() => {
    let mounted = true;

    const fetchExperienceData = async () => {
      // -----------------------------------------------
      // TOURS
      // -----------------------------------------------
      setTourLoading(true);
      try {
        const response = await API.get("/tours");
        const responseData = response?.data;
        const tourData = responseData?.success
          ? responseData?.data
          : responseData?.data || responseData;

        if (mounted && Array.isArray(tourData)) {
          const formattedTours = tourData.map((tour, index) => {
            const itinerary = safeArray(tour?.itinerary);

            const itineraryRoute = itinerary
              .map((item) =>
                cleanText(
                  item?.title || item?.name || item?.location || ""
                )
              )
              .filter(Boolean)
              .join(" ➔ ");

            const tags = safeArray(tour?.tags)
              .map((tag) => (typeof tag === "string" ? tag : tag?.name || ""))
              .filter(Boolean)
              .join(" • ");

            const route =
              tour?.route ||
              itineraryRoute ||
              tags ||
              (tour?.destination
                ? `${String(tour.destination).toUpperCase()} ➔ EXPLORE TOUR`
                : "BHUBANESWAR ➔ PURI ➔ KONARK");

            const duration =
              tour?.duration || tour?.durationText || "3 DAYS / 2 NIGHTS";
            const destination =
              tour?.destination || tour?.location || tour?.city || "ODISHA";
            const category =
              tour?.category || tour?.tourType || "SPECIAL";

            // RESOLVED IMAGE PRIORITY (including mainImage & images array)
            const rawTourImage =
              tour?.mainImage ||
              tour?.image ||
              tour?.coverImage ||
              tour?.thumbnail ||
              tour?.featuredImage ||
              (Array.isArray(tour?.images) ? tour.images[0] : null);

            return {
              id: tour?._id || tour?.id || index + 1,
              slug: tour?.slug || tour?._id || tour?.id,
              badge: String(duration).toUpperCase(),
              locationTag: `${String(category).toUpperCase()} • ${String(
                destination
              ).toUpperCase()}`,
              image: getImageUrl(
                rawTourImage,
                tourFallbackImages[index % tourFallbackImages.length]
              ),
              title:
                tour?.title ||
                tour?.name ||
                tour?.tourName ||
                "Odisha Tour Package",
              route,
              price: formatPrice(
                tour?.price || tour?.offerPrice || tour?.startingPrice || 0
              ),
              oldPrice:
                tour?.oldPrice ||
                tour?.originalPrice ||
                tour?.discountPrice ||
                "",
              raw: tour,
            };
          });

          setTours(formattedTours);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
        if (mounted) setTours([]);
      } finally {
        if (mounted) setTourLoading(false);
      }

      // -----------------------------------------------
      // HOTELS
      // -----------------------------------------------
      setHotelLoading(true);
      try {
        const response = await API.get("/hotels");
        const responseData = response?.data;
        const hotelData = responseData?.data || responseData || [];

        if (mounted && Array.isArray(hotelData)) {
          const formattedHotels = hotelData.map((hotel, index) => {
            let amenities = [];
            if (Array.isArray(hotel?.amenities)) {
              amenities = hotel.amenities;
            } else if (typeof hotel?.amenities === "string") {
              amenities = hotel.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            }

            const hotelImage =
              hotel?.mainImage ||
              (Array.isArray(hotel?.images) ? hotel.images[0] : null) ||
              hotel?.image ||
              hotel?.coverImage ||
              hotel?.thumbnail;

            const hotelName =
              hotel?.name || hotel?.hotelName || "Premium Hotel";
            const hotelSlug =
              hotel?.slug ||
              hotel?._id ||
              hotelName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            return {
              id: hotel?._id || hotel?.id || index + 1,
              slug: hotelSlug,
              image: getImageUrl(
                hotelImage,
                hotelFallbackImages[index % hotelFallbackImages.length]
              ),
              breakfast:
                hotel?.breakfast ||
                hotel?.breakfastIncluded ||
                "BREAKFAST INCLUDED",
              rating: hotel?.rating || hotel?.starRating || "4.5",
              title: hotelName,
              location:
                hotel?.location || hotel?.city || "Bhubaneswar, Odisha",
              distance:
                hotel?.distance ||
                hotel?.landmark ||
                "Near major tourist attractions",
              amenities,
              roomType: hotel?.roomType || hotel?.room || "Deluxe Room",
              bed: hotel?.bed || hotel?.bedType || "King Bed",
              cancellation:
                hotel?.cancellation ||
                hotel?.cancellationPolicy ||
                "Free Cancellation",
              stayDuration: hotel?.stayDuration || "Per Night",
              price:
                hotel?.price ||
                hotel?.offerPrice ||
                hotel?.startingPrice ||
                0,
              oldPrice:
                hotel?.oldPrice || hotel?.originalPrice || "",
              raw: hotel,
            };
          });

          setHotels(formattedHotels);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        if (mounted) setHotels([]);
      } finally {
        if (mounted) setHotelLoading(false);
      }
    };

    fetchExperienceData();
    return () => {
      mounted = false;
    };
  }, []);

  const experienceData = useMemo(
    () => ({
      tour: tours,
      hotel: hotels,
      transports: transportItems,
    }),
    [tours, hotels]
  );

  const displayedItems =
    activeTab === "transports" ? transportItems : experienceData[activeTab];

  const isLoading =
    activeTab === "tour"
      ? tourLoading
      : activeTab === "hotel"
      ? hotelLoading
      : false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setTransportIndex(0);
  };

  const handlePrev = () => {
    if (!displayedItems?.length) return;
    setCurrentIndex((prev) =>
      prev <= 0 ? displayedItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!displayedItems?.length) return;
    setCurrentIndex((prev) =>
      prev >= displayedItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleTransportPrev = () => {
    setTransportIndex((prev) => Math.max(0, prev - 1));
  };

  const handleTransportNext = () => {
    setTransportIndex((prev) => Math.min(transportMaxIndex, prev + 1));
  };

  const handleBookTrip = (item) => {
    if (item?.slug || item?.id) {
      navigate(`/tours/${item.slug || item.id}`);
      return;
    }
    window.location.href = "tel:9668892441";
  };

  const handleCheckAvailability = (item) => {
    if (item?.slug) {
      navigate(`/hotel/${item.slug}`, {
        state: {
          hotelId: item.id,
          hotel: item,
        },
      });
      return;
    }
    window.location.href = "tel:9556355446";
  };

  const handleViewTransportDetails = (item) => {
    if (item?.path) {
      navigate(item.path);
      return;
    }
    window.location.href = "tel:9668892441";
  };

  const openBookingModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingStep(1);
    setBookingForm({
      pickUp: "",
      dropOff: "",
      pickUpDateTime: "",
      dropDateTime: "",
      fullName: "",
      mobile: "",
      message: "",
      agree: false,
    });
    setBookingModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setBookingStep(1);
    setSelectedVehicle(null);
    document.body.style.overflow = "";
  };

  const handleBookingInput = (event) => {
    const { name, value, type, checked } = event.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBookingNext = (event) => {
    event.preventDefault();
    setBookingStep(2);
  };

  const handleBookingPrevious = () => {
    setBookingStep(1);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (!bookingForm.agree) {
      alert("Please accept the terms and conditions.");
      return;
    }
    alert("Booking request submitted successfully!");
    closeBookingModal();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="exp-section">
      <div className="exp-container">
        {/* HEADER */}
        <div className="exp-header">
          <div className="exp-header-content">
            <span className="exp-eyebrow">JAGANNATH EXPLORE TRAVEL</span>
            <h1>
              Bhubaneswar Travel Agency <span>Tour Packages</span>
            </h1>
            <p>
              Discover unforgettable Odisha experiences with curated tour
              packages, premium hotels and comfortable transportation.
            </p>
          </div>

          <div className="exp-tabs">
            <button
              type="button"
              className={activeTab === "tour" ? "exp-tab active" : "exp-tab"}
              onClick={() => handleTabChange("tour")}
            >
              <span className="exp-tab-icon">✦</span>
              Tour Packages
            </button>

            <button
              type="button"
              className={activeTab === "hotel" ? "exp-tab active" : "exp-tab"}
              onClick={() => handleTabChange("hotel")}
            >
              <span className="exp-tab-icon">◆</span>
              Hotels
            </button>

            <button
              type="button"
              className={
                activeTab === "transports" ? "exp-tab active" : "exp-tab"
              }
              onClick={() => handleTabChange("transports")}
            >
              <span className="exp-tab-icon">🚗</span>
              Transport
            </button>
          </div>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="exp-loading">
            <div className="exp-spinner"></div>
            <p>Loading amazing experiences...</p>
          </div>
        )}

        {/* TOUR / HOTEL */}
        {!isLoading && activeTab !== "transports" && (
          <>
            {displayedItems.length === 0 ? (
              <div className="exp-empty">
                <div className="exp-empty-icon">✦</div>
                <h3>No experiences available</h3>
                <p>Please check again shortly.</p>
              </div>
            ) : (
              <>
                <div className="exp-cards-grid">
                  {displayedItems.map((item, index) => {
                    const isVisible =
                      !isMobile || index === currentIndex;

                    if (!isVisible) return null;

                    if (activeTab === "tour") {
                      return (
                        <article className="exp-tour-card" key={item.id}>
                          <div className="exp-card-image-wrap">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="exp-card-image"
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.src =
                                  tourFallbackImages[
                                    index % tourFallbackImages.length
                                  ];
                              }}
                            />
                            <div className="exp-image-overlay"></div>
                            <span className="exp-duration">{item.badge}</span>
                            <span className="exp-location">
                              {item.locationTag}
                            </span>
                            <div className="exp-image-shine"></div>
                          </div>

                          <div className="exp-card-content">
                            <h2>{item.title}</h2>
                            <div className="exp-route">
                              <span>⟶</span>
                              <span>{item.route}</span>
                            </div>

                            <div className="exp-card-footer">
                              <div className="exp-price-box">
                                <span className="exp-price-label">
                                  Starting From
                                </span>
                                <div className="exp-price-row">
                                  <strong>{item.price}</strong>
                                  {item.oldPrice && (
                                    <del>{formatPrice(item.oldPrice)}</del>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                className="exp-primary-btn"
                                onClick={() => handleBookTrip(item)}
                              >
                                Book Trip
                                <span>→</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    }

                    return (
                      <article className="exp-hotel-card" key={item.id}>
                        <div className="exp-hotel-image-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="exp-hotel-image"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src =
                                hotelFallbackImages[
                                  index % hotelFallbackImages.length
                                ];
                            }}
                          />
                          <div className="exp-image-overlay"></div>
                          <span className="exp-breakfast">
                            {item.breakfast}
                          </span>
                          <span className="exp-hotel-rating">
                            ★ {item.rating}
                          </span>
                        </div>

                        <div className="exp-hotel-content">
                          <div className="exp-hotel-title-row">
                            <div>
                              <h2>{item.title}</h2>
                              <p className="exp-hotel-location">
                                <span>📍</span> {item.location}
                              </p>
                            </div>
                          </div>

                          <p className="exp-hotel-distance">{item.distance}</p>

                          <div className="exp-amenities">
                            {item.amenities.slice(0, 4).map((amenity, i) => (
                              <span key={`${amenity}-${i}`}>✓ {amenity}</span>
                            ))}
                          </div>

                          <div className="exp-room-info">
                            <div>
                              <small>ROOM</small>
                              <strong>{item.roomType}</strong>
                            </div>
                            <div>
                              <small>BED</small>
                              <strong>{item.bed}</strong>
                            </div>
                            <div>
                              <small>POLICY</small>
                              <strong>{item.cancellation}</strong>
                            </div>
                          </div>

                          <div className="exp-hotel-footer">
                            <div className="exp-price-box">
                              <span className="exp-price-label">
                                {item.stayDuration}
                              </span>
                              <div className="exp-price-row">
                                <strong>{formatPrice(item.price)}</strong>
                                {item.oldPrice && (
                                  <del>{formatPrice(item.oldPrice)}</del>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="exp-primary-btn"
                              onClick={() => handleCheckAvailability(item)}
                            >
                              Check Availability
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* MOBILE CONTROLS */}
                {isMobile && displayedItems.length > 1 && (
                  <div className="exp-mobile-controls">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous"
                    >
                      ←
                    </button>

                    <div className="exp-dots">
                      {displayedItems.map((_, index) => (
                        <button
                          type="button"
                          key={index}
                          className={index === currentIndex ? "active" : ""}
                          onClick={() => setCurrentIndex(index)}
                          aria-label={`Go to item ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* TRANSPORT SECTION */}
        {activeTab === "transports" && (
          <div className="exp-transport-section">
            <div className="exp-transport-heading">
              <div>
                <span className="exp-small-label">PREMIUM TRANSPORT</span>
                <h2>Choose Your Perfect Ride</h2>
                <p>
                  Comfortable and reliable vehicles for local sightseeing,
                  family tours, weddings and outstation journeys.
                </p>
              </div>

              <div className="exp-transport-arrows">
                <button
                  type="button"
                  onClick={handleTransportPrev}
                  disabled={transportIndex === 0}
                  aria-label="Previous vehicles"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={handleTransportNext}
                  disabled={transportIndex >= transportMaxIndex}
                  aria-label="Next vehicles"
                >
                  →
                </button>
              </div>
            </div>

            <div className="exp-transport-viewport">
              <div
                className="exp-transport-track"
                style={{
                  transform: `translateX(-${
                    transportIndex * (100 / transportVisibleCount)
                  }%)`,
                }}
              >
                {transportItems.map((vehicle) => (
                  <div
                    className="exp-transport-slide"
                    key={vehicle.id}
                    style={{
                      flex: `0 0 ${100 / transportVisibleCount}%`,
                    }}
                  >
                    <article className="exp-vehicle-card">
                      <div className="exp-vehicle-image-wrap">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="exp-vehicle-image"
                          loading="lazy"
                        />
                        <div className="exp-vehicle-image-overlay"></div>
                        <span className="exp-vehicle-category">
                          PREMIUM RIDE
                        </span>
                      </div>

                      <div className="exp-vehicle-body">
                        <div className="exp-vehicle-title-row">
                          <div>
                            <span className="exp-vehicle-label">
                              JAGANNATH EXPLORE
                            </span>
                            <h3>{vehicle.name}</h3>
                          </div>
                          <div className="exp-vehicle-price">
                            <strong>{formatPrice(vehicle.price)}</strong>
                            <span>/ day</span>
                          </div>
                        </div>

                        <div className="exp-vehicle-specs">
                          <div className="exp-spec">
                            <span className="exp-spec-icon">👥</span>
                            <div>
                              <small>SEATS</small>
                              <strong>{vehicle.seats}</strong>
                            </div>
                          </div>

                          <div className="exp-spec">
                            <span className="exp-spec-icon">❄</span>
                            <div>
                              <small>COMFORT</small>
                              <strong>{vehicle.feature}</strong>
                            </div>
                          </div>

                          <div className="exp-spec">
                            <span className="exp-spec-icon">🧳</span>
                            <div>
                              <small>SPACE</small>
                              <strong>{vehicle.luggage}</strong>
                            </div>
                          </div>

                          <div className="exp-spec">
                            <span className="exp-spec-icon">⛽</span>
                            <div>
                              <small>TYPE</small>
                              <strong>{vehicle.fuel}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="exp-vehicle-actions">
                          <button
                            type="button"
                            className="exp-outline-btn"
                            onClick={() => handleViewTransportDetails(vehicle)}
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            className="exp-primary-btn exp-vehicle-book-btn"
                            onClick={() => openBookingModal(vehicle)}
                          >
                            Book Now <span>→</span>
                          </button>
                        </div>

                        {vehicle.showMoreCars && (
                          <button
                            type="button"
                            className="exp-more-cars"
                            onClick={() => handleViewTransportDetails(vehicle)}
                          >
                            View More Cars <span>→</span>
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {transportItems.length > transportVisibleCount && (
              <div className="exp-transport-dots">
                {Array.from({ length: transportMaxIndex + 1 }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={i === transportIndex ? "active" : ""}
                    onClick={() => setTransportIndex(i)}
                    aria-label={`Vehicle slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOOKING MODAL */}
      {bookingModalOpen && selectedVehicle && (
        <div
          className="vbooking-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeBookingModal();
          }}
        >
          <div
            className="vbooking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-booking-title"
          >
            <div className="vbooking-header">
              <div>
                <span>VEHICLE BOOKING</span>
                <h2 id="vehicle-booking-title">Book Your Ride</h2>
              </div>
              <button
                type="button"
                className="vbooking-close"
                onClick={closeBookingModal}
                aria-label="Close booking"
              >
                ×
              </button>
            </div>

            <div className="vbooking-progress">
              <div className={bookingStep >= 1 ? "active" : ""}>
                <span>1</span> Trip Details
              </div>
              <div className="vbooking-line"></div>
              <div className={bookingStep >= 2 ? "active" : ""}>
                <span>2</span> Contact Details
              </div>
            </div>

            <div className="vbooking-vehicle">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
              />
              <div>
                <span>SELECTED VEHICLE</span>
                <h3>{selectedVehicle.name}</h3>
                <strong>
                  {formatPrice(selectedVehicle.price)}
                  <small> / day</small>
                </strong>
              </div>
            </div>

            {bookingStep === 1 && (
              <form className="vbooking-form" onSubmit={handleBookingNext}>
                <div className="vbooking-form-grid">
                  <div className="vbooking-field">
                    <label>Pick Up Location</label>
                    <input
                      type="text"
                      name="pickUp"
                      value={bookingForm.pickUp}
                      onChange={handleBookingInput}
                      placeholder="Enter pickup location"
                      required
                    />
                  </div>
                  <div className="vbooking-field">
                    <label>Drop Off Location</label>
                    <input
                      type="text"
                      name="dropOff"
                      value={bookingForm.dropOff}
                      onChange={handleBookingInput}
                      placeholder="Enter drop-off location"
                      required
                    />
                  </div>
                  <div className="vbooking-field">
                    <label>Pick Up Date & Time</label>
                    <input
                      type="datetime-local"
                      name="pickUpDateTime"
                      value={bookingForm.pickUpDateTime}
                      onChange={handleBookingInput}
                      required
                    />
                  </div>
                  <div className="vbooking-field">
                    <label>Drop Date & Time</label>
                    <input
                      type="datetime-local"
                      name="dropDateTime"
                      value={bookingForm.dropDateTime}
                      onChange={handleBookingInput}
                      required
                    />
                  </div>
                </div>

                <div className="vbooking-actions">
                  <button
                    type="button"
                    className="vbooking-cancel"
                    onClick={closeBookingModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="vbooking-next">
                    Continue <span>→</span>
                  </button>
                </div>
              </form>
            )}

            {bookingStep === 2 && (
              <form className="vbooking-form" onSubmit={handleBookingSubmit}>
                <div className="vbooking-form-grid">
                  <div className="vbooking-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={bookingForm.fullName}
                      onChange={handleBookingInput}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="vbooking-field">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={bookingForm.mobile}
                      onChange={handleBookingInput}
                      placeholder="Enter mobile number"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="vbooking-field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleBookingInput}
                    placeholder="Any special requirements?"
                    rows="4"
                  ></textarea>
                </div>

                <label className="vbooking-agree">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={bookingForm.agree}
                    onChange={handleBookingInput}
                  />
                  <span>I agree to the booking terms and conditions.</span>
                </label>

                <div className="vbooking-actions">
                  <button
                    type="button"
                    className="vbooking-cancel"
                    onClick={handleBookingPrevious}
                  >
                    ← Previous
                  </button>
                  <button type="submit" className="vbooking-next">
                    Submit Booking <span>✓</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;