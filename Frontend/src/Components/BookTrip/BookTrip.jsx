import React, { useState, useRef, useEffect } from 'react';
import './BookTrip.css';

// React Icons
import { 
  FaMapMarkerAlt, 
  FaSuitcase, 
  FaUserFriends, 
  FaChevronDown, 
  FaPaperPlane 
} from 'react-icons/fa';

// WebP image imports from src/assets/
import trip1 from '../../assets/img1.webp';
import trip2 from '../../assets/img2.webp';
import trip3 from '../../assets/img3.webp';
import trip4 from '../../assets/img4.webp';
import trip5 from '../../assets/img5.webp';
import trip6 from '../../assets/img6.webp';
import trip7 from '../../assets/img7.webp';
import trip8 from '../../assets/img8.webp';
import trip9 from '../../assets/img1.webp';

const BookTrip = () => {
  // Filter Dropdown States
  const [location, setLocation] = useState('Afghanistan');
  const [tourType, setTourType] = useState('Family Tour');
  const [category, setCategory] = useState('Economy');
  const [guests, setGuests] = useState('1 Adults, 0 Child');

  // Currently Open Dropdown Tracker
  const [openDropdown, setOpenDropdown] = useState(null);

  // Dropdown Dummy Options
  const locationOptions = ['Afghanistan', 'India', 'Egypt', 'France', 'Brazil', 'Nepal'];
  const tourTypeOptions = ['Family Tour', 'Honeymoon Package', 'Adventure Tour', 'Solo Trip', 'Luxury Cruise'];
  const categoryOptions = ['Economy', 'Premium', 'Business Class', 'Luxury', 'Budget'];
  const guestOptions = ['1 Adults, 0 Child', '2 Adults, 0 Child', '2 Adults, 1 Child', '4 Adults, 2 Child'];

  const searchBarRef = useRef(null);

  // Close open dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const handleSelectOption = (type, value) => {
    if (type === 'location') setLocation(value);
    if (type === 'tourType') setTourType(value);
    if (type === 'category') setCategory(value);
    if (type === 'guests') setGuests(value);
    setOpenDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Triggered with:', { location, tourType, category, guests });
  };

  // Card Data
  const tripsData = [
    {
      id: 1,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip1,
      title: "The Allure Italy's Rich Culture, History, And Cuisine.",
      routes: ['ALEXANDRIA', 'SHARM EL SHEIKH', 'MANSOURA', 'KAIRO'],
      price: '₹2,39,999',
      oldPrice: '₹2,50,000',
    },
    {
      id: 2,
      duration: '7 DAYS / 8 NIGHT',
      tag: 'EGYPT + TURKEY TOUR',
      image: trip2,
      title: "Explore Travel NYC's Museums, Diversity, And Energy.",
      routes: ['MECCA', 'MEDINA', 'RIYADH', 'DOHA', 'AL WAKRA'],
      price: '₹2,69,999',
      oldPrice: '',
    },
    {
      id: 3,
      duration: '5 DAYS / 6 NIGHT',
      tag: 'FRANCE + SPAIN TOUR',
      image: trip3,
      title: 'Embark Tranquility, Adventure, And Spiritual.',
      routes: ['ALEXANDRIA', 'SHARM EL SHEIKH', 'MANSOURA', 'KAIRO'],
      price: '₹1,64,999',
      oldPrice: '₹2,05,000',
    },
    {
      id: 4,
      duration: '8 DAYS / 9 NIGHT',
      tag: 'INDIA + JAPAN TOUR',
      image: trip4,
      title: 'Embracing City Lights, Landm, And Iconic Culture.',
      routes: ['BANGALORE', 'CHENNAI', 'NEW DELHI', 'DHAKA'],
      price: '₹3,14,999',
      oldPrice: '',
    },
    {
      id: 5,
      duration: '6 DAYS / 7 NIGHT',
      tag: 'BRAZIL + HUNGARY TOUR',
      image: trip5,
      title: 'A Journey Of Tour Beauty And Inspiration.',
      routes: ['PARIS', 'MARSEILLE', 'BORDEAUX', 'MADRID', 'BARCELONA'],
      price: '₹3,78,000',
      oldPrice: '₹4,15,000',
    },
    {
      id: 6,
      duration: '4 DAYS / 5 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip6,
      title: 'Adventure Art, Architecture, And Mediterranean.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 7,
      duration: '2 DAYS / 3 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip7,
      title: 'Exploring Ancient Ruins, Histor Landmarks, And Cultural.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 8,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip8,
      title: 'Immersive Cultural Expirees, Local Cuisine.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 9,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip9,
      title: 'Embracing City Lights, Landm, And Iconic Culture.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
  ];

  return (
    <div className="BookTrip">
      <div className="BookTrip-container">
        
        {/* Filter Search Bar */}
        <div className="BookTrip-searchCard" ref={searchBarRef}>
          <form onSubmit={handleSearch} className="BookTrip-searchForm">
            
            {/* 1. Location Dropdown */}
            <div 
              className={`BookTrip-field ${openDropdown === 'location' ? 'BookTrip-activeField' : ''}`}
              onClick={() => toggleDropdown('location')}
            >
              <div className="BookTrip-iconBox">
                <FaMapMarkerAlt className="BookTrip-greenIcon" />
              </div>
              <div className="BookTrip-inputGroup">
                <span className="BookTrip-selectedValue">{location}</span>
              </div>
              <FaChevronDown className={`BookTrip-arrowIcon ${openDropdown === 'location' ? 'BookTrip-rotate' : ''}`} />

              {openDropdown === 'location' && (
                <ul className="BookTrip-menu">
                  {locationOptions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`BookTrip-option ${location === item ? 'BookTrip-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('location', item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Tour Type Dropdown */}
            <div 
              className={`BookTrip-field ${openDropdown === 'tourType' ? 'BookTrip-activeField' : ''}`}
              onClick={() => toggleDropdown('tourType')}
            >
              <div className="BookTrip-iconBox">
                <FaSuitcase className="BookTrip-greenIcon" />
              </div>
              <div className="BookTrip-inputGroup">
                <label className="BookTrip-label">Destination</label>
                <span className="BookTrip-selectedValue">{tourType}</span>
              </div>
              <FaChevronDown className={`BookTrip-arrowIcon ${openDropdown === 'tourType' ? 'BookTrip-rotate' : ''}`} />

              {openDropdown === 'tourType' && (
                <ul className="BookTrip-menu">
                  {tourTypeOptions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`BookTrip-option ${tourType === item ? 'BookTrip-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('tourType', item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. Category Dropdown */}
            <div 
              className={`BookTrip-field ${openDropdown === 'category' ? 'BookTrip-activeField' : ''}`}
              onClick={() => toggleDropdown('category')}
            >
              <div className="BookTrip-iconBox">
                <FaUserFriends className="BookTrip-greenIcon" />
              </div>
              <div className="BookTrip-inputGroup">
                <label className="BookTrip-label">Destination</label>
                <span className="BookTrip-selectedValue">{category}</span>
              </div>
              <FaChevronDown className={`BookTrip-arrowIcon ${openDropdown === 'category' ? 'BookTrip-rotate' : ''}`} />

              {openDropdown === 'category' && (
                <ul className="BookTrip-menu">
                  {categoryOptions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`BookTrip-option ${category === item ? 'BookTrip-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('category', item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 4. Guest Dropdown */}
            <div 
              className={`BookTrip-field ${openDropdown === 'guests' ? 'BookTrip-activeField' : ''}`}
              onClick={() => toggleDropdown('guests')}
            >
              <div className="BookTrip-iconBox">
                <FaSuitcase className="BookTrip-greenIcon" />
              </div>
              <div className="BookTrip-inputGroup">
                <label className="BookTrip-label">Guest</label>
                <span className="BookTrip-selectedValue">{guests}</span>
              </div>
              <FaChevronDown className={`BookTrip-arrowIcon ${openDropdown === 'guests' ? 'BookTrip-rotate' : ''}`} />

              {openDropdown === 'guests' && (
                <ul className="BookTrip-menu">
                  {guestOptions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`BookTrip-option ${guests === item ? 'BookTrip-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOption('guests', item);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Submit Button */}
            <button type="submit" className="BookTrip-searchBtn">
              Search
            </button>

          </form>
        </div>

        {/* Trip Cards Grid */}
        <div className="BookTrip-grid">
          {tripsData.map((trip) => (
            <div className="BookTrip-card" key={trip.id}>
              {/* Image Container */}
              <div className="BookTrip-imageContainer">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="BookTrip-image"
                />

                <div className="BookTrip-durationBadge">{trip.duration}</div>
                <div className="BookTrip-locationTag">
                  <FaMapMarkerAlt className="BookTrip-tagIcon" />
                  <span>{trip.tag}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="BookTrip-content">
                <h3 className="BookTrip-title">{trip.title}</h3>

                {/* Running Ticker Line */}
                <div className="BookTrip-routeTicker">
                  <div className="BookTrip-routeTrack">
                    {[...trip.routes, ...trip.routes].map((city, idx) => (
                      <React.Fragment key={idx}>
                        <span className="BookTrip-cityName">{city}</span>
                        <span className="BookTrip-arrow">➔</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="BookTrip-divider"></div>

                {/* Card Footer */}
                <div className="BookTrip-footer">
                  <div className="BookTrip-priceBlock">
                    <span className="BookTrip-priceLabel">Starting Form:</span>
                    <div className="BookTrip-priceRow">
                      <span className="BookTrip-currentPrice">
                        {trip.price}
                      </span>
                      {trip.oldPrice && (
                        <span className="BookTrip-oldPrice">
                          {trip.oldPrice}
                        </span>
                      )}
                    </div>
                    <span className="BookTrip-taxInfo">TAXES INCL/PERS</span>
                  </div>

                  <button className="BookTrip-btn">
                    <span>Book A Trip</span>
                    <FaPaperPlane className="BookTrip-btnIcon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BookTrip;