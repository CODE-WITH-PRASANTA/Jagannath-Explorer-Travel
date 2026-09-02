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
  MdLocalLaundryService // Replaced missing TbShirtLaundry with stable Md icon
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

  const handleExtraServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey]
    }));
  };

  // SEO Schema Markup for Jagannatha Tour and Travels
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

          {/* Title & Price */}
          <h1 id="hotel-title" className="HotelRoomExperience-title">
            Golden Tulip The Grandmark Dhaka
          </h1>
          <div className="HotelRoomExperience-priceRow">
            <span className="HotelRoomExperience-price">₹280</span>
            <span className="HotelRoomExperience-perNight">/per night</span>
          </div>

          {/* Description Paragraph */}
          <p className="HotelRoomExperience-description">
            Welcome to the best five-star luxury hotel in New York. Hotel is veryes elementum sesue the aucan vestibulum aliquam justo in sapien on thi rutrum volutpat. Donec in quis the pellentesque velit. Donec id velitel ac arcu posuere blane. Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisuen the aucan ligula. Orcive varius natoque penatibus et magnis discustent parturient monte nascete ridiculus mus nellentesque habitant forminy morbine.
          </p>

          {/* Highlights Section */}
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

          {/* Pets Policy */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Pets.</h2>
            <p className="HotelRoomExperience-subText">Pets not allowed</p>
          </div>

          {/* Children and Extra Beds */}
          <div className="HotelRoomExperience-section">
            <h2 className="HotelRoomExperience-sectionTitle">Children and extra beds.</h2>
            <p className="HotelRoomExperience-subText">
              Children are welcome Kids stay free! Children stay free when using existing bedding; children may not be eligible for complimentary breakfast Rollaway/extra beds are available for ₹ 10 per day.
            </p>
          </div>

          {/* Facilities List */}
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
                <span>Sauna</span>
              </div>
              <div className="HotelRoomExperience-facilityItem">
                <FaCheck className="HotelRoomExperience-checkIcon" />
                <span>Breakfast [free]</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Booking Card */}
        <div className="HotelRoomExperience-right">
          <div className="HotelRoomExperience-bookingCard">
            
            <h3 className="HotelRoomExperience-cardTitle">Book Your Room</h3>
            <p className="HotelRoomExperience-cardSubtitle">
              Reserve your ideal Room early for a hassle-free trip; secure comfort and convenience!
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
                    <span className="HotelRoomExperience-dateVal">Jan 1, 2024</span>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                  <div className="HotelRoomExperience-dateBlock">
                    <span className="HotelRoomExperience-dateLabel">Check Out</span>
                    <span className="HotelRoomExperience-dateVal">Jan 5, 2024</span>
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
                    <span className="HotelRoomExperience-dateVal">Jan 10, 2024</span>
                  </div>
                  <FaLongArrowAltRight className="HotelRoomExperience-arrowRight" />
                  <div className="HotelRoomExperience-dateBlock">
                    <span className="HotelRoomExperience-dateLabel">Check Out</span>
                    <span className="HotelRoomExperience-dateVal">Jan 15, 2024</span>
                  </div>
                </div>
              </div>

              {/* Custom Input */}
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
              
              {/* Adult Counter */}
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

              {/* Children Counter */}
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

              <label className="HotelRoomExperience-extraRow">
                <div className="HotelRoomExperience-extraLeft">
                  <input
                    type="checkbox"
                    checked={extraServices.seaplaneFlying}
                    onChange={() => handleExtraServiceChange('seaplaneFlying')}
                  />
                  <span>Seaplane Fyling</span>
                </div>
                <span className="HotelRoomExperience-extraPrice">₹20</span>
              </label>
            </div>

            {/* Pricing Calculation Breakdown */}
            <div className="HotelRoomExperience-breakdownSection">
              
              <div className="HotelRoomExperience-breakdownRow">
                <div className="HotelRoomExperience-breakdownCol">
                  <span className="HotelRoomExperience-colLabel">Adult</span>
                  <div className="HotelRoomExperience-calcFormula">
                    <span>₹195</span> <span className="HotelRoomExperience-subLbl">PRICE</span>
                    <span>×</span>
                    <span>02</span> <span className="HotelRoomExperience-subLbl">QTY</span>
                    <span>×</span>
                    <span>04</span> <span className="HotelRoomExperience-subLbl">DAYS</span>
                  </div>
                </div>
                <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                <span className="HotelRoomExperience-calcTotal">₹390</span>
              </div>

              <div className="HotelRoomExperience-breakdownRow">
                <div className="HotelRoomExperience-breakdownCol">
                  <span className="HotelRoomExperience-colLabel">Children</span>
                  <div className="HotelRoomExperience-calcFormula">
                    <span>₹195</span> <span className="HotelRoomExperience-subLbl">PRICE</span>
                    <span>×</span>
                    <span>02</span> <span className="HotelRoomExperience-subLbl">QTY</span>
                    <span>×</span>
                    <span>04</span> <span className="HotelRoomExperience-subLbl">DAYS</span>
                  </div>
                </div>
                <FaLongArrowAltRight className="HotelRoomExperience-calcArrow" />
                <span className="HotelRoomExperience-calcTotal">₹390</span>
              </div>

            </div>

            {/* Total Price & Action Button */}
            <div className="HotelRoomExperience-totalRow">
              <span className="HotelRoomExperience-totalLabel">Total Price:</span>
              <span className="HotelRoomExperience-totalAmount">₹470</span>
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