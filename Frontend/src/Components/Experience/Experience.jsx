import React, { useState, useEffect } from 'react';
import './Experience.css';

// 1. TOUR PACKAGE IMAGES
import tour1 from '../../assets/img2.webp';
import tour2 from '../../assets/img3.webp';
import tour3 from '../../assets/bed5.webp';
import tour4 from '../../assets/img4.webp';
import tour5 from '../../assets/bed6.webp';
import tour6 from '../../assets/img7.webp';

// 2. HOTEL IMAGES
import hotel1 from '../../assets/bed1.webp';
import hotel2 from '../../assets/bed2.webp';
import hotel3 from '../../assets/bed3.webp';
import hotel4 from '../../assets/bed5.webp';
import hotel5 from '../../assets/bed6.webp';
import hotel6 from '../../assets/bed5.webp';

// 3. TRANSPORTS IMAGES
import transport1 from '../../assets/destination-card-img1.webp';
import transport2 from '../../assets/destination-card-img2.webp';
import transport3 from '../../assets/destination-card-img3.webp';
import transport4 from '../../assets/destination-card-img4.webp';
import transport5 from '../../assets/destination-card-img5.webp';
import transport6 from '../../assets/destination-card-img3.webp';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('tour');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const experienceData = {
    tour: [
      {
        id: 1,
        badge: '3 DAYS / 2 NIGHT',
        locationTag: 'GOLDEN TRIANGLE ODISHA',
        image: tour1,
        title: 'Bhubaneswar, Puri Jagannath Dham & Konark Sun Temple Heritage Tour',
        route: 'BHUBANESWAR ➔ PURI ➔ KONARK ➔ PIPILI ➔ DHAULI',
        price: '₹7,499',
        oldPrice: '₹9,500'
      },
      {
        id: 2,
        badge: '4 DAYS / 3 NIGHT',
        locationTag: 'CHILIKA LAKE SPECIAL',
        image: tour2,
        title: 'Chilika Dolphin Sanctuary, Satapada & Mangalajodi Bird Watching',
        route: 'BHUBANESWAR ➔ SATAPADA ➔ BARKUL ➔ MANGALAJODI',
        price: '₹10,999',
        oldPrice: '₹13,500'
      },
      {
        id: 3,
        badge: '5 DAYS / 4 NIGHT',
        locationTag: 'TRIBAL & HILL EXPEDITION',
        image: tour3,
        title: 'Scenic Koraput Hills, Daringbadi Valley & Deomali Peak Expedition',
        route: 'BHUBANESWAR ➔ DARINGBADI ➔ RAYAGADA ➔ KORAPUT',
        price: '₹14,499',
        oldPrice: '₹17,000'
      },
      {
        id: 4,
        badge: '3 DAYS / 2 NIGHT',
        locationTag: 'WILDLIFE SAFARI',
        image: tour4,
        title: 'Bhitarkanika Mangrove Safari & Simlipal Tiger Reserve Tour',
        route: 'BHUBANESWAR ➔ CHANDBALI ➔ BHITARKANIKA ➔ SIMLIPAL',
        price: '₹8,999',
        oldPrice: '₹11,000'
      },
      {
        id: 5,
        badge: '2 DAYS / 1 NIGHT',
        locationTag: 'NORTH ODISHA PILGRIMAGE',
        image: tour5,
        title: 'Ghatagaon Maa Tarini Temple & Keonjhar Khandadhar Waterfalls',
        route: 'BHUBANESWAR ➔ GHATAGAON ➔ KEONJHAR ➔ KHANADHAT',
        price: '₹5,200',
        oldPrice: '₹6,500'
      },
      {
        id: 6,
        badge: '2 DAYS / 1 NIGHT',
        locationTag: 'TEMPLE CITY SPECIAL',
        image: tour6,
        title: 'Ekamra Kshetra Divine Tour: Lingaraj, Rajarani & Mukteshwar',
        route: 'LINGARAJ ➔ RAJARANI ➔ MUKTESHWAR ➔ KHANDAGIRI',
        price: '₹3,499',
        oldPrice: '₹4,500'
      }
    ],
    hotel: [
      {
        id: 1,
        tag: 'Free Breakfast Included',
        image: hotel1,
        rating: '4.8 (184 reviews)',
        title: 'Mayfair Lagoon Resort & Convention',
        location: 'Jaydev Vihar, Bhubaneswar',
        distance: '4.5 km from Railway Station',
        amenities: ['Free WiFi', 'Swimming Pool', 'Multi-Cuisine Dine', 'Spa', 'Parking'],
        roomType: 'Club Executive Room',
        bed: '1 King Bed',
        cancellation: 'Free cancellation up to 24 hrs',
        stayDuration: '1 night, 2 guests',
        price: '₹6,499',
        oldPrice: '₹7,800'
      },
      {
        id: 2,
        tag: 'Pilgrim Friendly',
        image: hotel2,
        rating: '4.6 (220 reviews)',
        title: 'Swosti Premium Luxury Stay',
        location: 'Nandankanan Road, Bhubaneswar',
        distance: '2.5 km to City Center',
        amenities: ['Gym & Spa', 'Airport Shuttle', 'Restaurant', 'Free Parking'],
        roomType: 'Premium Deluxe Double',
        bed: '1 King Bed / Twin',
        cancellation: 'Free cancellation available',
        stayDuration: '1 night, 2 guests',
        price: '₹4,899',
        oldPrice: '₹5,900'
      },
      {
        id: 3,
        tag: 'Sea Facing Resort',
        image: hotel3,
        rating: '4.7 (310 reviews)',
        title: 'Mayfair Heritage Puri Beach Resort',
        location: 'Chakratirtha Road, Puri',
        distance: '1.2 km from Lord Jagannath Temple',
        amenities: ['Beach Access', 'Free Breakfast', 'Pool', 'Kids Play Area'],
        roomType: 'Deluxe Sea View Cottage',
        bed: '1 Large Double Bed',
        cancellation: 'Free cancellation up to 48 hrs',
        stayDuration: '1 night, 2 guests',
        price: '₹7,200',
        oldPrice: '₹8,900'
      },
      {
        id: 4,
        tag: 'Hill View Eco Stay',
        image: hotel4,
        rating: '4.5 (95 reviews)',
        title: 'Daringbadi Nature Valley Retreat',
        location: 'Hill Top Road, Daringbadi',
        distance: '0.8 km from Coffee Garden',
        amenities: ['Campfire', 'Organic Meals', 'Guided Trek', 'Hot Water'],
        roomType: 'Pine View Wooden Cottage',
        bed: '1 Queen Bed',
        cancellation: 'Free cancellation before 3 days',
        stayDuration: '1 night, 2 guests',
        price: '₹3,200',
        oldPrice: '₹3,900'
      },
      {
        id: 5,
        tag: 'Lake View Stay',
        image: hotel5,
        rating: '4.5 (140 reviews)',
        title: 'OTDC Panthanivas Rambha Chilika',
        location: 'Rambha Bay, Chilika',
        distance: 'Overlooking Lagoon',
        amenities: ['Boating Desk', 'Odisha Thali Dining', 'Garden', 'WiFi'],
        roomType: 'AC Deluxe Lagoon View',
        bed: '1 Double Bed',
        cancellation: 'Flexible booking policy',
        stayDuration: '1 night, 2 guests',
        price: '₹2,650',
        oldPrice: '₹3,200'
      },
      {
        id: 6,
        tag: 'Business & Transit',
        image: hotel6,
        rating: '4.4 (160 reviews)',
        title: 'Ginger Hotel Inner City',
        location: 'Opposite Nalco Square, Bhubaneswar',
        distance: '6 km from BBI Airport',
        amenities: ['Fitness Center', 'Conference Hall', 'Fast WiFi', 'Cafeteria'],
        roomType: 'Standard Smart Room',
        bed: '1 Queen Bed',
        cancellation: 'Free cancellation before 24 hrs',
        stayDuration: '1 night, 2 guests',
        price: '₹2,999',
        oldPrice: '₹3,600'
      }
    ],
    transports: [
      {
        id: 1,
        distance: '68 km • 1.5 hrs',
        image: transport1,
        title: 'Bhubaneswar to Puri Jagannath Dham Car Rental',
        reviews: '(380 verified reviews)'
      },
      {
        id: 2,
        distance: '72 km • 2 hrs',
        image: transport2,
        title: 'Bhubaneswar to Konark Sun Temple & Marine Drive Cab',
        reviews: '(295 verified reviews)'
      },
      {
        id: 3,
        distance: '110 km • 2.5 hrs',
        image: transport3,
        title: 'Bhubaneswar to Chilika Lake (Satapada) Taxi Trip',
        reviews: '(240 verified reviews)'
      },
      {
        id: 4,
        distance: '250 km • 6 hrs',
        image: transport4,
        title: 'Bhubaneswar to Daringbadi Kashmir of Odisha SUV Hire',
        reviews: '(190 verified reviews)'
      },
      {
        id: 5,
        distance: '145 km • 3.5 hrs',
        image: transport5,
        title: 'Bhubaneswar to Ghatagaon Maa Tarini Temple AC Cab',
        reviews: '(310 verified reviews)'
      },
      {
        id: 6,
        distance: '160 km • 4 hrs',
        image: transport6,
        title: 'Bhubaneswar to Bhitarkanika National Park Traveller Hire',
        reviews: '(175 verified reviews)'
      }
    ]
  };

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
    window.location.href = `tel:9668892441`;
  };

  const handleCheckAvailability = (item) => {
    window.location.href = `tel:9556355446`;
  };

  const handleViewTransportDetails = (item) => {
    window.location.href = `tel:9668892441`;
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
        {/* 1. TOUR PACKAGES */}
        {activeTab === 'tour' &&
          displayedItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" loading="lazy" />
                <div className="shine-effect"></div>
                <div className="badge-duration">{item.badge}</div>
                <div className="badge-location">📍 {item.locationTag}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-route">{item.route}</p>
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
                    onClick={() => handleBookTrip(item)}
                  >
                    Call To Book ✈
                  </button>
                </div>
              </div>
            </article>
          ))}

        {/* 2. HOTELS */}
        {activeTab === 'hotel' &&
          displayedItems.map((item) => (
            <article className="card hotel-card" key={item.id}>
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

                <h3 className="card-title">{item.title}</h3>
                <div className="hotel-location">
                  <span>📍 {item.location}</span>
                  <span className="distance">• {item.distance}</span>
                </div>

                <div className="amenities-row">
                  {item.amenities.map((amenity, idx) => (
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
                  onClick={() => handleCheckAvailability(item)}
                >
                  Enquire Hotel Rates ➔
                </button>
              </div>
            </article>
          ))}

        {/* 3. TRANSPORTS */}
        {activeTab === 'transports' &&
          displayedItems.map((item) => (
            <article className="card transport-card" key={item.id}>
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
                    onClick={() => handleViewTransportDetails(item)}
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
      {isMobile && currentItems.length > 1 && (
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