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

const TourExperience = ({ tour }) => {
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

  // Pricing calculations
  const adultPrice = Number(tour?.price) || 0;
  const childPrice = Number(tour?.discountPrice) > 0 ? Number(tour?.discountPrice) : Math.round(adultPrice * 0.5);
  const pickupCost = extraServices.homePickup ? 500 : 0;
  const foodCost = extraServices.nightFood ? 750 : 0;
  const seaplaneCost = extraServices.seaplane ? 1200 : 0;
  const extrasTotal = pickupCost + foodCost + seaplaneCost;
  const totalPrice = (adultPrice * adultQty) + (childPrice * childQty) + extrasTotal;

  // Real lists from database
  const includedList = Array.isArray(tour?.includes) ? tour.includes.filter(Boolean) : [];
  const excludedList = Array.isArray(tour?.excludes) ? tour.excludes.filter(Boolean) : [];
  const highlightsList = Array.isArray(tour?.tags) ? tour.tags.filter(Boolean) : [];
  const itineraryList = Array.isArray(tour?.itinerary) ? tour.itinerary : [];

  const handleBookNow = () => {
    window.location.href = `tel:9668892441`;
  };

  return (
    <section className="TourExperience">
      <div className="TourExperience-container">
        
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="TourExperience-mainContent">
          
          {/* Main Title & Price */}
          <h1 className="TourExperience-title">
            {tour?.title || "Tour Package Details"}
          </h1>

          {tour?.price !== undefined && (
            <div className="TourExperience-priceTag">
              <span className="TourExperience-priceAmount">
                ₹{adultPrice.toLocaleString('en-IN')}
              </span>
              <span className="TourExperience-priceUnit">/per person</span>
            </div>
          )}

          {/* Quick Meta Info */}
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

          {/* Intro Paragraphs */}
          {(tour?.detailedDescription || tour?.shortDescription) && (
            <div className="TourExperience-description">
              {tour?.detailedDescription && <p>{tour.detailedDescription}</p>}
              {tour?.shortDescription && tour?.shortDescription !== tour?.detailedDescription && (
                <p>{tour.shortDescription}</p>
              )}
            </div>
          )}

          {/* Included and Excluded Section */}
          {(includedList.length > 0 || excludedList.length > 0) && (
            <div className="TourExperience-section">
              <h2 className="TourExperience-sectionTitle">Included and Excluded</h2>
              <div className="TourExperience-incExcGrid">
                
                {/* Included Items */}
                {includedList.length > 0 && (
                  <div className="TourExperience-incExcColumn">
                    {includedList.map((item, idx) => (
                      <div className="TourExperience-incItem" key={idx}>
                        <FaCheck className="TourExperience-checkIcon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Excluded Items */}
                {excludedList.length > 0 && (
                  <div className="TourExperience-incExcColumn">
                    {excludedList.map((item, idx) => (
                      <div className="TourExperience-excItem" key={idx}>
                        <FaTimes className="TourExperience-timesIcon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Highlights Section */}
          {highlightsList.length > 0 && (
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
          )}

          {/* Itinerary Accordion Section */}
          {itineraryList.length > 0 && (
            <div className="TourExperience-section">
              <h2 className="TourExperience-sectionTitle">Itinerary</h2>
              <div className="TourExperience-itineraryAccordion">
                {itineraryList.map((dayItem, idx) => {
                  const dayBadgeText = dayItem.dayNumber || (dayItem.day ? `Day ${String(dayItem.day).padStart(2, '0')}` : `Day ${String(idx + 1).padStart(2, '0')}`);
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
                        <h3 className="TourExperience-dayTitle">{dayItem.title || `Day ${idx + 1} Schedule`}</h3>
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
          )}

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
                    <span className="TourExperience-dateValue">Upcoming Slot 1</span>
                  </div>
                  <FaLongArrowAltRight className="TourExperience-dateArrow" />
                  <div>
                    <span className="TourExperience-dateLabel">Check Out</span>
                    <span className="TourExperience-dateValue">Flexible</span>
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
                    <span className="TourExperience-dateValue">Upcoming Slot 2</span>
                  </div>
                  <FaLongArrowAltRight className="TourExperience-dateArrow" />
                  <div>
                    <span className="TourExperience-dateLabel">Check Out</span>
                    <span className="TourExperience-dateValue">Flexible</span>
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
                  defaultValue="Select Custom Date" 
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
                  <span className="TourExperience-priceSale">₹{adultPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="TourExperience-counter">
                  <button 
                    type="button"
                    className="TourExperience-counterBtn" 
                    onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                  >
                    <FaMinus />
                  </button>
                  <span className="TourExperience-countValue">{adultQty}</span>
                  <button 
                    type="button"
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
                  <span className="TourExperience-priceSale">₹{childPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="TourExperience-counter">
                  <button 
                    type="button"
                    className="TourExperience-counterBtn" 
                    onClick={() => setChildQty(Math.max(0, childQty - 1))}
                  >
                    <FaMinus />
                  </button>
                  <span className="TourExperience-countValue">{childQty}</span>
                  <button 
                    type="button"
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
                <span className="TourExperience-extraName">Home / Airport Pickup</span>
                <span className="TourExperience-extraPrice">₹500</span>
              </div>

              <div className="TourExperience-extraRow" onClick={() => handleServiceChange('nightFood')}>
                <div className="TourExperience-checkboxSquare">
                  {extraServices.nightFood && <span className="TourExperience-innerCheck"></span>}
                </div>
                <span className="TourExperience-extraName">Special Dinner & Food</span>
                <span className="TourExperience-extraPrice">₹750</span>
              </div>

              <div className="TourExperience-extraRow" onClick={() => handleServiceChange('seaplane')}>
                <div className="TourExperience-checkboxSquare">
                  {extraServices.seaplane && <span className="TourExperience-innerCheck"></span>}
                </div>
                <span className="TourExperience-extraName">Local Sightseeing Boating/Pass</span>
                <span className="TourExperience-extraPrice">₹1,200</span>
              </div>
            </div>

            {/* Calculations Breakdown Box */}
            <div className="TourExperience-breakdownBox">
              
              {/* Adult Row */}
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

              {/* Children Row */}
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

            {/* Book Now Button */}
            <button 
              type="button"
              className="TourExperience-bookNowBtn"
              onClick={handleBookNow}
            >
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
                <span className="TourExperience-phoneNumber">+91 96688 92441</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TourExperience;