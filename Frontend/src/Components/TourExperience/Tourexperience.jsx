import React, { useState, useEffect, useRef } from 'react';
import './Tourexperience.css';

// React Icons Imports
import { 
  FaClock, 
  FaUser, 
  FaMapMarkerAlt, 
  FaCheck, 
  FaTimes, 
  FaCheckCircle, 
  FaChevronUp, 
  FaChevronDown, 
  FaCalendarAlt, 
  FaMinus, 
  FaPlus, 
  FaPhoneAlt,
  FaLongArrowAltRight
} from 'react-icons/fa';

// Import Support Banner Image
import supportAgent from '../../assets/img 10.webp';

const SERVICE_PRICES = {
  homePickup: 500,
  nightFood: 750,
  seaplane: 1200
};

const TourExperience = ({ tour }) => {
  const hiddenDateInputRef = useRef(null);

  // Helper to parse lists from array or delimited strings
  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map(String).map((s) => s.trim()).filter(Boolean);
    if (typeof val === 'string') {
      return val.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  // Real lists from database with graceful fallbacks
  const dbIncludes = parseList(tour?.includes);
  const dbExcludes = parseList(tour?.excludes);
  const dbHighlights = parseList(tour?.tags);

  const includedList = dbIncludes.length > 0 ? dbIncludes : [
    'Private AC Cab for Sightseeing',
    'Experienced Driver cum Tour Guide',
    'Special Temple VIP Darshan Assistance',
    'Hotel Pick-up & Drop Service',
    'All Toll Taxes, Parking & Fuel Charges'
  ];

  const excludedList = dbExcludes.length > 0 ? dbExcludes : [
    'Monument & Camera Entry Tickets',
    'Personal Expenses & Shopping',
    'Any Extra Meals or Refreshments',
    'Anything not mentioned in Inclusions'
  ];

  const highlightsList = dbHighlights.length > 0 ? dbHighlights : [
    'Sacred Jagannath Temple Darshan & Mahaprasad Experience',
    'Witness Majestic Konark Sun Temple Architecture',
    'Scenic Golden Beach Walk & Sunrise Moments in Puri',
    'Enchanting Chilika Lake Dolphin & Bird Watching'
  ];

  // Itinerary parsing from database
  let itineraryList = [];
  if (tour?.itinerary) {
    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      itineraryList = tour.itinerary;
    } else if (typeof tour.itinerary === 'string') {
      try {
        const parsed = JSON.parse(tour.itinerary);
        if (Array.isArray(parsed) && parsed.length > 0) itineraryList = parsed;
      } catch {
        itineraryList = [];
      }
    }
  }

  if (itineraryList.length === 0) {
    itineraryList = [
      {
        dayNumber: "Day 01",
        title: `Arrival & ${tour?.destination || "Puri"} Temple Darshan`,
        description: `Warm welcome upon arrival. Transfer to the hotel. Proceed for sacred darshan of Lord Jagannath and evening spiritual atmosphere around Grand Road.`,
        highlights: ["Hotel Check-in & Refreshment", "Jagannath Temple Darshan", "Evening Beach Walk"]
      },
      {
        dayNumber: "Day 02",
        title: `Konark Sun Temple & Marine Drive Sightseeing`,
        description: `After breakfast, explore the UNESCO World Heritage Sun Temple at Konark and the pristine Chandrabhaga Beach along the scenic Marine Drive.`,
        highlights: ["Konark Sun Temple Visit", "Chandrabhaga Beach", "Local Craft & Handloom Village"]
      },
      {
        dayNumber: "Day 03",
        title: `Chilika Lake Excursion & Departure`,
        description: `Drive to Chilika Lake (Satapada) for boating and Irrawaddy dolphin spotting. Evening drop-off at station/airport with blessed memories.`,
        highlights: ["Chilika Lake Boating", "Dolphin Point", "Return Transfer"]
      }
    ];
  }

  // Dynamic slot dates
  const getFormattedDate = (daysAhead) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const slot1In = getFormattedDate(2);
  const slot1Out = getFormattedDate(5);
  const slot2In = getFormattedDate(7);
  const slot2Out = getFormattedDate(10);

  // Booking Form States
  const [bookingTab, setBookingTab] = useState('online'); // 'online' or 'inquiry'
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // 0 = slot 1, 1 = slot 2, null = custom
  const [customDate, setCustomDate] = useState('');
  const [adultQty, setAdultQty] = useState(2);
  const [childQty, setChildQty] = useState(0);

  // Extra Services State
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplane: false,
  });

  // Accordion Itinerary State (Day 1 open by default)
  const [openDay, setOpenDay] = useState(1);

  // Inquiry Form State
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isInquirySent, setIsInquirySent] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    packageName: tour?.title || 'Odisha Heritage Tour Package',
    phone: '',
    destination: tour?.destination || 'Odisha',
    price: '',
    members: '',
    category: 'Standard'
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

  // Pricing calculations
  const adultPrice = Number(tour?.price) || 2999;
  const childPrice = Number(tour?.discountPrice) > 0 ? Number(tour?.discountPrice) : Math.round(adultPrice * 0.5);
  const pickupCost = extraServices.homePickup ? SERVICE_PRICES.homePickup : 0;
  const foodCost = extraServices.nightFood ? SERVICE_PRICES.nightFood : 0;
  const seaplaneCost = extraServices.seaplane ? SERVICE_PRICES.seaplane : 0;
  const extrasTotal = pickupCost + foodCost + seaplaneCost;
  const totalPrice = (adultPrice * adultQty) + (childPrice * childQty) + extrasTotal;

  const toggleDay = (dayNum) => setOpenDay(openDay === dayNum ? null : dayNum);

  const handleServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({ ...prev, [serviceKey]: !prev[serviceKey] }));
  };

  const handleTriggerDatePicker = () => {
    setSelectedDateIndex(null);
    if (hiddenDateInputRef.current) {
      if (typeof hiddenDateInputRef.current.showPicker === 'function') {
        hiddenDateInputRef.current.showPicker();
      } else {
        hiddenDateInputRef.current.focus();
      }
    }
  };

  const handleOpenModal = () => {
    setModalForm((prev) => ({
      ...prev,
      packageName: tour?.title || prev.packageName,
      destination: tour?.destination || prev.destination,
      price: `₹${totalPrice.toLocaleString('en-IN')}`,
      members: `${adultQty + childQty} (${adultQty} Adult, ${childQty} Child)`
    }));
    setIsModalOpen(true);
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

  const handleBookNow = () => {
    const tourTitle = tour?.title || "Odisha Holiday Tour";
    const selectedDate = customDate || (selectedDateIndex === 0 ? slot1In : slot2In);
    const msg = `Jai Jagannath! I would like to book the tour: *${tourTitle}*\n- Destination: ${tour?.destination || 'Odisha'}\n- Date: ${selectedDate}\n- Adults: ${adultQty}, Children: ${childQty}\n- Total Price: ₹${totalPrice.toLocaleString('en-IN')}\nPlease share confirmation and itinerary details.`;
    window.open(`https://wa.me/919668892441?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const tourTitle = tour?.title || "Odisha Holiday Tour";
    const msg = `Inquiry for Tour: *${tourTitle}*\nName: ${inquiryData.fullName}\nPhone: ${inquiryData.phone}\nEmail: ${inquiryData.email || 'N/A'}\nMessage: ${inquiryData.message || 'I want more details regarding this package.'}`;
    window.open(`https://wa.me/919668892441?text=${encodeURIComponent(msg)}`, '_blank');
    setIsInquirySent(true);
  };

  return (
    <section className="TourExperience">
      <div className="TourExperience-container">
        
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="TourExperience-mainContent">
          <h1 className="TourExperience-title">
            {tour?.title || "Jagannath Dham & Odisha Tour Package"}
          </h1>

          <div className="TourExperience-priceTag">
            <span className="TourExperience-priceAmount">
              ₹{adultPrice.toLocaleString('en-IN')}
            </span>
            <span className="TourExperience-priceUnit">/per person</span>
          </div>

          <div className="TourExperience-metaRow">
            {tour?.duration && (
              <div className="TourExperience-metaItem">
                <FaClock className="TourExperience-metaIcon" />
                <span>{tour.duration}</span>
              </div>
            )}
            {tour?.maxPeople && (
              <div className="TourExperience-metaItem">
                <FaUser className="TourExperience-metaIcon" />
                <span>Max People : {tour.maxPeople}</span>
              </div>
            )}
            {tour?.destination && (
              <div className="TourExperience-metaItem">
                <FaMapMarkerAlt className="TourExperience-metaIcon" />
                <span>{tour.destination}</span>
              </div>
            )}
          </div>

          <div className="TourExperience-description">
            {tour?.detailedDescription ? (
              <p>{tour.detailedDescription}</p>
            ) : tour?.shortDescription ? (
              <p>{tour.shortDescription}</p>
            ) : (
              <p>
                Experience the divine heritage of Odisha with our curated tour package. From the holy Puri Jagannath Temple to the architectural marvel of Konark Sun Temple and serene beaches, immerse yourself in an unforgettable journey of spiritual devotion, rich culture, and authentic Odia hospitality.
              </p>
            )}
          </div>

          {/* Included and Excluded */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Included and Excluded</h2>
            <div className="TourExperience-incExcGrid">
              <div className="TourExperience-incExcColumn">
                {includedList.map((item, idx) => (
                  <div className="TourExperience-incItem" key={idx}>
                    <FaCheck className="TourExperience-checkIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="TourExperience-incExcColumn">
                {excludedList.map((item, idx) => (
                  <div className="TourExperience-excItem" key={idx}>
                    <FaTimes className="TourExperience-timesIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Highlights of the Tour</h2>
            <div className="TourExperience-highlightsList">
              {highlightsList.map((item, idx) => (
                <div className="TourExperience-highlightItem" key={idx}>
                  <FaCheckCircle className="TourExperience-greenCircleIcon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Itinerary</h2>
            <div className="TourExperience-itineraryAccordion">
              {itineraryList.map((dayItem, idx) => {
                const dayBadgeText = dayItem.dayNumber || `Day ${String(idx + 1).padStart(2, '0')}`;
                const isItemOpen = openDay === idx + 1;
                const dayActivities = dayItem.highlights || dayItem.activities || [];

                return (
                  <div 
                    className={`TourExperience-accordionItem ${isItemOpen ? 'TourExperience-open' : ''}`}
                    key={idx}
                  >
                    <div 
                      className="TourExperience-accordionHeader" 
                      onClick={() => toggleDay(idx + 1)}
                    >
                      <div className="TourExperience-dayBadge">{dayBadgeText} :</div>
                      <h3 className="TourExperience-dayTitle">{dayItem.title || `Day ${idx + 1} Sightseeing`}</h3>
                      {isItemOpen ? (
                        <FaChevronUp className="TourExperience-accordionIcon" />
                      ) : (
                        <FaChevronDown className="TourExperience-accordionIcon" />
                      )}
                    </div>
                    {isItemOpen && (
                      <div className="TourExperience-accordionBody">
                        {dayItem.description && <p>{dayItem.description}</p>}
                        {Array.isArray(dayActivities) && dayActivities.map((act, aIdx) => (
                          <div className="TourExperience-daySubItem" key={aIdx}>
                            <FaCheck className="TourExperience-checkIcon" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
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
            {bookingTab === 'online' ? (
              <div className="TourExperience-onlineSection">
                {/* Date Selection */}
                <div className="TourExperience-fieldGroup">
                  <label className="TourExperience-fieldLabel">Select Your Booking Date:</label>
                  
                  {/* Preset Slot 1 */}
                  <div 
                    className={`TourExperience-dateOption ${selectedDateIndex === 0 ? 'TourExperience-selectedDate' : ''}`}
                    onClick={() => { setSelectedDateIndex(0); setCustomDate(''); }}
                  >
                    <div className="TourExperience-checkboxSquare">
                      {selectedDateIndex === 0 && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <div className="TourExperience-dateTextGroup">
                      <div>
                        <span className="TourExperience-dateLabel">Check In</span>
                        <span className="TourExperience-dateValue">{slot1In}</span>
                      </div>
                      <FaLongArrowAltRight className="TourExperience-dateArrow" />
                      <div>
                        <span className="TourExperience-dateLabel">Check Out</span>
                        <span className="TourExperience-dateValue">{slot1Out}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset Slot 2 */}
                  <div 
                    className={`TourExperience-dateOption ${selectedDateIndex === 1 ? 'TourExperience-selectedDate' : ''}`}
                    onClick={() => { setSelectedDateIndex(1); setCustomDate(''); }}
                  >
                    <div className="TourExperience-checkboxSquare">
                      {selectedDateIndex === 1 && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <div className="TourExperience-dateTextGroup">
                      <div>
                        <span className="TourExperience-dateLabel">Check In</span>
                        <span className="TourExperience-dateValue">{slot2In}</span>
                      </div>
                      <FaLongArrowAltRight className="TourExperience-dateArrow" />
                      <div>
                        <span className="TourExperience-dateLabel">Check Out</span>
                        <span className="TourExperience-dateValue">{slot2Out}</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Date Input */}
                  <div 
                    className={`TourExperience-customDateBox ${selectedDateIndex === null && customDate ? 'TourExperience-customActive' : ''}`}
                    onClick={handleTriggerDatePicker}
                  >
                    <div className="TourExperience-checkboxSquare TourExperience-greenSquare">
                      {selectedDateIndex === null && customDate && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    
                    <span className="TourExperience-customDateText">
                      {customDate || 'Pick Custom Date'}
                    </span>
                    
                    <FaCalendarAlt className="TourExperience-calendarIcon" />
                    
                    <input 
                      ref={hiddenDateInputRef}
                      type="date" 
                      value={customDate} 
                      onChange={(e) => { 
                        setCustomDate(e.target.value); 
                        setSelectedDateIndex(null); 
                      }}
                      className="TourExperience-hiddenDateInput" 
                    />
                  </div>
                </div>

                {/* Quantity Selectors */}
                <div className="TourExperience-qtySection">
                  {/* Adult */}
                  <div className="TourExperience-qtyRow">
                    <div className="TourExperience-qtyLabel">
                      <span className="TourExperience-personType">Adult:</span>
                      <span className="TourExperience-priceSale">₹{adultPrice.toLocaleString('en-IN')}</span>
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

                  {/* Children */}
                  <div className="TourExperience-qtyRow">
                    <div className="TourExperience-qtyLabel">
                      <span className="TourExperience-personType">Children:</span>
                      <span className="TourExperience-priceSale">₹{childPrice.toLocaleString('en-IN')}</span>
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

                {/* Extra Services */}
                <div className="TourExperience-extraServices">
                  <h3 className="TourExperience-extraTitle">Other Extra Services</h3>

                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('homePickup')}>
                    <div className="TourExperience-checkboxSquare">
                      {extraServices.homePickup && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Home / Airport Pickup</span>
                    <span className="TourExperience-extraPrice">₹{SERVICE_PRICES.homePickup}</span>
                  </div>

                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('nightFood')}>
                    <div className="TourExperience-checkboxSquare">
                      {extraServices.nightFood && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Special Mahaprasad / Food</span>
                    <span className="TourExperience-extraPrice">₹{SERVICE_PRICES.nightFood}</span>
                  </div>

                  <div className="TourExperience-extraRow" onClick={() => handleServiceChange('seaplane')}>
                    <div className="TourExperience-checkboxSquare">
                      {extraServices.seaplane && <span className="TourExperience-innerCheck"></span>}
                    </div>
                    <span className="TourExperience-extraName">Chilika Boating & Sightseeing</span>
                    <span className="TourExperience-extraPrice">₹{SERVICE_PRICES.seaplane}</span>
                  </div>
                </div>

                {/* Breakdown Calculation Items */}
                <div className="TourExperience-breakdownBox">
                  <div className="TourExperience-breakdownItem">
                    <span className="TourExperience-breakdownType">Adult</span>
                    <div className="TourExperience-formula">
                      <span>₹{adultPrice} <small>PRICE</small></span>
                      <span className="TourExperience-operator">×</span>
                      <span>{String(adultQty).padStart(2, '0')} <small>QTY</small></span>
                    </div>
                    <FaLongArrowAltRight className="TourExperience-breakdownArrow" />
                    <span className="TourExperience-breakdownTotal">₹{(adultPrice * adultQty).toLocaleString('en-IN')}</span>
                  </div>

                  {childQty > 0 && (
                    <div className="TourExperience-breakdownItem">
                      <span className="TourExperience-breakdownType">Children</span>
                      <div className="TourExperience-formula">
                        <span>₹{childPrice} <small>PRICE</small></span>
                        <span className="TourExperience-operator">×</span>
                        <span>{String(childQty).padStart(2, '0')} <small>QTY</small></span>
                      </div>
                      <FaLongArrowAltRight className="TourExperience-breakdownArrow" />
                      <span className="TourExperience-breakdownTotal">₹{(childPrice * childQty).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <div className="TourExperience-totalRow">
                  <span className="TourExperience-totalLabel">Total Price:</span>
                  <span className="TourExperience-totalValue">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button 
                    type="button" 
                    className="TourExperience-bookNowBtn" 
                    onClick={handleBookNow}
                    style={{ flex: 1 }}
                  >
                    WhatsApp Book
                  </button>
                  <button 
                    type="button" 
                    className="TourExperience-bookNowBtn" 
                    onClick={handleOpenModal}
                    style={{ flex: 1, backgroundColor: '#0f172a' }}
                  >
                    Quick Form
                  </button>
                </div>
              </div>
            ) : (
              /* TAB 2: INQUIRY FORM */
              <form className="TourExperience-inquiryForm" onSubmit={handleInquirySubmit}>
                {isInquirySent && (
                  <div style={{ padding: '10px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>
                    Inquiry submitted! Redirecting to WhatsApp...
                  </div>
                )}
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={inquiryData.fullName} 
                    onChange={(e) => setInquiryData({ ...inquiryData, fullName: e.target.value })} 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter mobile number" 
                    value={inquiryData.phone} 
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })} 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={inquiryData.email} 
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })} 
                    className="TourExperience-inquiryInput" 
                  />
                </div>
                <div className="TourExperience-inquiryGroup">
                  <label className="TourExperience-inquiryLabel">Message / Requirements</label>
                  <textarea 
                    rows="3" 
                    placeholder="Any specific requests or date..." 
                    value={inquiryData.message} 
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })} 
                    className="TourExperience-inquiryTextarea" 
                  ></textarea>
                </div>
                <button type="submit" className="TourExperience-submitInquiryBtn">
                  Submit Inquiry
                </button>
              </form>
            )}

          </div>

          {/* Support Agent Card */}
          <div className="TourExperience-supportCard">
            <img src={supportAgent} alt="Customer Support Agent" className="TourExperience-supportImg" />
            <div className="TourExperience-supportBanner">
              <div className="TourExperience-phoneCircle">
                <FaPhoneAlt className="TourExperience-phoneIcon" />
              </div>
              <div className="TourExperience-supportText">
                <span className="TourExperience-supportLabel">For More Inquiries</span>
                <span className="TourExperience-phoneNumber">+91 96688 92441</span>
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

              <button type="submit" className="TourExperience-modalSubmitBtn">
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourExperience;