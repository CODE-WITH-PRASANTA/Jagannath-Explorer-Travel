import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Building2, 
  Car, 
  Briefcase, 
  ChevronUp,
  Check
} from 'lucide-react';

const odishaDestinations = [
  'Puri',
  'Bhubaneswar',
  'Konark',
  'Chilika Lake',
  'Gopalpur',
  'Cuttack',
  'Simlipal National Park',
  'Daringbadi',
  'Sambalpur'
];

const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920&auto=format&fit=crop',
    tag: 'Odisha, India',
    title: "Let's journey and\ndiscover a place.",
    subtitle: 'Life Is Unpredictable, And We Understand That Plans Might Change. Enjoy Flexible Booking Options, So You Can Reschedule Or Modify Your Trip With Ease.'
  },
  {
    url: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=1920&auto=format&fit=crop',
    tag: 'Konark, Odisha',
    title: 'Explore Ancient\nHeritage & Temples.',
    subtitle: 'Immerse yourself in timeless architecture and sacred spiritual getaways along the golden coast.'
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
    tag: 'Puri Beach, Odisha',
    title: 'Experience The Serene\nGolden Shores.',
    subtitle: 'Breathe in tranquility along pristine waters and scenic vistas with our hand-crafted holiday packages.'
  },
 
];

