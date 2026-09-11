import React, { useState, useMemo, useRef } from 'react';
import './HotelRoomExperience.css';
import API from '../../api/axios';

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
  FaConciergeBell,
  FaUser,
  FaUsers,
  FaBed,
  FaHotel,
  FaPaperPlane
} from 'react-icons/fa';
import { FiShield, FiBox } from 'react-icons/fi';
import { MdLocalLaundryService } from 'react-icons/md';

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

// Helper to format ISO date (YYYY-MM-DD)
const getISODate = (daysAhead = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to format date display (e.g. "Oct 15, 2024")
const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = String(dateStr).split('-');
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Helper to calculate total nights between two dates
const calculateNights = (inDate, outDate) => {
  if (!inDate || !outDate) return 1;
  const start = new Date(inDate);
  const end = new Date(outDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
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

  // Parse amenities from database
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

<<<<<<< HEAD
  // Booking Widget Controls
  const [bookingType, setBookingType] = useState('online'); // 'online' | 'inquiry'
  const [selectedDatePlan, setSelectedDatePlan] = useState(1);
  const [customCheckIn, setCustomCheckIn] = useState('');
  const [customCheckOut, setCustomCheckOut] = useState('');
  const customDateInputRef = useRef(null);

=======
  // Dates state - initially blank until selected by user
  const todayISO = getISODate(0);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Guest Counts
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);

  // Extra Services
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
<<<<<<< HEAD
    nightFood: false
=======
    nightFood: false,
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);

  // Calculate nights
  const hasDates = Boolean(checkInDate && checkOutDate);
  const nights = hasDates ? calculateNights(checkInDate, checkOutDate) : 1;

  // Dynamic Pricing Calculation
  const adultPrice = hotelPrice;
  const childPrice = Math.round(hotelPrice * 0.4);
  const homePickupPrice = 500;
  const nightFoodPrice = 350;

<<<<<<< HEAD
  const childTotal = useMemo(() => childCount * childPrice, [childCount, childPrice]);

  const totalPrice = useMemo(() => {
    const adultTotal = adultCount * adultPrice;
    const extrasTotal = (extraServices.homePickup ? homePickupPrice : 0) + (extraServices.nightFood ? nightFoodPrice : 0);
    return adultTotal + childTotal + extrasTotal;
  }, [adultCount, adultPrice, childTotal, extraServices]);

=======
  const adultTotal = adultCount * adultPrice * nights;
  const childTotal = childCount * childPrice * nights;
  const extrasTotal = (extraServices.homePickup ? homePickupPrice : 0) + (extraServices.nightFood ? nightFoodPrice : 0);
  const totalPrice = adultTotal + childTotal + extrasTotal;
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
  const totalPriceStr = totalPrice.toLocaleString('en-IN');

  // Modal Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    packageName: `${hotelName} Booking`,
    phone: '',
    destination: hotelLocation,
<<<<<<< HEAD
=======
    checkIn: '',
    checkOut: '',
    stayNights: '1 Night',
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
    price: `₹${totalPriceStr}`,
    member: 2,
    category: 'standard'
  });

  // Custom Date Change Handlers
  const handleCheckInChange = (e) => {
    const newIn = e.target.value;
    setCheckInDate(newIn);

    // If new check-in is on or after current check-out, bump check-out to newIn + 1 day
    if (newIn && (!checkOutDate || checkOutDate <= newIn)) {
      const parts = newIn.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        d.setDate(d.getDate() + 1);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setCheckOutDate(`${y}-${m}-${day}`);
      }
    }
  };

  const handleCheckOutChange = (e) => {
    const newOut = e.target.value;
    setCheckOutDate(newOut);
  };

  // Helper to get minimum check-out date based on current check-in date
  const getMinCheckOutDate = (inDate) => {
    if (!inDate) return todayISO;
    const parts = inDate.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      d.setDate(d.getDate() + 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
    return todayISO;
  };

  const handleExtraServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };

