import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaSuitcase, 
  FaTags, 
  FaHotel, 
  FaPassport, 
  FaRunning, 
  FaBus, 
  FaChevronDown, 
  FaChevronUp, 
  FaArrowLeft, 
  FaArrowRight, 
  FaUserFriends,
  FaRegClock
} from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import './HeroSection.css';

// स्लाइडर के लिए बैकग्राउंड इमेजेस (आप अपनी इमेजेस भी पास कर सकते हैं)
const defaultSlides = [
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    location: 'United State',
    title: "Let's trek and venture\nto a spot.",
    desc: 'Life Is Unpredictable, And We Understand That Plans Might Change. Enjoy Flexible Booking Options, So You Can Reschedule Or Modify Your Trip With Ease.'
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    location: 'Odisha, India',
    title: 'Explore The Golden\nBeaches & Temples.',
    desc: 'Discover the divine serenity of Puri, magnificent architecture of Konark, and scenic beauty of Chilika Lake with hassle-free tour packages.'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop',
    location: 'Daringbadi & Simlipal',
    title: 'Experience Nature\n& Wilderness Live.',
    desc: 'Escape to the Kashmir of Odisha and uncover lush green hills, waterfalls, and rich wildlife sanctuaries with personalized itineraries.'
  }
];

// ओडिशा और अन्य डेटा सेट्स
const odishaLocations = [
  'Puri',
  'Bhubaneswar',
  'Cuttack',
  'Konark',
  'Chilika Lake',
  'Gopalpur',
  'Simlipal',
  'Daringbadi',
  'Sambalpur',
  'Koraput',
  'Chandipur'
];

const tourTypes = ['Family Tour', 'Solo Tour', 'Honeymoon Tour', 'Adventure Trek', 'Weekend Getaway', 'Pilgrimage Tour'];
const tourCategories = ['Economy', 'Standard', 'Deluxe Premium', 'Luxury 5-Star'];
const whenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible Dates'];
const dateRanges = ['Sep 1 - Sep 1', 'Sep 5 - Sep 8', 'Sep 10 - Sep 15', 'Sep 20 - Sep 25', 'Oct 1 - Oct 5'];
const countries = ['India', 'Afghanistan', 'United States', 'United Kingdom', 'United Arab Emirates', 'Thailand', 'Singapore'];
const visaTypes = ['Tourist Visa', 'Business Visa', 'Transit Visa', 'Student Visa'];
const nationalities = ['Indian', 'Bangladeshi', 'American', 'British', 'Canadian', 'Australian'];
const activityTypes = ['Adventure', 'Water Sports', 'Heritage Sightseeing', 'Temple Walk', 'Boating & Cruise', 'Jungle Safari'];

