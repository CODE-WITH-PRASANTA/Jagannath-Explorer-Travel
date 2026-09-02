import React, { useState } from 'react';
import './TourExperience.css';

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
  FaLongArrowAltRight, 
  FaPhoneAlt 
} from 'react-icons/fa';

// Import Support Banner Image from src/assets/
import supportAgent from '../../assets/img 10.webp';

const TourExperience = () => {
  // Booking Form States
  const [bookingTab, setBookingTab] = useState('online');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [adultQty, setAdultQty] = useState(1);
  const [childQty, setChildQty] = useState(0);
  
  // Extra Services State
  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplane: false,
  });

  // Accordion Itinerary State (Day 1 open by default)
  const [openDay, setOpenDay] = useState(1);

  const toggleDay = (dayNum) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };

  const handleServiceChange = (serviceKey) => {
    setExtraServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey],
    }));
  };

  return (
    <section className="TourExperience">
      <div className="TourExperience-container">
        
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="TourExperience-mainContent">
          
          {/* Main Title & Price */}
          <h1 className="TourExperience-title">
            Experience the tour of excitement with the most adventurous activities.
          </h1>

          <div className="TourExperience-priceTag">
            <span className="TourExperience-priceAmount">$175</span>
            <span className="TourExperience-priceUnit">/per person</span>
          </div>

          {/* Quick Meta Info */}
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

          {/* Intro Paragraphs */}
          <div className="TourExperience-description">
            <p>
              Tour and travel refer to the activities related to planning, organizing, and experiencing trips to various destinations for leisure, exploration, adventure, or relaxation. Choose your destination based on your interests and preferences, whether it's a cultural experience, a natural adventure, historical exploration, or a beach vacation.
            </p>
            <p>
              Book suitable accommodation, which can range from hotels, resorts, hostels, vacation rentals, or even camping depending on your travel style and destination. Arrange transportation to and within your destination. This can include flights, trains, buses, rental cars, or even cruises.
            </p>
          </div>

          {/* Included and Excluded Section */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Included and Excluded</h2>
            <div className="TourExperience-incExcGrid">
              
              {/* Included Items */}
              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-incItem">
                  <FaCheck className="TourExperience-checkIcon" />
                  <span>Meal As Per Hotel Plan And Drinks Free Too.</span>
                </div>
                <div className="TourExperience-incItem">
                  <FaCheck className="TourExperience-checkIcon" />
                  <span>Return Airport And Round Trip Transfers.</span>
                </div>
                <div className="TourExperience-incItem">
                  <FaCheck className="TourExperience-checkIcon" />
                  <span>Accommodation On Twin Sharing Basis.</span>
                </div>
                <div className="TourExperience-incItem">
                  <FaCheck className="TourExperience-checkIcon" />
                  <span>The Above Rates Are On Per Day Disposal Basi</span>
                </div>
                <div className="TourExperience-incItem">
                  <FaCheck className="TourExperience-checkIcon" />
                  <span>Enjoy Brussels Day Tours. Overnight Brussels</span>
                </div>
              </div>

              {/* Excluded Items */}
              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-excItem">
                  <FaTimes className="TourExperience-timesIcon" />
                  <span>AC Will Not Be Functional On Hills Or Slopes.</span>
                </div>
                <div className="TourExperience-excItem">
                  <FaTimes className="TourExperience-timesIcon" />
                  <span>Any Other Service Not Mentioned</span>
                </div>
                <div className="TourExperience-excItem">
                  <FaTimes className="TourExperience-timesIcon" />
                  <span>Additional Entry Fees Other Than Specified</span>
                </div>
                <div className="TourExperience-excItem">
                  <FaTimes className="TourExperience-timesIcon" />
                  <span>Amsterdam Canal Cruise Not Included For Basic</span>
                </div>
              </div>

            </div>
          </div>

          {/* Highlights Section */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Highlights of the Tour</h2>
            <div className="TourExperience-highlightsList">
              <div className="TourExperience-highlightItem">
                <FaCheckCircle className="TourExperience-greenCircleIcon" />
                <span>Our Team Of Knowledgeable Guides And Travel Experts Are Dedicated To Making Your Journey Memorable And Worry-Free</span>
              </div>
              <div className="TourExperience-highlightItem">
                <FaCheckCircle className="TourExperience-greenCircleIcon" />
                <span>Dive Into Rich Cultures And Traditions. Explore Historic Sites, Savor Authentic Cuisine, And Connect With Locals.</span>
              </div>
              <div className="TourExperience-highlightItem">
                <FaCheckCircle className="TourExperience-greenCircleIcon" />
                <span>We Take Care Of All The Details, So You Can Focus On Creating Memories. Rest Assured That Your Journey Is In Capable Hands</span>
              </div>
              <div className="TourExperience-highlightItem">
                <FaCheckCircle className="TourExperience-greenCircleIcon" />
                <span>Sip Cocktails On The Beach As You Watch The Sun Dip Below The Horizon.</span>
              </div>
              <div className="TourExperience-highlightItem">
                <FaCheckCircle className="TourExperience-greenCircleIcon" />
                <span>From Accommodations To Dining Experiences, We Select The Best Partners To Ensure Your Comfort And Enjoyment Throughout Your Journey.</span>
              </div>
            </div>
          </div>

          {/* Itinerary Accordion Section */}
          <div className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">Itinerary</h2>
            <div className="TourExperience-itineraryAccordion">
              
              {/* Day 01 */}
              <div className={`TourExperience-accordionItem ${openDay === 1 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(1)}>
                  <div className="TourExperience-dayBadge">Day 01 :</div>
                  <h3 className="TourExperience-dayTitle">Departure</h3>
                  {openDay === 1 ? (
                    <FaChevronUp className="TourExperience-accordionIcon" />
                  ) : (
                    <FaChevronDown className="TourExperience-accordionIcon" />
                  )}
                </div>
                {openDay === 1 && (
                  <div className="TourExperience-accordionBody">
                    <p>
                      Arrive Cairo airport, welcome greeting by our representative who will assist you and provide transfers to your Hotel in Cairo. <em>(the clients will inform us about their arrival time minimum 7 days before)</em>
                    </p>
                    <div className="TourExperience-daySubItem">
                      <FaCheck className="TourExperience-checkIcon" />
                      <span>Admire Big Ben, Buckingham Palace And St Paul’s Cathedral</span>
                    </div>
                    <div className="TourExperience-daySubItem">
                      <FaCheck className="TourExperience-checkIcon" />
                      <span>Chance To Spot Prominent Landmarks Of The City</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Day 02 */}
              <div className={`TourExperience-accordionItem ${openDay === 2 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(2)}>
                  <div className="TourExperience-dayBadge">Day 02 :</div>
                  <h3 className="TourExperience-dayTitle">Adventure Beggins</h3>
                  {openDay === 2 ? (
                    <FaChevronUp className="TourExperience-accordionIcon" />
                  ) : (
                    <FaChevronDown className="TourExperience-accordionIcon" />
                  )}
                </div>
                {openDay === 2 && (
                  <div className="TourExperience-accordionBody">
                    <p>Explore city monuments and embark on the adventure tour.</p>
                  </div>
                )}
              </div>

              {/* Day 03 */}
              <div className={`TourExperience-accordionItem ${openDay === 3 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(3)}>
                  <div className="TourExperience-dayBadge">Day 03 :</div>
                  <h3 className="TourExperience-dayTitle">Historical Tour</h3>
                  {openDay === 3 ? (
                    <FaChevronUp className="TourExperience-accordionIcon" />
                  ) : (
                    <FaChevronDown className="TourExperience-accordionIcon" />
                  )}
                </div>
                {openDay === 3 && (
                  <div className="TourExperience-accordionBody">
                    <p>Guided tour through ancient castles and historic landmarks.</p>
                  </div>
                )}
              </div>

              {/* Day 04 */}
              <div className={`TourExperience-accordionItem ${openDay === 4 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(4)}>
                  <div className="TourExperience-dayBadge">Day 04 :</div>
                  <h3 className="TourExperience-dayTitle">Rest & Tour</h3>
                  {openDay === 4 ? (
                    <FaChevronUp className="TourExperience-accordionIcon" />
                  ) : (
                    <FaChevronDown className="TourExperience-accordionIcon" />
                  )}
                </div>
                {openDay === 4 && (
                  <div className="TourExperience-accordionBody">
                    <p>Relaxation day with optional leisure activities and local dining.</p>
                  </div>
                )}
              </div>

              {/* Day 05 */}
              <div className={`TourExperience-accordionItem ${openDay === 5 ? 'TourExperience-open' : ''}`}>
                <div className="TourExperience-accordionHeader" onClick={() => toggleDay(5)}>
                  <div className="TourExperience-dayBadge">Day 05 :</div>
                  <h3 className="TourExperience-dayTitle">Return</h3>
                  {openDay === 5 ? (
                    <FaChevronUp className="TourExperience-accordionIcon" />
                  ) : (
                    <FaChevronDown className="TourExperience-accordionIcon" />
                  )}
                </div>
                {openDay === 5 && (
                  <div className="TourExperience-accordionBody">
                    <p>Checkout and transfer to airport for departure back home.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="TourExperience-sidebar">
          
          {/* Booking Card */}
          <div className="TourExperience-bookingCard">
            <h2 className="TourExperience-bookingTitle">Book Your Tour</h2>
            <p className="TourExperience-bookingSubtitle">
              Reserve your ideal trip early for a hassle-free trip; secure comfort and convenience!
            </p>

            {/* Tabs */}
            <div className="TourExperience-tabs">
              <button 
                className={`TourExperience-tab ${bookingTab === 'online' ? 'TourExperience-activeTab' : ''}`}
                onClick={() => setBookingTab('online')}
              >
                Online Booking
              </button>
              <button 
                className={`TourExperience-tab ${bookingTab === 'inquiry' ? 'TourExperience-activeTab' : ''}`}
                onClick={() => setBookingTab('inquiry')}
              >
                Inquiry Form
              </button>
            </div>

            {/* Date Selection */}
            <div className="TourExperience-fieldGroup">
              <label className="TourExperience-fieldLabel">Select Your Booking Date:</label>
              
              {/* Check-in / Check-out Options */}
              <div 
                className={`TourExperience-dateOption ${selectedDateIndex === 0 ? 'TourExperience-selectedDate' : ''}`}
                onClick={() => setSelectedDateIndex(0)}
              >
                <div className="TourExperience-checkboxSquare">
                  {selectedDateIndex === 0 && <span className="TourExperience-innerCheck"></span>}
                </div>
                <div className="TourExperience-dateTextGroup">
                  <div>
                    <span className="TourExperience-dateLabel">Check In</span>
                    <span className="TourExperience-dateValue">Jan 1, 2024</span>
                  </div>
                  <FaLongArrowAltRight className="TourExperience-dateArrow" />
                  <div>
                    <span className="TourExperience-dateLabel">Check Out</span>
                    <span className="TourExperience-dateValue">Jan 5, 2024</span>
                  </div>
                </div>
              </div>

              <div 
                className={`TourExperience-dateOption ${selectedDateIndex === 1 ? 'TourExperience-selectedDate' : ''}`}
                onClick={() => setSelectedDateIndex(1)}
              >
                <div className="TourExperience-checkboxSquare">
                  {selectedDateIndex === 1 && <span className="TourExperience-innerCheck"></span>}
                </div>
                <div className="TourExperience-dateTextGroup">
                  <div>
                    <span className="TourExperience-dateLabel">Check In</span>
                    <span className="TourExperience-dateValue">Jan 10, 2024</span>
                  </div>
                  <FaLongArrowAltRight className="TourExperience-dateArrow" />
                  <div>
                    <span className="TourExperience-dateLabel">Check Out</span>
                    <span className="TourExperience-dateValue">Jan 15, 2024</span>
                  </div>
                </div>
              </div>

              {/* Custom Date Input */}
              <div className="TourExperience-customDateBox">
                <div className="TourExperience-checkboxSquare TourExperience-greenSquare">
                  <span className="TourExperience-innerCheck"></span>
                </div>
                <input 
                  type="text" 
                  defaultValue="5 Jan, 2024" 
                  className="TourExperience-dateInput" 
                />
                <FaCalendarAlt className="TourExperience-calendarIcon" />
              </div>

            </div>

            {/* Quantity Selectors */}
            <div className="TourExperience-qtySection">
              
              {/* Adult */}
              <div className="TourExperience-qtyRow">
                <div className="TourExperience-qtyLabel">
                  <span>Adult:</span>
                  <span className="TourExperience-priceSale">$60</span>
                  <span className="TourExperience-priceOriginal">$80</span>
                </div>
                <div className="TourExperience-counter">
                  <button 
                    className="TourExperience-counterBtn" 
                    onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                  >
                    <FaMinus />
                  </button>
                  <span className="TourExperience-countValue">{adultQty}</span>
                  <button 
                    className="TourExperience-counterBtn" 
                    onClick={() => setAdultQty(adultQty + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="TourExperience-qtyRow">
                <div className="TourExperience-qtyLabel">
                  <span>Children:</span>
                  <span className="TourExperience-priceSale">$15</span>
                </div>
                <div className="TourExperience-counter">
                  <button 
                    className="TourExperience-counterBtn" 
                    onClick={() => setChildQty(Math.max(0, childQty - 1))}
                  >
                    <FaMinus />
                  </button>
                  <span className="TourExperience-countValue">{childQty}</span>
                  <button 
                    className="TourExperience-counterBtn" 
                    onClick={() => setChildQty(childQty + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

            </div>

            {/* Other Extra Services */}
            <div className="TourExperience-extraServices">
              <h3 className="TourExperience-extraTitle">Other Extra Services</h3>

              <div className="TourExperience-extraRow" onClick={() => handleServiceChange('homePickup')}>
                <div className="TourExperience-checkboxSquare">
                  {extraServices.homePickup && <span className="TourExperience-innerCheck"></span>}
                </div>
                <span className="TourExperience-extraName">Home Pickup</span>
                <span className="TourExperience-extraPrice">$10</span>
              </div>

              <div className="TourExperience-extraRow" onClick={() => handleServiceChange('nightFood')}>
                <div className="TourExperience-checkboxSquare">
                  {extraServices.nightFood && <span className="TourExperience-innerCheck"></span>}
                </div>
                <span className="TourExperience-extraName">Night Food</span>
                <span className="TourExperience-extraPrice">$15</span>
              </div>

              <div className="TourExperience-extraRow" onClick={() => handleServiceChange('seaplane')}>
                <div className="TourExperience-checkboxSquare">
                  {extraServices.seaplane && <span className="TourExperience-innerCheck"></span>}
                </div>
                <span className="TourExperience-extraName">Seaplane Fyling</span>
                <span className="TourExperience-extraPrice">$20</span>
              </div>
            </div>

            {/* Calculations Breakdown Box */}
            <div className="TourExperience-breakdownBox">
              
              {/* Adult Row */}
              <div className="TourExperience-breakdownItem">
                <span className="TourExperience-breakdownType">Adult</span>
                <div className="TourExperience-formula">
                  <span>$195 <small>PRICE</small></span>
                  <span className="TourExperience-operator">×</span>
                  <span>02 <small>QTY</small></span>
                  <span className="TourExperience-operator">×</span>
                  <span>04 <small>DAYS</small></span>
                </div>
                <FaLongArrowAltRight className="TourExperience-breakdownArrow" />
                <span className="TourExperience-breakdownTotal">$390</span>
              </div>

              {/* Children Row */}
              <div className="TourExperience-breakdownItem">
                <span className="TourExperience-breakdownType">Children</span>
                <div className="TourExperience-formula">
                  <span>$195 <small>PRICE</small></span>
                  <span className="TourExperience-operator">×</span>
                  <span>02 <small>QTY</small></span>
                  <span className="TourExperience-operator">×</span>
                  <span>04 <small>DAYS</small></span>
                </div>
                <FaLongArrowAltRight className="TourExperience-breakdownArrow" />
                <span className="TourExperience-breakdownTotal">$390</span>
              </div>

            </div>

            {/* Total Price */}
            <div className="TourExperience-totalRow">
              <span className="TourExperience-totalLabel">Total Price:</span>
              <span className="TourExperience-totalValue">$470</span>
            </div>

            {/* Book Now Button */}
            <button className="TourExperience-bookNowBtn">
              Book Now
            </button>

          </div>

          {/* Contact Inquiry Card */}
          <div className="TourExperience-supportCard">
            <img 
              src={supportAgent} 
              alt="Customer Support Agent" 
              className="TourExperience-supportImg"
            />
            <div className="TourExperience-supportBanner">
              <div className="TourExperience-phoneCircle">
                <FaPhoneAlt className="TourExperience-phoneIcon" />
              </div>
              <div className="TourExperience-supportText">
                <span className="TourExperience-supportLabel">To More Inquiry</span>
                <span className="TourExperience-phoneNumber">+990-737 621 432</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TourExperience;