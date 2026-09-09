import React, { useState } from 'react';
import './HotelRoom.css';

// React Icons
import {
  FaSearch,
  FaStar,
  FaStarHalfAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLock,
  FaDumbbell,
  FaSpa,
  FaParking,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// Import images from src/assets/
import room1_1 from '../../assets/bed1.webp';
import room1_2 from '../../assets/bed5.webp';
import room1_3 from '../../assets/bed2.webp';

import room2_1 from '../../assets/bed2.webp';
import room2_2 from '../../assets/bed6.webp';
import room2_3 from '../../assets/bed5.webp';

import room3_1 from '../../assets/bed3.webp';
import room3_2 from '../../assets/bed2.webp';
import room3_3 from '../../assets/bed6.webp';

import room4_1 from '../../assets/bed5.webp';
import room4_2 from '../../assets/bed3.webp';
import room4_3 from '../../assets/bed1.webp';

import room5_1 from '../../assets/bed6.webp';
import room5_2 from '../../assets/bed3.webp';
import room5_3 from '../../assets/bed2.webp';

import room6_1 from '../../assets/bed1.webp';
import room6_2 from '../../assets/bed5.webp';
import room6_3 from '../../assets/bed6.webp';

const initialHotels = [
  {
    id: 1,
    name: "Golden Tulip The Grandmark Dhaka",
    location: "Dhaka, Bangladesh",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "Breakfast Included",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room1_1, room1_2, room1_3]
  },
  {
    id: 2,
    name: "Castle Bay Touch Cox's Bazar",
    location: "Cox's Bazar, Bangladesh",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "Breakfast Included",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room2_1, room2_2, room2_3]
  },
  {
    id: 3,
    name: "Hotel Windy Terrace",
    location: "Dhaka, Bangladesh",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room3_1, room3_2, room3_3]
  },
  {
    id: 4,
    name: "Whispering Willow Inn",
    location: "St. Louis, USA",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room4_1, room4_2, room4_3]
  },
  {
    id: 5,
    name: "Harmony Haven Hideaway",
    location: "Liverpool, UK",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "Breakfast Included",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room5_1, room5_2, room5_3]
  },
  {
    id: 6,
    name: "Tranquil Twilight Lodge",
    location: "Berlin, Germany",
    distance: "2 km to city center",
    rating: 4.5,
    reviewsCount: "4.5 reviews",
    badge: "",
    roomType: "Deluxe King Room",
    bedType: "1 king bed",
    cancellation: "Free cancellation before 48 hours",
    price: "2,898",
    originalPrice: "3,000",
    images: [room6_1, room6_2, room6_3]
  }
];

const HotelRoom = () => {
  const [activeImageIndexes, setActiveImageIndexes] = useState(
    initialHotels.reduce((acc, hotel) => ({ ...acc, [hotel.id]: 0 }), {})
  );

  // Touch Swipe States
  const [touchStartX, setTouchStartX] = useState(null);

  // Mouse hover behavior for Desktop
  const handleMouseMove = (e, hotelId) => {
    if (window.innerWidth <= 992) return; // Disable hover logic on mobile/tablet
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    let index = 0;
    if (x > width * (2 / 3)) {
      index = 2;
    } else if (x > width * (1 / 3)) {
      index = 1;
    }

    setActiveImageIndexes((prev) => ({ ...prev, [hotelId]: index }));
  };

  // Next / Previous controls for Mobile & Desktop click
  const handlePrevImage = (e, hotelId, totalImages) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[hotelId] || 0;
      return { ...prev, [hotelId]: current === 0 ? totalImages - 1 : current - 1 };
    });
  };

  const handleNextImage = (e, hotelId, totalImages) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[hotelId] || 0;
      return { ...prev, [hotelId]: (current + 1) % totalImages };
    });
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e, hotelId, totalImages) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 40) { // Swipe threshold
      if (diffX > 0) {
        handleNextImage(e, hotelId, totalImages);
      } else {
        handlePrevImage(e, hotelId, totalImages);
      }
    }
    setTouchStartX(null);
  };

  // Structured SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jagannatha Tour and Travels - Premium Hotel Rooms",
    "itemListElement": initialHotels.map((hotel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Hotel",
        "name": hotel.name,
        "address": hotel.location,
        "priceRange": `₹${hotel.price}`
      }
    }))
  };

  return (
    <section className="HotelRoom" aria-labelledby="hotel-room-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="HotelRoom-container">
        
        {/* Left Sidebar Filters */}
        <aside className="HotelRoom-sidebar">
          <div className="HotelRoom-filterCard">
            <h3 className="HotelRoom-filterTitle">Search Here</h3>
            <div className="HotelRoom-searchBox">
              <input
                type="text"
                placeholder="Search Here"
                className="HotelRoom-searchInput"
              />
              <button className="HotelRoom-searchBtn" aria-label="Search">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="HotelRoom-filterCard">
            <h3 className="HotelRoom-filterTitle">Popular Filters</h3>
            <ul className="HotelRoom-filterList">
              <li>
                <label className="HotelRoom-checkboxLabel">
                  <input type="checkbox" />
                  <span>Book without credit card</span>
                </label>
                <span className="HotelRoom-badge">250</span>
              </li>
              <li>
                <label className="HotelRoom-checkboxLabel">
                  <input type="checkbox" />
                  <span>Free cancellation</span>
                </label>
                <span className="HotelRoom-badge">90</span>
              </li>
              <li>
                <label className="HotelRoom-checkboxLabel">
                  <input type="checkbox" />
                  <span>Breakfast Included</span>
                </label>
                <span className="HotelRoom-badge">35</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Hotel Cards List */}
        <main className="HotelRoom-main">
          {initialHotels.map((hotel) => {
            const currentImgIndex = activeImageIndexes[hotel.id] || 0;
            const totalImages = hotel.images.length;

            return (
              <article className="HotelRoom-card" key={hotel.id}>
                
                {/* Image & Mobile Touch/Swipe Container */}
                <div
                  className="HotelRoom-imageWrapper"
                  onMouseMove={(e) => handleMouseMove(e, hotel.id)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, hotel.id, totalImages)}
                >
                  {hotel.badge && (
                    <span className="HotelRoom-tagBadge">{hotel.badge}</span>
                  )}
                  
                  <img
                    src={hotel.images[currentImgIndex]}
                    alt={`${hotel.name} - Jagannatha Tour and Travels`}
                    className="HotelRoom-img"
                  />

                  {/* Navigation Arrows for Mobile & Touch */}
                  <button
                    className="HotelRoom-navBtn HotelRoom-navBtnPrev"
                    onClick={(e) => handlePrevImage(e, hotel.id, totalImages)}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    className="HotelRoom-navBtn HotelRoom-navBtnNext"
                    onClick={(e) => handleNextImage(e, hotel.id, totalImages)}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Touch-Friendly Pagination Indicators */}
                  <div className="HotelRoom-dotsOverlay">
                    {hotel.images.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        className={`HotelRoom-dot ${
                          currentImgIndex === dotIndex ? 'HotelRoom-dotActive' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndexes((prev) => ({
                            ...prev,
                            [hotel.id]: dotIndex
                          }));
                        }}
                        aria-label={`Slide ${dotIndex + 1}`}
                      >
                        <span className="HotelRoom-dotInner" />
                      </button>
                    ))}
                  </div>

                  {/* Mobile Image Counter Badge */}
                  <span className="HotelRoom-imageCounter">
                    {currentImgIndex + 1}/{totalImages}
                  </span>
                </div>

                {/* Hotel Content */}
                <div className="HotelRoom-content">
                  <div className="HotelRoom-ratingRow">
                    <div className="HotelRoom-stars">
                      <FaStar className="HotelRoom-starYellow" />
                      <FaStar className="HotelRoom-starYellow" />
                      <FaStar className="HotelRoom-starYellow" />
                      <FaStar className="HotelRoom-starYellow" />
                      <FaStarHalfAlt className="HotelRoom-starYellow" />
                    </div>
                    <span className="HotelRoom-reviewText">{hotel.reviewsCount}</span>
                  </div>

                  <h2 className="HotelRoom-title">{hotel.name}</h2>

                  <div className="HotelRoom-locationRow">
                    <FaMapMarkerAlt className="HotelRoom-locationIcon" />
                    <span className="HotelRoom-locationText">{hotel.location}</span>
                    <a href="#map" className="HotelRoom-mapLink">Show on map</a>
                    <span className="HotelRoom-distanceText">{hotel.distance}</span>
                  </div>

                  <div className="HotelRoom-amenitiesRow">
                    <span className="HotelRoom-amenity"><FaLock className="HotelRoom-amenityIcon" /> Locker</span>
                    <span className="HotelRoom-amenity"><FaDumbbell className="HotelRoom-amenityIcon" /> Gym</span>
                    <span className="HotelRoom-amenity"><FaSpa className="HotelRoom-amenityIcon" /> Spa</span>
                    <span className="HotelRoom-amenity"><FaParking className="HotelRoom-amenityIcon" /> Parking</span>
                    <span className="HotelRoom-amenity"><FaUtensils className="HotelRoom-amenityIcon" /> Restaurant</span>
                  </div>

                  <div className="HotelRoom-footer">
                    <div className="HotelRoom-roomMeta">
                      <h4 className="HotelRoom-roomType">{hotel.roomType}</h4>
                      <p className="HotelRoom-bedType">{hotel.bedType}</p>
                      <p className="HotelRoom-cancellation">{hotel.cancellation}</p>
                    </div>

                    <div className="HotelRoom-priceAction">
                      <span className="HotelRoom-nightInfo">1 night, 2 adults</span>
                      <div className="HotelRoom-priceRow">
                        <span className="HotelRoom-price">₹{hotel.price}</span>
                        <span className="HotelRoom-originalPrice">₹{hotel.originalPrice}</span>
                      </div>
                      <button className="HotelRoom-availabilityBtn">
                        Check Availability <FaArrowRight className="HotelRoom-arrowIcon" />
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </main>

      </div>
    </section>
  );
};

export default HotelRoom;