<<<<<<< HEAD
  // Inline Form Handlers
  const handleInlineChange = (e) => {
    const { name, value } = e.target;
    setInlineInquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    setIsInlineSubmitted(true);
  };

=======
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
  // Modal Handlers
  const handleOpenModal = () => {
    setBookingFormData({
      fullName: '',
      packageName: `${hotelName} Stay`,
      phone: '',
      destination: hotelLocation,
      checkIn: checkInDate ? formatDisplayDate(checkInDate) : 'Flexible / TBD',
      checkOut: checkOutDate ? formatDisplayDate(checkOutDate) : 'Flexible / TBD',
      stayNights: hasDates ? `${nights} Night${nights > 1 ? 's' : ''}` : '1 Night (Est.)',
      member: adultCount + childCount,
      price: `₹${totalPriceStr}`,
      category: 'standard'
    });
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

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setIsModalSubmitted(true);

    try {
      const payload = {
        hotelName: bookingFormData.packageName || `${hotelName} Stay`,
        fullName: bookingFormData.fullName,
        phone: bookingFormData.phone,
        destination: bookingFormData.destination,
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        stayNights: bookingFormData.stayNights,
        roomType: bookingFormData.category,
        guests: adultCount + childCount,
        adults: adultCount,
        children: childCount,
        price: bookingFormData.price,
        status: 'Booked',
        extraServices: {
          homePickup: extraServices.homePickup,
          nightFood: extraServices.nightFood,
        },
      };

      await API.post('/hotel-bookings', payload);
    } catch (err) {
      console.error('Failed to submit hotel booking to server:', err);
    }
  };

  // Trigger browser date picker
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

  // Structured SEO Schema Markup
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
      {/* Dynamic SEO JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="HotelRoomExperience-container">
        {/* Left Column: Hotel Info */}
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
                    style={{ color: i < hotelRating ? '#f59e0b' : '#cbd5e1' }}
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

<<<<<<< HEAD
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

