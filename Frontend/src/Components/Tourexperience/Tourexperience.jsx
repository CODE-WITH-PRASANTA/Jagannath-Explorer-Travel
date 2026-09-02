import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPlane, 
  FaHotel, 
  FaBus, 
  FaCar, 
  FaTrain, 
  FaShip, 
  FaStar, 
  FaDumbbell, 
  FaSpa, 
  FaParking, 
  FaUtensils, 
  FaLock, 
  FaArrowRight 
} from 'react-icons/fa';
import './Tourexperience.css';

const TourExperience = () => {
  const [activeTab, setActiveTab] = useState('tour');

  // 1. TOUR PACKAGES
  const tourPackages = [
    {
      id: 1,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      title: "The Allure Italy's Rich Culture, History, And Cuisine.",
      route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
      price: '$2,898',
      oldPrice: '$3000',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      duration: '7 DAYS / 8 NIGHT',
      tag: 'EGYPT + TURKEY TOUR',
      title: "Explore Travel NYC's Museums, Diversity, And Energy.",
      route: 'MECCA → MEDINA → RIYADH → DOHA → AL WAKRA',
      price: '$3,256',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      duration: '5 DAYS / 6 NIGHT',
      tag: 'FRANCE + SPAIN TOUR',
      title: 'Embark Tranquility, Adventure, And Spiritual.',
      route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
      price: '$1,988',
      oldPrice: '$2500',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      duration: '8 DAYS / 9 NIGHT',
      tag: 'INDIA + JAPAN TOUR',
      title: 'Embracing City Lights, Landm, And Iconic Culture.',
      route: 'BANGALORE → CHENNAI → NEW DELHI → DHAKA →',
      price: '$3,798',
      oldPrice: '',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      duration: '6 DAYS / 7 NIGHT',
      tag: 'BRAZIL + HUNGARY TOUR',
      title: 'A Journey Of Tour Beauty And Inspiration.',
      route: 'PARIS → MARSEILLE → BORDEAUX → MADRID → B',
      price: '$4,562',
      oldPrice: '$5,000',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      duration: '4 DAYS / 5 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      title: 'Adventure Art, Architecture, And Mediterranean.',
      route: 'KATHMANDU → POKHARA → LALITPUR → JAKARTA →',
      price: '$5,320',
      oldPrice: '$5,500',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // 2. HOTELS
  const hotels = [
    {
      id: 1,
      name: 'Golden Tulip The Grandmark Dhaka',
      location: 'Dhaka, Bangladesh',
      distance: '2 km to city center',
      rating: '4.5',
      reviews: 'reviews',
      roomType: 'Deluxe King Room',
      bed: '1 king bed',
      badge: 'Breakfast Included',
      price: '$2,898',
      oldPrice: '$3000',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: "Castle Bay Touch Cox's Bazar",
      location: "Cox's Bazar, Bangladesh",
      distance: '2 km to city center',
      rating: '4.5',
      reviews: 'reviews',
      roomType: 'Deluxe King Room',
      bed: '1 king bed',
      badge: 'Breakfast Included',
      price: '$2,898',
      oldPrice: '$3000',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Hotel Windy Terrace',
      location: 'Dhaka, Bangladesh',
      distance: '2 km to city center',
      rating: '4.5',
      reviews: 'reviews',
      roomType: 'Deluxe King Room',
      bed: '1 king bed',
      badge: '',
      price: '$2,898',
      oldPrice: '$3000',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Ocean View Resort & Suites',
      location: 'Puri, Odisha',
      distance: '0.5 km to beach',
      rating: '4.8',
      reviews: 'reviews',
      roomType: 'Super Deluxe Suite',
      bed: '2 Queen beds',
      badge: 'Breakfast Included',
      price: '$3,150',
      oldPrice: '$3500',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Mayfair Heritage Lagoon',
      location: 'Bhubaneswar, Odisha',
      distance: '3 km to city center',
      rating: '4.9',
      reviews: 'reviews',
      roomType: 'Luxury Villa Room',
      bed: '1 King bed',
      badge: 'Breakfast Included',
      price: '$4,200',
      oldPrice: '$4800',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Grand Royal Palace Inn',
      location: 'Cuttack, Odisha',
      distance: '1.5 km to Fort',
      rating: '4.6',
      reviews: 'reviews',
      roomType: 'Executive King Room',
      bed: '1 King bed',
      badge: '',
      price: '$2,450',
      oldPrice: '$2800',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // 3. TRANSPORTS
  const transports = [
    {
      id: 1,
      distance: '250km',
      title: 'Travel To Sajek From Dhaka.',
      reviews: '(214 reviewes)',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      distance: '5.6km',
      title: 'Travel To Eiffel Tower From Paris.',
      reviews: '(214 reviewes)',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      distance: '250km',
      title: 'Travel To Kashmir From Delhi.',
      reviews: '(214 reviewes)',
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      distance: '65km',
      title: 'Travel To Puri Beach From Bhubaneswar.',
      reviews: '(310 reviewes)',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      distance: '280km',
      title: 'Travel To Daringbadi Hills From Cuttack.',
      reviews: '(180 reviewes)',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      distance: '320km',
      title: 'Travel To Simlipal Forest From Rourkela.',
      reviews: '(145 reviewes)',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section className="tour-experience-section">
      <div className="tour-experience-container">
        
        {/* Header */}
        <div className="te-header">
          <div className="te-badge">
            <span className="te-badge-arrow">→</span>
            <span className="te-badge-text">Tour Experience</span>
            <span className="te-badge-wave">~</span>
          </div>
          <h2 className="te-main-title">Ultimate Travel Experience</h2>
        </div>

        {/* Tab Buttons */}
        <div className="te-tab-navigation">
          <button 
            type="button"
            className={`te-tab-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            <FaMapMarkerAlt className="tab-icon" />
            <span>Tour Package</span>
          </button>

          <button 
            type="button"
            className={`te-tab-btn ${activeTab === 'hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            <FaHotel className="tab-icon" />
            <span>Hotel</span>
          </button>

          <button 
            type="button"
            className={`te-tab-btn ${activeTab === 'transports' ? 'active' : ''}`}
            onClick={() => setActiveTab('transports')}
          >
            <FaBus className="tab-icon" />
            <span>Transports</span>
          </button>
        </div>

        {/* 6-Card Grid */}
        <div className="te-cards-grid">
          
          {/* TAB 1: TOUR PACKAGES */}
          {activeTab === 'tour' && tourPackages.map((item) => (
            <div key={item.id} className="te-card">
              <div className="te-card-img-wrap">
                <img src={item.image} alt={item.title} className="te-card-img" />
                <span className="duration-tag">{item.duration}</span>
                <div className="package-tag">
                  <FaMapMarkerAlt className="tag-pin" />
                  <span>{item.tag}</span>
                </div>
              </div>

              <div className="te-card-body">
                <h3 className="card-tour-title">{item.title}</h3>
                <p className="card-tour-route">{item.route}</p>
                <hr className="card-divider" />
                
                <div className="card-footer-row">
                  <div className="price-box">
                    <span className="starting-label">Starting Form:</span>
                    <div className="price-values">
                      <span className="curr-price">{item.price}</span>
                      {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                    </div>
                    <span className="tax-label">TAXES INCL/PERS</span>
                  </div>

                  <button type="button" className="btn-book-action">
                    Book A Trip <FaPlane className="btn-plane-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* TAB 2: HOTELS */}
          {activeTab === 'hotel' && hotels.map((item) => (
            <div key={item.id} className="te-card">
              <div className="te-card-img-wrap">
                <img src={item.image} alt={item.name} className="te-card-img" />
                {item.badge && <span className="hotel-badge">{item.badge}</span>}
                <div className="image-dots-preview">
                  <span className="img-dot active"></span>
                  <span className="img-dot"></span>
                  <span className="img-dot"></span>
                </div>
              </div>

              <div className="te-card-body">
                <div className="star-rating-row">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="rating-text">{item.rating} {item.reviews}</span>
                </div>

                <h3 className="hotel-title">{item.name}</h3>

                <div className="hotel-location-row">
                  <FaMapMarkerAlt className="loc-icon" />
                  <span>{item.location}</span>
                  <a href="#map" className="show-map-link">Show on map</a>
                  <span className="dist-text">{item.distance}</span>
                </div>

                <div className="hotel-amenities">
                  <span><FaLock /> Locker</span>
                  <span><FaDumbbell /> Gym</span>
                  <span><FaSpa /> Spa</span>
                  <span><FaParking /> Parking</span>
                  <span><FaUtensils /> Restaurant</span>
                </div>

                <hr className="card-divider" />

                <div className="card-footer-row hotel-footer">
                  <div className="room-details-box">
                    <span className="room-type">{item.roomType}</span>
                    <span className="bed-info">{item.bed}</span>
                    <span className="cancellation-free">Free cancellation<br /><small>before 48 hours</small></span>
                  </div>

                  <div className="hotel-price-btn-box">
                    <span className="person-duration">1 night, 2 adults</span>
                    <div className="price-values">
                      <span className="curr-price">{item.price}</span>
                      {item.oldPrice && <span className="old-price">{item.oldPrice}</span>}
                    </div>
                    <button type="button" className="btn-book-action">
                      Check Availability <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* TAB 3: TRANSPORTS */}
          {activeTab === 'transports' && transports.map((item) => (
            <div key={item.id} className="te-card">
              <div className="te-card-img-wrap">
                <img src={item.image} alt={item.title} className="te-card-img" />
                <span className="distance-badge">{item.distance}</span>
              </div>

              <div className="te-card-body">
                <h3 className="transport-title">{item.title}</h3>
                <span className="avail-label">Available Transport:</span>

                <div className="transport-modes-grid">
                  <div className="transport-item"><FaCar /><span>Car</span></div>
                  <div className="transport-item"><FaTrain /><span>Train</span></div>
                  <div className="transport-item"><FaShip /><span>Boat</span></div>
                  <div className="transport-item"><FaBus /><span>Bus</span></div>
                </div>

                <div className="transport-footer-row">
                  <button type="button" className="btn-view-details">
                    View Details
                  </button>

                  <div className="trans-rating-box">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="rating-sub">{item.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TourExperience;