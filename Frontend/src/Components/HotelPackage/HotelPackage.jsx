import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Wifi,
  Utensils,
  Waves,
  Car,
  ArrowRight,
  Building2,
  Sparkles,
  BedDouble,
  Coffee,
  ShieldCheck,
  Dumbbell,
  Wind,
  CircleParking,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";
import "./HotelPackage.css";

const HotelPackage = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedHotels, setLikedHotels] = useState([]);

  /* =========================================================
     FETCH HOTELS
  ========================================================= */

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);

        const response = await API.get("/hotels");

        const data = response.data?.data || response.data || [];

        if (!Array.isArray(data)) {
          setHotels([]);
          return;
        }

        const formattedHotels = data
          .filter((hotel) => {
            const status = String(hotel.status || "Active").toLowerCase();

            return (
              status === "active" ||
              status === "available" ||
              !hotel.status
            );
          })
          .map((hotel, index) => {
            /* =====================================================
               IMAGE HANDLING
            ===================================================== */

            let images = [];

            if (Array.isArray(hotel.images) && hotel.images.length > 0) {
              images = hotel.images
                .filter(Boolean)
                .map((image) => {
                  const imageString = String(image);

                  if (
                    imageString.startsWith("http://") ||
                    imageString.startsWith("https://") ||
                    imageString.startsWith("blob:")
                  ) {
                    return imageString;
                  }

                  if (imageString.startsWith("/")) {
                    return `${IMG_URL}${imageString}`;
                  }

                  return `${IMG_URL}/${imageString}`;
                });
            }

            /* =====================================================
               AMENITIES
            ===================================================== */

            let amenities = [];

            if (Array.isArray(hotel.amenities)) {
              amenities = hotel.amenities
                .map((item) => String(item).trim())
                .filter(Boolean);
            } else if (typeof hotel.amenities === "string") {
              amenities = hotel.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            }

            /* =====================================================
               PRICE
            ===================================================== */

            const price = Number(
              hotel.price ||
                hotel.roomPrice ||
                hotel.pricePerNight ||
                0
            );

            /* =====================================================
               RATING
            ===================================================== */

            const rating = Math.min(
              5,
              Math.max(
                1,
                Number(
                  hotel.starRating ||
                    hotel.rating ||
                    hotel.hotelRating ||
                    5
                )
              )
            );

            /* =====================================================
               REVIEWS
            ===================================================== */

            const reviews =
              hotel.reviewsCount ||
              hotel.reviewCount ||
              hotel.reviews ||
              "0";

            /* =====================================================
               LOCATION
            ===================================================== */

            const city = String(hotel.city || "").trim();

            const address = String(
              hotel.address || ""
            ).trim();

            const location =
              city && address
                ? `${city}, ${address}`
                : city || address || "Odisha";

            /* =====================================================
               LANDMARK / BADGE
            ===================================================== */

            const landmark = String(
              hotel.landmark || ""
            ).trim();

            let badge = "";

            const hasBreakfast = amenities.some((item) =>
              /breakfast/i.test(item)
            );

            if (hasBreakfast) {
              badge = "Breakfast Included";
            } else if (landmark) {
              badge = /^near/i.test(landmark)
                ? landmark
                : `Near ${landmark}`;
            } else if (rating >= 4.5) {
              badge = "Top Rated";
            } else if (rating >= 4) {
              badge = "Popular";
            }

            /* =====================================================
               ID
            ===================================================== */

            const id = hotel._id || hotel.id || index + 1;

            return {
              id,

              name:
                hotel.name ||
                hotel.hotelName ||
                "Premium Hotel",

              city,

              address,

              location,

              landmark,

              rating,

              reviews,

              badge,

              shortDesc:
                hotel.shortDesc ||
                hotel.description ||
                "",

              price,

              formattedPrice:
                price > 0
                  ? price.toLocaleString("en-IN")
                  : "0",

              originalPrice:
                price > 0
                  ? Math.round(price * 1.15).toLocaleString(
                      "en-IN"
                    )
                  : "0",

              amenities,

              images,

              status:
                hotel.status ||
                "Active",
            };
          });

        setHotels(formattedHotels);
      } catch (error) {
        console.error(
          "Error fetching hotel data:",
          error
        );

        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  /* =========================================================
     CREATE HOTEL SLUG
  ========================================================= */

  const createHotelSlug = (name) => {
    return String(name || "hotel")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /* =========================================================
     HOTEL DETAILS NAVIGATION
  ========================================================= */

  const openHotelDetails = (hotel) => {
    const hotelSlug = createHotelSlug(hotel.name);

    navigate(`/hotel/${hotelSlug}`, {
      state: {
        hotelId: hotel.id,
      },
    });
  };

  /* =========================================================
     LIKE HOTEL
  ========================================================= */

  const toggleLike = (event, hotelId) => {
    event.stopPropagation();

    setLikedHotels((previous) => {
      if (previous.includes(hotelId)) {
        return previous.filter(
          (id) => id !== hotelId
        );
      }

      return [...previous, hotelId];
    });
  };

  /* =========================================================
     GET AMENITY ICON
  ========================================================= */

  const getAmenityIcon = (amenity) => {
    const value = String(amenity || "").toLowerCase();

    if (
      value.includes("wifi") ||
      value.includes("internet")
    ) {
      return <Wifi />;
    }

    if (
      value.includes("restaurant") ||
      value.includes("food") ||
      value.includes("dining")
    ) {
      return <Utensils />;
    }

    if (
      value.includes("pool") ||
      value.includes("swimming")
    ) {
      return <Waves />;
    }

    if (
      value.includes("parking") ||
      value.includes("car parking")
    ) {
      return <CircleParking />;
    }

    if (
      value.includes("breakfast") ||
      value.includes("coffee")
    ) {
      return <Coffee />;
    }

    if (
      value.includes("gym") ||
      value.includes("fitness")
    ) {
      return <Dumbbell />;
    }

    if (
      value.includes("ac") ||
      value.includes("air condition")
    ) {
      return <Wind />;
    }

    if (
      value.includes("security") ||
      value.includes("safe")
    ) {
      return <ShieldCheck />;
    }

    if (
      value.includes("bed") ||
      value.includes("room")
    ) {
      return <BedDouble />;
    }

    return <Building2 />;
  };

  /* =========================================================
     RENDER STARS
  ========================================================= */

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;

    return (
      <div className="HotelPackage-ratingStars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={17}
            strokeWidth={0}
            fill={
              star <= Math.floor(numericRating)
                ? "#f8b400"
                : "#d9dfe8"
            }
          />
        ))}
      </div>
    );
  };

  /* =========================================================
     GET DISPLAY AMENITIES
  ========================================================= */

  const getDisplayAmenities = (amenities) => {
    if (!Array.isArray(amenities)) {
      return [];
    }

    return amenities
      .filter(Boolean)
      .slice(0, 4);
  };

  /* =========================================================
     FALLBACK IMAGE
  ========================================================= */

  const getHotelImage = (hotel) => {
    if (
      Array.isArray(hotel.images) &&
      hotel.images.length > 0
    ) {
      return hotel.images[0];
    }

    return "/placeholder-hotel.jpg";
  };

  /* =========================================================
     LOADING SKELETON
  ========================================================= */

  if (loading) {
    return (
      <section className="HotelPackage">
        <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeOne" />
        <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeTwo" />

        <div className="HotelPackage-container">

          <div className="HotelPackage-heading">
            <div className="HotelPackage-subHeading">
              <span>→</span>
              <span>Best Hotels in Odisha</span>
              <span>←</span>
            </div>

            <h2 className="HotelPackage-title">
              Stay in Comfort &amp; Luxury
            </h2>

            <p className="HotelPackage-description">
              Discover the best hotels and accommodations
              across Odisha with verified facilities,
              excellent service, and the best prices for a
              memorable stay.
            </p>
          </div>

          <div className="HotelPackage-grid">

            {[1, 2, 3].map((item) => (
              <div
                className="HotelPackage-card HotelPackage-skeletonCard"
                key={item}
              >
                <div className="HotelPackage-skeletonImage" />

                <div className="HotelPackage-cardContent">

                  <div className="HotelPackage-skeletonTitle" />

                  <div className="HotelPackage-skeletonRating" />

                  <div className="HotelPackage-skeletonAmenities">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="HotelPackage-divider" />

                  <div className="HotelPackage-skeletonBottom">
                    <span />
                    <span />
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     SHOW ONLY THREE FEATURED HOTELS
  ========================================================= */

  const featuredHotels = hotels.slice(0, 3);

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section
      className="HotelPackage"
      aria-labelledby="HotelPackage-heading"
    >

      {/* Decorative background */}
      <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeOne" />

      <div className="HotelPackage-backgroundShape HotelPackage-backgroundShapeTwo" />

      <div className="HotelPackage-backgroundDots" />

      <div className="HotelPackage-container">

        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="HotelPackage-heading">

          <div className="HotelPackage-subHeading">
            <span className="HotelPackage-subHeadingArrow">
              →
            </span>

            <span>
              Best Hotels in Odisha
            </span>

            <span className="HotelPackage-subHeadingArrow">
              ←
            </span>
          </div>

          <h2
            id="HotelPackage-heading"
            className="HotelPackage-title"
          >
            Stay in Comfort &amp; Luxury
          </h2>

          <p className="HotelPackage-description">
            Discover the best hotels and accommodations
            across Odisha with verified facilities,
            excellent service, and the best prices for a
            memorable stay.
          </p>

          <div className="HotelPackage-headingDecoration">
            <Building2 size={24} />

            <span />

            <Sparkles size={18} />
          </div>

        </div>

        {/* =====================================================
            NO HOTELS
        ===================================================== */}

        {featuredHotels.length === 0 ? (
          <div className="HotelPackage-empty">

            <div className="HotelPackage-emptyIcon">
              <Building2 size={40} />
            </div>

            <h3>
              Hotels Coming Soon
            </h3>

            <p>
              We are currently adding beautiful hotels
              and resorts for your next Odisha journey.
            </p>

          </div>
        ) : (

          /* ===================================================
             HOTEL GRID
          =================================================== */

          <div className="HotelPackage-grid">

            {featuredHotels.map((hotel) => {

              const hotelImage =
                getHotelImage(hotel);

              const displayAmenities =
                getDisplayAmenities(
                  hotel.amenities
                );

              const isLiked =
                likedHotels.includes(
                  hotel.id
                );

              return (
                <article
                  className="HotelPackage-card"
                  key={hotel.id}
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div
                    className="HotelPackage-imageWrapper"
                    onClick={() =>
                      openHotelDetails(hotel)
                    }
                  >

                    <img
                      src={hotelImage}
                      alt={`${hotel.name} hotel`}
                      className="HotelPackage-image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/placeholder-hotel.jpg";
                      }}
                    />

                    <div className="HotelPackage-imageOverlay" />

                    {/* Rating */}

                    <div className="HotelPackage-ratingBadge">

                      <span>
                        {hotel.rating.toFixed(1)}
                      </span>

                      <Star
                        size={15}
                        fill="#ffc107"
                        strokeWidth={0}
                      />

                    </div>

                    {/* Location */}

                    <div className="HotelPackage-locationBadge">

                      <MapPin
                        size={14}
                        fill="#51ad2d"
                      />

                      <span>
                        {(
                          hotel.city ||
                          hotel.location ||
                          "ODISHA"
                        ).toUpperCase()}
                      </span>

                    </div>

                    {/* Badge */}

                    {hotel.badge && (
                      <div
                        className={`HotelPackage-statusBadge ${
                          hotel.rating >= 4.5
                            ? "HotelPackage-statusBadge-popular"
                            : hotel.rating >= 4
                            ? "HotelPackage-statusBadge-value"
                            : "HotelPackage-statusBadge-temple"
                        }`}
                      >
                        {hotel.badge}
                      </div>
                    )}

                  </div>

                  {/* =================================================
                      CARD CONTENT
                  ================================================= */}

                  <div className="HotelPackage-cardContent">

                    {/* Name + Favorite */}

                    <div className="HotelPackage-nameRow">

                      <h3
                        className="HotelPackage-hotelName"
                        onClick={() =>
                          openHotelDetails(
                            hotel
                          )
                        }
                      >
                        {hotel.name}
                      </h3>

                      <button
                        type="button"
                        className={`HotelPackage-likeButton ${
                          isLiked
                            ? "HotelPackage-likeButtonActive"
                            : ""
                        }`}
                        onClick={(event) =>
                          toggleLike(
                            event,
                            hotel.id
                          )
                        }
                        aria-label={
                          isLiked
                            ? `Remove ${hotel.name} from favorites`
                            : `Add ${hotel.name} to favorites`
                        }
                      >

                        <Heart
                          size={20}
                          fill={
                            isLiked
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                    </div>

                    {/* Rating */}

                    <div className="HotelPackage-reviewRow">

                      {renderStars(
                        hotel.rating
                      )}

                      <span className="HotelPackage-reviewText">
                        (
                        {hotel.reviews}
                        )
                      </span>

                    </div>

                    {/* Location under title */}

                    <div className="HotelPackage-cardLocation">

                      <MapPin size={14} />

                      <span>
                        {hotel.location}
                      </span>

                    </div>

                    {/* Amenities */}

                    {displayAmenities.length >
                      0 && (
                      <div className="HotelPackage-amenities">

                        {displayAmenities.map(
                          (
                            amenity,
                            index
                          ) => (
                            <div
                              className="HotelPackage-amenity"
                              key={`${hotel.id}-${index}`}
                            >

                              <div className="HotelPackage-amenityIcon">

                                {React.cloneElement(
                                  getAmenityIcon(
                                    amenity
                                  ),
                                  {
                                    size: 20,
                                    strokeWidth: 1.8,
                                  }
                                )}

                              </div>

                              <span className="HotelPackage-amenityText">
                                {amenity}
                              </span>

                            </div>
                          )
                        )}

                      </div>
                    )}

                    {/* Divider */}

                    <div className="HotelPackage-divider" />

                    {/* Price */}

                    <div className="HotelPackage-bottom">

                      <div className="HotelPackage-priceArea">

                        <span className="HotelPackage-priceLabel">
                          Starting From:
                        </span>

                        <div className="HotelPackage-priceRow">

                          <span className="HotelPackage-price">
                            ₹
                            {
                              hotel.formattedPrice
                            }
                          </span>

                          {hotel.price >
                            0 && (
                            <span className="HotelPackage-oldPrice">
                              ₹
                              {
                                hotel.originalPrice
                              }
                            </span>
                          )}

                          <span className="HotelPackage-priceDuration">
                            / Night
                          </span>

                        </div>

                        <span className="HotelPackage-priceNote">
                          PER ROOM / NET PRICE
                        </span>

                      </div>

                      {/* Book Hotel */}

                      <button
                        type="button"
                        className="HotelPackage-bookButton"
                        onClick={() =>
                          openHotelDetails(
                            hotel
                          )
                        }
                      >

                        <span>
                          Book Hotel
                        </span>

                        <ArrowRight
                          size={18}
                        />

                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

        {/* =====================================================
            VIEW ALL HOTELS
        ===================================================== */}

        {hotels.length > 0 && (
          <div className="HotelPackage-viewAllWrapper">

            <button
              type="button"
              className="HotelPackage-viewAllButton"
              onClick={() =>
                navigate("/hotel")
              }
            >

              <span>
                VIEW ALL HOTELS IN ODISHA
              </span>

              <ArrowRight size={19} />

            </button>

          </div>
        )}

      </div>

    </section>
  );
};

export default HotelPackage;