=======
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
          {/* Facilities & Amenities */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Facilities & Amenities</h2>
            <div className="HotelRoomExperience-facilitiesGrid">
              {hotelAmenities.map((facility, idx) => (
                <div className="HotelRoomExperience-facilityItem" key={idx}>
                  {getAmenityIcon(facility)}
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="HotelRoomExperience-right">
          <div className="HotelRoomExperience-bookingCard">
<<<<<<< HEAD
=======
            
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
            <h3 className="HotelRoomExperience-cardTitle">Book Your Room</h3>
            <p className="HotelRoomExperience-cardSubtitle">
              Reserve your ideal Room early for a hassle-free trip; secure comfort and convenience!
            </p>

<<<<<<< HEAD
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
                        <span className="HotelRoomExperience-dateText">Jan 1, 2026</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check Out</span>
                        <span className="HotelRoomExperience-dateText">Jan 5, 2026</span>
                      </div>
                    </div>
                  </div>

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
                        <span className="HotelRoomExperience-dateText">Jan 10, 2026</span>
                      </div>
                      <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                      <div className="HotelRoomExperience-dateBlock">
                        <span className="HotelRoomExperience-dateHead">Check Out</span>
                        <span className="HotelRoomExperience-dateText">Jan 15, 2026</span>
                      </div>
                    </div>
                  </div>

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
                          : 'Check In & Out Dates'}
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
                      <span className="HotelRoomExperience-currPrice">₹{adultPrice.toLocaleString('en-IN')}</span>
                      <span className="HotelRoomExperience-oldPrice">₹{Math.round(adultPrice * 1.3).toLocaleString('en-IN')}</span>
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
                      <span className="HotelRoomExperience-currPrice">₹{childPrice.toLocaleString('en-IN')}</span>
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

                  <div className="HotelRoomExperience-guestCalcTotal">
                    <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                    <span className="HotelRoomExperience-calcTotal">₹{childTotal.toLocaleString('en-IN')}</span>
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

                {/* Total Price */}
                <div className="HotelRoomExperience-totalRow">
                  <span className="HotelRoomExperience-totalLabel">Total Price:</span>
                  <span className="HotelRoomExperience-totalAmount">₹{totalPriceStr}</span>
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
=======
            {/* Check-in & Check-out Date Picker */}
            <div className="HotelRoomExperience-dateSection">
              <div className="HotelRoomExperience-dateSectionHeader">
                <span className="HotelRoomExperience-label">Select Booking Dates:</span>
                <span className="HotelRoomExperience-stayBadge">
                  {hasDates ? `${nights} Night${nights > 1 ? 's' : ''} Stay` : 'Select Dates'}
                </span>
              </div>

              <div className="HotelRoomExperience-datePickersContainer">
                <div 
                  className="HotelRoomExperience-dateInputGroup"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    if (input && typeof input.showPicker === 'function') {
                      try { input.showPicker(); } catch (err) {}
                    }
                  }}
                >
                  <label className="HotelRoomExperience-inputFieldLabel" htmlFor="hotel-checkin-date">
                    <FaCalendarAlt className="HotelRoomExperience-inputIcon" /> Check-in
                  </label>
                  <div className="HotelRoomExperience-dateInputWrap">
                    <input
                      id="hotel-checkin-date"
                      type="date"
                      min={todayISO}
                      value={checkInDate}
                      onChange={handleCheckInChange}
                      className="HotelRoomExperience-dateInputField"
                    />
                  </div>
                </div>

                <div 
                  className="HotelRoomExperience-dateInputGroup"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    if (input && typeof input.showPicker === 'function') {
                      try { input.showPicker(); } catch (err) {}
                    }
                  }}
                >
                  <label className="HotelRoomExperience-inputFieldLabel" htmlFor="hotel-checkout-date">
                    <FaCalendarAlt className="HotelRoomExperience-inputIcon" /> Check-out
                  </label>
                  <div className="HotelRoomExperience-dateInputWrap">
                    <input
                      id="hotel-checkout-date"
                      type="date"
                      min={getMinCheckOutDate(checkInDate)}
                      value={checkOutDate}
                      onChange={handleCheckOutChange}
                      className="HotelRoomExperience-dateInputField"
                    />
                  </div>
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
                    type="button"
                    className="HotelRoomExperience-counterBtn"
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                  >
                    <FaChevronDown />
                  </button>
                  <span className="HotelRoomExperience-counterVal">{adultCount}</span>
                  <button
                    type="button"
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
                    type="button"
                    className="HotelRoomExperience-counterBtn"
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                  >
                    <FaChevronDown />
                  </button>
                  <span className="HotelRoomExperience-counterVal">{childCount}</span>
                  <button
                    type="button"
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

