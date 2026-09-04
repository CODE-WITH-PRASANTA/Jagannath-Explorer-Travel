import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMapMarkerAlt, 
  FaSuitcase, 
  FaTags, 
  FaHotel, 
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

const defaultSlides = [
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    location: 'United States',
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

const odishaLocations = ['Puri', 'Bhubaneswar', 'Cuttack', 'Konark', 'Chilika Lake', 'Gopalpur', 'Simlipal', 'Daringbadi', 'Sambalpur', 'Koraput', 'Chandipur'];
const tourTypes = ['Family Tour', 'Solo Tour', 'Honeymoon Tour', 'Adventure Trek', 'Weekend Getaway', 'Pilgrimage Tour'];
const tourCategories = ['Economy', 'Standard', 'Deluxe Premium', 'Luxury 5-Star'];
const whenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible Dates'];
const dateRanges = ['Sep 1 - Sep 1', 'Sep 5 - Sep 8', 'Sep 10 - Sep 15', 'Sep 20 - Sep 25', 'Oct 1 - Oct 5'];

const CustomDropdown = ({ icon: Icon, label, value, options, onSelect, isOpen, onToggle }) => {
  return (
    <div className={`hero-section__field-group ${isOpen ? 'hero-section__field-group--open' : ''}`} onClick={onToggle}>
      <span className="hero-section__field-icon"><Icon /></span>
      <div className="hero-section__field-data">
        <label className="hero-section__field-label">{label}</label>
        <span className="hero-section__field-value">{value}</span>
      </div>
      <FaChevronDown className={`hero-section__select-arrow ${isOpen ? 'hero-section__select-arrow--rotate' : ''}`} />

      {isOpen && (
        <ul className="hero-section__dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={`hero-section__dropdown-item ${opt === value ? 'hero-section__dropdown-item--selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(opt);
                onToggle();
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const HeroSection = ({ customSlides }) => {
  const slides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Tour');
  const [openDropdown, setOpenDropdown] = useState(null);

  const [destination, setDestination] = useState('Puri');
  const [fromLocation, setFromLocation] = useState('Bhubaneswar');
  const [toLocation, setToLocation] = useState('Puri');
  const [tourType, setTourType] = useState('Family Tour');
  const [tourCategory, setTourCategory] = useState('Economy');
  const [day, setDay] = useState('Monday');
  const [dates, setDates] = useState('Sep 1 - Sep 1');
  const [returnDate, setReturnDate] = useState('Sep 5 - Sep 8');

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const widgetRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

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
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-section__background ${index === currentSlide ? 'hero-section__background--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-section__overlay"></div>
        </div>
      ))}

      <button className="hero-section__slider-arrow hero-section__slider-arrow--left" onClick={handlePrevSlide} aria-label="Previous Slide">
        <FaArrowLeft />
      </button>
      <button className="hero-section__slider-arrow hero-section__slider-arrow--right" onClick={handleNextSlide} aria-label="Next Slide">
        <FaArrowRight />
      </button>

      <div className="hero-section__content">
        <div className="hero-section__badge-wrapper">
          <span className="hero-section__location-badge">
            <FaMapMarkerAlt className="hero-section__badge-icon" /> {slides[currentSlide].location}
          </span>
        </div>

        <h1 className="hero-section__title">
          {slides[currentSlide].title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>

        <p className="hero-section__description">{slides[currentSlide].desc}</p>

        <div className="hero-section__cta-group">
          <button className="hero-section__btn-book">Book A Trip</button>
          
          <div className="hero-section__tripadvisor">
            <SiTripadvisor className="hero-section__tripadvisor-icon" />
            <div className="hero-section__tripadvisor-info">
              <span className="hero-section__tripadvisor-title">Tripadvisor</span>
              <div className="hero-section__tripadvisor-score-wrapper">
                <div className="hero-section__tripadvisor-dots">
                  <span className="hero-section__dot"></span>
                  <span className="hero-section__dot"></span>
                  <span className="hero-section__dot"></span>
                  <span className="hero-section__dot"></span>
                  <span className="hero-section__dot hero-section__dot--half"></span>
                </div>
                <span className="hero-section__score-text">4.5/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Filter Widget Container */}
      <div className="hero-section__filter-wrapper" ref={widgetRef}>
        
        {/* Seamless Header Tabs */}
        <div className="hero-section__tabs-header">
          <div className="hero-section__tabs">
            <button 
              type="button" 
              className={`hero-section__tab-btn ${activeTab === 'Tour' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('Tour'); setOpenDropdown(null); }}
            >
              <FaMapMarkerAlt className="hero-section__tab-icon" /> Tour
            </button>
            <button 
              type="button" 
              className={`hero-section__tab-btn ${activeTab === 'Hotel' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('Hotel'); setOpenDropdown(null); }}
            >
              <FaHotel className="hero-section__tab-icon" /> Hotel
            </button>
            <button 
              type="button" 
              className={`hero-section__tab-btn ${activeTab === 'Transport' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('Transport'); setOpenDropdown(null); }}
            >
              <FaBus className="hero-section__tab-icon" /> Transport
            </button>
          </div>
        </div>

        {/* Filter Card Body */}
        <div className={`hero-section__card ${activeTab === 'Tour' ? 'hero-section__card--tour-active' : ''}`}>
          <form className="hero-section__form" onSubmit={handleSearch}>

            {/* TAB 1: TOUR */}
            {activeTab === 'Tour' && (
              <div className="hero-section__fields-grid">
                <CustomDropdown
                  icon={FaMapMarkerAlt}
                  label="Destination"
                  value={destination}
                  options={odishaLocations}
                  isOpen={openDropdown === 'destination'}
                  onToggle={() => toggleDropdown('destination')}
                  onSelect={setDestination}
                />

                <CustomDropdown
                  icon={FaSuitcase}
                  label="Tour Type"
                  value={tourType}
                  options={tourTypes}
                  isOpen={openDropdown === 'tourType'}
                  onToggle={() => toggleDropdown('tourType')}
                  onSelect={setTourType}
                />

                <CustomDropdown
                  icon={FaRegClock}
                  label="When"
                  value={day}
                  options={whenDays}
                  isOpen={openDropdown === 'day'}
                  onToggle={() => toggleDropdown('day')}
                  onSelect={setDay}
                />

                <CustomDropdown
                  icon={FaTags}
                  label="Tour Category"
                  value={tourCategory}
                  options={tourCategories}
                  isOpen={openDropdown === 'tourCategory'}
                  onToggle={() => toggleDropdown('tourCategory')}
                  onSelect={setTourCategory}
                />
              </div>
            )}

            {/* TAB 2: HOTEL */}
            {activeTab === 'Hotel' && (
              <div className="hero-section__fields-grid">
                <CustomDropdown
                  icon={FaMapMarkerAlt}
                  label="Location"
                  value={destination}
                  options={odishaLocations}
                  isOpen={openDropdown === 'hotelLoc'}
                  onToggle={() => toggleDropdown('hotelLoc')}
                  onSelect={setDestination}
                />

                <CustomDropdown
                  icon={FaRegClock}
                  label="Check in - Check out"
                  value={dates}
                  options={dateRanges}
                  isOpen={openDropdown === 'hotelDates'}
                  onToggle={() => toggleDropdown('hotelDates')}
                  onSelect={setDates}
                />

                <div className="hero-section__field-group">
                  <span className="hero-section__field-icon"><FaSuitcase /></span>
                  <div className="hero-section__field-data">
                    <label className="hero-section__field-label">Room</label>
                    <span className="hero-section__field-value">{rooms} Room</span>
                  </div>
                  <div className="hero-section__counter-arrows">
                    <button type="button" onClick={() => setRooms(rooms + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}><FaChevronDown /></button>
                  </div>
                </div>

                <div className="hero-section__field-group">
                  <span className="hero-section__field-icon"><FaUserFriends /></span>
                  <div className="hero-section__field-data">
                    <label className="hero-section__field-label">Guest</label>
                    <span className="hero-section__field-value">{adults} Adult, {children} Child</span>
                  </div>
                  <div className="hero-section__counter-arrows">
                    <button type="button" onClick={() => setAdults(adults + 1)}><FaChevronUp /></button>
                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}><FaChevronDown /></button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TRANSPORT */}
            {activeTab === 'Transport' && (
              <div className="hero-section__fields-grid">
                <CustomDropdown
                  icon={FaMapMarkerAlt}
                  label="From"
                  value={fromLocation}
                  options={odishaLocations}
                  isOpen={openDropdown === 'fromLoc'}
                  onToggle={() => toggleDropdown('fromLoc')}
                  onSelect={setFromLocation}
                />

                <CustomDropdown
                  icon={FaMapMarkerAlt}
                  label="To"
                  value={toLocation}
                  options={odishaLocations}
                  isOpen={openDropdown === 'toLoc'}
                  onToggle={() => toggleDropdown('toLoc')}
                  onSelect={setToLocation}
                />

                <CustomDropdown
                  icon={FaRegClock}
                  label="Journey Date"
                  value={dates}
                  options={dateRanges}
                  isOpen={openDropdown === 'transDate'}
                  onToggle={() => toggleDropdown('transDate')}
                  onSelect={setDates}
                />

                <CustomDropdown
                  icon={FaRegClock}
                  label="Return Date"
                  value={returnDate}
                  options={dateRanges}
                  isOpen={openDropdown === 'returnDate'}
                  onToggle={() => toggleDropdown('returnDate')}
                  onSelect={setReturnDate}
                />
              </div>
            )}

            <button type="submit" className="hero-section__btn-search">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;