// Custom Dropdown Component
const CustomDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className={`hero-section__field ${isOpen ? 'hero-section__field--active' : ''}`} ref={dropdownRef}>
      <div className="hero-section__field-icon">
        <Icon size={22} />
      </div>
      <div className="hero-section__field-body" onClick={() => setIsOpen(!isOpen)}>
        <span className="hero-section__field-label">{label}</span>
        <div className="hero-section__custom-trigger">
          <span className="hero-section__selected-val">{value}</span>
          <ChevronDown size={18} className={`hero-section__field-caret ${isOpen ? 'hero-section__field-caret--rotated' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="hero-section__dropdown-menu">
          <ul className="hero-section__dropdown-list">
            {options.map((option) => (
              <li
                key={option}
                className={`hero-section__dropdown-item ${option === value ? 'hero-section__dropdown-item--selected' : ''}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <span>{option}</span>
                {option === value && <Check size={16} className="hero-section__check-icon" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('tour');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tour Form State
  const [tourDest, setTourDest] = useState('Puri');
  const [tourType, setTourType] = useState('Family Tour');
  const [tourDay, setTourDay] = useState('Monday');
  const [tourCategory, setTourCategory] = useState('Economy');

  // Hotel Form State
  const [hotelLocation, setHotelLocation] = useState('Bhubaneswar');
  const [hotelDates, setHotelDates] = useState('Sep 4 - Sep 7');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState('1 Adults, 0 Child');

  // Transport Form State
  const [fromLoc, setFromLoc] = useState('Bhubaneswar');
  const [toLoc, setToLoc] = useState('Puri');
  const [departDate, setDepartDate] = useState('Sep 4 - Sep 4');
  const [returnDate, setReturnDate] = useState('Sep 5 - Sep 5');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <section className="hero-section">
      <div className="hero-section__wrapper">
        {/* Background Slides */}
        {sliderImages.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-section__slide ${idx === currentSlide ? 'hero-section__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}

        <div className="hero-section__overlay" />

        {/* Navigation Arrows */}
        <button 
          type="button" 
          className="hero-section__arrow hero-section__arrow--left" 
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button 
          type="button" 
          className="hero-section__arrow hero-section__arrow--right" 
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Hero Center Text */}
        <div className="hero-section__content">
          <div className="hero-section__tag">
            <MapPin size={15} />
            <span>{sliderImages[currentSlide].tag}</span>
          </div>

          <h1 className="hero-section__title">
            {sliderImages[currentSlide].title}
          </h1>

          <p className="hero-section__description">
            {sliderImages[currentSlide].subtitle}
          </p>

          <div className="hero-section__cta-group">
            <button type="button" className="hero-section__book-btn">Book A Trip</button>

            <div className="hero-section__review-card">
              <div className="hero-section__review-icon">
                <span className="hero-section__review-eye"></span>
                <span className="hero-section__review-eye"></span>
              </div>
              <div className="hero-section__review-info">
                <span className="hero-section__review-name">Tripadvisor</span>
                <div className="hero-section__review-rating">
                  <div className="hero-section__review-dots">
                    <span className="hero-section__review-dot hero-section__review-dot--filled"></span>
                    <span className="hero-section__review-dot hero-section__review-dot--filled"></span>
                    <span className="hero-section__review-dot hero-section__review-dot--filled"></span>
                    <span className="hero-section__review-dot hero-section__review-dot--filled"></span>
                    <span className="hero-section__review-dot hero-section__review-dot--half"></span>
                  </div>
                  <span className="hero-section__review-score">4.5/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Booking Module */}
        <div className="hero-section__booking-container">
          <div className="hero-section__tabs-header">
            <button
              type="button"
              className={`hero-section__tab-btn ${activeTab === 'tour' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('tour')}
            >
              <Compass size={18} />
              <span>Tour</span>
            </button>

            <button
              type="button"
              className={`hero-section__tab-btn ${activeTab === 'hotel' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('hotel')}
            >
              <Building2 size={18} />
              <span>Hotel</span>
            </button>

            <button
              type="button"
              className={`hero-section__tab-btn ${activeTab === 'transport' ? 'hero-section__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('transport')}
            >
              <Car size={18} />
              <span>Transport</span>
            </button>
          </div>

          <div className="hero-section__form-card">
            {/* TOUR TAB */}
            {activeTab === 'tour' && (
              <div className="hero-section__form-grid hero-section__form-grid--tour">
                <CustomDropdown
                  label="Destination"
                  value={tourDest}
                  options={odishaDestinations}
                  onChange={setTourDest}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Tour Type"
                  value={tourType}
                  options={['Family Tour', 'Adventure Tour', 'Spiritual Tour', 'Heritage Tour']}
                  onChange={setTourType}
                  icon={Briefcase}
                />
                <CustomDropdown
                  label="When"
                  value={tourDay}
                  options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                  onChange={setTourDay}
                  icon={Calendar}
                />
                <CustomDropdown
                  label="Tour Category"
                  value={tourCategory}
                  options={['Economy', 'Standard', 'Luxury', 'Premium']}
                  onChange={setTourCategory}
                  icon={Briefcase}
                />

                <button type="button" className="hero-section__search-btn">Search</button>
              </div>
            )}

            {/* HOTEL TAB */}
            {activeTab === 'hotel' && (
              <div className="hero-section__form-grid hero-section__form-grid--hotel">
                <CustomDropdown
                  label="Location"
                  value={hotelLocation}
                  options={odishaDestinations}
                  onChange={setHotelLocation}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Check in - Check out"
                  value={hotelDates}
                  options={['Sep 4 - Sep 4', 'Sep 4 - Sep 7', 'Sep 8 - Sep 12', 'Sep 15 - Sep 20']}
                  onChange={setHotelDates}
                  icon={Calendar}
                />

                <div className="hero-section__field">
                  <div className="hero-section__field-icon">
                    <Briefcase size={22} />
                  </div>
                  <div className="hero-section__field-body">
                    <label className="hero-section__field-label">Room</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="hero-section__field-number"
                      value={rooms}
                      onChange={(e) => setRooms(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    />
                  </div>
                  <div className="hero-section__spinner-arrows">
                    <ChevronUp size={14} onClick={() => setRooms(prev => prev + 1)} />
                    <ChevronDown size={14} onClick={() => setRooms(prev => Math.max(1, prev - 1))} />
                  </div>
                </div>

                <CustomDropdown
                  label="Guest"
                  value={guests}
                  options={['1 Adults, 0 Child', '2 Adults, 0 Child', '2 Adults, 1 Child', '3 Adults, 2 Child']}
                  onChange={setGuests}
                  icon={Users}
                />

                <button type="button" className="hero-section__search-btn">Search</button>
              </div>
            )}

            {/* TRANSPORT TAB */}
            {activeTab === 'transport' && (
              <div className="hero-section__form-grid hero-section__form-grid--transport">
                <CustomDropdown
                  label="From"
                  value={fromLoc}
                  options={odishaDestinations}
                  onChange={setFromLoc}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="To"
                  value={toLoc}
                  options={odishaDestinations}
                  onChange={setToLoc}
                  icon={MapPin}
                />
                <CustomDropdown
                  label="Journey date"
                  value={departDate}
                  options={['Sep 4 - Sep 4', 'Sep 5 - Sep 5', 'Sep 10 - Sep 10']}
                  onChange={setDepartDate}
                  icon={Calendar}
                />
                <CustomDropdown
                  label="Return date"
                  value={returnDate}
                  options={['Sep 4 - Sep 4', 'Sep 6 - Sep 6', 'Sep 12 - Sep 12']}
                  onChange={setReturnDate}
                  icon={Calendar}
                />

                <button type="button" className="hero-section__search-btn">Search</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;