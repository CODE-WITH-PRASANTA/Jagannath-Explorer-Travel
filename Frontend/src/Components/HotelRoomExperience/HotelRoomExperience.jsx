import React, { useState } from 'react';
import './HotelRoomExperience.css';

// React Icons
import {
  FaMapMarkerAlt,
  FaStar,
  FaTv,
  FaWifi,
  FaPhoneAlt,
  FaWind,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaLongArrowAltRight,
  FaFire,
  FaTimes,
  FaSwimmingPool,
  FaSpa,
  FaDumbbell,
  FaUtensils,
  FaCocktail,
  FaParking,
  FaShuttleVan,
  FaCoffee,
  FaConciergeBell
} from 'react-icons/fa';
import {
  FiShield,
  FiBox
} from 'react-icons/fi';
import {
  MdLocalLaundryService
} from 'react-icons/md';

// Helper to match an amenity to a relevant icon
const getAmenityIcon = (name = '') => {
  const n = String(name).toLowerCase();
  if (/wifi|internet|network/i.test(n)) return <FaWifi className="HotelRoomExperience-highlightIcon" />;
  if (/tv|television|cable|screen/i.test(n)) return <FaTv className="HotelRoomExperience-highlightIcon" />;
  if (/ac|air condition|cooling/i.test(n)) return <FaWind className="HotelRoomExperience-highlightIcon" />;
  if (/pool|swimming/i.test(n)) return <FaSwimmingPool className="HotelRoomExperience-highlightIcon" />;
  if (/spa|massage|wellness|steam|sauna/i.test(n)) return <FaSpa className="HotelRoomExperience-highlightIcon" />;
  if (/gym|fitness|workout|exercise/i.test(n)) return <FaDumbbell className="HotelRoomExperience-highlightIcon" />;
  if (/laundry|washing|dry clean/i.test(n)) return <MdLocalLaundryService className="HotelRoomExperience-highlightIcon" />;
  if (/restaurant|food|dining|meal|breakfast|lunch|dinner|kitchen/i.test(n)) return <FaUtensils className="HotelRoomExperience-highlightIcon" />;
  if (/bar|cocktail|drinks|lounge/i.test(n)) return <FaCocktail className="HotelRoomExperience-highlightIcon" />;
  if (/parking|car|valet|garage/i.test(n)) return <FaParking className="HotelRoomExperience-highlightIcon" />;
  if (/safe|security|lock|vault/i.test(n)) return <FiShield className="HotelRoomExperience-highlightIcon" />;
  if (/transfer|airport|pickup|shuttle|cab|taxi/i.test(n)) return <FaShuttleVan className="HotelRoomExperience-highlightIcon" />;
  if (/coffee|tea|cafe/i.test(n)) return <FaCoffee className="HotelRoomExperience-highlightIcon" />;
  if (/service|room service|bell|reception|concierge|front desk/i.test(n)) return <FaConciergeBell className="HotelRoomExperience-highlightIcon" />;
  if (/heat|heater|warm/i.test(n)) return <FaFire className="HotelRoomExperience-highlightIcon" />;
  if (/towel|linen|bath|toiletries/i.test(n)) return <FiBox className="HotelRoomExperience-highlightIcon" />;
  if (/phone|call|intercom/i.test(n)) return <FaPhoneAlt className="HotelRoomExperience-highlightIcon" />;
  return <FaCheck className="HotelRoomExperience-highlightIcon" />;
};

const HotelRoomExperience = ({ hotel }) => {
  // Derived hotel properties with safe fallbacks
  const hotelName = hotel?.name || 'Grand Luxury Hotel & Resort';
  const hotelRating = hotel?.starRating ? Number(hotel.starRating) : 5;
  const hotelPrice = Number(hotel?.price) || 470;
  const hotelPriceStr = hotelPrice.toLocaleString('en-IN');
  const hotelCity = hotel?.city || 'Puri';
  const hotelAddress = hotel?.address || 'Puri Beach Road, Puri';
  const hotelLocation = [hotel?.address, hotel?.city, 'Odisha, India'].filter(Boolean).join(', ') || 'Puri, Odisha, India';
  const hotelDesc = hotel?.shortDesc || 'Welcome to the best luxury hotel in Puri. Experience world-class comfort and authentic hospitality.';
  const hotelDetailedDesc = hotel?.detailedDesc || hotel?.shortDesc || 'Welcome to the best luxury hotel in Puri. Hotel is beautifully appointed with modern comforts, exceptional service, and peaceful surroundings for an unforgettable stay.';

  // Parse amenities from database (supports comma-separated string or array)
  let hotelAmenities = [];
  if (hotel?.amenities) {
    if (Array.isArray(hotel.amenities)) {
      hotelAmenities = hotel.amenities.map((a) => String(a).trim()).filter(Boolean);
    } else if (typeof hotel.amenities === 'string') {
      hotelAmenities = hotel.amenities
        .split(/[,\n]/)
        .map((a) => a.trim())
        .filter(Boolean);
    }
  }

  // Fallback defaults if no amenities are found in database
  if (hotelAmenities.length === 0) {
    hotelAmenities = [
      'Free Wifi',
      'Air Condition',
      'TV',
      'Airport transfer',
      'Fitness center',
      'Luggage storage',
      'Room Service',
      'Laundry'
    ];
  }

  // State for Booking Widget Controls
  const [bookingType, setBookingType] = useState('online'); // 'online' or 'inquiry'
  const [selectedDatePlan, setSelectedDatePlan] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);

  // Extra Services State
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplaneFlying: false,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);

  // Inline Inquiry Form State
  const [inlineInquiry, setInlineInquiry] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isInlineSubmitted, setIsInlineSubmitted] = useState(false);

  // Dynamic Prices Calculation
  const adultPrice = hotelPrice;
  const childPrice = Math.round(hotelPrice * 0.4);
  const homePickupPrice = 500;
  const nightFoodPrice = 350;

  const adultTotal = adultCount * adultPrice;
  const childTotal = childCount * childPrice;
  const extrasTotal = (extraServices.homePickup ? homePickupPrice : 0) + (extraServices.nightFood ? nightFoodPrice : 0);
  const totalPrice = adultTotal + childTotal + extrasTotal;
  const totalPriceStr = totalPrice.toLocaleString('en-IN');

  // Modal Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    packageName: `${hotelName} Package`,
    phone: '',
    destination: hotelLocation,
    price: `₹${hotelPriceStr}`,
    member: 2,
    category: 'standard'
  });

  const handleExtraServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };

  // Inline Form Handler
  const handleInlineChange = (e) => {
    const { name, value } = e.target;
    setInlineInquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    setIsInlineSubmitted(true);
  };

  // Modal Handlers
  const handleOpenModal = () => {
    setBookingFormData((prev) => ({
      ...prev,
      packageName: `${hotelName} Booking`,
      destination: hotelLocation,
      member: adultCount + childCount,
      price: `₹${totalPriceStr}`
    }));
    setIsModalSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalSubmitted(true);
  };

  // SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": `${hotelName} - Jagannatha Tour and Travels`,
    "description": hotelDesc,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotelAddress,
      "addressLocality": hotelCity,
      "addressCountry": "India"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": `${hotelRating}.0`,
      "reviewCount": "94"
    },
    "amenityFeature": hotelAmenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "priceRange": `₹${hotelPriceStr}`
  };

  return (
    <section className="HotelRoomExperience" aria-labelledby="hotel-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="HotelRoomExperience-container">
        {/* Left Column: Hotel Info & Amenities */}
        <div className="HotelRoomExperience-left">
          <div className="HotelRoomExperience-metaHeader">
            <div className="HotelRoomExperience-location">
              <FaMapMarkerAlt className="HotelRoomExperience-locIcon" />
              <span>{hotelLocation} - </span>
              <a
                href="#see-map"
                className="HotelRoomExperience-mapLink"
                onClick={(e) => {
                  e.preventDefault();
                  const mapElem = document.getElementById('see-map');
                  if (mapElem) {
                    mapElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                See Map
              </a>
            </div>
            
            <div className="HotelRoomExperience-ratingScore">
              <div className="HotelRoomExperience-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="HotelRoomExperience-starIcon"
                    style={{ color: i < hotelRating ? "#f59e0b" : "#cbd5e1" }}
                  />
                ))}
              </div>
              <span className="HotelRoomExperience-ratingText">
                <strong>{hotelRating}.0 Excellent</strong> 94 reviews
              </span>
            </div>
          </div>

          <h1 id="hotel-title" className="HotelRoomExperience-title">
            {hotelName}
          </h1>
          <div className="HotelRoomExperience-priceRow">
            <span className="HotelRoomExperience-price">₹{hotelPriceStr}</span>
            <span className="HotelRoomExperience-perNight">/per night</span>
          </div>

          <p className="HotelRoomExperience-description">
            {hotelDetailedDesc}
          </p>

          

          {/* Facilities & Amenities */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Facilities & Amenities</h2>
            <div className="HotelRoomExperience-facilitiesGrid">
              {hotelAmenities.map((facility, idx) => (
                <div className="HotelRoomExperience-facilityItem" key={idx}>
                  <FaCheck className="HotelRoomExperience-checkIcon" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <div className="HotelRoomExperience-right">
          <div className="HotelRoomExperience-bookingCard">
            
            <h3 className="HotelRoomExperience-cardTitle">
              {bookingType === 'online' ? 'Book Your Room' : 'Inquiry Form'}
            </h3>
            <p className="HotelRoomExperience-cardSubtitle">
              {bookingType === 'online' 
                ? 'Reserve your ideal Room early for a hassle-free trip; secure comfort and convenience!'
                : 'Send us your details and questions. We will get back to you shortly.'}
            </p>

            {/* Tab Buttons */}
            <div className="HotelRoomExperience-tabs">
              <button
                className={`HotelRoomExperience-tabBtn ${bookingType === 'online' ? 'HotelRoomExperience-tabActive' : ''}`}
                onClick={() => setBookingType('online')}
              >
                Online Booking
              </button>
              <button
                className={`HotelRoomExperience-tabBtn ${bookingType === 'inquiry' ? 'HotelRoomExperience-tabActive' : ''}`}
                onClick={() => setBookingType('inquiry')}
              >
                Inquiry Form
              </button>
            </div>

            {/* TOGGLE CONTENT BASED ON TAB */}
            {bookingType === 'online' ? (
              <>
                {/* Date Selection Options */}
                <div className="HotelRoomExperience-dateSection">
                  <span className="HotelRoomExperience-label">Select Your Booking Date:</span>

                  <div
                    className={`HotelRoomExperience-dateOption ${selectedDatePlan === 1 ? 'HotelRoomExperience-dateSelected' : ''}`}
                    onClick={() => setSelectedDatePlan(1)}
                  >
                    <div className="HotelRoomExperience-checkboxSquare">
                      {selectedDatePlan === 1 && <div className="HotelRoomExperience-checkboxInner" />}
                    </div>
                    <div className="HotelRoomExperience-dateDetails">
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateLabel">Check In</span>
                        <span className="HotelRoomExperience-dateVal">Jan 1, 2024</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateLabel">Check Out</span>
                        <span className="HotelRoomExperience-dateVal">Jan 5, 2024</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`HotelRoomExperience-dateOption ${selectedDatePlan === 2 ? 'HotelRoomExperience-dateSelected' : ''}`}
                    onClick={() => setSelectedDatePlan(2)}
                  >
                    <div className="HotelRoomExperience-checkboxSquare">
                      {selectedDatePlan === 2 && <div className="HotelRoomExperience-checkboxInner" />}
                    </div>
                    <div className="HotelRoomExperience-dateDetails">
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateLabel">Check In</span>
                        <span className="HotelRoomExperience-dateVal">Jan 10, 2024</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateLabel">Check Out</span>
                        <span className="HotelRoomExperience-dateVal">Jan 15, 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="HotelRoomExperience-dateOptionCustom">
                    <div className="HotelRoomExperience-checkboxSquare" />
                    <div className="HotelRoomExperience-customInputBox">
                      <span className="HotelRoomExperience-customPlaceholder">Check In & Out Data</span>
                      <FaCalendarAlt className="HotelRoomExperience-calIcon" />
                    </div>
                  </div>
                </div>

                {/* Guest Counters */}
                <div className="HotelRoomExperience-guestsSection">
                  <div className="HotelRoomExperience-guestRow">
                    <span className="HotelRoomExperience-guestType">Adult:</span>
                    <div className="HotelRoomExperience-guestPrice">
                      <span className="HotelRoomExperience-currPrice">₹{adultPrice.toLocaleString('en-IN')}</span>
                      <span className="HotelRoomExperience-oldPrice">₹{Math.round(adultPrice * 1.3).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="HotelRoomExperience-counterBox">
                      <button
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      >
                        <FaChevronDown />
                      </button>
                      <span className="HotelRoomExperience-counterVal">{adultCount}</span>
                      <button
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setAdultCount(adultCount + 1)}
                      >
                        <FaChevronUp />
                      </button>
                    </div>
                  </div>

                  <div className="HotelRoomExperience-guestRow">
                    <span className="HotelRoomExperience-guestType">Children:</span>
                    <div className="HotelRoomExperience-guestPrice">
                      <span className="HotelRoomExperience-currPrice">₹{childPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="HotelRoomExperience-counterBox">
                      <button
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      >
                        <FaChevronDown />
                      </button>
                      <span className="HotelRoomExperience-counterVal">{childCount}</span>
                      <button
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setChildCount(childCount + 1)}
                      >
                        <FaChevronUp />
                      </button>
                    </div>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                  <span className="HotelRoomExperience-calcTotal">₹{childTotal.toLocaleString('en-IN')}</span>
                </div>

                {/* Extra Services */}
                <div className="HotelRoomExperience-extrasSection">
                  <h4 className="HotelRoomExperience-extrasTitle">Other Extra Services</h4>
                  
                  <label className="HotelRoomExperience-extraRow">
                    <div className="HotelRoomExperience-extraLeft">
                      <input
                        type="checkbox"
                        checked={extraServices.homePickup}
                        onChange={() => handleExtraServiceChange('homePickup')}
                      />
                      <span>Home Pickup</span>
                    </div>
                    <span className="HotelRoomExperience-extraPrice">₹{homePickupPrice.toLocaleString('en-IN')}</span>
                  </label>

                  <label className="HotelRoomExperience-extraRow">
                    <div className="HotelRoomExperience-extraLeft">
                      <input
                        type="checkbox"
                        checked={extraServices.nightFood}
                        onChange={() => handleExtraServiceChange('nightFood')}
                      />
                      <span>Night Food</span>
                    </div>
                    <span className="HotelRoomExperience-extraPrice">₹{nightFoodPrice.toLocaleString('en-IN')}</span>
                  </label>
                </div>

                {/* Total Price & Action Button */}
                <div className="HotelRoomExperience-totalRow">
                  <span className="HotelRoomExperience-totalLabel">Total Price:</span>
                  <span className="HotelRoomExperience-totalAmount">₹{totalPriceStr}</span>
                </div>

                <button 
                  className="HotelRoomExperience-bookBtn"
                  onClick={handleOpenModal}
                >
                  Book Now
                </button>
              </>
            ) : (
              /* INLINE INQUIRY FORM VIEW */
              <div className="HotelRoomExperience-inquiryContainer">
                {isInlineSubmitted ? (
                  <div className="HotelRoomExperience-successMsg">
                    <FaCheck className="HotelRoomExperience-successIcon" />
                    <h4>Inquiry Sent!</h4>
                    <p>Thank you for contacting us. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInlineSubmit} className="HotelRoomExperience-inquiryForm">
                    <div className="HotelRoomExperience-formGroup">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Enter your name"
                        value={inlineInquiry.fullName}
                        onChange={handleInlineChange}
                      />
                    </div>

                    <div className="HotelRoomExperience-formGroup">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={inlineInquiry.email}
                        onChange={handleInlineChange}
                      />
                    </div>

                    <div className="HotelRoomExperience-formGroup">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter phone number"
                        value={inlineInquiry.phone}
                        onChange={handleInlineChange}
                      />
                    </div>

                    <div className="HotelRoomExperience-formGroup">
                      <label>Message / Requirements</label>
                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Type your message..."
                        value={inlineInquiry.message}
                        onChange={handleInlineChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="HotelRoomExperience-bookBtn">
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* POPUP MODAL (Triggers when clicking "Book Now") */}
      <div className={`HotelRoomExperience-modalOverlay ${isModalOpen ? 'active' : ''}`} onClick={handleCloseModal}>
        <div className="HotelRoomExperience-modalContent" onClick={(e) => e.stopPropagation()}>
          <button className="HotelRoomExperience-modalCloseBtn" onClick={handleCloseModal}>
            <FaTimes />
          </button>

          {isModalSubmitted ? (
            <div className="HotelRoomExperience-modalSuccess">
              <FaCheck className="HotelRoomExperience-successIcon" />
              <h3>Booking Request Sent!</h3>
              <p>We have received your booking details. Our agent will contact you shortly.</p>
              <button className="HotelRoomExperience-bookBtn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="HotelRoomExperience-modalForm">
              <h3 className="HotelRoomExperience-modalTitle">Complete Booking Inquiry</h3>
              
              <div className="HotelRoomExperience-formGroup">
                <label>Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={bookingFormData.fullName}
                  onChange={handleModalInputChange}
                />
              </div>

              <div className="HotelRoomExperience-formGroup">
                <label>Package Name</label>
                <input
                  type="text"
                  name="packageName"
                  required
                  value={bookingFormData.packageName}
                  onChange={handleModalInputChange}
                />
              </div>

              <div className="HotelRoomExperience-formGroup">
                <label>Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter phone number"
                  value={bookingFormData.phone}
                  onChange={handleModalInputChange}
                />
              </div>

              <div className="HotelRoomExperience-formGroup">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={bookingFormData.destination}
                  onChange={handleModalInputChange}
                />
              </div>

              <div className="HotelRoomExperience-formGrid">
                <div className="HotelRoomExperience-formGroup">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    required
                    value={bookingFormData.price}
                    onChange={handleModalInputChange}
                  />
                </div>

                <div className="HotelRoomExperience-formGroup">
                  <label>Member(s)</label>
                  <input
                    type="number"
                    name="member"
                    min="1"
                    required
                    value={bookingFormData.member}
                    onChange={handleModalInputChange}
                  />
                </div>
              </div>

              <div className="HotelRoomExperience-formGroup">
                <label>Category</label>
                <select
                  name="category"
                  value={bookingFormData.category}
                  onChange={handleModalInputChange}
                  className="HotelRoomExperience-select"
                >
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <button type="submit" className="HotelRoomExperience-bookBtn">
                Submit Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelRoomExperience;