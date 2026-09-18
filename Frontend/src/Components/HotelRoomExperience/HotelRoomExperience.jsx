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
  FaPaperPlane,
} from 'react-icons/fa';

import { FiShield, FiBox } from 'react-icons/fi';
import { MdLocalLaundryService } from 'react-icons/md';

// =====================================================
// AMENITY ICON HELPER
// =====================================================

const getAmenityIcon = (name = '') => {
  const n = String(name).toLowerCase();

  if (/wifi|internet|network/i.test(n)) {
    return (
      <FaWifi className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/tv|television|cable|screen/i.test(n)) {
    return (
      <FaTv className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/ac|air condition|cooling/i.test(n)) {
    return (
      <FaWind className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/pool|swimming/i.test(n)) {
    return (
      <FaSwimmingPool className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/spa|massage|wellness|steam|sauna/i.test(n)) {
    return (
      <FaSpa className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/gym|fitness|workout|exercise/i.test(n)) {
    return (
      <FaDumbbell className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/laundry|washing|dry clean/i.test(n)) {
    return (
      <MdLocalLaundryService className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (
    /restaurant|food|dining|meal|breakfast|lunch|dinner|kitchen/i.test(n)
  ) {
    return (
      <FaUtensils className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/bar|cocktail|drinks|lounge/i.test(n)) {
    return (
      <FaCocktail className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/parking|car|valet|garage/i.test(n)) {
    return (
      <FaParking className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/safe|security|lock|vault/i.test(n)) {
    return (
      <FiShield className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/transfer|airport|pickup|shuttle|cab|taxi/i.test(n)) {
    return (
      <FaShuttleVan className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/coffee|tea|cafe/i.test(n)) {
    return (
      <FaCoffee className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (
    /service|room service|bell|reception|concierge|front desk/i.test(n)
  ) {
    return (
      <FaConciergeBell className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/heat|heater|warm/i.test(n)) {
    return (
      <FaFire className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/towel|linen|bath|toiletries/i.test(n)) {
    return (
      <FiBox className="HotelRoomExperience-highlightIcon" />
    );
  }

  if (/phone|call|intercom/i.test(n)) {
    return (
      <FaPhoneAlt className="HotelRoomExperience-highlightIcon" />
    );
  }

  return (
    <FaCheck className="HotelRoomExperience-highlightIcon" />
  );
};

// =====================================================
// GET ISO DATE
// =====================================================

const getISODate = (daysAhead = 0) => {
  const d = new Date();

  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysAhead);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// =====================================================
// FORMAT DATE FOR DISPLAY
// =====================================================

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';

  const parts = String(dateStr).split('-');

  if (parts.length === 3) {
    const d = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );

    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  const d = new Date(dateStr);

  return isNaN(d.getTime())
    ? dateStr
    : d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
};

// =====================================================
// CALCULATE NIGHTS
// =====================================================

const calculateNights = (inDate, outDate) => {
  if (!inDate || !outDate) return 1;

  const start = new Date(`${inDate}T00:00:00`);
  const end = new Date(`${outDate}T00:00:00`);

  const diffTime = end.getTime() - start.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  return diffDays > 0 ? diffDays : 1;
};

// =====================================================
// COMPONENT
// =====================================================

const HotelRoomExperience = ({ hotel }) => {
  // =====================================================
  // HOTEL DATA
  // =====================================================

  const hotelName =
    hotel?.name || 'Grand Luxury Hotel & Resort';

  const hotelRating = hotel?.starRating
    ? Number(hotel.starRating)
    : 5;

  const hotelPrice =
    Number(hotel?.price) || 470;

  const hotelPriceStr =
    hotelPrice.toLocaleString('en-IN');

  const hotelCity =
    hotel?.city || 'Puri';

  const hotelAddress =
    hotel?.address || 'Puri Beach Road, Puri';

  const hotelLocation =
    [
      hotel?.address,
      hotel?.city,
      'Odisha, India',
    ]
      .filter(Boolean)
      .join(', ') || 'Puri, Odisha, India';

  const hotelDesc =
    hotel?.shortDesc ||
    'Welcome to the best luxury hotel in Puri. Experience world-class comfort and authentic hospitality.';

  const hotelDetailedDesc =
    hotel?.detailedDesc ||
    hotel?.shortDesc ||
    'Welcome to the best luxury hotel in Puri. Hotel is beautifully appointed with modern comforts, exceptional service, and peaceful surroundings for an unforgettable stay.';

  // =====================================================
  // AMENITIES
  // =====================================================

  let hotelAmenities = [];

  if (hotel?.amenities) {
    if (Array.isArray(hotel.amenities)) {
      hotelAmenities = hotel.amenities
        .map((a) => String(a).trim())
        .filter(Boolean);
    } else if (
      typeof hotel.amenities === 'string'
    ) {
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
      'Laundry',
    ];
  }

  // =====================================================
  // BOOKING TYPE
  // =====================================================

  const [bookingType] = useState('online');

  // =====================================================
  // DATE STATE
  // =====================================================

  const todayISO = getISODate(0);

  const [checkInDate, setCheckInDate] =
    useState('');

  const [checkOutDate, setCheckOutDate] =
    useState('');

  // =====================================================
  // GUEST COUNTS
  // =====================================================

  const [adultCount, setAdultCount] =
    useState(2);

  const [childCount, setChildCount] =
    useState(0);

  // =====================================================
  // EXTRA SERVICES
  // =====================================================

  const [extraServices, setExtraServices] =
    useState({
      homePickup: false,
      nightFood: false,
    });

  // =====================================================
  // INLINE INQUIRY
  // =====================================================

  const [inlineInquiry, setInlineInquiry] =
    useState({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });

  const [isInlineSubmitted, setIsInlineSubmitted] =
    useState(false);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isModalSubmitted, setIsModalSubmitted] =
    useState(false);

  const [isBookingSubmitting, setIsBookingSubmitting] =
    useState(false);

  const [bookingError, setBookingError] =
    useState('');

  // =====================================================
  // CALCULATE NIGHTS
  // =====================================================

  const hasDates =
    Boolean(checkInDate && checkOutDate);

  const nights = hasDates
    ? calculateNights(
        checkInDate,
        checkOutDate
      )
    : 1;

  // =====================================================
  // PRICING
  // =====================================================

  const adultPrice = hotelPrice;

  const childPrice =
    Math.round(hotelPrice * 0.4);

  const homePickupPrice = 500;

  const nightFoodPrice = 350;

  const childTotal = useMemo(() => {
    return (
      childCount *
      childPrice *
      nights
    );
  }, [
    childCount,
    childPrice,
    nights,
  ]);

  const adultTotal = useMemo(() => {
    return (
      adultCount *
      adultPrice *
      nights
    );
  }, [
    adultCount,
    adultPrice,
    nights,
  ]);

  const extrasTotal = useMemo(() => {
    return (
      (extraServices.homePickup
        ? homePickupPrice
        : 0) +
      (extraServices.nightFood
        ? nightFoodPrice
        : 0)
    );
  }, [
    extraServices.homePickup,
    extraServices.nightFood,
  ]);

  const totalPrice = useMemo(() => {
    return (
      adultTotal +
      childTotal +
      extrasTotal
    );
  }, [
    adultTotal,
    childTotal,
    extrasTotal,
  ]);

  const totalPriceStr =
    totalPrice.toLocaleString('en-IN');

  // =====================================================
  // BOOKING FORM DATA
  // =====================================================

  const [bookingFormData, setBookingFormData] =
    useState({
      fullName: '',
      packageName: `${hotelName} Booking`,
      phone: '',
      destination: hotelLocation,
      checkIn: '',
      checkOut: '',
      stayNights: '1 Night',
      price: `₹${totalPriceStr}`,
      member: 2,
      category: 'Standard Room',
    });

  // =====================================================
  // CHECK-IN CHANGE
  // =====================================================

  const handleCheckInChange = (e) => {
    const newIn = e.target.value;

    setCheckInDate(newIn);

    if (
      newIn &&
      (!checkOutDate ||
        checkOutDate <= newIn)
    ) {
      const parts = newIn.split('-');

      if (parts.length === 3) {
        const d = new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2])
        );

        d.setDate(d.getDate() + 1);

        const y = d.getFullYear();

        const m = String(
          d.getMonth() + 1
        ).padStart(2, '0');

        const day = String(
          d.getDate()
        ).padStart(2, '0');

        setCheckOutDate(
          `${y}-${m}-${day}`
        );
      }
    }

    setBookingError('');
  };

  // =====================================================
  // CHECK-OUT CHANGE
  // =====================================================

  const handleCheckOutChange = (e) => {
    const newOut = e.target.value;

    if (
      checkInDate &&
      newOut <= checkInDate
    ) {
      setBookingError(
        'Check-out date must be after check-in date.'
      );

      return;
    }

    setCheckOutDate(newOut);
    setBookingError('');
  };

  // =====================================================
  // MIN CHECKOUT DATE
  // =====================================================

  const getMinCheckOutDate = (inDate) => {
    if (!inDate) return todayISO;

    const parts = inDate.split('-');

    if (parts.length === 3) {
      const d = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
      );

      d.setDate(d.getDate() + 1);

      const y = d.getFullYear();

      const m = String(
        d.getMonth() + 1
      ).padStart(2, '0');

      const day = String(
        d.getDate()
      ).padStart(2, '0');

      return `${y}-${m}-${day}`;
    }

    return todayISO;
  };

  // =====================================================
  // EXTRA SERVICE CHANGE
  // =====================================================

  const handleExtraServiceChange = (
    serviceKey
  ) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]:
        !prev[serviceKey],
    }));
  };

  // =====================================================
  // INLINE INQUIRY CHANGE
  // =====================================================

  const handleInlineChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setInlineInquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // INLINE INQUIRY SUBMIT
  // =====================================================

  const handleInlineSubmit = (e) => {
    e.preventDefault();

    setIsInlineSubmitted(true);
  };

  // =====================================================
  // OPEN BOOKING MODAL
  // =====================================================

  const handleOpenModal = () => {
    setBookingError('');

    // Dates are required by backend
    if (!checkInDate) {
      setBookingError(
        'Please select your check-in date.'
      );

      return;
    }

    if (!checkOutDate) {
      setBookingError(
        'Please select your check-out date.'
      );

      return;
    }

    if (
      checkOutDate <= checkInDate
    ) {
      setBookingError(
        'Check-out date must be after check-in date.'
      );

      return;
    }

    // Prepare modal data
    setBookingFormData({
      fullName: '',

      packageName:
        `${hotelName} Stay`,

      phone: '',

      destination:
        hotelLocation,

      // Display format
      checkIn:
        formatDisplayDate(
          checkInDate
        ),

      checkOut:
        formatDisplayDate(
          checkOutDate
        ),

      stayNights:
        `${nights} Night${
          nights > 1 ? 's' : ''
        }`,

      member:
        adultCount + childCount,

      price:
        `₹${totalPriceStr}`,

      category:
        'Standard Room',
    });

    setIsModalSubmitted(false);

    setIsBookingSubmitting(false);

    setIsModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    if (isBookingSubmitting) {
      return;
    }

    setIsModalOpen(false);

    setBookingError('');
  };

  // =====================================================
  // MODAL INPUT CHANGE
  // =====================================================

  const handleModalInputChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    if (name === 'phone') {
      const digitsOnly =
        value
          .replace(/\D/g, '')
          .slice(0, 10);

      setBookingFormData(
        (prev) => ({
          ...prev,
          phone: digitsOnly,
        })
      );

      setBookingError('');

      return;
    }

    setBookingFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

    setBookingError('');
  };

  // =====================================================
  // SUBMIT HOTEL BOOKING
  // =====================================================

  const handleModalSubmit = async (
    e
  ) => {
    e.preventDefault();

    // Prevent duplicate clicks
    if (isBookingSubmitting) {
      return;
    }

    setBookingError('');

    // ===================================================
    // FRONTEND VALIDATION
    // ===================================================

    const fullName =
      bookingFormData.fullName.trim();

    const phone =
      bookingFormData.phone.trim();

    const destination =
      bookingFormData.destination.trim();

    const roomType =
      bookingFormData.category.trim();

    if (fullName.length < 2) {
      setBookingError(
        'Please enter your full name.'
      );

      return;
    }

    if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      setBookingError(
        'Please enter a valid 10-digit Indian phone number.'
      );

      return;
    }

    if (!destination) {
      setBookingError(
        'Destination is required.'
      );

      return;
    }

    if (!checkInDate) {
      setBookingError(
        'Please select check-in date.'
      );

      return;
    }

    if (!checkOutDate) {
      setBookingError(
        'Please select check-out date.'
      );

      return;
    }

    if (
      checkOutDate <= checkInDate
    ) {
      setBookingError(
        'Check-out date must be after check-in date.'
      );

      return;
    }

    if (!roomType) {
      setBookingError(
        'Please select a room type.'
      );

      return;
    }

    if (adultCount < 1) {
      setBookingError(
        'At least one adult is required.'
      );

      return;
    }

    // ===================================================
    // START API REQUEST
    // ===================================================

    setIsBookingSubmitting(true);

    try {
      // =================================================
      // EXACT BACKEND PAYLOAD
      // =================================================

      const payload = {
        hotelName:
          bookingFormData.packageName ||
          `${hotelName} Stay`,

        fullName,

        phone,

        destination,

        // IMPORTANT:
        // Send ISO dates to backend
        checkIn:
          checkInDate,

        checkOut:
          checkOutDate,

        stayNights:
          `${nights} Night${
            nights > 1 ? 's' : ''
          }`,

        roomType,

        guests:
          Number(adultCount) +
          Number(childCount),

        adults:
          Number(adultCount),

        children:
          Number(childCount),

        price:
          `₹${totalPriceStr}`,

        status:
          'Booked',

        extraServices: {
          homePickup:
            Boolean(
              extraServices.homePickup
            ),

          nightFood:
            Boolean(
              extraServices.nightFood
            ),
        },
      };

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        '===================================='
      );

      console.log(
        'HOTEL BOOKING API REQUEST'
      );

      console.log(
        'POST:',
        'http://localhost:5000/api/hotel-bookings'
      );

      console.log(
        'PAYLOAD:',
        payload
      );

      console.log(
        '===================================='
      );

      // =================================================
      // API REQUEST
      // =================================================

      const response =
        await API.post(
          '/hotel-bookings',
          payload
        );

      // =================================================
      // API RESPONSE
      // =================================================

      console.log(
        '===================================='
      );

      console.log(
        'HOTEL BOOKING API RESPONSE'
      );

      console.log(
        response.data
      );

      console.log(
        '===================================='
      );

      // =================================================
      // SUCCESS
      // =================================================

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        // Only show success AFTER
        // backend confirms booking
        setIsModalSubmitted(true);

        setBookingError('');
      } else {
        setBookingError(
          response.data?.message ||
            'Booking could not be submitted.'
        );
      }

    } catch (error) {
      // =================================================
      // ERROR LOG
      // =================================================

      console.error(
        '===================================='
      );

      console.error(
        'HOTEL BOOKING API ERROR'
      );

      console.error(
        error
      );

      console.error(
        '===================================='
      );

      // =================================================
      // BACKEND RESPONSE ERROR
      // =================================================

      if (error.response) {
        const serverMessage =
          error.response.data?.message;

        const serverErrors =
          error.response.data?.errors;

        if (
          Array.isArray(
            serverErrors
          ) &&
          serverErrors.length > 0
        ) {
          setBookingError(
            serverErrors.join(', ')
          );
        } else {
          setBookingError(
            serverMessage ||
              'Unable to submit hotel booking.'
          );
        }

      // =================================================
      // SERVER NOT REACHABLE
      // =================================================

      } else if (error.request) {
        setBookingError(
          'Unable to connect to the booking server. Please make sure the backend is running on localhost:5000.'
        );

      // =================================================
      // OTHER ERROR
      // =================================================

      } else {
        setBookingError(
          'Something went wrong while submitting your booking.'
        );
      }

    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // =====================================================
  // RESET AFTER SUCCESS
  // =====================================================

  const handleSuccessClose = () => {
    setIsModalOpen(false);

    setIsModalSubmitted(false);

    setBookingError('');

    setBookingFormData({
      fullName: '',

      packageName:
        `${hotelName} Stay`,

      phone: '',

      destination:
        hotelLocation,

      checkIn: '',

      checkOut: '',

      stayNights:
        '1 Night',

      price:
        `₹${totalPriceStr}`,

      member: 2,

      category:
        'Standard Room',
    });

    setCheckInDate('');

    setCheckOutDate('');

    setAdultCount(2);

    setChildCount(0);

    setExtraServices({
      homePickup: false,
      nightFood: false,
    });
  };

  // =====================================================
  // SEO SCHEMA
  // =====================================================

  const schemaMarkup = {
    '@context':
      'https://schema.org',

    '@type':
      'Hotel',

    name:
      `${hotelName} - Jagannatha Tour and Travels`,

    description:
      hotelDesc,

    address: {
      '@type':
        'PostalAddress',

      streetAddress:
        hotelAddress,

      addressLocality:
        hotelCity,

      addressCountry:
        'India',
    },

    aggregateRating: {
      '@type':
        'AggregateRating',

      ratingValue:
        `${hotelRating}.0`,

      reviewCount:
        '94',
    },

    amenityFeature:
      hotelAmenities.map(
        (amenity) => ({
          '@type':
            'LocationFeatureSpecification',

          name:
            amenity,

          value:
            true,
        })
      ),

    priceRange:
      `₹${hotelPriceStr}`,
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="HotelRoomExperience"
      aria-labelledby="hotel-title"
    >

      {/* ================================================
          SEO JSON-LD
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schemaMarkup
            ),
        }}
      />

      <div className="HotelRoomExperience-container">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="HotelRoomExperience-left">

          {/* META HEADER */}

          <div className="HotelRoomExperience-metaHeader">

            <div className="HotelRoomExperience-location">

              <FaMapMarkerAlt
                className="HotelRoomExperience-locIcon"
              />

              <span>
                {hotelLocation} -{' '}
              </span>

              <a
                href="#see-map"
                className="HotelRoomExperience-mapLink"
                onClick={(e) => {
                  e.preventDefault();

                  const mapElem =
                    document.getElementById(
                      'see-map'
                    );

                  if (mapElem) {
                    mapElem.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
              >
                See Map
              </a>

            </div>

            <div className="HotelRoomExperience-ratingScore">

              <div className="HotelRoomExperience-stars">

                {[...Array(5)].map(
                  (_, i) => (
                    <FaStar
                      key={i}
                      className="HotelRoomExperience-starIcon"
                      style={{
                        color:
                          i <
                          hotelRating
                            ? '#f59e0b'
                            : '#cbd5e1',
                      }}
                    />
                  )
                )}

              </div>

              <span className="HotelRoomExperience-ratingText">

                <strong>
                  {hotelRating}.0 Excellent
                </strong>{' '}
                94 reviews

              </span>

            </div>

          </div>

          {/* TITLE */}

          <h1
            id="hotel-title"
            className="HotelRoomExperience-title"
          >
            {hotelName}
          </h1>

          {/* PRICE */}

          <div className="HotelRoomExperience-priceRow">

            <span className="HotelRoomExperience-price">
              ₹{hotelPriceStr}
            </span>

            <span className="HotelRoomExperience-perNight">
              /per night
            </span>

          </div>

          {/* DESCRIPTION */}

          <p className="HotelRoomExperience-description">
            {hotelDetailedDesc}
          </p>

          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="HotelRoomExperience-section">

            <h2 className="HotelRoomExperience-sectionTitle">
              Highlights
            </h2>

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

          {/* =================================================
              FACILITIES
          ================================================= */}

          <div className="HotelRoomExperience-section">

            <h2 className="HotelRoomExperience-sectionTitle">
              Facilities & Amenities
            </h2>

            <div className="HotelRoomExperience-facilitiesGrid">

              {hotelAmenities.map(
                (facility, idx) => (
                  <div
                    className="HotelRoomExperience-facilityItem"
                    key={idx}
                  >
                    {getAmenityIcon(
                      facility
                    )}

                    <span>
                      {facility}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="HotelRoomExperience-right">

          <div className="HotelRoomExperience-bookingCard">

            <h3 className="HotelRoomExperience-cardTitle">
              Book Your Room
            </h3>

            <p className="HotelRoomExperience-cardSubtitle">
              Reserve your ideal Room early for a hassle-free trip; secure comfort and convenience!
            </p>

            {bookingType === 'online' ? (
              <>

                {/* =================================================
                    BOOKING DATES
                ================================================= */}

                <div className="HotelRoomExperience-dateSection">

                  <div className="HotelRoomExperience-dateSectionHeader">

                    <span className="HotelRoomExperience-label">
                      Select Booking Dates:
                    </span>

                    <span className="HotelRoomExperience-stayBadge">
                      {hasDates
                        ? `${nights} Night${
                            nights > 1
                              ? 's'
                              : ''
                          } Stay`
                        : 'Select Dates'}
                    </span>

                  </div>

                  <div className="HotelRoomExperience-datePickersContainer">

                    {/* CHECK-IN */}

                    <div
                      className="HotelRoomExperience-dateInputGroup"
                      onClick={(e) => {
                        const input =
                          e.currentTarget.querySelector(
                            'input[type="date"]'
                          );

                        if (
                          input &&
                          typeof input.showPicker ===
                            'function'
                        ) {
                          try {
                            input.showPicker();
                          } catch (err) {}
                        }
                      }}
                    >

                      <label
                        className="HotelRoomExperience-inputFieldLabel"
                        htmlFor="hotel-checkin-date"
                      >
                        <FaCalendarAlt className="HotelRoomExperience-inputIcon" />

                        Check-in
                      </label>

                      <div className="HotelRoomExperience-dateInputWrap">

                        <input
                          id="hotel-checkin-date"
                          type="date"
                          min={todayISO}
                          value={checkInDate}
                          onChange={
                            handleCheckInChange
                          }
                          className="HotelRoomExperience-dateInputField"
                        />

                      </div>

                    </div>

                    {/* CHECK-OUT */}

                    <div
                      className="HotelRoomExperience-dateInputGroup"
                      onClick={(e) => {
                        const input =
                          e.currentTarget.querySelector(
                            'input[type="date"]'
                          );

                        if (
                          input &&
                          typeof input.showPicker ===
                            'function'
                        ) {
                          try {
                            input.showPicker();
                          } catch (err) {}
                        }
                      }}
                    >

                      <label
                        className="HotelRoomExperience-inputFieldLabel"
                        htmlFor="hotel-checkout-date"
                      >
                        <FaCalendarAlt className="HotelRoomExperience-inputIcon" />

                        Check-out
                      </label>

                      <div className="HotelRoomExperience-dateInputWrap">

                        <input
                          id="hotel-checkout-date"
                          type="date"
                          min={getMinCheckOutDate(
                            checkInDate
                          )}
                          value={checkOutDate}
                          onChange={
                            handleCheckOutChange
                          }
                          className="HotelRoomExperience-dateInputField"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    GUEST COUNTERS
                ================================================= */}

                <div className="HotelRoomExperience-guestsSection">

                  {/* ADULT */}

                  <div className="HotelRoomExperience-guestRow">

                    <span className="HotelRoomExperience-guestType">
                      Adult:
                    </span>

                    <div className="HotelRoomExperience-guestPrice">

                      <span className="HotelRoomExperience-currPrice">
                        ₹
                        {adultPrice.toLocaleString(
                          'en-IN'
                        )}
                      </span>

                      <span className="HotelRoomExperience-oldPrice">
                        ₹
                        {Math.round(
                          adultPrice *
                            1.3
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </span>

                    </div>

                    <div className="HotelRoomExperience-counterPill">

                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() =>
                          setAdultCount(
                            Math.max(
                              1,
                              adultCount - 1
                            )
                          )
                        }
                        aria-label="Decrease adult"
                      >
                        <FaChevronDown />
                      </button>

                      <span className="HotelRoomExperience-counterVal">
                        {adultCount}
                      </span>

                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() =>
                          setAdultCount(
                            adultCount + 1
                          )
                        }
                        aria-label="Increase adult"
                      >
                        <FaChevronUp />
                      </button>

                    </div>

                  </div>

                  {/* CHILDREN */}

                  <div className="HotelRoomExperience-guestRow">

                    <span className="HotelRoomExperience-guestType">
                      Children:
                    </span>

                    <div className="HotelRoomExperience-guestPrice">

                      <span className="HotelRoomExperience-currPrice">
                        ₹
                        {childPrice.toLocaleString(
                          'en-IN'
                        )}
                      </span>

                    </div>

                    <div className="HotelRoomExperience-counterPill">

                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() =>
                          setChildCount(
                            Math.max(
                              0,
                              childCount - 1
                            )
                          )
                        }
                        aria-label="Decrease children"
                      >
                        <FaChevronDown />
                      </button>

                      <span className="HotelRoomExperience-counterVal">
                        {childCount}
                      </span>

                      <button
                        type="button"
                        className="HotelRoomExperience-counterBtn"
                        onClick={() =>
                          setChildCount(
                            childCount + 1
                          )
                        }
                        aria-label="Increase children"
                      >
                        <FaChevronUp />
                      </button>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    EXTRA SERVICES
                ================================================= */}

                <div className="HotelRoomExperience-extrasSection">

                  <h4 className="HotelRoomExperience-extrasTitle">
                    Other Extra Services
                  </h4>

                  {/* HOME PICKUP */}

                  <label className="HotelRoomExperience-extraRow">

                    <div className="HotelRoomExperience-extraLeft">

                      <input
                        type="checkbox"
                        checked={
                          extraServices.homePickup
                        }
                        onChange={() =>
                          handleExtraServiceChange(
                            'homePickup'
                          )
                        }
                      />

                      <span>
                        Home Pickup
                      </span>

                    </div>

                    <span className="HotelRoomExperience-extraPrice">
                      ₹
                      {homePickupPrice.toLocaleString(
                        'en-IN'
                      )}
                    </span>

                  </label>

                  {/* NIGHT FOOD */}

                  <label className="HotelRoomExperience-extraRow">

                    <div className="HotelRoomExperience-extraLeft">

                      <input
                        type="checkbox"
                        checked={
                          extraServices.nightFood
                        }
                        onChange={() =>
                          handleExtraServiceChange(
                            'nightFood'
                          )
                        }
                      />

                      <span>
                        Night Food
                      </span>

                    </div>

                    <span className="HotelRoomExperience-extraPrice">
                      ₹
                      {nightFoodPrice.toLocaleString(
                        'en-IN'
                      )}
                    </span>

                  </label>

                </div>

                {/* =================================================
                    TOTAL
                ================================================= */}

                <div className="HotelRoomExperience-totalRow">

                  <span className="HotelRoomExperience-totalLabel">
                    Total Price:
                  </span>

                  <span className="HotelRoomExperience-totalAmount">
                    ₹{totalPriceStr}
                  </span>

                </div>

                {/* =================================================
                    BOOK NOW
                ================================================= */}

                <button
                  type="button"
                  className="HotelRoomExperience-bookNowMainBtn"
                  onClick={
                    handleOpenModal
                  }
                >
                  Book Now
                </button>

              </>
            ) : (

              /* =================================================
                 INLINE INQUIRY
              ================================================= */

              <div className="HotelRoomExperience-inquiryContainer">

                {isInlineSubmitted ? (

                  <div className="HotelRoomExperience-successMsg">

                    <FaCheck className="HotelRoomExperience-successIcon" />

                    <h4>
                      Inquiry Sent!
                    </h4>

                    <p>
                      Thank you for contacting us. We will get back to you shortly.
                    </p>

                  </div>

                ) : (

                  <form
                    onSubmit={
                      handleInlineSubmit
                    }
                    className="HotelRoomExperience-inquiryForm"
                  >

                    <div className="HotelRoomExperience-formGroup">

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Enter your name"
                        value={
                          inlineInquiry.fullName
                        }
                        onChange={
                          handleInlineChange
                        }
                      />

                    </div>

                    <div className="HotelRoomExperience-formGroup">

                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={
                          inlineInquiry.email
                        }
                        onChange={
                          handleInlineChange
                        }
                      />

                    </div>

                    <div className="HotelRoomExperience-formGroup">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter phone number"
                        value={
                          inlineInquiry.phone
                        }
                        onChange={
                          handleInlineChange
                        }
                      />

                    </div>

                    <div className="HotelRoomExperience-formGroup">

                      <label>
                        Message / Requirements
                      </label>

                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Type your message..."
                        value={
                          inlineInquiry.message
                        }
                        onChange={
                          handleInlineChange
                        }
                      />

                    </div>

                    <button
                      type="submit"
                      className="HotelRoomExperience-bookNowMainBtn"
                    >
                      Submit Inquiry
                    </button>

                  </form>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

      {/* =======================================================
          BOOKING MODAL
      ======================================================= */}

      <div
        className={`HotelRoomExperience-modalOverlay ${
          isModalOpen
            ? 'active'
            : ''
        }`}
        onClick={
          handleCloseModal
        }
      >

        <div
          className="HotelRoomExperience-modalContent"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="HotelRoomExperience-modalCloseBtn"
            onClick={
              handleCloseModal
            }
            aria-label="Close modal"
            disabled={
              isBookingSubmitting
            }
          >
            <FaTimes />
          </button>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {isModalSubmitted ? (

            <div className="HotelRoomExperience-modalSuccess">

              <div className="HotelRoomExperience-successCircle">

                <FaCheck className="HotelRoomExperience-successIcon" />

              </div>

              <h3>
                Booking Request Sent!
              </h3>

              <p>
                We have received your booking details. Our tour executive will contact you shortly on WhatsApp / Call.
              </p>

              <button
                type="button"
                className="HotelRoomExperience-bookBtn HotelRoomExperience-modalSuccessBtn"
                onClick={
                  handleSuccessClose
                }
              >
                Close
              </button>

            </div>

          ) : (

            /* =================================================
               BOOKING FORM
            ================================================= */

            <form
              onSubmit={
                handleModalSubmit
              }
              className="HotelRoomExperience-modalForm"
            >

              {/* HEADER */}

              <div className="HotelRoomExperience-modalHeader">

                <h3 className="HotelRoomExperience-modalTitle">
                  Complete Booking Inquiry
                </h3>

              </div>

              {/* FORM BODY */}

              <div className="HotelRoomExperience-formBody">

                {/* =================================================
                    ERROR
                ================================================= */}

                {bookingError && (

                  <div
                    className="HotelRoomExperience-bookingError"
                    role="alert"
                  >

                    <FaTimes />

                    <span>
                      {bookingError}
                    </span>

                  </div>

                )}

                {/* =================================================
                    NAME + PHONE
                ================================================= */}

                <div className="HotelRoomExperience-formGrid">

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaUser className="HotelRoomExperience-fieldIcon" />

                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      required
                      minLength={2}
                      placeholder="Enter your full name"
                      value={
                        bookingFormData.fullName
                      }
                      onChange={
                        handleModalInputChange
                      }
                    />

                  </div>

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaPhoneAlt className="HotelRoomExperience-fieldIcon" />

                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                      inputMode="numeric"
                      value={
                        bookingFormData.phone
                      }
                      onChange={
                        handleModalInputChange
                      }
                    />

                  </div>

                </div>

                {/* =================================================
                    HOTEL + DESTINATION
                ================================================= */}

                <div className="HotelRoomExperience-formGrid">

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaHotel className="HotelRoomExperience-fieldIcon" />

                      Hotel / Stay
                    </label>

                    <input
                      type="text"
                      name="packageName"
                      required
                      value={
                        bookingFormData.packageName
                      }
                      onChange={
                        handleModalInputChange
                      }
                    />

                  </div>

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaMapMarkerAlt className="HotelRoomExperience-fieldIcon" />

                      Destination
                    </label>

                    <input
                      type="text"
                      name="destination"
                      required
                      value={
                        bookingFormData.destination
                      }
                      onChange={
                        handleModalInputChange
                      }
                    />

                  </div>

                </div>

                {/* =================================================
                    CHECK IN + CHECK OUT
                ================================================= */}

                <div className="HotelRoomExperience-formGrid">

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaCalendarAlt className="HotelRoomExperience-fieldIcon" />

                      Check In
                    </label>

                    <input
                      type="text"
                      name="checkIn"
                      readOnly
                      value={
                        bookingFormData.checkIn
                      }
                      className="HotelRoomExperience-readonlyInput"
                    />

                  </div>

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaCalendarAlt className="HotelRoomExperience-fieldIcon" />

                      Check Out
                    </label>

                    <input
                      type="text"
                      name="checkOut"
                      readOnly
                      value={
                        bookingFormData.checkOut
                      }
                      className="HotelRoomExperience-readonlyInput"
                    />

                  </div>

                </div>

                {/* =================================================
                    ROOM + GUEST
                ================================================= */}

                <div className="HotelRoomExperience-formGrid">

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaBed className="HotelRoomExperience-fieldIcon" />

                      Room Category
                    </label>

                    <select
                      name="category"
                      value={
                        bookingFormData.category
                      }
                      onChange={
                        handleModalInputChange
                      }
                      className="HotelRoomExperience-select"
                    >

                      <option value="Standard Room">
                        Standard Room
                      </option>

                      <option value="Premium Deluxe">
                        Premium Deluxe
                      </option>

                      <option value="Executive Suite">
                        Executive Suite
                      </option>

                    </select>

                  </div>

                  <div className="HotelRoomExperience-formGroup">

                    <label>
                      <FaUsers className="HotelRoomExperience-fieldIcon" />

                      Total Guest(s)
                    </label>

                    <input
                      type="number"
                      name="member"
                      min="1"
                      required
                      value={
                        adultCount +
                        childCount
                      }
                      readOnly
                      className="HotelRoomExperience-readonlyInput"
                    />

                  </div>

                </div>

                {/* =================================================
                    PRICE BANNER
                ================================================= */}

                <div className="HotelRoomExperience-modalPriceBanner">

                  <div className="HotelRoomExperience-priceBannerLeft">

                    <span className="HotelRoomExperience-priceBannerLabel">
                      Estimated Total Price
                    </span>

                    <span className="HotelRoomExperience-priceBannerSub">
                      Includes{' '}
                      {nights}{' '}
                      Night
                      {nights > 1
                        ? 's'
                        : ''}{' '}
                      stay & taxes
                    </span>

                  </div>

                  <div className="HotelRoomExperience-priceBannerRight">

                    <span className="HotelRoomExperience-priceBannerAmount">
                      ₹
                      {totalPriceStr}
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="HotelRoomExperience-modalSubmitBtn"
                disabled={
                  isBookingSubmitting
                }
              >

                {isBookingSubmitting ? (

                  <>
                    <span className="HotelRoomExperience-submitSpinner"></span>

                    Submitting Booking...
                  </>

                ) : (

                  <>
                    <FaPaperPlane className="HotelRoomExperience-btnPaperIcon" />

                    Submit Booking Request
                  </>

                )}

              </button>

            </form>

          )}

        </div>

      </div>

    </section>
  );
};

export default HotelRoomExperience;