>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* POPUP MODAL (Triggers when clicking "Book Now") */}
      <div className={`HotelRoomExperience-modalOverlay ${isModalOpen ? 'active' : ''}`} onClick={handleCloseModal}>
        <div className="HotelRoomExperience-modalContent" onClick={(e) => e.stopPropagation()}>
          <button className="HotelRoomExperience-modalCloseBtn" onClick={handleCloseModal} aria-label="Close modal">
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
            <FaTimes />
          </button>

          {isModalSubmitted ? (
            <div className="HotelRoomExperience-modalSuccess">
              <div className="HotelRoomExperience-successCircle">
                <FaCheck className="HotelRoomExperience-successIcon" />
              </div>
              <h3>Booking Request Sent!</h3>
<<<<<<< HEAD
              <p>We have received your booking details. Our team will contact you shortly.</p>
              <button
                type="button"
                className="HotelRoomExperience-bookNowMainBtn"
                onClick={handleCloseModal}
              >
=======
              <p>We have received your booking details. Our tour executive will contact you shortly on WhatsApp / Call.</p>
              <button className="HotelRoomExperience-bookBtn HotelRoomExperience-modalSuccessBtn" onClick={handleCloseModal}>
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="HotelRoomExperience-modalForm">
<<<<<<< HEAD
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
=======
              <div className="HotelRoomExperience-modalHeader">
                <h3 className="HotelRoomExperience-modalTitle">Complete Booking Inquiry</h3>
                <p className="HotelRoomExperience-modalSubtitle">
                  Review your reservation details. No advance payment required today!
                </p>
              </div>
              
              <div className="HotelRoomExperience-formBody">
                <div className="HotelRoomExperience-formGrid">
                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaUser className="HotelRoomExperience-fieldIcon" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={bookingFormData.fullName}
                      onChange={handleModalInputChange}
                    />
                  </div>
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663

                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaPhoneAlt className="HotelRoomExperience-fieldIcon" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter active phone number"
                      value={bookingFormData.phone}
                      onChange={handleModalInputChange}
                    />
                  </div>
                </div>

                <div className="HotelRoomExperience-formGrid">
                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaHotel className="HotelRoomExperience-fieldIcon" /> Hotel / Stay
                    </label>
                    <input
                      type="text"
                      name="packageName"
                      required
                      value={bookingFormData.packageName}
                      onChange={handleModalInputChange}
                    />
                  </div>

                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaMapMarkerAlt className="HotelRoomExperience-fieldIcon" /> Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      required
                      value={bookingFormData.destination}
                      onChange={handleModalInputChange}
                    />
                  </div>
                </div>

                <div className="HotelRoomExperience-formGrid">
                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaCalendarAlt className="HotelRoomExperience-fieldIcon" /> Check In
                    </label>
                    <input
                      type="text"
                      name="checkIn"
                      readOnly
                      value={bookingFormData.checkIn}
                      className="HotelRoomExperience-readonlyInput"
                    />
                  </div>

                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaCalendarAlt className="HotelRoomExperience-fieldIcon" /> Check Out
                    </label>
                    <input
                      type="text"
                      name="checkOut"
                      readOnly
                      value={bookingFormData.checkOut}
                      className="HotelRoomExperience-readonlyInput"
                    />
                  </div>
                </div>

                <div className="HotelRoomExperience-formGrid">
                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaBed className="HotelRoomExperience-fieldIcon" /> Room Category
                    </label>
                    <select
                      name="category"
                      value={bookingFormData.category}
                      onChange={handleModalInputChange}
                      className="HotelRoomExperience-select"
                    >
                      <option value="Standard Room">Standard Room</option>
                      <option value="Premium Deluxe">Premium Deluxe</option>
                      <option value="Executive Suite">Executive Suite</option>
                    </select>
                  </div>

                  <div className="HotelRoomExperience-formGroup">
                    <label>
                      <FaUsers className="HotelRoomExperience-fieldIcon" /> Total Guest(s)
                    </label>
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

                {/* Price Highlight Banner */}
                <div className="HotelRoomExperience-modalPriceBanner">
                  <div className="HotelRoomExperience-priceBannerLeft">
                    <span className="HotelRoomExperience-priceBannerLabel">Estimated Total Price</span>
                    <span className="HotelRoomExperience-priceBannerSub">
                      Includes {nights} Night{nights > 1 ? 's' : ''} stay & taxes
                    </span>
                  </div>
                  <div className="HotelRoomExperience-priceBannerRight">
                    <span className="HotelRoomExperience-priceBannerAmount">{bookingFormData.price}</span>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
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
=======
              <button type="submit" className="HotelRoomExperience-modalSubmitBtn">
                <FaPaperPlane className="HotelRoomExperience-btnPaperIcon" /> Submit Booking Request
>>>>>>> 6aa05af3d4bcf3343dff69d5de175bb33e9e2663
              </button>

              <div className="HotelRoomExperience-modalFooterNote">
                <FiShield className="HotelRoomExperience-shieldIcon" />
                <span>100% Free Cancellation · Direct Assistance on WhatsApp</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelRoomExperience;