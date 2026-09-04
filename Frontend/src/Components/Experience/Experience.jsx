import React, { useState } from 'react';
import './Experience.css';

// ==========================================
// 1. TOUR PACKAGE IMAGES (Total 6 Images)
// ==========================================
import tour1 from '../../assets/img2.webp';
import tour2 from '../../assets/img3.webp';
import tour3 from '../../assets/bed5.webp';
import tour4 from '../../assets/img4.webp';
import tour5 from '../../assets/bed6.webp';
import tour6 from '../../assets/img7.webp';

// ==========================================
// 2. HOTEL IMAGES (Total 6 Images)
// ==========================================
import hotel1 from '../../assets/bed1.webp';
import hotel2 from '../../assets/bed2.webp';
import hotel3 from '../../assets/bed3.webp';
import hotel4 from '../../assets/bed5.webp';
import hotel5 from '../../assets/bed6.webp';
import hotel6 from '../../assets/bed5.webp';

// ==========================================
// 3. TRANSPORTS IMAGES (Total 6 Images)
// ==========================================
import transport1 from '../../assets/destination-card-img1.webp';
import transport2 from '../../assets/destination-card-img2.webp';
import transport3 from '../../assets/destination-card-img3.webp';
import transport4 from '../../assets/destination-card-img4.webp';
import transport5 from '../../assets/destination-card-img5.webp';
import transport6 from '../../assets/destination-card-img3.webp';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('tour');

  const experienceData = {
    // 6 Tour Packages (3 Main + 3 Extra Below)
    tour: [
      {
        id: 1,
        badge: '3 DAYS / 4 NIGHT',
        locationTag: 'NEPAL + INDONESIA TOUR',
        image: tour1,
        title: "The Allure Italy's Rich Culture, History, And Cuisine.",
        route: 'ALEXANDRIA ➔ SHARM EL SHEIKH ➔ MANSOURA ➔ K',
        price: '₹2,39,999',
        oldPrice: '₹2,49,999'
      },
      {
        id: 2,
        badge: '7 DAYS / 8 NIGHT',
        locationTag: 'EGYPT + TURKEY TOUR',
        image: tour2,
        title: "Explore Travel NYC's Museums, Diversity, And Energy.",
        route: 'MECCA ➔ MEDINA ➔ RIYADH ➔ DOHA ➔ AL WAKRA',
        price: '₹2,69,999',
        oldPrice: ''
      },
      {
        id: 3,
        badge: '5 DAYS / 6 NIGHT',
        locationTag: 'FRANCE + SPAIN TOUR',
        image: tour3,
        title: 'Embark Tranquility, Adventure, And Spiritual.',
        route: 'ALEXANDRIA ➔ SHARM EL SHEIKH ➔ MANSOURA ➔ K',
        price: '₹1,64,999',
        oldPrice: '₹2,09,999'
      },
      {
        id: 4,
        badge: '6 DAYS / 7 NIGHT',
        locationTag: 'SWISS ALPS TOUR',
        image: tour4,
        title: 'Spectacular Scenic Train Journeys Across Switzerland.',
        route: 'ZURICH ➔ INTERLAKEN ➔ ZERMATT ➔ GENEVA',
        price: '₹2,89,999',
        oldPrice: '₹3,15,000'
      },
      {
        id: 5,
        badge: '4 DAYS / 5 NIGHT',
        locationTag: 'BALI PARADISE TOUR',
        image: tour5,
        title: 'Tropical Beaches, Temples, And Sacred Monkey Forests.',
        route: 'UBUD ➔ KUTA ➔ SEMINYAK ➔ NUSA PENIDA',
        price: '₹1,45,000',
        oldPrice: '₹1,60,000'
      },
      {
        id: 6,
        badge: '5 DAYS / 6 NIGHT',
        locationTag: 'GREEK ISLAND TOUR',
        image: tour6,
        title: 'Iconic Sunsets And Whitewashed Villas In Santorini.',
        route: 'ATHENS ➔ MYKONOS ➔ SANTORINI ➔ CRETE',
        price: '₹2,10,000',
        oldPrice: '₹2,35,000'
      }
    ],

    // 6 Hotels (3 Main + 3 Extra Below)
    hotel: [
      {
        id: 1,
        tag: 'Breakfast Included',
        image: hotel1,
        rating: '4.5 reviews',
        title: 'Golden Tulip The Grandmark Dhaka',
        location: 'Dhaka, Bangladesh',
        distance: '2 km to city center',
        amenities: ['Locker', 'Gym', 'Spa', 'Parking', 'Restaurant'],
        roomType: 'Deluxe King Room',
        bed: '1 king bed',
        cancellation: 'Free cancellation before 48 hours',
        stayDuration: '1 night, 2 adults',
        price: '₹23,999',
        oldPrice: '₹25,000'
      },
      {
        id: 2,
        tag: 'Breakfast Included',
        image: hotel2,
        rating: '4.5 reviews',
        title: "Castle Bay Touch Cox's Bazar",
        location: "Cox's Bazar, Bangladesh",
        distance: '2 km to city center',
        amenities: ['Locker', 'Gym', 'Spa', 'Parking', 'Restaurant'],
        roomType: 'Deluxe King Room',
        bed: '1 king bed',
        cancellation: 'Free cancellation before 48 hours',
        stayDuration: '1 night, 2 adults',
        price: '₹23,999',
        oldPrice: '₹25,000'
      },
      {
        id: 3,
        tag: 'Breakfast Included',
        image: hotel3,
        rating: '4.5 reviews',
        title: 'Hotel Windy Terrace',
        location: 'Dhaka, Bangladesh',
        distance: '2 km to city center',
        amenities: ['Locker', 'Gym', 'Spa', 'Parking', 'Restaurant'],
        roomType: 'Deluxe King Room',
        bed: '1 king bed',
        cancellation: 'Free cancellation before 48 hours',
        stayDuration: '1 night, 2 adults',
        price: '₹23,999',
        oldPrice: '₹25,000'
      },
      {
        id: 4,
        tag: 'Breakfast Included',
        image: hotel4,
        rating: '4.8 reviews',
        title: 'Radisson Blu Water Garden',
        location: 'Airport Road, Dhaka',
        distance: '4 km to city center',
        amenities: ['Pool', 'Gym', 'Spa', 'Valet Parking', 'Bar'],
        roomType: 'Executive Suite',
        bed: '1 super king bed',
        cancellation: 'Free cancellation before 24 hours',
        stayDuration: '1 night, 2 adults',
        price: '₹28,500',
        oldPrice: '₹32,000'
      },
      {
        id: 5,
        tag: 'Breakfast Included',
        image: hotel5,
        rating: '4.7 reviews',
        title: 'JW Marriott Luxury Resort',
        location: 'Gulshan 2, Dhaka',
        distance: '1.5 km to city center',
        amenities: ['Infinity Pool', 'Gym', 'Sauna', 'Airport Pickup'],
        roomType: 'Luxury Ocean View',
        bed: '2 queen beds',
        cancellation: 'Non-refundable discount applied',
        stayDuration: '1 night, 2 adults',
        price: '₹34,000',
        oldPrice: '₹39,000'
      },
      {
        id: 6,
        tag: 'Breakfast Included',
        image: hotel6,
        rating: '4.6 reviews',
        title: 'Hilton Garden Inn Suites',
        location: 'Banani Central, Dhaka',
        distance: '3 km to city center',
        amenities: ['Locker', 'Gym', 'Free WiFi', 'Restaurant'],
        roomType: 'Deluxe Twin Room',
        bed: '2 twin beds',
        cancellation: 'Free cancellation before 48 hours',
        stayDuration: '1 night, 2 adults',
        price: '₹21,000',
        oldPrice: '₹24,500'
      }
    ],

    // 6 Transports (3 Main + 3 Extra Below)
    transports: [
      {
        id: 1,
        distance: '250km',
        image: transport1,
        title: 'Travel To Sajek From Dhaka.',
        reviews: '(214 reviews)'
      },
      {
        id: 2,
        distance: '5.6km',
        image: transport2,
        title: 'Travel To Eiffel Tower From Paris.',
        reviews: '(214 reviews)'
      },
      {
        id: 3,
        distance: '250km',
        image: transport3,
        title: 'Travel To Kashmir From Delhi.',
        reviews: '(214 reviews)'
      },
      {
        id: 4,
        distance: '540km',
        image: transport4,
        title: 'Travel To Manali From Chandigarh.',
        reviews: '(189 reviews)'
      },
      {
        id: 5,
        distance: '410km',
        image: transport5,
        title: 'Travel To North Goa From Mumbai.',
        reviews: '(340 reviews)'
      },
      {
        id: 6,
        distance: '480km',
        image: transport6,
        title: 'Travel To Ladakh From Manali.',
        reviews: '(512 reviews)'
      }
    ]
  };

  return (
    <section className="exp-section">
      <div className="exp-header">
        <span className="exp-subtitle">➔ Tour Experience ✦</span>
        <h2 className="exp-title">Ultimate Travel Experience</h2>

        {/* Tab Controls */}
        <div className="exp-nav">
          <button
            className={`exp-nav-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            <span className="icon">🗺️</span> Tour Package
          </button>
          <button
            className={`exp-nav-btn ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            <span className="icon">🏨</span> Hotel
          </button>
          <button
            className={`exp-nav-btn ${activeTab === 'transports' ? 'active' : ''}`}
            onClick={() => setActiveTab('transports')}
          >
            <span className="icon">🚐</span> Transports
          </button>
        </div>
      </div>

      {/* Grid Display (3 cards top row, 3 cards extra bottom row) */}
      <div className="exp-cards-grid">
        {/* TOUR PACKAGE CARDS */}
        {activeTab === 'tour' &&
          experienceData.tour.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" />
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
                    <span className="price-label">Starting From:</span>
                    <div className="price-values">
                      <span className="price-current">{item.price}</span>
                      {item.oldPrice && <span className="price-old">{item.oldPrice}</span>}
                    </div>
                    <span className="price-sub">TAXES INCL/PERS</span>
                  </div>
                  <button className="green-btn">Book A Trip ✈</button>
                </div>
              </div>
            </div>
          ))}

        {/* HOTEL CARDS */}
        {activeTab === 'hotel' &&
          experienceData.hotel.map((item) => (
            <div className="card hotel-card" key={item.id}>
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" />
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
                  <a href="#map" className="map-link">Show on map</a>
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

                <button className="green-btn full-btn">Check Availability ➔</button>
              </div>
            </div>
          ))}

        {/* TRANSPORTS CARDS */}
        {activeTab === 'transports' &&
          experienceData.transports.map((item) => (
            <div className="card transport-card" key={item.id}>
              <div className="card-img-container">
                <img src={item.image} alt={item.title} className="card-img" />
                <div className="shine-effect"></div>
                <div className="badge-distance">{item.distance}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <span className="available-label">Available Transport:</span>

                <div className="transport-icons-grid">
                  <div className="t-icon-box">🚗 <span>Car</span></div>
                  <div className="t-icon-box">🚆 <span>Train</span></div>
                  <div className="t-icon-box">🛥️ <span>Boat</span></div>
                  <div className="t-icon-box">🚌 <span>Bus</span></div>
                </div>

                <div className="transport-footer">
                  <button className="green-btn">View Details</button>
                  <div className="t-reviews">
                    <span className="stars">★★★★★</span>
                    <span className="review-num">{item.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Experience;