const HeroSection = ({ customSlides }) => {
  const slides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
  
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter Active Tab
  const [activeTab, setActiveTab] = useState('Tour');

  // Filter Form States
  const [destination, setDestination] = useState('Puri');
  const [fromLocation, setFromLocation] = useState('Bhubaneswar');
  const [toLocation, setToLocation] = useState('Puri');
  const [tourType, setTourType] = useState('Family Tour');
  const [tourCategory, setTourCategory] = useState('Economy');
  const [activityType, setActivityType] = useState('Adventure');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [nationality, setNationality] = useState('Indian');
  const [day, setDay] = useState('Monday');
  const [dates, setDates] = useState('Sep 1 - Sep 1');
  const [returnDate, setReturnDate] = useState('Sep 5 - Sep 8');

  // Counters
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [travelers, setTravelers] = useState(1);

  // Auto slide effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${activeTab}!`);
  };

  return (
    <section className="hero-container">
      {/* Background Slides with Ken-Burns Zoom/Pan Animation */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-background animated-bg ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay"></div>
        </div>
      ))}

      {/* Slider Left/Right Buttons */}
      <button className="slider-arrow arrow-left" onClick={handlePrevSlide} aria-label="Previous Slide">
        <FaArrowLeft />
      </button>
      <button className="slider-arrow arrow-right" onClick={handleNextSlide} aria-label="Next Slide">
        <FaArrowRight />
      </button>

      {/* Center Hero Text Content */}
      <div className="hero-content">
        <div className="badge-wrapper">
          <span className="location-badge">
            <FaMapMarkerAlt className="badge-icon" /> {slides[currentSlide].location}
          </span>
        </div>

        <h1 className="hero-title">
          {slides[currentSlide].title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>

        <p className="hero-description">
          {slides[currentSlide].desc}
        </p>

        <div className="hero-cta-group">
          <button className="btn-book-trip">Book A Trip</button>
          
          <div className="tripadvisor-rating">
            <SiTripadvisor className="tripadvisor-icon" />
            <div className="rating-info">
              <span className="rating-title">Tripadvisor</span>
              <div className="rating-score">
                <div className="green-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot half"></span>
                </div>
                <span className="score-text">4.5/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Booking / Search Filter Widget (Zero Gap Design) */}
      <div className="search-filter-wrapper">
        
        {/* Navigation Tabs */}
        <div className="filter-tabs">
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'Tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('Tour')}
          >
            <FaMapMarkerAlt /> Tour
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'Hotel' ? 'active' : ''}`}
            onClick={() => setActiveTab('Hotel')}
          >
            <FaHotel /> Hotel
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'Visa' ? 'active' : ''}`}
            onClick={() => setActiveTab('Visa')}
          >
            <FaPassport /> Visa
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'Activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('Activities')}
          >
            <FaRunning /> Activities
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === 'Transport' ? 'active' : ''}`}
            onClick={() => setActiveTab('Transport')}
          >
            <FaBus /> Transport
          </button>
        </div>

        {/* Dynamic Search Fields Panel */}
        <div className="filter-card">
          <form className="search-form" onSubmit={handleSearch}>

            {/* TAB 1: TOUR */}
            {activeTab === 'Tour' && (
              <div className="form-fields-grid">
                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>Destination</label>
                    <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                      {odishaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaSuitcase /></span>
                  <div className="field-data">
                    <label>Tour Type</label>
                    <select value={tourType} onChange={(e) => setTourType(e.target.value)}>
                      {tourTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>When</label>
                    <select value={day} onChange={(e) => setDay(e.target.value)}>
                      {whenDays.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaTags /></span>
                  <div className="field-data">
                    <label>Tour Category</label>
                    <select value={tourCategory} onChange={(e) => setTourCategory(e.target.value)}>
                      {tourCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>
              </div>
            )}

            {/* TAB 2: HOTEL */}
            {activeTab === 'Hotel' && (
              <div className="form-fields-grid">
                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>Location</label>
                    <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                      {odishaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>Check in - Check out</label>
                    <select value={dates} onChange={(e) => setDates(e.target.value)}>
                      {dateRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group counter-group">
                  <span className="field-icon"><FaSuitcase /></span>
                  <div className="field-data">
                    <label>Room</label>
                    <span className="count-display">{rooms}</span>
                  </div>
                  <div className="counter-arrows">
                    <button type="button" onClick={() => setRooms(rooms + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}><FaChevronDown /></button>
                  </div>
                </div>

                <div className="field-group counter-group">
                  <span className="field-icon"><FaUserFriends /></span>
                  <div className="field-data">
                    <label>Guest</label>
                    <span className="count-display">{adults} Adults, {children} Child</span>
                  </div>
                  <div className="counter-arrows">
                    <button type="button" onClick={() => setAdults(adults + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}><FaChevronDown /></button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VISA */}
            {activeTab === 'Visa' && (
              <div className="form-fields-grid">
                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>Country</label>
                    <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaSuitcase /></span>
                  <div className="field-data">
                    <label>Visa Type</label>
                    <select value={visaType} onChange={(e) => setVisaType(e.target.value)}>
                      {visaTypes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>Nationality</label>
                    <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
                      {nationalities.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group counter-group">
                  <span className="field-icon"><FaUserFriends /></span>
                  <div className="field-data">
                    <label>Traveler</label>
                    <span className="count-display">{travelers}</span>
                  </div>
                  <div className="counter-arrows">
                    <button type="button" onClick={() => setTravelers(travelers + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))}><FaChevronDown /></button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ACTIVITIES */}
            {activeTab === 'Activities' && (
              <div className="form-fields-grid">
                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>Location</label>
                    <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                      {odishaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaSuitcase /></span>
                  <div className="field-data">
                    <label>Activities Type</label>
                    <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
                      {activityTypes.map((act) => (
                        <option key={act} value={act}>{act}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>Activity Day</label>
                    <select value={dates} onChange={(e) => setDates(e.target.value)}>
                      {dateRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group counter-group">
                  <span className="field-icon"><FaUserFriends /></span>
                  <div className="field-data">
                    <label>Traveler</label>
                    <span className="count-display">{travelers}</span>
                  </div>
                  <div className="counter-arrows">
                    <button type="button" onClick={() => setTravelers(travelers + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))}><FaChevronDown /></button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: TRANSPORT */}
            {activeTab === 'Transport' && (
              <div className="form-fields-grid">
                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>From</label>
                    <select value={fromLocation} onChange={(e) => setFromLocation(e.target.value)}>
                      {odishaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaMapMarkerAlt /></span>
                  <div className="field-data">
                    <label>To</label>
                    <select value={toLocation} onChange={(e) => setToLocation(e.target.value)}>
                      {odishaLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>Journey date</label>
                    <select value={dates} onChange={(e) => setDates(e.target.value)}>
                      {dateRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>

                <div className="field-group">
                  <span className="field-icon"><FaRegClock /></span>
                  <div className="field-data">
                    <label>Return date</label>
                    <select value={returnDate} onChange={(e) => setReturnDate(e.target.value)}>
                      {dateRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <FaChevronDown className="select-arrow" />
                </div>
              </div>
            )}

            {/* Search Submit Button */}
            <button type="submit" className="btn-search-submit">
              Search
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;