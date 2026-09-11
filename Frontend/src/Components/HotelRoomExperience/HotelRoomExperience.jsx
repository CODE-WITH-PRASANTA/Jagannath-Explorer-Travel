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
  FaTimes
} from 'react-icons/fa';
import {
  FiShield,
  FiBox
} from 'react-icons/fi';
import {
  MdLocalLaundryService
} from 'react-icons/md';

const HotelRoomExperience = () => {
  // State for Booking Widget Controls
  const [bookingType, setBookingType] = useState('online'); // 'online' or 'inquiry'
  const [selectedDatePlan, setSelectedDatePlan] = useState(1);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(1);

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

  // Modal Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    packageName: 'Golden Tulip Luxury Package',
    phone: '',
    destination: 'Dhaka, Bangladesh',
    price: '₹470',
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
      member: adultCount + childCount,
      price: '₹470'
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
    "name": "Golden Tulip The Grandmark Dhaka - Jagannatha Tour and Travels",
    "description": "Welcome to the best five-star luxury hotel in New York.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House 168/170, Road 02, Avenue 01, Mirpur DOHS",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "8.1",
      "reviewCount": "94"
    },
    "priceRange": "₹280"
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
              <span>House 168/170, Road 02, Avenue 01, Mirpur DOHS, Dhaka, Bangladesh - </span>
              <a href="#see-map" className="HotelRoomExperience-mapLink">See Map</a>
            </div>
            
            <div className="HotelRoomExperience-ratingScore">
              <div className="HotelRoomExperience-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="HotelRoomExperience-starIcon" />
                ))}
              </div>
              <span className="HotelRoomExperience-ratingText">
                <strong>8.1 Excellent</strong> 94 reviews
              </span>
            </div>
          </div>

          <h1 id="hotel-title" className="HotelRoomExperience-title">
            Golden Tulip The Grandmark Dhaka
          </h1>
          <div className="HotelRoomExperience-priceRow">
            <span className="HotelRoomExperience-price">₹280</span>
            <span className="HotelRoomExperience-perNight">/per night</span>
          </div>

          <p className="HotelRoomExperience-description">
            Welcome to the best five-star luxury hotel in New York. Hotel is veryes elementum sesue the aucan vestibulum aliquam justo in sapien on thi rutrum volutpat.
          </p>

          {/* Highlights */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Highlights</h2>
            <div className="HotelRoomExperience-highlightsGrid">
              <div className="HotelRoomExperience-highlightCard">
                <FaTv className="HotelRoomExperience-highlightIcon" />
                <span>TV</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FaFire className="HotelRoomExperience-highlightIcon" />
                <span>Heater</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FiShield className="HotelRoomExperience-highlightIcon" />
                <span>Saving Safe</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FaWifi className="HotelRoomExperience-highlightIcon" />
                <span>Free Wifi</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FaPhoneAlt className="HotelRoomExperience-highlightIcon" />
                <span>Phone</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FiBox className="HotelRoomExperience-highlightIcon" />
                <span>Towels</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FaWind className="HotelRoomExperience-highlightIcon" />
                <span>Air Condition</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <FaWind className="HotelRoomExperience-highlightIcon" />
                <span>Hair Dryer</span>
              </div>
              <div className="HotelRoomExperience-highlightCard">
                <MdLocalLaundryService className="HotelRoomExperience-highlightIcon" />
                <span>Laundry</span>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Facilities</h2>
            <div className="HotelRoomExperience-facilitiesGrid">
              <div className="HotelRoomExperience-facilityItem">
                <FaCheck className="HotelRoomExperience-checkIcon" />
                <span>Airport transfer</span>
              </div>
              <div className="HotelRoomExperience-facilityItem">
                <FaCheck className="HotelRoomExperience-checkIcon" />
                <span>Free Wi-Fi in all rooms!</span>
              </div>
              <div className="HotelRoomExperience-facilityItem">
                <FaCheck className="HotelRoomExperience-checkIcon" />
                <span>Fitness center</span>
              </div>
              <div className="HotelRoomExperience-facilityItem">
                <FaCheck className="HotelRoomExperience-checkIcon" />
                <span>Luggage storage</span>
              </div>
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
                      <span className="HotelRoomExperience-currPrice">₹60</span>
                      <span className="HotelRoomExperience-oldPrice">₹80</span>
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
                      <span className="HotelRoomExperience-currPrice">₹15</span>
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
                    <span className="HotelRoomExperience-extraPrice">₹10</span>
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
                    <span className="HotelRoomExperience-extraPrice">₹15</span>
                  </label>
                </div>

                {/* Total Price & Action Button */}
                <div className="HotelRoomExperience-totalRow">
                  <span className="HotelRoomExperience-totalLabel">Total Price:</span>
                  <span className="HotelRoomExperience-totalAmount">₹470</span>
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