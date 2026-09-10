import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTrip.css';
import { API, IMG_URL } from '../../api/axios';

// React Icons
import { 
  FaMapMarkerAlt, 
  FaSuitcase, 
  FaUserFriends, 
  FaChevronDown, 
  FaPaperPlane 
} from 'react-icons/fa';

// WebP image fallback imports from src/assets/
import trip1 from '../../assets/img1.webp';
import trip2 from '../../assets/img2.webp';
import trip3 from '../../assets/img3.webp';
import trip4 from '../../assets/img4.webp';
import trip5 from '../../assets/img5.webp';
import trip6 from '../../assets/img6.webp';
import trip7 from '../../assets/img7.webp';
import trip8 from '../../assets/img8.webp';

const fallbackImages = [trip1, trip2, trip3, trip4, trip5, trip6, trip7, trip8];

const BookTrip = () => {
  const navigate = useNavigate();

  // Real Tours State
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter Dropdown States
  const [location, setLocation] = useState('All');
  const [tourType, setTourType] = useState('All');
  const [category, setCategory] = useState('All');
  const [guests, setGuests] = useState('All');

  // Currently Open Dropdown Tracker
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchBarRef = useRef(null);

  // Fetch Tours from API (.env configured via axios instance)
  useEffect(() => {
    let isMounted = true;
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await API.get('/tours');
        if (res.data && res.data.success && isMounted) {
          setTours(res.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching tours:', err);
        if (isMounted) setError('Failed to load tours');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTours();
    return () => {
      isMounted = false;
    };
  }, []);

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
  };

  // Dynamic filter options based on real tours with defaults
  const locationOptions = useMemo(() => {
    const unique = Array.from(new Set(tours.map(t => t.destination).filter(Boolean)));
    return ['All', ...(unique.length > 0 ? unique : ['Afghanistan', 'India', 'Egypt', 'France', 'Brazil', 'Nepal'])];
  }, [tours]);

  const tourTypeOptions = useMemo(() => {
    const unique = Array.from(new Set(tours.map(t => t.category).filter(Boolean)));
    return ['All', ...(unique.length > 0 ? unique : ['Family Tour', 'Honeymoon Package', 'Adventure Tour', 'Solo Trip', 'Luxury Cruise'])];
  }, [tours]);

  const categoryOptions = useMemo(() => {
    return ['All', 'Economy', 'Premium', 'Business Class', 'Luxury', 'Budget'];
  }, []);

  const guestOptions = useMemo(() => {
    return ['All', '1 Adults, 0 Child', '2 Adults, 0 Child', '2 Adults, 1 Child', '4 Adults, 2 Child'];
  }, []);

  // Filtered Tours
  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      if (location !== 'All' && tour.destination && tour.destination.toLowerCase() !== location.toLowerCase()) {
        return false;
      }
      if (tourType !== 'All' && tour.category && tour.category.toLowerCase() !== tourType.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [tours, location, tourType]);

  // Navigate to Tour details by slug (or ID)
  const handleCardClick = (tour) => {
    const slug = tour.slug || tour._id;
    navigate(`/tours/${slug}`);
  };

  // Helper for image URL
  const getImageUrl = (imagePath, idx) => {
    if (!imagePath) return fallbackImages[idx % fallbackImages.length];
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `${IMG_URL}${imagePath}`;
  };

  // Helper for route ticker list
  const getRoutes = (tour) => {
    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      return tour.itinerary
        .map(i => (i.title ? i.title.replace(/^Day \d+[:\s-]*/i, '').trim() : ''))
        .filter(Boolean);
    }
    if (Array.isArray(tour.tags) && tour.tags.length > 0) {
      return tour.tags;
    }
    return [tour.destination || 'TOUR DESTINATION', 'EXPLORE CITY', 'LOCAL SIGHTS'];
  };

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
                <label className="BookTrip-label">Location</label>
                <span className="BookTrip-selectedValue">{location === 'All' ? 'All Locations' : location}</span>
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
                      {item === 'All' ? 'All Locations' : item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Tour Type / Destination Dropdown */}
            <div 
              className={`BookTrip-field ${openDropdown === 'tourType' ? 'BookTrip-activeField' : ''}`}
              onClick={() => toggleDropdown('tourType')}
            >
              <div className="BookTrip-iconBox">
                <FaSuitcase className="BookTrip-greenIcon" />
              </div>
              <div className="BookTrip-inputGroup">
                <label className="BookTrip-label">Tour Type</label>
                <span className="BookTrip-selectedValue">{tourType === 'All' ? 'All Types' : tourType}</span>
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
                      {item === 'All' ? 'All Types' : item}
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
                <label className="BookTrip-label">Category</label>
                <span className="BookTrip-selectedValue">{category === 'All' ? 'All Categories' : category}</span>
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
                      {item === 'All' ? 'All Categories' : item}
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
                <span className="BookTrip-selectedValue">{guests === 'All' ? 'All Guests' : guests}</span>
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
                      {item === 'All' ? 'All Guests' : item}
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
          {filteredTours.map((trip, idx) => {
            const routesList = getRoutes(trip);
            const imageSrc = getImageUrl(trip.mainImage, idx);
            const displayTag = trip.category 
              ? `${trip.category.toUpperCase()} TOUR` 
              : (trip.destination ? `${trip.destination.toUpperCase()} TOUR` : 'EXCLUSIVE TOUR');

            return (
              <div 
                className="BookTrip-card" 
                key={trip._id || idx}
                onClick={() => handleCardClick(trip)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image Container */}
                <div className="BookTrip-imageContainer">
                  <img
                    src={imageSrc}
                    alt={trip.title}
                    className="BookTrip-image"
                    loading="lazy"
                  />

                  {trip.duration && (
                    <div className="BookTrip-durationBadge">{trip.duration.toUpperCase()}</div>
                  )}
                  <div className="BookTrip-locationTag">
                    <FaMapMarkerAlt className="BookTrip-tagIcon" />
                    <span>{displayTag}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="BookTrip-content">
                  <h3 className="BookTrip-title">{trip.title}</h3>

                  {/* Running Ticker Line */}
                  {routesList.length > 0 && (
                    <div className="BookTrip-routeTicker">
                      <div className="BookTrip-routeTrack">
                        {[...routesList, ...routesList].map((city, rIdx) => (
                          <React.Fragment key={rIdx}>
                            <span className="BookTrip-cityName">{city}</span>
                            <span className="BookTrip-arrow">➔</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="BookTrip-divider"></div>

                  {/* Card Footer */}
                  <div className="BookTrip-footer">
                    <div className="BookTrip-priceBlock">
                      <span className="BookTrip-priceLabel">Starting Form:</span>
                      <div className="BookTrip-priceRow">
                        <span className="BookTrip-currentPrice">
                          ₹{Number(trip.price || 0).toLocaleString('en-IN')}
                        </span>
                        {trip.discountPrice > 0 && (
                          <span className="BookTrip-oldPrice">
                            ₹{Number(trip.discountPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="BookTrip-taxInfo">TAXES INCL/PERS</span>
                    </div>

                    <button 
                      type="button"
                      className="BookTrip-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(trip);
                      }}
                    >
                      <span>Book A Trip</span>
                      <FaPaperPlane className="BookTrip-btnIcon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading / Empty State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <p>Loading tour packages...</p>
          </div>
        )}

        {!loading && filteredTours.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <p>No tour packages found matching your criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookTrip;