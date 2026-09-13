import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, IMG_URL } from '../../api/axios';
import './Experience.css';

// Fallback image assets in case uploaded media is missing
import tour1 from '../../assets/img2.webp';
import tour2 from '../../assets/img3.webp';
import tour3 from '../../assets/bed5.webp';
import tour4 from '../../assets/img4.webp';
import tour5 from '../../assets/bed6.webp';
import tour6 from '../../assets/img7.webp';

import hotel1 from '../../assets/bed1.webp';
import hotel2 from '../../assets/bed2.webp';
import hotel3 from '../../assets/bed3.webp';
import hotel4 from '../../assets/bed5.webp';
import hotel5 from '../../assets/bed6.webp';
import hotel6 from '../../assets/bed5.webp';

// Transport images
import transport1 from '../../assets/destination-card-img1.webp';
import transport2 from '../../assets/destination-card-img2.webp';
import transport3 from '../../assets/destination-card-img3.webp';
import transport4 from '../../assets/destination-card-img4.webp';
import transport5 from '../../assets/destination-card-img5.webp';
import transport6 from '../../assets/destination-card-img3.webp';

const fallbackTourImages = [tour1, tour2, tour3, tour4, tour5, tour6];
const fallbackHotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];

const transportItems = [
  {
    id: 'trans-1',
    distance: '68 km • 1.5 hrs',
    image: transport1,
    title: 'Bhubaneswar to Puri Jagannath Dham Car Rental',
    reviews: '(380 verified reviews)',
    path: '/car-rental/sedan-cars'
  },
  {
    id: 'trans-2',
    distance: '72 km • 2 hrs',
    image: transport2,
    title: 'Bhubaneswar to Konark Sun Temple & Marine Drive Cab',
    reviews: '(295 verified reviews)',
    path: '/car-rental/sedan-cars'
  },
  {
    id: 'trans-3',
    distance: '110 km • 2.5 hrs',
    image: transport3,
    title: 'Bhubaneswar to Chilika Lake (Satapada) Taxi Trip',
    reviews: '(240 verified reviews)',
    path: '/car-rental/suv-cars'
  },
  {
    id: 'trans-4',
    distance: '250 km • 6 hrs',
    image: transport4,
    title: 'Bhubaneswar to Daringbadi Kashmir of Odisha SUV Hire',
    reviews: '(190 verified reviews)',
    path: '/car-rental/suv-cars'
  },
  {
    id: 'trans-5',
    distance: '145 km • 3.5 hrs',
    image: transport5,
    title: 'Bhubaneswar to Ghatagaon Maa Tarini Temple AC Cab',
    reviews: '(310 verified reviews)',
    path: '/car-rental/tempo-travellers'
  },
  {
    id: 'trans-6',
    distance: '160 km • 4 hrs',
    image: transport6,
    title: 'Bhubaneswar to Bhitarkanika National Park Traveller Hire',
    reviews: '(175 verified reviews)',
    path: '/car-rental/urbania-travellers'
  }
];

