import React, { useState, useEffect, useRef } from 'react';
import './TourExperience.css';

// React Icons Imports
import { 
  FaClock, FaUser, FaMapMarkerAlt, FaCheck, FaTimes, 
  FaCheckCircle, FaChevronUp, FaChevronDown, FaCalendarAlt, 
  FaMinus, FaPlus, FaPhoneAlt 
} from 'react-icons/fa';

// Import Support Banner Image
import supportAgent from '../../assets/img 10.webp';

const PRESET_DATES = [
  { checkIn: '2024-01-01', checkOut: '2024-01-05', inText: 'Jan 1, 2024', outText: 'Jan 5, 2024', days: 4 },
  { checkIn: '2024-01-10', checkOut: '2024-01-15', inText: 'Jan 10, 2024', outText: 'Jan 15, 2024', days: 5 }
];

const ADULT_PRICE = 60;
const CHILD_PRICE = 15;
const SERVICE_PRICES = {
  homePickup: 10,
  nightFood: 15,
  seaplane: 20
};

const TourExperience = () => {
  const hiddenDateInputRef = useRef(null);

  // Booking Form States
  const [bookingTab, setBookingTab] = useState('online'); // 'online' or 'inquiry'
  const [selectedDateOption, setSelectedDateOption] = useState(2); // 0 = preset 1, 1 = preset 2, 2 = custom input
  const [customDateValue, setCustomDateValue] = useState('2024-01-05');
  const [customDateDisplay, setCustomDateDisplay] = useState('5 Jan, 2024');

  const [adultQty, setAdultQty] = useState(1);
  const [childQty, setChildQty] = useState(0);
  
  // Extra Services State
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplane: false,
  });

  // Accordion Itinerary State
  const [openDay, setOpenDay] = useState(1);

  // Inquiry Form Inputs State
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '', email: '', phone: '', message: ''
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '', packageName: 'Golden Tulip Luxury Package', phone: '',
    destination: 'Italy & France', price: '₹470', members: '1', category: 'Standard'
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Determine active days based on selection
  const getActiveDays = () => {
    if (selectedDateOption === 0) return PRESET_DATES[0].days;
    if (selectedDateOption === 1) return PRESET_DATES[1].days;
    return 4; // Default base duration for custom selection
  };

  const currentDays = getActiveDays();

  // Pricing calculations
  const adultSubtotal = ADULT_PRICE * adultQty * currentDays;
  const childSubtotal = CHILD_PRICE * childQty * currentDays;
  const servicesTotal = 
    (extraServices.homePickup ? SERVICE_PRICES.homePickup : 0) +
    (extraServices.nightFood ? SERVICE_PRICES.nightFood : 0) +
    (extraServices.seaplane ? SERVICE_PRICES.seaplane : 0);

  const totalPrice = adultSubtotal + childSubtotal + servicesTotal;

  // Trigger native datepicker
  const handleTriggerDatePicker = () => {
    setSelectedDateOption(2);
    if (hiddenDateInputRef.current) {
      if (typeof hiddenDateInputRef.current.showPicker === 'function') {
        hiddenDateInputRef.current.showPicker();
      } else {
        hiddenDateInputRef.current.focus();
      }
    }
  };

  // Format date to "D Mon, YYYY"
  const handleDateChange = (e) => {
    const rawVal = e.target.value;
    if (!rawVal) return;
    setCustomDateValue(rawVal);
    setSelectedDateOption(2);

    const [year, month, day] = rawVal.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}, ${year}`;
    setCustomDateDisplay(formatted);
  };

  const toggleDay = (dayNum) => setOpenDay(openDay === dayNum ? null : dayNum);

  const handleServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({ ...prev, [serviceKey]: !prev[serviceKey] }));
  };

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${inquiryForm.fullName}! Your inquiry has been sent.`);
    setInquiryForm({ fullName: '', email: '', phone: '', message: '' });
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    alert('Booking Inquiry submitted successfully!');
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalForm((prev) => ({
      ...prev,
      price: `₹${totalPrice}`,
      members: `${adultQty + childQty} (${adultQty} Adult, ${childQty} Child)`
    }));
    setIsModalOpen(true);
  };

  return (
    <section className="TourExperience">
      <div className="TourExperience-container">
        
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="TourExperience-mainContent">
          <h1 className="TourExperience-title">
            Experience the tour of excitement with the most adventurous activities.
          </h1>

          <div className="TourExperience-priceTag">
            <span className="TourExperience-priceAmount">₹175</span>
            <span className="TourExperience-priceUnit">/per person</span>
          </div>

          <div className="TourExperience-metaRow">
            <div className="TourExperience-metaItem">
              <FaClock className="TourExperience-metaIcon" />
              <span>4 Days / 5 Night</span>
            </div>
            <div className="TourExperience-metaItem">
              <FaUser className="TourExperience-metaIcon" />
              <span>Max People : 40</span>
            </div>
            <div className="TourExperience-metaItem">
              <FaMapMarkerAlt className="TourExperience-metaIcon" />
              <span>Italy & France.</span>
            </div>
          </div>

          <div className="TourExperience-description">
            <p>Tour and travel refer to the activities related to planning, organizing, and experiencing trips to various destinations for leisure, exploration, adventure, or relaxation. Choose your destination based on your interests and preferences, whether it's a cultural experience, a natural adventure, historical exploration, or a beach vacation.</p>
            <p>Book suitable accommodation, which can range from hotels, resorts, hostels, vacation rentals, or even camping depending on your travel style and destination. Arrange transportation to and within your destination.</p>
          </div>

          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Included and Excluded</h2>
            <div className="TourExperience-incExcGrid">
              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-incItem"><FaCheck className="TourExperience-checkIcon" /><span>Meal As Per Hotel Plan And Drinks Free Too.</span></div>
                <div className="TourExperience-incItem"><FaCheck className="TourExperience-checkIcon" /><span>Return Airport And Round Trip Transfers.</span></div>
                <div className="TourExperience-incItem"><FaCheck className="TourExperience-checkIcon" /><span>Accommodation On Twin Sharing Basis.</span></div>
                <div className="TourExperience-incItem"><FaCheck className="TourExperience-checkIcon" /><span>The Above Rates Are On Per Day Disposal Basis.</span></div>
                <div className="TourExperience-incItem"><FaCheck className="TourExperience-checkIcon" /><span>Enjoy Brussels Day Tours. Overnight Brussels.</span></div>
              </div>
              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-excItem"><FaTimes className="TourExperience-timesIcon" /><span>AC Will Not Be Functional On Hills Or Slopes.</span></div>
                <div className="TourExperience-excItem"><FaTimes className="TourExperience-timesIcon" /><span>Any Other Service Not Mentioned.</span></div>
                <div className="TourExperience-excItem"><FaTimes className="TourExperience-timesIcon" /><span>Additional Entry Fees Other Than Specified.</span></div>
                <div className="TourExperience-excItem"><FaTimes className="TourExperience-timesIcon" /><span>Amsterdam Canal Cruise Not Included For Basic.</span></div>
              </div>
            </div>
          </div>

          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Highlights of the Tour</h2>
            <div className="TourExperience-highlightsList">
              <div className="TourExperience-highlightItem"><FaCheckCircle className="TourExperience-greenCircleIcon" /><span>Our Team Of Knowledgeable Guides And Travel Experts Are Dedicated To Making Your Journey Memorable And Worry-Free.</span></div>
              <div className="TourExperience-highlightItem"><FaCheckCircle className="TourExperience-greenCircleIcon" /><span>Dive Into Rich Cultures And Traditions. Explore Historic Sites, Savor Authentic Cuisine, And Connect With Locals.</span></div>
              <div className="TourExperience-highlightItem"><FaCheckCircle className="TourExperience-greenCircleIcon" /><span>We Take Care Of All The Details, So You Can Focus On Creating Memories. Rest Assured That Your Journey Is In Capable Hands.</span></div>
              <div className="TourExperience-highlightItem"><FaCheckCircle className="TourExperience-greenCircleIcon" /><span>Sip Cocktails On The Beach As You Watch The Sun Dip Below The Horizon.</span></div>
              <div className="TourExperience-highlightItem"><FaCheckCircle className="TourExperience-greenCircleIcon" /><span>From Accommodations To Dining Experiences, We Select The Best Partners To Ensure Your Comfort.</span></div>
            </div>
          </div>

          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Itinerary</h2>
            <div className="TourExperience-itineraryAccordion">
              <div className={`TourExperience-accordionItem ${openDay === 1 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(1)}>
                  <div className="TourExperience-dayBadge">Day 01 :</div>
                  <h3 className="TourExperience-dayTitle">Departure</h3>
                  {openDay === 1 ? <FaChevronUp className="TourExperience-accordionIcon" /> : <FaChevronDown className="TourExperience-accordionIcon" />}
                </div>
                {openDay === 1 && (
                  <div className="TourExperience-accordionBody">
                    <p>Arrive Cairo airport, welcome greeting by our representative who will assist you and provide transfers to your Hotel in Cairo.</p>
                    <div className="TourExperience-daySubItem"><FaCheck className="TourExperience-checkIcon" /><span>Admire Big Ben, Buckingham Palace And St Paul’s Cathedral</span></div>
                    <div className="TourExperience-daySubItem"><FaCheck className="TourExperience-checkIcon" /><span>Chance To Spot Prominent Landmarks Of The City</span></div>
                  </div>
                )}
              </div>

              <div className={`TourExperience-accordionItem ${openDay === 2 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(2)}>
                  <div className="TourExperience-dayBadge">Day 02 :</div>
                  <h3 className="TourExperience-dayTitle">Adventure Begins</h3>
                  {openDay === 2 ? <FaChevronUp className="TourExperience-accordionIcon" /> : <FaChevronDown className="TourExperience-accordionIcon" />}
                </div>
                {openDay === 2 && (
                  <div className="TourExperience-accordionBody"><p>Explore city monuments and embark on the adventure tour.</p></div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="TourExperience-sidebar">
          
          <div className="TourExperience-bookingCard">
            <h2 className="TourExperience-bookingTitle">Book Your Tour</h2>
            <p className="TourExperience-bookingSubtitle">
              Reserve your ideal trip early for a hassle-free trip; secure comfort and convenience!
            </p>

            {/* Online / Inquiry Tabs */}
            <div className="TourExperience-tabs">
              <button 
                type="button" 
                className={`TourExperience-tab ${bookingTab === 'online' ? 'TourExperience-activeTab' : ''}`} 
                onClick={() => setBookingTab('online')}
              >
                Online Booking
              </button>
              <button 
                type="button" 
                className={`TourExperience-tab ${bookingTab === 'inquiry' ? 'TourExperience-activeTab' : ''}`} 
                onClick={() => setBookingTab('inquiry')}
              >
                Inquiry Form
              </button>
            </div>

            {/* TAB 1: ONLINE BOOKING */}
            {bookingTab === 'online' && (
              <div className="TourExperience-onlineSection">
                <div className="TourExperience-fieldGroup">
                  <label className="TourExperience-fieldLabel">Select Your Booking Date:</label>
                  
                  {/* Preset 1 */}
                  <div 
                    className="TourExperience-dateOption"
                    onClick={() => setSelectedDateOption(0)}
                  >
                    <div className={`TourExperience-checkboxSquare ${selectedDateOption === 0 ? 'TourExperience-activeSquare' : ''}`}>
                      {selectedDateOption === 0 && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <div className="TourExperience-dateTextGroup">
                      <div>
                        <span className="TourExperience-dateLabel">Check In</span>
                        <span className="TourExperience-dateValue">Jan 1, 2024</span>
                      </div>
                      <span className="TourExperience-dateArrow">➔</span>
                      <div>
                        <span className="TourExperience-dateLabel">Check Out</span>
                        <span className="TourExperience-dateValue">Jan 5, 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset 2 */}
                  <div 
                    className="TourExperience-dateOption"
                    onClick={() => setSelectedDateOption(1)}
                  >
                    <div className={`TourExperience-checkboxSquare ${selectedDateOption === 1 ? 'TourExperience-activeSquare' : ''}`}>
                      {selectedDateOption === 1 && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <div className="TourExperience-dateTextGroup">
                      <div>
                        <span className="TourExperience-dateLabel">Check In</span>
                        <span className="TourExperience-dateValue">Jan 10, 2024</span>
                      </div>
                      <span className="TourExperience-dateArrow">➔</span>
                      <div>
                        <span className="TourExperience-dateLabel">Check Out</span>
                        <span className="TourExperience-dateValue">Jan 15, 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Calendar Input Box */}
                  <div 
                    className={`TourExperience-customDateBox ${selectedDateOption === 2 ? 'TourExperience-customActive' : ''}`}
                    onClick={handleTriggerDatePicker}
                  >
                    <div className="TourExperience-checkboxSquare TourExperience-greenSquare">
                      {selectedDateOption === 2 && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    
                    <span className="TourExperience-customDateText">{customDateDisplay}</span>
                    
                    <FaCalendarAlt className="TourExperience-calendarIcon" />
                    
                    {/* Hidden Native Date Input */}
                    <input 
                      ref={hiddenDateInputRef}
                      type="date"
                      value={customDateValue}
                      onChange={handleDateChange}
                      className="TourExperience-hiddenDateInput"
                    />
                  </div>
                </div>

                {/* Adult & Child Counter Rows */}
                <div className="TourExperience-qtySection">
                  <div className="TourExperience-qtyRow">
                    <div className="TourExperience-qtyLabel">
                      <span className="TourExperience-personType">Adult:</span>
                      <span className="TourExperience-priceSale">₹60</span>
                      <span className="TourExperience-priceOriginal">₹80</span>
                    </div>
                    <div className="TourExperience-counter">
                      <button 
                        type="button" 
                        className="TourExperience-counterBtn" 
                        onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                        aria-label="Decrease Adults"
                      >
                        <FaMinus />
                      </button>
                      <span className="TourExperience-countValue">{adultQty}</span>
                      <button 
                        type="button" 
                        className="TourExperience-counterBtn" 
                        onClick={() => setAdultQty(adultQty + 1)}
                        aria-label="Increase Adults"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="TourExperience-qtyRow">
                    <div className="TourExperience-qtyLabel">
                      <span className="TourExperience-personType">Children:</span>
                      <span className="TourExperience-priceSale">₹15</span>
                    </div>
                    <div className="TourExperience-counter">
                      <button 
                        type="button" 
                        className="TourExperience-counterBtn" 
                        onClick={() => setChildQty(Math.max(0, childQty - 1))}
                        aria-label="Decrease Children"
                      >
                        <FaMinus />
                      </button>
                      <span className="TourExperience-countValue">{childQty}</span>
                      <button 
                        type="button" 
                        className="TourExperience-counterBtn" 
                        onClick={() => setChildQty(childQty + 1)}
                        aria-label="Increase Children"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Extra Services Section */}
                <div className="TourExperience-extraServices">
                  <h3 className="TourExperience-extraTitle">Other Extra Services</h3>
                  
                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('homePickup')}>
                    <div className={`TourExperience-checkboxSquare ${extraServices.homePickup ? 'TourExperience-activeSquare' : ''}`}>
                      {extraServices.homePickup && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Home Pickup</span>
                    <span className="TourExperience-extraPrice">₹10</span>
                  </div>

                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('nightFood')}>
                    <div className={`TourExperience-checkboxSquare ${extraServices.nightFood ? 'TourExperience-activeSquare' : ''}`}>
                      {extraServices.nightFood && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Night Food</span>
                    <span className="TourExperience-extraPrice">₹15</span>
                  </div>

                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('seaplane')}>
                    <div className={`TourExperience-checkboxSquare ${extraServices.seaplane ? 'TourExperience-activeSquare' : ''}`}>
                      {extraServices.seaplane && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Seaplane Fyling</span>
                    <span className="TourExperience-extraPrice">₹20</span>
                  </div>
                </div>

                {/* Breakdown Calculation Items */}
                <div className="TourExperience-breakdownBox">
                  <div className="TourExperience-breakdownItem">
                    <span className="TourExperience-breakdownType">Adult</span>
                    <div className="TourExperience-formula">
                      <span className="TourExperience-calcVal">₹195 <small>PRICE</small></span>
                      <span className="TourExperience-operator">×</span>
                      <span className="TourExperience-calcVal">{String(adultQty).padStart(2, '0')} <small>QTY</small></span>
                      <span className="TourExperience-operator">×</span>
                      <span className="TourExperience-calcVal">{String(currentDays).padStart(2, '0')} <small>DAYS</small></span>
                    </div>
                    <span className="TourExperience-breakdownArrow">➔</span>
                    <span className="TourExperience-breakdownTotal">₹{adultSubtotal || 390}</span>
                  </div>

                  <div className="TourExperience-breakdownItem">
                    <span className="TourExperience-breakdownType">Children</span>
                    <div className="TourExperience-formula">
                      <span className="TourExperience-calcVal">₹195 <small>PRICE</small></span>
                      <span className="TourExperience-operator">×</span>
                      <span className="TourExperience-calcVal">{String(childQty).padStart(2, '0')} <small>QTY</small></span>
                      <span className="TourExperience-operator">×</span>
                      <span className="TourExperience-calcVal">{String(currentDays).padStart(2, '0')} <small>DAYS</small></span>
                    </div>
                    <span className="TourExperience-breakdownArrow">➔</span>
                    <span className="TourExperience-breakdownTotal">₹{childSubtotal || 390}</span>
                  </div>
                </div>

                {/* Total Price Row */}
                <div className="TourExperience-totalRow">
                  <span className="TourExperience-totalLabel">Total Price:</span>
                  <span className="TourExperience-totalValue">₹{totalPrice}</span>
                </div>

                {/* Book Now Button */}
                <button 
                  type="button" 
                  className="TourExperience-bookNowBtn" 
                  onClick={handleOpenModal}
                >
                  Book Now
                </button>
              </div>
            )}

            {/* TAB 2: INQUIRY FORM */}
            {bookingTab === 'inquiry' && (
              <form className="TourExperience-inquiryForm" onSubmit={handleInquirySubmit}>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Enter your name" 
                    value={inquiryForm.fullName} 
                    onChange={handleInquiryChange} 
                    required 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={inquiryForm.email} 
                    onChange={handleInquiryChange} 
                    required 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter phone number" 
                    value={inquiryForm.phone} 
                    onChange={handleInquiryChange} 
                    required 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Message / Requirements</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Type your message..." 
                    value={inquiryForm.message} 
                    onChange={handleInquiryChange} 
                    required 
                    className="TourExperience-inquiryTextarea"
                  ></textarea>
                </div>
                <button type="submit" className="TourExperience-submitInquiryBtn">Submit Inquiry</button>
              </form>
            )}

          </div>

          {/* Support Agent Card */}
          <div className="TourExperience-supportCard">
            <img src={supportAgent} alt="Customer Support Agent" className="TourExperience-supportImg" />
            <div className="TourExperience-supportBanner">
              <div className="TourExperience-phoneCircle"><FaPhoneAlt className="TourExperience-phoneIcon" /></div>
              <div className="TourExperience-supportText">
                <span className="TourExperience-supportLabel">To More Inquiry</span>
                <span className="TourExperience-phoneNumber">+990-737 621 432</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= MODAL: COMPLETE BOOKING ================= */}
      {isModalOpen && (
        <div className="TourExperience-modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="TourExperience-modalBox" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="TourExperience-modalCloseBtn" 
              onClick={() => setIsModalOpen(false)} 
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h2 className="TourExperience-modalTitle">Complete Booking Inquiry</h2>

            <form className="TourExperience-modalForm" onSubmit={handleModalSubmit}>
              <div className="TourExperience-modalGroup">
                <label className="TourExperience-modalLabel">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={modalForm.name} 
                  onChange={handleModalChange} 
                  required 
                  className="TourExperience-modalInput" 
                />
              </div>

              <div className="TourExperience-modalGroup">
                <label className="TourExperience-modalLabel">Package Name</label>
                <input 
                  type="text" 
                  name="packageName" 
                  value={modalForm.packageName} 
                  onChange={handleModalChange} 
                  required 
                  className="TourExperience-modalInput" 
                />
              </div>

              <div className="TourExperience-modalGroup">
                <label className="TourExperience-modalLabel">Phone No.</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Enter phone number" 
                  value={modalForm.phone} 
                  onChange={handleModalChange} 
                  required 
                  className="TourExperience-modalInput" 
                />
              </div>

              <div className="TourExperience-modalGroup">
                <label className="TourExperience-modalLabel">Destination</label>
                <input 
                  type="text" 
                  name="destination" 
                  value={modalForm.destination} 
                  onChange={handleModalChange} 
                  required 
                  className="TourExperience-modalInput" 
                />
              </div>
              
              <div className="TourExperience-modalRow">
                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">Price</label>
                  <input 
                    type="text" 
                    name="price" 
                    value={modalForm.price} 
                    onChange={handleModalChange} 
                    className="TourExperience-modalInput" 
                  />
                </div>
                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">Member(s)</label>
                  <input 
                    type="text" 
                    name="members" 
                    value={modalForm.members} 
                    onChange={handleModalChange} 
                    className="TourExperience-modalInput" 
                  />
                </div>
              </div>

              <div className="TourExperience-modalGroup">
                <label className="TourExperience-modalLabel">Category</label>
                <select 
                  name="category" 
                  value={modalForm.category} 
                  onChange={handleModalChange} 
                  className="TourExperience-modalSelect"
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Super Deluxe">Super Deluxe</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <button type="submit" className="TourExperience-modalSubmitBtn">Submit Booking</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourExperience;