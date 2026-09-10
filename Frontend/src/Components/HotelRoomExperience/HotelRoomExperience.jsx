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
  FaFire
} from 'react-icons/fa';
import {
  FiShield,
  FiBox
} from 'react-icons/fi';
import {
  MdLocalLaundryService
} from 'react-icons/md';

const HotelRoomExperience = ({ hotel }) => {
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

  const handleExtraServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };

  const hotelName = hotel?.name || "Hotel Room & Suites";
  const hotelLocation = hotel ? `${hotel.city}${hotel.address ? `, ${hotel.address}` : ''}` : "Puri, Odisha, India";
  const hotelPriceNum = Number(hotel?.price || 2898);
  const hotelPriceStr = hotelPriceNum.toLocaleString('en-IN');
  const hotelRating = hotel?.starRating || 5;
  const hotelDesc = hotel?.detailedDesc || hotel?.shortDesc || "Experience comfortable stays and world-class hospitality in Puri with clean rooms, essential amenities, and peaceful ambiance.";

  // Calculate pricing based on hotel price
  const adultPrice = hotelPriceNum;
  const childPrice = Math.round(hotelPriceNum * 0.4);
  const days = selectedDatePlan === 1 ? 4 : 5;
  const adultTotal = adultCount * adultPrice;
  const childTotal = childCount * childPrice;
  const extrasTotal =
    (extraServices.homePickup ? 500 : 0) +
    (extraServices.nightFood ? 350 : 0) +
    (extraServices.seaplaneFlying ? 1200 : 0);
  const totalPrice = (adultTotal + childTotal + extrasTotal).toLocaleString('en-IN');

  // SEO Schema Markup for Jagannatha Tour and Travels
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": `${hotelName} - Jagannatha Tour and Travels`,
    "description": hotel?.shortDesc || hotelDesc,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel?.address || "Main Street",
      "addressLocality": hotel?.city || "Puri",
      "addressCountry": "India"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": `${hotelRating}.0`,
      "reviewCount": "94"
    },
    "priceRange": `₹${hotelPriceStr}`
  };

  return (
    <section className="HotelRoomExperience" aria-labelledby="hotel-title">
      {/* Dynamic SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="HotelRoomExperience-container">
        
        {/* Left Column: Hotel Info & Amenities */}
        <div className="HotelRoomExperience-left">
          
          {/* Header Location & Rating */}
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

          {/* Title & Price */}
          <h1 id="hotel-title" className="HotelRoomExperience-title">
            {hotelName}
          </h1>
          <div className="HotelRoomExperience-priceRow">
            <span className="HotelRoomExperience-price">₹{hotelPriceStr}</span>
            <span className="HotelRoomExperience-perNight">/per night</span>
          </div>

          {/* Description Paragraph / HTML */}
          {hotel?.detailedDesc && hotel.detailedDesc.includes('<') ? (
            <div 
              className="HotelRoomExperience-description"
              dangerouslySetInnerHTML={{ __html: hotel.detailedDesc }}
            />
          ) : (
            <p className="HotelRoomExperience-description">
              {hotelDesc}
            </p>
          )}

         

          {/* Pets Policy */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Check-In / Check-Out</h2>
            <p className="HotelRoomExperience-subText">
              Check-In: <strong>{hotel?.checkIn || "14:00"}</strong> | Check-Out: <strong>{hotel?.checkOut || "11:00"}</strong>
            </p>
          </div>

          {/* Children and Extra Beds */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Children and extra beds.</h2>
            <p className="HotelRoomExperience-subText">
              Children are welcome! Kids stay free when using existing bedding. Extra rollaway beds are available upon request. Total available rooms: <strong>{hotel?.rooms || 50}</strong>.
            </p>
          </div>

          {/* Facilities List */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Facilities & Amenities</h2>
            <div className="HotelRoomExperience-facilitiesGrid">
              {hotel?.amenities ? (
                (typeof hotel.amenities === 'string' ? hotel.amenities.split(',') : hotel.amenities).map((amenity, idx) => (
                  <div className="HotelRoomExperience-facilityItem" key={idx}>
                    <FaCheck className="HotelRoomExperience-checkIcon" />
                    <span>{amenity.trim()}</span>
                  </div>
                ))
              ) : (
                <>
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
                  <div className="HotelRoomExperience-facilityItem">
                    <FaCheck className="HotelRoomExperience-checkIcon" />
                    <span>Car park</span>
                  </div>
                  <div className="HotelRoomExperience-facilityItem">
                    <FaCheck className="HotelRoomExperience-checkIcon" />
                    <span>Front desk [24-hour]</span>
                  </div>
                  <div className="HotelRoomExperience-facilityItem">
                    <FaCheck className="HotelRoomExperience-checkIcon" />
                    <span>Sauna & Spa</span>
                  </div>
                  <div className="HotelRoomExperience-facilityItem">
                    <FaCheck className="HotelRoomExperience-checkIcon" />
                    <span>Breakfast [free]</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Booking Card */}
        <div className="HotelRoomExperience-right">
          <div className="HotelRoomExperience-bookingCard">
            
            <h3 className="HotelRoomExperience-cardTitle">Book Your Room</h3>
            <p className="HotelRoomExperience-cardSubtitle">
              Reserve {hotelName} early for a hassle-free trip; secure comfort and convenience!
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
                className={`HotelRoomExperience-tabBtn ${bookingType === 'inquiry' ? 'HotelRoomExperience-tabActiveInquiry' : ''}`}
                onClick={() => setBookingType('inquiry')}
              >
                Inquiry Form
              </button>
            </div>

            {/* Date Selection Options */}
            <div className="HotelRoomExperience-dateSection">
              <span className="HotelRoomExperience-label">Select Your Booking Date:</span>

              {/* Option 1 */}
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
                    <span className="HotelRoomExperience-dateVal">Today</span>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                  <div className="HotelRoomExperience-dateBlock">
                    <span className="HotelRoomExperience-dateLabel">Check Out</span>
                    <span className="HotelRoomExperience-dateVal">Next Day</span>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
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
                    <span className="HotelRoomExperience-dateVal">Weekend</span>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                  <div className="HotelRoomExperience-dateBlock">
                    <span className="HotelRoomExperience-dateLabel">Check Out</span>
                    <span className="HotelRoomExperience-dateVal">Sunday</span>
                  </div>
                </div>
              </div>

              {/* Custom Input */}
              <div className="HotelRoomExperience-dateOptionCustom">
                <div className="HotelRoomExperience-checkboxSquare" />
                <div className="HotelRoomExperience-customInputBox">
                  <span className="HotelRoomExperience-customPlaceholder">Custom Check In & Out</span>
                  <FaCalendarAlt className="HotelRoomExperience-calIcon" />
                </div>
              </div>

            </div>

            {/* Guest Counters */}
            <div className="HotelRoomExperience-guestsSection">
              
              {/* Adult Counter */}
              <div className="HotelRoomExperience-guestRow">
                <span className="HotelRoomExperience-guestType">Adult:</span>
                <div className="HotelRoomExperience-guestPrice">
                  <span className="HotelRoomExperience-currPrice">₹{adultPrice.toLocaleString('en-IN')}</span>
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

              {/* Children Counter */}
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

            </div>

            {/* Other Extra Services */}
            <div className="HotelRoomExperience-extrasSection">
              <h4 className="HotelRoomExperience-extrasTitle">Other Extra Services</h4>
              
              <label className="HotelRoomExperience-extraRow">
                <div className="HotelRoomExperience-extraLeft">
                  <input
                    type="checkbox"
                    checked={extraServices.homePickup}
                    onChange={() => handleExtraServiceChange('homePickup')}
                  />
                  <span>Airport / Station Pickup</span>
                </div>
                <span className="HotelRoomExperience-extraPrice">₹500</span>
              </label>

              <label className="HotelRoomExperience-extraRow">
                <div className="HotelRoomExperience-extraLeft">
                  <input
                    type="checkbox"
                    checked={extraServices.nightFood}
                    onChange={() => handleExtraServiceChange('nightFood')}
                  />
                  <span>Dinner Buffet</span>
                </div>
                <span className="HotelRoomExperience-extraPrice">₹350</span>
              </label>

              <label className="HotelRoomExperience-extraRow">
                <div className="HotelRoomExperience-extraLeft">
                  <input
                    type="checkbox"
                    checked={extraServices.seaplaneFlying}
                    onChange={() => handleExtraServiceChange('seaplaneFlying')}
                  />
                  <span>City Sightseeing Tour</span>
                </div>
                <span className="HotelRoomExperience-extraPrice">₹1,200</span>
              </label>
            </div>

            {/* Pricing Calculation Breakdown */}
            <div className="HotelRoomExperience-breakdownSection">
              
              <div className="HotelRoomExperience-breakdownRow">
                <div className="HotelRoomExperience-breakdownCol">
                  <span className="HotelRoomExperience-colLabel">Adults Total</span>
                  <div className="HotelRoomExperience-calcFormula">
                    <span>₹{adultPrice.toLocaleString('en-IN')}</span> <span className="HotelRoomExperience-subLbl">PRICE</span>
                    <span>×</span>
                    <span>{adultCount}</span> <span className="HotelRoomExperience-subLbl">QTY</span>
                  </div>
                </div>
                <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                <span className="HotelRoomExperience-calcTotal">₹{adultTotal.toLocaleString('en-IN')}</span>
              </div>

              {childCount > 0 && (
                <div className="HotelRoomExperience-breakdownRow">
                  <div className="HotelRoomExperience-breakdownCol">
                    <span className="HotelRoomExperience-colLabel">Children Total</span>
                    <div className="HotelRoomExperience-calcFormula">
                      <span>₹{childPrice.toLocaleString('en-IN')}</span> <span className="HotelRoomExperience-subLbl">PRICE</span>
                      <span>×</span>
                      <span>{childCount}</span> <span className="HotelRoomExperience-subLbl">QTY</span>
                    </div>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                  <span className="HotelRoomExperience-calcTotal">₹{childTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

            </div>

            {/* Total Price & Action Button */}
            <div className="HotelRoomExperience-totalRow">
              <span className="HotelRoomExperience-totalLabel">Total Price:</span>
              <span className="HotelRoomExperience-totalAmount">₹{totalPrice}</span>
            </div>

            <button className="HotelRoomExperience-bookBtn">
              Book Now
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelRoomExperience;