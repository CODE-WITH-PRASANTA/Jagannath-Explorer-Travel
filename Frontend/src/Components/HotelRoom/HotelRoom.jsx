import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelRoom.css';
import API, { IMG_URL } from '../../api/axios';

// React Icons
import {
  FaSearch,
  FaStar,
  FaStarHalfAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaUndo,
  FaFilter
} from 'react-icons/fa';

// Import fallback images from src/assets/
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

const PRICE_TIERS = [
  { id: 'under_2000', label: 'Under ₹2,000', check: (p) => p < 2000 },
  { id: '2000_4000', label: '₹2,000 - ₹4,000', check: (p) => p >= 2000 && p <= 4000 },
  { id: '4000_7000', label: '₹4,000 - ₹7,000', check: (p) => p > 4000 && p <= 7000 },
  { id: 'above_7000', label: 'Above ₹7,000', check: (p) => p > 7000 }
];

const RATING_TIERS = [
  { id: 5, label: '5 Stars', stars: 5, check: (r) => Math.floor(r) === 5 },
  { id: 4, label: '4 Stars & above', stars: 4, check: (r) => Math.floor(r) >= 4 },
  { id: 3, label: '3 Stars & above', stars: 3, check: (r) => Math.floor(r) >= 3 }
];

const HotelRoom = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  // Real Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [popularFilterKeys, setPopularFilterKeys] = useState([]);

  // Fetch hotels from backend using .env API configuration
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await API.get('/hotels');
        const data = response.data.data || response.data || [];
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((hotel, index) => {
            let hotelImgs = [];
            if (hotel.images && hotel.images.length > 0) {
              hotelImgs = hotel.images.map((img) =>
                img.startsWith('http') || img.startsWith('blob:')
                  ? img
                  : `${IMG_URL}${img}`
              );
            } else {
              hotelImgs = [room1_1, room1_2, room1_3];
            }

            const landmarkClean = (hotel.landmark || "").trim();
            const distanceText = landmarkClean
              ? (/^near/i.test(landmarkClean) ? landmarkClean : `Near ${landmarkClean}`)
              : "City Center";

            // Parse amenities
            let parsedAmenities = [];
            if (hotel.amenities) {
              if (Array.isArray(hotel.amenities)) {
                parsedAmenities = hotel.amenities.map(a => String(a).trim()).filter(Boolean);
              } else if (typeof hotel.amenities === 'string') {
                parsedAmenities = hotel.amenities.split(',').map((a) => a.trim()).filter(Boolean);
              }
            }

            const hasBreakfast = parsedAmenities.some(a => /breakfast/i.test(a));
            const rawPrice = Number(hotel.price || 0);
            const ratingNum = Math.max(1, Math.min(5, Number(hotel.starRating) || 5));

            return {
              id: hotel._id || hotel.id || index + 1,
              name: hotel.name,
              city: (hotel.city || "").trim(),
              address: hotel.address || "",
              landmark: hotel.landmark || "",
              location: `${hotel.city || ''}${hotel.address ? `, ${hotel.address}` : ''}`,
              distance: distanceText,
              starRating: ratingNum,
              reviewsCount: `${ratingNum}.0 reviews`,
              badge: hasBreakfast ? "Breakfast Included" : "",
              shortDesc: hotel.shortDesc || "",
              checkIn: hotel.checkIn || "14:00",
              checkOut: hotel.checkOut || "11:00",
              rooms: hotel.rooms || "",
              amenities: parsedAmenities,
              rawPrice: rawPrice,
              price: rawPrice.toLocaleString('en-IN'),
              originalPrice: Math.round(rawPrice * 1.15).toLocaleString('en-IN'),
              images: hotelImgs,
              status: hotel.status || "Active"
            };
          });
          setHotels(formatted);
          setActiveImageIndexes(
            formatted.reduce((acc, hotel) => ({ ...acc, [hotel.id]: 0 }), {})
          );
        }
      } catch (error) {
        console.error("Error fetching hotels from backend API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Touch Swipe States
  const [touchStartX, setTouchStartX] = useState(null);

  // Mouse hover behavior for Desktop
  const handleMouseMove = (e, hotelId) => {
    if (window.innerWidth <= 992) return;
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

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextImage(e, hotelId, totalImages);
      } else {
        handlePrevImage(e, hotelId, totalImages);
      }
    }
    setTouchStartX(null);
  };

  // Dynamic Available Amenities & Cities with Counts
  const availableAmenities = useMemo(() => {
    const map = new Map();
    hotels.forEach((h) => {
      (h.amenities || []).forEach((a) => {
        const trimmed = a.trim();
        if (trimmed) {
          const key = trimmed.toLowerCase();
          if (!map.has(key)) {
            map.set(key, { label: trimmed, count: 0 });
          }
          map.get(key).count += 1;
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [hotels]);

  const availableCities = useMemo(() => {
    const map = new Map();
    hotels.forEach((h) => {
      if (h.city) {
        const key = h.city.toLowerCase();
        if (!map.has(key)) {
          map.set(key, { label: h.city, count: 0 });
        }
        map.get(key).count += 1;
      }
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [hotels]);

  // Real Popular Filters List calculated from backend hotels
  const popularFilterOptions = useMemo(() => {
    const freeWifiCount = hotels.filter((h) =>
      (h.amenities || []).some((a) => /wifi/i.test(a))
    ).length;

    const acCount = hotels.filter((h) =>
      (h.amenities || []).some((a) => /ac|air condition/i.test(a))
    ).length;

    const poolCount = hotels.filter((h) =>
      (h.amenities || []).some((a) => /pool|swimming/i.test(a))
    ).length;

    const parkingCount = hotels.filter((h) =>
      (h.amenities || []).some((a) => /parking/i.test(a))
    ).length;

    const options = [
      { id: 'free_wifi', label: 'Free High-Speed Wifi', count: freeWifiCount },
      { id: 'air_condition', label: 'Air Conditioned Rooms', count: acCount },
    ];

    if (poolCount > 0) {
      options.push({ id: 'swimming_pool', label: 'Swimming Pool', count: poolCount });
    }
    if (parkingCount > 0) {
      options.push({ id: 'parking', label: 'Parking Facility', count: parkingCount });
    }

    return options.filter((opt) => opt.count > 0);
  }, [hotels]);

  // Toggle Handlers
  const togglePriceRange = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleRating = (ratingId) => {
    setSelectedRatings((prev) =>
      prev.includes(ratingId) ? prev.filter((r) => r !== ratingId) : [...prev, ratingId]
    );
  };

  const toggleAmenity = (amenityLabel) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityLabel)
        ? prev.filter((a) => a !== amenityLabel)
        : [...prev, amenityLabel]
    );
  };

  const toggleCity = (cityLabel) => {
    setSelectedCities((prev) =>
      prev.includes(cityLabel) ? prev.filter((c) => c !== cityLabel) : [...prev, cityLabel]
    );
  };

  const togglePopularFilter = (filterId) => {
    setPopularFilterKeys((prev) =>
      prev.includes(filterId) ? prev.filter((k) => k !== filterId) : [...prev, filterId]
    );
  };

  // Reset All Filters
  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setSelectedAmenities([]);
    setSelectedCities([]);
    setPopularFilterKeys([]);
  };

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    selectedPriceRanges.length +
    selectedRatings.length +
    selectedAmenities.length +
    selectedCities.length +
    popularFilterKeys.length;

  // Filter hotels based on all real active criteria
  const displayedHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = hotel.name?.toLowerCase().includes(q);
        const matchCity = hotel.city?.toLowerCase().includes(q);
        const matchAddress = hotel.address?.toLowerCase().includes(q);
        const matchLandmark = hotel.landmark?.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchAddress && !matchLandmark) {
          return false;
        }
      }

      // 2. Price Range Filter
      if (selectedPriceRanges.length > 0) {
        const matchAnyRange = selectedPriceRanges.some((rangeId) => {
          const tier = PRICE_TIERS.find((t) => t.id === rangeId);
          return tier ? tier.check(hotel.rawPrice) : true;
        });
        if (!matchAnyRange) return false;
      }

      // 3. Star Rating Filter
      if (selectedRatings.length > 0) {
        const matchRating = selectedRatings.some((rId) => {
          const tier = RATING_TIERS.find((t) => t.id === rId);
          return tier ? tier.check(hotel.starRating) : true;
        });
        if (!matchRating) return false;
      }

      // 4. Amenities Filter (Hotel must have all selected amenities)
      if (selectedAmenities.length > 0) {
        const hotelAmenitiesLower = (hotel.amenities || []).map((a) => a.toLowerCase());
        const hasAllSelected = selectedAmenities.every((selAmenity) =>
          hotelAmenitiesLower.some((ha) => ha.includes(selAmenity.toLowerCase()))
        );
        if (!hasAllSelected) return false;
      }

      // 5. City Filter
      if (selectedCities.length > 0) {
        const hotelCity = (hotel.city || '').toLowerCase();
        const matchCity = selectedCities.some((c) => c.toLowerCase() === hotelCity);
        if (!matchCity) return false;
      }

      // 6. Popular Filter Keys
      if (popularFilterKeys.length > 0) {
        if (popularFilterKeys.includes('free_wifi')) {
          const hasWifi = (hotel.amenities || []).some((a) => /wifi/i.test(a));
          if (!hasWifi) return false;
        }
        if (popularFilterKeys.includes('air_condition')) {
          const hasAc = (hotel.amenities || []).some((a) => /ac|air condition/i.test(a));
          if (!hasAc) return false;
        }
        if (popularFilterKeys.includes('swimming_pool')) {
          const hasPool = (hotel.amenities || []).some((a) => /pool|swimming/i.test(a));
          if (!hasPool) return false;
        }
        if (popularFilterKeys.includes('parking')) {
          const hasParking = (hotel.amenities || []).some((a) => /parking/i.test(a));
          if (!hasParking) return false;
        }
      }

      return true;
    });
  }, [
    hotels,
    searchQuery,
    selectedPriceRanges,
    selectedRatings,
    selectedAmenities,
    selectedCities,
    popularFilterKeys
  ]);

  // Structured SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jagannatha Tour and Travels - Premium Hotel Rooms",
    "itemListElement": displayedHotels.map((hotel, index) => ({
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

          {/* Active Filters / Reset Header */}
          {activeFiltersCount > 0 && (
            <div className="HotelRoom-activeFiltersBox">
              <div className="HotelRoom-activeFiltersInfo">
                <FaFilter className="HotelRoom-filterActiveIcon" />
                <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active</span>
              </div>
              <button
                className="HotelRoom-clearAllBtn"
                onClick={resetAllFilters}
                title="Clear all active filters"
              >
                <FaUndo /> Reset All
              </button>
            </div>
          )}

          {/* Search Box */}
          <div className="HotelRoom-filterCard">
            <h3 className="HotelRoom-filterTitle">Search Destination</h3>
            <div className="HotelRoom-searchBox">
              <input
                type="text"
                placeholder="Hotel, city, or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="HotelRoom-searchInput"
              />
              {searchQuery ? (
                <button
                  className="HotelRoom-searchBtn HotelRoom-searchClearBtn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                  title="Clear search"
                >
                  <FaTimes />
                </button>
              ) : (
                <button className="HotelRoom-searchBtn" aria-label="Search">
                  <FaSearch />
                </button>
              )}
            </div>
          </div>

          {/* Real Popular Filters */}
          {popularFilterOptions.length > 0 && (
            <div className="HotelRoom-filterCard">
              <h3 className="HotelRoom-filterTitle">Popular Filters</h3>
              <ul className="HotelRoom-filterList">
                {popularFilterOptions.map((opt) => (
                  <li key={opt.id}>
                    <label className="HotelRoom-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={popularFilterKeys.includes(opt.id)}
                        onChange={() => togglePopularFilter(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                    <span className="HotelRoom-badge">{opt.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real Price Range Filter */}
          <div className="HotelRoom-filterCard">
            <h3 className="HotelRoom-filterTitle">Price Per Night</h3>
            <ul className="HotelRoom-filterList">
              {PRICE_TIERS.map((tier) => {
                const count = hotels.filter((h) => tier.check(h.rawPrice)).length;
                return (
                  <li key={tier.id}>
                    <label className="HotelRoom-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(tier.id)}
                        onChange={() => togglePriceRange(tier.id)}
                      />
                      <span>{tier.label}</span>
                    </label>
                    <span className="HotelRoom-badge">{count}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Real Star Rating Filter */}
          <div className="HotelRoom-filterCard">
            <h3 className="HotelRoom-filterTitle">Star Rating</h3>
            <ul className="HotelRoom-filterList">
              {RATING_TIERS.map((tier) => {
                const count = hotels.filter((h) => tier.check(h.starRating)).length;
                return (
                  <li key={tier.id}>
                    <label className="HotelRoom-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(tier.id)}
                        onChange={() => toggleRating(tier.id)}
                      />
                      <span className="HotelRoom-ratingFilterLabel">
                        {tier.label}
                        <span className="HotelRoom-starsInline">
                          {Array.from({ length: tier.stars }).map((_, i) => (
                            <FaStar key={i} className="HotelRoom-starYellowMini" />
                          ))}
                        </span>
                      </span>
                    </label>
                    <span className="HotelRoom-badge">{count}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Real Destinations / Cities */}
          {availableCities.length > 0 && (
            <div className="HotelRoom-filterCard">
              <h3 className="HotelRoom-filterTitle">City / Destination</h3>
              <ul className="HotelRoom-filterList">
                {availableCities.map((item) => (
                  <li key={item.label}>
                    <label className="HotelRoom-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(item.label)}
                        onChange={() => toggleCity(item.label)}
                      />
                      <span>{item.label}</span>
                    </label>
                    <span className="HotelRoom-badge">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real Dynamic Amenities Filter */}
          {availableAmenities.length > 0 && (
            <div className="HotelRoom-filterCard">
              <h3 className="HotelRoom-filterTitle">Amenities</h3>
              <ul className="HotelRoom-filterList">
                {availableAmenities.slice(0, 8).map((item) => (
                  <li key={item.label}>
                    <label className="HotelRoom-checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(item.label)}
                        onChange={() => toggleAmenity(item.label)}
                      />
                      <span>{item.label}</span>
                    </label>
                    <span className="HotelRoom-badge">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </aside>

        {/* Main Hotel Cards List */}
        <main className="HotelRoom-main">
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#666", gridColumn: "1 / -1" }}>
              <h3>Loading hotels...</h3>
            </div>
          ) : displayedHotels.length === 0 ? (
            <div className="HotelRoom-emptyState">
              <h3>No hotels match your filters</h3>
              <p>Try adjusting your search query, price range, star rating, or amenities.</p>
              {activeFiltersCount > 0 && (
                <button className="HotelRoom-resetBtnLarge" onClick={resetAllFilters}>
                  <FaUndo /> Reset All Filters
                </button>
              )}
            </div>
          ) : (
            displayedHotels.map((hotel) => {
              const currentImgIndex = activeImageIndexes[hotel.id] || 0;
              const totalImages = hotel.images ? hotel.images.length : 1;
              const currentImage = hotel.images && hotel.images.length > 0
                ? hotel.images[currentImgIndex % totalImages]
                : room1_1;

              const hotelSlug = (hotel.name || "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

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
                    src={currentImage}
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
                    {hotel.images && hotel.images.map((_, dotIndex) => (
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
                    <div className="HotelRoom-stars" aria-label={`${hotel.starRating} star hotel`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar
                          key={s}
                          className={s <= hotel.starRating ? "HotelRoom-starYellow" : "HotelRoom-starEmpty"}
                        />
                      ))}
                    </div>
                    <span className="HotelRoom-reviewText">
                      {hotel.starRating}.0 ({hotel.starRating} Star Hotel)
                    </span>
                  </div>

                  <h2
                    className="HotelRoom-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/hotel/${hotelSlug}`, { state: { hotelId: hotel.id } })}
                  >
                    {hotel.name}
                  </h2>

                  <div className="HotelRoom-locationRow">
                    <FaMapMarkerAlt className="HotelRoom-locationIcon" />
                    <span className="HotelRoom-locationText">{hotel.location}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="HotelRoom-mapLink"
                    >
                      Show on map
                    </a>
                    <span className="HotelRoom-distanceText">{hotel.distance}</span>
                  </div>

                  {/* Dynamic Amenities Row */}
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="HotelRoom-amenitiesRow">
                      {hotel.amenities.map((item, idx) => (
                        <span key={idx} className="HotelRoom-amenity">
                          <FaCheck className="HotelRoom-amenityIcon" /> {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Real Hotel Short Description */}
                  {hotel.shortDesc && (
                    <p className="HotelRoom-shortDesc">
                      {hotel.shortDesc}
                    </p>
                  )}

                  <div className="HotelRoom-footer">
                    <div className="HotelRoom-roomMeta">
                      <p className="HotelRoom-stayInfo">
                        Check-in: <strong>{hotel.checkIn}</strong> | Check-out: <strong>{hotel.checkOut}</strong>
                      </p>
                      {hotel.rooms && (
                        <p className="HotelRoom-roomsCount">
                          <strong>{hotel.rooms}</strong> Total Rooms Available
                        </p>
                      )}
                      <p className="HotelRoom-cancellation">Free cancellation available</p>
                    </div>

                    <div className="HotelRoom-priceAction">
                      <span className="HotelRoom-nightInfo">1 night, 2 adults</span>
                      <div className="HotelRoom-priceRow">
                        <span className="HotelRoom-price">₹{hotel.price}</span>
                        <span className="HotelRoom-originalPrice">₹{hotel.originalPrice}</span>
                      </div>
                      <button
                        className="HotelRoom-availabilityBtn"
                        onClick={() => navigate(`/hotel/${hotelSlug}`, { state: { hotelId: hotel.id } })}
                      >
                        Check Availability <FaArrowRight className="HotelRoom-arrowIcon" />
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })
        )}
      </main>

      </div>
    </section>
  );
};

export default HotelRoom;