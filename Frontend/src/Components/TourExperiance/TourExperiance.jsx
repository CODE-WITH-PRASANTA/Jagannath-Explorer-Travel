import React, { useState, useEffect } from 'react';
import './TourExperiance.css';

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
  FaMinus,
  FaPlus,
  FaPhoneAlt,
  FaCalendarAlt,
  FaLongArrowAltRight
} from 'react-icons/fa';

import API from '../../api/axios';

// Import Support Banner Image
import supportAgent from '../../assets/img 10.webp';

const SERVICE_PRICES = {
  homePickup: 500,
  nightFood: 750,
  seaplane: 1200
};

const TourExperiance = ({ tour }) => {
  // ================= HOOKS & HELPER FUNCTIONS =================
  
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

  // Booking Form States
  const [adultQty, setAdultQty] = useState(2);
  const [childQty, setChildQty] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Extra Services State
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplane: false,
  });

  // Accordion Itinerary State (Day 1 open by default)
  const [openDay, setOpenDay] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    packageName: tour?.title || 'Odisha Heritage Tour Package',
    phone: '',
    destination: tour?.destination || 'Odisha',
    price: '',
    members: '',
    category: 'Standard',
    checkIn: '',
    checkOut: ''
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

  const handleOpenModal = () => {
    setModalForm((prev) => ({
      ...prev,
      packageName: tour?.title || prev.packageName,
      destination: tour?.destination || prev.destination,
      price: `₹${totalPrice.toLocaleString('en-IN')}`,
      members: `${adultQty + childQty} (${adultQty} Adult, ${childQty} Child)`,
      checkIn: checkInDate,
      checkOut: checkOutDate
    }));
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setModalForm((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }
    setModalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalForm.name.trim()) {
      alert('Please provide your full name.');
      return;
    }

    const cleanPhone = modalForm.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        fullName: modalForm.name.trim(),
        mobileNumber: modalForm.phone.trim(),
        tourPackage: modalForm.packageName || tour?.title || 'Tour Package Booking',
        destination: modalForm.destination || tour?.destination || 'Odisha',
        startDate: modalForm.checkIn || checkInDate,
        endDate: modalForm.checkOut || checkOutDate,
        checkIn: modalForm.checkIn || checkInDate,
        checkOut: modalForm.checkOut || checkOutDate,
        adults: adultQty,
        children: childQty,
        guests: modalForm.members || `${adultQty} Adult(s)${childQty > 0 ? `, ${childQty} Child(ren)` : ''}`,
        category: modalForm.category || 'Standard',
        price: modalForm.price || `₹${totalPrice.toLocaleString('en-IN')}`,
        extraServices,
        agreedToTerms: true
      };

      const res = await API.post('/tour-bookings', payload);
      if (res.data?.success || res.status === 201 || res.status === 200) {
        alert('🎉 Booking inquiry submitted successfully! Our team will contact you shortly.');
        
        setModalForm({
          name: '',
          packageName: tour?.title || 'Odisha Heritage Tour Package',
          phone: '',
          destination: tour?.destination || 'Odisha',
          price: '',
          members: '',
          category: 'Standard',
          checkIn: '',
          checkOut: ''
        });

        setCheckInDate('');
        setCheckOutDate('');
        setAdultQty(1);
        setChildQty(0);
        setExtraServices({
          homePickup: false,
          nightFood: false,
          seaplane: false
        });

        setIsModalOpen(false);
      } else {
        alert(res.data?.message || 'Failed to submit booking inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit tour booking:', err);
      const errorMsg = err.response?.data?.message || 'Server error. Please try again or contact us on WhatsApp.';
      alert(`⚠️ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => {
    const tourTitle = tour?.title || "Odisha Holiday Tour";
    let msg = `Jai Jagannath! I would like to book the tour: *${tourTitle}*\n- Destination: ${tour?.destination || 'Odisha'}\n`;
    if (checkInDate) msg += `- Check In: ${checkInDate}\n`;
    if (checkOutDate) msg += `- Check Out: ${checkOutDate}\n`;
    msg += `- Adults: ${adultQty}, Children: ${childQty}\n- Total Price: ₹${totalPrice.toLocaleString('en-IN')}\nPlease share confirmation and itinerary details.`;
    window.open(`https://wa.me/919668892441?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ================= RETURN STATEMENT =================
  return (
    <section className="Tour-Experience">
      <div className="Tour-Experience-container">

        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="Tour-Experience-mainContent">
          <h1 className="Tour-Experience-title">
            {tour?.title || "Jagannath Dham & Odisha Tour Package"}
          </h1>

          <div className="Tour-Experience-priceTag">
            <span className="Tour-Experience-priceAmount">
              ₹{adultPrice.toLocaleString('en-IN')}
            </span>
            <span className="Tour-Experience-priceUnit">/per person</span>
          </div>

          <div className="Tour-Experience-metaRow">
            {tour?.duration && (
              <div className="Tour-Experience-metaItem">
                <FaClock className="Tour-Experience-metaIcon" />
                <span>{tour.duration}</span>
              </div>
            )}
            {tour?.maxPeople && (
              <div className="Tour-Experience-metaItem">
                <FaUser className="Tour-Experience-metaIcon" />
                <span>Max People : {tour.maxPeople}</span>
              </div>
            )}
            {tour?.destination && (
              <div className="Tour-Experience-metaItem">
                <FaMapMarkerAlt className="Tour-Experience-metaIcon" />
                <span>{tour.destination}</span>
              </div>
            )}
          </div>

          <div className="Tour-Experience-description">
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
          <div className="Tour-Experience-section">
            <h2 className="Tour-Experience-sectionTitle">Included and Excluded</h2>
            <div className="Tour-Experience-incExcGrid">
              <div className="Tour-Experience-incExcColumn">
                {includedList.map((item, idx) => (
                  <div className="Tour-Experience-incItem" key={idx}>
                    <FaCheck className="Tour-Experience-checkIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="Tour-Experience-incExcColumn">
                {excludedList.map((item, idx) => (
                  <div className="Tour-Experience-excItem" key={idx}>
                    <FaTimes className="Tour-Experience-timesIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="Tour-Experience-section">
            <h2 className="Tour-Experience-sectionTitle">Highlights of the Tour</h2>
            <div className="Tour-Experience-highlightsList">
              {highlightsList.map((item, idx) => (
                <div className="Tour-Experience-highlightItem" key={idx}>
                  <FaCheckCircle className="Tour-Experience-greenCircleIcon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="Tour-Experience-section">
            <h2 className="Tour-Experience-sectionTitle">Itinerary</h2>
            <div className="Tour-Experience-itineraryAccordion">
              {itineraryList.map((dayItem, idx) => {
                const dayBadgeText = dayItem.dayNumber || `Day ${String(idx + 1).padStart(2, '0')}`;
                const isItemOpen = openDay === idx + 1;
                const dayActivities = dayItem.highlights || dayItem.activities || [];

                return (
                  <div
                    className={`Tour-Experience-accordionItem ${isItemOpen ? 'Tour-Experience-open' : ''}`}
                    key={idx}
                  >
                    <div
                      className="Tour-Experience-accordionHeader"
                      onClick={() => toggleDay(idx + 1)}
                    >
                      <div className="Tour-Experience-dayBadge">{dayBadgeText} :</div>
                      <h3 className="Tour-Experience-dayTitle">{dayItem.title || `Day ${idx + 1} Sightseeing`}</h3>
                      {isItemOpen ? (
                        <FaChevronUp className="Tour-Experience-accordionIcon" />
                      ) : (
                        <FaChevronDown className="Tour-Experience-accordionIcon" />
                      )}
                    </div>
                    {isItemOpen && (
                      <div className="Tour-Experience-accordionBody">
                        {dayItem.description && <p>{dayItem.description}</p>}
                        {Array.isArray(dayActivities) && dayActivities.map((act, aIdx) => (
                          <div className="Tour-Experience-daySubItem" key={aIdx}>
                            <FaCheck className="Tour-Experience-checkIcon" />
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
        <div className="Tour-Experience-sidebar">

          <div className="Tour-Experience-bookingCard">
            <h2 className="Tour-Experience-bookingTitle">Book Your Tour</h2>
            <p className="Tour-Experience-bookingSubtitle">
              Reserve your ideal trip early for a hassle-free trip; secure comfort and convenience!
            </p>

            <div className="Tour-Experience-onlineSection">
              {/* Check In & Check Out Date Input Fields */}
              <div className="Tour-Experience-datePickersContainer">
                <div className="Tour-Experience-dateInputGroup">
                  <label className="Tour-Experience-dateFieldLabel">
                    <FaCalendarAlt className="Tour-Experience-dateIcon" /> Check In
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkInDate}
                    onChange={(e) => {
                      setCheckInDate(e.target.value);
                      if (!checkOutDate || checkOutDate < e.target.value) {
                        setCheckOutDate(e.target.value);
                      }
                    }}
                    className="Tour-Experience-dateInputField"
                  />
                </div>

                <div className="Tour-Experience-dateInputGroup">
                  <label className="Tour-Experience-dateFieldLabel">
                    <FaCalendarAlt className="Tour-Experience-dateIcon" /> Check Out
                  </label>
                  <input
                    type="date"
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="Tour-Experience-dateInputField"
                  />
                </div>
              </div>

              {/* Quantity Selectors */}
              <div className="Tour-Experience-qtySection">
                {/* Adult */}
                <div className="Tour-Experience-qtyRow">
                  <div className="Tour-Experience-qtyLabel">
                    <span className="Tour-Experience-personType">Adult:</span>
                    <span className="Tour-Experience-priceSale">₹{adultPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="Tour-Experience-counter">
                    <button
                      type="button"
                      className="Tour-Experience-counterBtn"
                      onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                      aria-label="Decrease Adults"
                    >
                      <FaMinus />
                    </button>
                    <span className="Tour-Experience-countValue">{adultQty}</span>
                    <button
                      type="button"
                      className="Tour-Experience-counterBtn"
                      onClick={() => setAdultQty(adultQty + 1)}
                      aria-label="Increase Adults"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="Tour-Experience-qtyRow">
                  <div className="Tour-Experience-qtyLabel">
                    <span className="Tour-Experience-personType">Children:</span>
                    <span className="Tour-Experience-priceSale">₹{childPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="Tour-Experience-counter">
                    <button
                      type="button"
                      className="Tour-Experience-counterBtn"
                      onClick={() => setChildQty(Math.max(0, childQty - 1))}
                      aria-label="Decrease Children"
                    >
                      <FaMinus />
                    </button>
                    <span className="Tour-Experience-countValue">{childQty}</span>
                    <button
                      type="button"
                      className="Tour-Experience-counterBtn"
                      onClick={() => setChildQty(childQty + 1)}
                      aria-label="Increase Children"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Extra Services */}
              <div className="Tour-Experience-extraServices">
                <h3 className="Tour-Experience-extraTitle">Other Extra Services</h3>

                <div className="Tour-Experience-extraRow" onClick={() => handleServiceChange('homePickup')}>
                  <div className="Tour-Experience-checkboxSquare">
                    {extraServices.homePickup && <span className="Tour-Experience-innerCheck"></span>}
                  </div>
                  <span className="Tour-Experience-extraName">Home / Airport Pickup</span>
                  <span className="Tour-Experience-extraPrice">₹{SERVICE_PRICES.homePickup}</span>
                </div>

                <div className="Tour-Experience-extraRow" onClick={() => handleServiceChange('nightFood')}>
                  <div className="Tour-Experience-checkboxSquare">
                    {extraServices.nightFood && <span className="Tour-Experience-innerCheck"></span>}
                  </div>
                  <span className="Tour-Experience-extraName">Special Mahaprasad / Food</span>
                  <span className="Tour-Experience-extraPrice">₹{SERVICE_PRICES.nightFood}</span>
                </div>

                <div className="Tour-Experience-extraRow" onClick={() => handleServiceChange('seaplane')}>
                  <div className="Tour-Experience-checkboxSquare">
                    {extraServices.seaplane && <span className="Tour-Experience-innerCheck"></span>}
                  </div>
                  <span className="Tour-Experience-extraName">Chilika Boating & Sightseeing</span>
                  <span className="Tour-Experience-extraPrice">₹{SERVICE_PRICES.seaplane}</span>
                </div>
              </div>

              {/* Breakdown Calculation Items */}
              <div className="Tour-Experience-breakdownBox">
                <div className="Tour-Experience-breakdownItem">
                  <span className="Tour-Experience-breakdownType">Adult</span>
                  <div className="Tour-Experience-formula">
                    <span>₹{adultPrice} <small>PRICE</small></span>
                    <span className="Tour-Experience-operator">×</span>
                    <span>{String(adultQty).padStart(2, '0')} <small>QTY</small></span>
                  </div>
                  <FaLongArrowAltRight className="Tour-Experience-breakdownArrow" />
                  <span className="Tour-Experience-breakdownTotal">₹{(adultPrice * adultQty).toLocaleString('en-IN')}</span>
                </div>

                {childQty > 0 && (
                  <div className="Tour-Experience-breakdownItem">
                    <span className="Tour-Experience-breakdownType">Children</span>
                    <div className="Tour-Experience-formula">
                      <span>₹{childPrice} <small>PRICE</small></span>
                      <span className="Tour-Experience-operator">×</span>
                      <span>{String(childQty).padStart(2, '0')} <small>QTY</small></span>
                    </div>
                    <FaLongArrowAltRight className="Tour-Experience-breakdownArrow" />
                    <span className="Tour-Experience-breakdownTotal">₹{(childPrice * childQty).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="Tour-Experience-totalRow">
                <span className="Tour-Experience-totalLabel">Total Price:</span>
                <span className="Tour-Experience-totalValue">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  type="button"
                  className="Tour-Experience-bookNowBtn"
                  onClick={handleBookNow}
                  style={{ flex: 1 }}
                >
                  WhatsApp Book
                </button>
                <button
                  type="button"
                  className="Tour-Experience-bookNowBtn"
                  onClick={handleOpenModal}
                  style={{ flex: 1, backgroundColor: '#0f172a' }}
                >
                  Book Now
                </button>
              </div>
            </div>

          </div>

          {/* Support Agent Card */}
          <div className="Tour-Experience-supportCard">
            <img src={supportAgent} alt="Customer Support Agent" className="Tour-Experience-supportImg" />
            <div className="Tour-Experience-supportBanner">
              <div className="Tour-Experience-phoneCircle">
                <FaPhoneAlt className="Tour-Experience-phoneIcon" />
              </div>
              <div className="Tour-Experience-supportText">
                <span className="Tour-Experience-supportLabel">For More Inquiries</span>
                <span className="Tour-Experience-phoneNumber">+91 96688 92441</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ================= MODAL: COMPLETE BOOKING ================= */}
      {isModalOpen && (
        <div className="Tour-Experience-modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="Tour-Experience-modalBox" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="Tour-Experience-modalCloseBtn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h2 className="Tour-Experience-modalTitle">Complete Booking Inquiry</h2>

            <form className="Tour-Experience-modalForm" onSubmit={handleModalSubmit}>
              <div className="Tour-Experience-modalRow">
                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={modalForm.name}
                    onChange={handleModalChange}
                    required
                    className="Tour-Experience-modalInput"
                  />
                </div>

                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Phone No.</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    value={modalForm.phone}
                    onChange={handleModalChange}
                    required
                    className="Tour-Experience-modalInput"
                  />
                </div>
              </div>

              <div className="Tour-Experience-modalRow">
                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Package Name</label>
                  <input
                    type="text"
                    name="packageName"
                    value={modalForm.packageName}
                    onChange={handleModalChange}
                    required
                    className="Tour-Experience-modalInput"
                  />
                </div>

                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={modalForm.destination}
                    onChange={handleModalChange}
                    required
                    className="Tour-Experience-modalInput"
                  />
                </div>
              </div>

              <div className="Tour-Experience-modalRow">
                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Check In Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    min={new Date().toISOString().split('T')[0]}
                    value={modalForm.checkIn}
                    onChange={handleModalChange}
                    className="Tour-Experience-modalInput"
                  />
                </div>

                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Check Out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    min={modalForm.checkIn || new Date().toISOString().split('T')[0]}
                    value={modalForm.checkOut}
                    onChange={handleModalChange}
                    className="Tour-Experience-modalInput"
                  />
                </div>
              </div>

              <div className="Tour-Experience-modalRow">
                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={modalForm.price}
                    onChange={handleModalChange}
                    className="Tour-Experience-modalInput"
                  />
                </div>

                <div className="Tour-Experience-modalGroup">
                  <label className="Tour-Experience-modalLabel">Member(s)</label>
                  <input
                    type="text"
                    name="members"
                    value={modalForm.members}
                    onChange={handleModalChange}
                    className="Tour-Experience-modalInput"
                  />
                </div>
              </div>

              <div className="Tour-Experience-modalGroup">
                <label className="Tour-Experience-modalLabel">Category</label>
                <select
                  name="category"
                  value={modalForm.category}
                  onChange={handleModalChange}
                  className="Tour-Experience-modalSelect"
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Super Deluxe">Super Deluxe</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <button type="submit" className="Tour-Experience-modalSubmitBtn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting Booking...' : 'Submit Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourExperiance;