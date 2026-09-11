import React, { useState, useMemo, useRef } from 'react';
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
import { FiShield, FiBox } from 'react-icons/fi';
import { MdLocalLaundryService } from 'react-icons/md';

const HotelRoomExperience = () => {
  const [bookingType, setBookingType] = useState('online'); // 'online' | 'inquiry'
  const [selectedDatePlan, setSelectedDatePlan] = useState(1); // 1, 2, or 'custom'
  const [customCheckIn, setCustomCheckIn] = useState('');
  const [customCheckOut, setCustomCheckOut] = useState('');
  const customDateInputRef = useRef(null);

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(1);

  // Extra Services
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false
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

  // Pricing Calculation
  const totalPrice = useMemo(() => {
    const adultCost = adultCount * 60;
    const childCost = childCount * 15;
    const pickupCost = extraServices.homePickup ? 10 : 0;
    const foodCost = extraServices.nightFood ? 15 : 0;
    const baseRoom = 280; // room base rate

    return baseRoom + adultCost + childCost + pickupCost + foodCost;
  }, [adultCount, childCount, extraServices]);

  // Inline Form Handlers
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
      price: `₹${totalPrice}`
    }));
    setIsModalSubmitted(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsModalSubmitted(true);
  };

  // Trigger browser date picker when clicking on the custom box
  const handleTriggerDatePicker = () => {
    setSelectedDatePlan('custom');
    if (customDateInputRef.current) {
      if (typeof customDateInputRef.current.showPicker === 'function') {
        customDateInputRef.current.showPicker();
      } else {
        customDateInputRef.current.focus();
      }
    }
  };

  return (
    <section className="HotelRoomExperience" aria-labelledby="hotel-title">
      <div className="HotelRoomExperience-container">
        {/* Left Column: Hotel Info */}
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

        {/* Right Column: Booking Widget */}
        <div className="HotelRoomExperience-right">
          <div className="HotelRoomExperience-bookingCard">
            <h3 className="HotelRoomExperience-cardTitle">Book Your Room</h3>
            <p className="HotelRoomExperience-cardSubtitle">
              Reserve your ideal Room early for a hassle-free trip; secure comfort and convenience!
            </p>

            {/* Switch Tabs */}
            <div className="HotelRoomExperience-tabs">
              <button
                type="button"
                className={`HotelRoomExperience-tabBtn ${bookingType === 'online' ? 'active' : ''}`}
                onClick={() => setBookingType('online')}
              >
                Online Booking
              </button>
              <button
                type="button"
                className={`HotelRoomExperience-tabBtn ${bookingType === 'inquiry' ? 'active' : ''}`}
                onClick={() => setBookingType('inquiry')}
              >
                Inquiry Form
              </button>
            </div>

            {bookingType === 'online' ? (
              <>
                {/* Date Selection */}
                <div className="HotelRoomExperience-dateSection">
                  <span className="HotelRoomExperience-label">Select Your Booking Date:</span>

                  {/* Option 1 */}
                  <div
                    className={`HotelRoomExperience-dateOption ${selectedDatePlan === 1 ? 'selected' : ''}`}
                    onClick={() => setSelectedDatePlan(1)}
                  >
                    <div className="HotelRoomExperience-squareCheck">
                      {selectedDatePlan === 1 && <span className="HotelRoomExperience-squareTick" />}
                    </div>
                    <div className="HotelRoomExperience-dateDetails">
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check In</span>
                        <span className="HotelRoomExperience-dateText">Jan 1, 2024</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check Out</span>
                        <span className="HotelRoomExperience-dateText">Jan 5, 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div
                    className={`HotelRoomExperience-dateOption ${selectedDatePlan === 2 ? 'selected' : ''}`}
                    onClick={() => setSelectedDatePlan(2)}
                  >
                    <div className="HotelRoomExperience-squareCheck">
                      {selectedDatePlan === 2 && <span className="HotelRoomExperience-squareTick" />}
                    </div>
                    <div className="HotelRoomExperience-dateDetails">
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check In</span>
                        <span className="HotelRoomExperience-dateText">Jan 10, 2024</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check Out</span>
                        <span className="HotelRoomExperience-dateText">Jan 15, 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 3: Custom Date Picker */}
                  <div
                    className={`HotelRoomExperience-dateOptionCustom ${selectedDatePlan === 'custom' ? 'selected' : ''}`}
                    onClick={handleTriggerDatePicker}
                  >
                    <div className="HotelRoomExperience-squareCheck">
                      {selectedDatePlan === 'custom' && <span className="HotelRoomExperience-squareTick" />}
                    </div>
                    <div className="HotelRoomExperience-customInputContainer">
                      <span className="HotelRoomExperience-customText">
                        {customCheckIn && customCheckOut
                          ? `${customCheckIn} to ${customCheckOut}`
                          : 'Check In & Out Data'}
                      </span>
                      <FaCalendarAlt className="HotelRoomExperience-calIcon" />
                      
                      <input
                        ref={customDateInputRef}
                        type="date"
                        className="HotelRoomExperience-hiddenDateInput"
                        value={customCheckIn}
                        onChange={(e) => {
                          setCustomCheckIn(e.target.value);
                          if (!customCheckOut) setCustomCheckOut(e.target.value);
                          setSelectedDatePlan('custom');
                        }}
                      />
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
                    <div className="HotelRoomExperience-counterPill">
                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                        aria-label="Decrease adult"
                      >
                        <FaChevronDown />
                      </button>
                      <span className="HotelRoomExperience-counterVal">{adultCount}</span>
                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setAdultCount(adultCount + 1)}
                        aria-label="Increase adult"
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
                    <div className="HotelRoomExperience-counterPill">
                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                        aria-label="Decrease children"
                      >
                        <FaChevronDown />
                      </button>
                      <span className="HotelRoomExperience-counterVal">{childCount}</span>
                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() => setChildCount(childCount + 1)}
                        aria-label="Increase children"
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

                {/* Total Price */}
                <div className="HotelRoomExperience-totalRow">
                  <span className="HotelRoomExperience-totalLabel">Total Price:</span>
                  <span className="HotelRoomExperience-totalAmount">₹{totalPrice}</span>
                </div>

                <button
                  type="button"
                  className="HotelRoomExperience-bookNowMainBtn"
                  onClick={handleOpenModal}
                >
                  Book Now
                </button>
              </>
            ) : (
              /* Inline Inquiry Form */
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
                      />
                    </div>

                    <button type="submit" className="HotelRoomExperience-bookNowMainBtn">
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Popup Modal */}
      <div
        className={`HotelRoomExperience-modalOverlay ${isModalOpen ? 'active' : ''}`}
        onClick={handleCloseModal}
      >
        <div
          className="HotelRoomExperience-modalContent"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="HotelRoomExperience-modalCloseBtn"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          {isModalSubmitted ? (
            <div className="HotelRoomExperience-modalSuccess">
              <FaCheck className="HotelRoomExperience-successIcon" />
              <h3>Booking Request Sent!</h3>
              <p>We have received your booking details. Our team will contact you shortly.</p>
              <button
                type="button"
                className="HotelRoomExperience-bookNowMainBtn"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="HotelRoomExperience-modalForm">
              <h3 className="HotelRoomExperience-modalTitle">Complete Booking</h3>

              <div className="HotelRoomExperience-formGroup">
                <label>Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter full name"
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
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <button type="submit" className="HotelRoomExperience-bookNowMainBtn">
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