const Experience = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tour');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Real Database States
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingHotels, setLoadingHotels] = useState(true);

  // Helper for Route Text
  const formatRoute = (tour) => {
    if (tour.route) return tour.route;
    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      const places = tour.itinerary
        .map((item) => (item.title ? item.title.replace(/^Day \d+[:\s-]*/i, '').trim() : ''))
        .filter(Boolean);
      if (places.length > 0) return places.join(' ➔ ');
    }
    if (Array.isArray(tour.tags) && tour.tags.length > 0) {
      return tour.tags.join(' ➔ ');
    }
    return tour.destination ? `${tour.destination.toUpperCase()} ➔ EXPLORE TOUR` : 'BHUBANESWAR ➔ PURI ➔ KONARK';
  };

  // Helper for Tour Image URL
  const getTourImageUrl = (imagePath, idx) => {
    if (!imagePath) return fallbackTourImages[idx % fallbackTourImages.length];
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `${IMG_URL}${imagePath}`;
  };

  // Helper for Hotel Image URL
  const getHotelImageUrl = (images, idx) => {
    if (Array.isArray(images) && images.length > 0) {
      const first = images[0];
      if (first.startsWith('http://') || first.startsWith('https://') || first.startsWith('data:')) {
        return first;
      }
      return `${IMG_URL}${first}`;
    }
    return fallbackHotelImages[idx % fallbackHotelImages.length];
  };

  // Fetch Tours & Hotels from Database API
  useEffect(() => {
    let isMounted = true;

    // 1. Fetch Tours
    const fetchTours = async () => {
      try {
        setLoadingTours(true);
        const res = await API.get('/tours');
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          const transformed = res.data.data.map((tour, idx) => {
            const price = typeof tour.price === 'number'
              ? `₹${tour.price.toLocaleString('en-IN')}`
              : (tour.price ? `₹${tour.price}` : '₹0');

            const oldPrice = tour.discountPrice && Number(tour.discountPrice) > 0
              ? `₹${Number(tour.discountPrice).toLocaleString('en-IN')}`
              : null;

            const locationTag = tour.category
              ? tour.category.toUpperCase()
              : (tour.destination ? `${tour.destination.toUpperCase()} SPECIAL` : 'ODISHA TOUR');

            return {
              id: tour._id || idx + 1,
              slug: tour.slug || tour._id,
              badge: tour.duration || '3 DAYS / 2 NIGHT',
              locationTag: locationTag,
              image: getTourImageUrl(tour.mainImage, idx),
              title: tour.title,
              route: formatRoute(tour),
              price: price,
              oldPrice: oldPrice,
            };
          });

          if (isMounted) {
            setTours(transformed);
          }
        }
      } catch (err) {
        console.error('Error fetching tours in Experience:', err);
      } finally {
        if (isMounted) setLoadingTours(false);
      }
    };

    // 2. Fetch Hotels
    const fetchHotels = async () => {
      try {
        setLoadingHotels(true);
        const res = await API.get('/hotels');
        const data = res.data.data || res.data || [];
        if (Array.isArray(data)) {
          const transformed = data.map((hotel, idx) => {
            let parsedAmenities = [];
            if (hotel.amenities) {
              if (Array.isArray(hotel.amenities)) {
                parsedAmenities = hotel.amenities.map((a) => String(a).trim()).filter(Boolean);
              } else if (typeof hotel.amenities === 'string') {
                parsedAmenities = hotel.amenities.split(',').map((a) => a.trim()).filter(Boolean);
              }
            }

            const hasBreakfast = parsedAmenities.some((a) => /breakfast/i.test(a));
            const ratingNum = Math.max(1, Math.min(5, Number(hotel.starRating) || 5));
            const rawPrice = Number(hotel.price || 0);

            const landmarkClean = (hotel.landmark || '').trim();
            const distanceText = landmarkClean
              ? (/^near/i.test(landmarkClean) ? landmarkClean : `Near ${landmarkClean}`)
              : 'City Center';

            const hotelSlug = (hotel.name || '')
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');

            return {
              id: hotel._id || idx + 1,
              slug: hotelSlug,
              tag: hasBreakfast ? 'Free Breakfast Included' : `${ratingNum} Star Verified Stay`,
              image: getHotelImageUrl(hotel.images, idx),
              rating: `${ratingNum}.0 (${ratingNum} Star Hotel)`,
              title: hotel.name,
              location: `${hotel.city || ''}${hotel.address ? `, ${hotel.address}` : ''}`,
              distance: distanceText,
              amenities: parsedAmenities.slice(0, 4),
              roomType: hotel.rooms ? `${hotel.rooms} Rooms Available` : 'Executive AC Deluxe Room',
              bed: '1 King Bed / Double',
              cancellation: 'Free cancellation available',
              stayDuration: '1 night, 2 guests',
              price: `₹${rawPrice.toLocaleString('en-IN')}`,
              oldPrice: rawPrice > 0 ? `₹${Math.round(rawPrice * 1.15).toLocaleString('en-IN')}` : null,
            };
          });

          if (isMounted) {
            setHotels(transformed);
          }
        }
      } catch (err) {
        console.error('Error fetching hotels in Experience:', err);
      } finally {
        if (isMounted) setLoadingHotels(false);
      }
    };

    fetchTours();
    fetchHotels();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const experienceData = {
    tour: tours,
    hotel: hotels,
    transports: transportItems
  };

  const isLoading = activeTab === 'tour' ? loadingTours : (activeTab === 'hotel' ? loadingHotels : false);
  const currentItems = experienceData[activeTab] || [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < currentItems.length - 1 ? prev + 1 : 0));
  };

  const handleBookTrip = (item) => {
    if (item.slug || item.id) {
      navigate(`/tours/${item.slug || item.id}`);
    } else {
      window.location.href = `tel:9668892441`;
    }
  };

  const handleCheckAvailability = (item) => {
    if (item.slug || item.id) {
      navigate(`/hotel/${item.slug}`, { state: { hotelId: item.id } });
    } else {
      window.location.href = `tel:9556355446`;
    }
  };

  const handleViewTransportDetails = (item) => {
    if (item.path) {
      navigate(item.path);
    } else {
      window.location.href = `tel:9668892441`;
    }
  };

  const displayedItems = isMobile ? [currentItems[currentIndex]].filter(Boolean) : currentItems;

  return (
    <section className="exp-section">
      {/* Main Section Header with SEO H1 */}
      <header className="exp-header">
        <span className="exp-subtitle">➔ Tour Experience ✦</span>
        <h1 className="exp-title">Bhubaneswar Travel Agency Tour Packages</h1>
        <p className="exp-subtext">
          Book reliable Odisha holiday packages, temple darshan cabs, and verified hotel stays with local tour guides from Bhubaneswar.
        </p>

        {/* Tab Controls */}
        <div className="exp-nav">
          <button
            type="button"
            className={`exp-nav-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => handleTabChange('tour')}
          >
            <span className="icon">🗺️</span> Odisha Tour Packages
          </button>
          <button
            type="button"
            className={`exp-nav-btn ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => handleTabChange('hotel')}
          >
            <span className="icon">🏨</span> Verified Hotels
          </button>
          <button
            type="button"
            className={`exp-nav-btn ${activeTab === 'transports' ? 'active' : ''}`}
            onClick={() => handleTabChange('transports')}
          >
            <span className="icon">🚖</span> Car & Taxi Rentals
          </button>
        </div>
      </header>

      {/* Cards Grid */}
      <div className="exp-cards-grid">
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="exp-loading-box">
            <div className="exp-spinner"></div>
            <p className="exp-loading-text">Loading {activeTab === 'tour' ? 'tour packages' : 'hotels'} from database...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && currentItems.length === 0 && (
          <div className="exp-empty-box">
            <p className="exp-empty-text">No {activeTab === 'tour' ? 'tours' : 'hotels'} available in the database right now.</p>
          </div>
        )}

        {/* 1. TOUR PACKAGES (DATABASE DATA) */}
        {!isLoading && activeTab === 'tour' &&
          displayedItems.map((item) => (
            <article 
              className="card" 
              key={item.id}
              onClick={() => handleBookTrip(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" loading="lazy" />
                <div className="shine-effect"></div>
                <div className="badge-duration">{item.badge}</div>
                <div className="badge-location">📍 {item.locationTag}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title" title={item.title}>{item.title}</h3>
                <p className="card-route" title={item.route}>{item.route}</p>
                <hr className="divider" />
                <div className="card-footer">
                  <div className="price-box">
                    <span className="price-label">Package Starts From:</span>
                    <div className="price-values">
                      <span className="price-current">{item.price}</span>
                      {item.oldPrice && <span className="price-old">{item.oldPrice}</span>}
                    </div>
                    <span className="price-sub">PER PERSON / NET FARE</span>
                  </div>
                  <button 
                    type="button"
                    className="green-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookTrip(item);
                    }}
                  >
                    Book Trip ✈
                  </button>
                </div>
              </div>
            </article>
          ))}

        {/* 2. HOTELS (DATABASE DATA) */}
        {!isLoading && activeTab === 'hotel' &&
          displayedItems.map((item) => (
            <article 
              className="card hotel-card" 
              key={item.id}
              onClick={() => handleCheckAvailability(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" loading="lazy" />
                <div className="shine-effect"></div>
                <div className="badge-breakfast">{item.tag}</div>
                <div className="dots-indicator">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>

              <div className="card-content">
                <div className="rating-row">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">{item.rating}</span>
                </div>

                <h3 className="card-title" title={item.title}>{item.title}</h3>
                <div className="hotel-location">
                  <span>📍 {item.location}</span>
                  <span className="distance">• {item.distance}</span>
                </div>

                <div className="amenities-row">
                  {item.amenities && item.amenities.map((amenity, idx) => (
                    <span key={idx} className="amenity-item">✔ {amenity}</span>
                  ))}
                </div>

                <div className="hotel-footer-details">
                  <div className="room-info">
                    <p className="room-name">{item.roomType}</p>
                    <p className="room-bed">{item.bed}</p>
                    <p className="cancellation">{item.cancellation}</p>
                  </div>
                  <div className="hotel-pricing">
                    <span className="stay-duration">{item.stayDuration}</span>
                    <div className="price-values">
                      <span className="price-current">{item.price}</span>
                      {item.oldPrice && <span className="price-old">{item.oldPrice}</span>}
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  className="green-btn full-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckAvailability(item);
                  }}
                >
                  View Details & Book ➔
                </button>
              </div>
            </article>
          ))}

        {/* 3. TRANSPORTS */}
        {!isLoading && activeTab === 'transports' &&
          displayedItems.map((item) => (
            <article 
              className="card transport-card" 
              key={item.id}
              onClick={() => handleViewTransportDetails(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" loading="lazy" />
                <div className="shine-effect"></div>
                <div className="badge-distance">{item.distance}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <span className="available-label">Available Vehicles with Driver:</span>

                <div className="transport-icons-grid">
                  <div className="t-icon-box">🚗 <span>Sedan</span></div>
                  <div className="t-icon-box">🚙 <span>Innova/SUV</span></div>
                  <div className="t-icon-box">🚐 <span>Tempo</span></div>
                  <div className="t-icon-box">🚌 <span>Coach</span></div>
                </div>

                <div className="transport-footer">
                  <button 
                    type="button"
                    className="green-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewTransportDetails(item);
                    }}
                  >
                    Get Cab Quote
                  </button>
                  <div className="t-reviews">
                    <span className="stars">★★★★★</span>
                    <span className="review-num">{item.reviews}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>

      {/* Mobile Slider Controls */}
      {!isLoading && isMobile && currentItems.length > 1 && (
        <div className="mobile-slider-controls">
          <button 
            type="button"
            className="slider-arrow-btn" 
            onClick={handlePrev} 
            aria-label="Previous card"
          >
            ←
          </button>

          <div className="slider-indicator-dots">
            {currentItems.map((_, idx) => (
              <span
                key={idx}
                className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>

          <button 
            type="button"
            className="slider-arrow-btn" 
            onClick={handleNext} 
            aria-label="Next card"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default Experience;