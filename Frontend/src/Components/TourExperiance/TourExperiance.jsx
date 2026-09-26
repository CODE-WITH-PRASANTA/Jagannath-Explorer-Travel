import React, { useEffect, useState } from "react";
import "./TourExperiance.css";

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
  FaLongArrowAltRight,
} from "react-icons/fa";

import API from "../../api/axios";
import supportAgent from "../../assets/img 10.webp";

const SERVICE_PRICES = {
  homePickup: 500,
  nightFood: 750,
  seaplane: 1200,
};

const TourExperiance = ({ tour }) => {
  /* =========================================================
     HELPERS
  ========================================================= */

  const parseList = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
      return value
        .map(String)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (typeof value === "string") {
      return value
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  /* =========================================================
     DATABASE DATA
  ========================================================= */

  const dbIncludes = parseList(tour?.includes);
  const dbExcludes = parseList(tour?.excludes);
  const dbHighlights = parseList(tour?.tags);

  const includedList =
    dbIncludes.length > 0
      ? dbIncludes
      : [
          "Private AC Cab for Sightseeing",
          "Experienced Driver cum Tour Guide",
          "Special Temple VIP Darshan Assistance",
          "Hotel Pick-up & Drop Service",
          "All Toll Taxes, Parking & Fuel Charges",
        ];

  const excludedList =
    dbExcludes.length > 0
      ? dbExcludes
      : [
          "Monument & Camera Entry Tickets",
          "Personal Expenses & Shopping",
          "Any Extra Meals or Refreshments",
          "Anything not mentioned in Inclusions",
        ];

  const highlightsList =
    dbHighlights.length > 0
      ? dbHighlights
      : [
          "Sacred Jagannath Temple Darshan & Mahaprasad Experience",
          "Witness Majestic Konark Sun Temple Architecture",
          "Scenic Golden Beach Walk & Sunrise Moments in Puri",
          "Enchanting Chilika Lake Dolphin & Bird Watching",
        ];

  /* =========================================================
     ITINERARY
  ========================================================= */

  let itineraryList = [];

  if (tour?.itinerary) {
    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      itineraryList = tour.itinerary;
    } else if (typeof tour.itinerary === "string") {
      try {
        const parsed = JSON.parse(tour.itinerary);

        if (Array.isArray(parsed) && parsed.length > 0) {
          itineraryList = parsed;
        }
      } catch (error) {
        console.warn("Invalid itinerary JSON:", error);
      }
    }
  }

  if (itineraryList.length === 0) {
    itineraryList = [
      {
        dayNumber: "Day 01",
        title: `Arrival & ${
          tour?.destination || "Puri"
        } Temple Darshan`,
        description:
          "Warm welcome upon arrival. Transfer to the hotel. Proceed for sacred darshan of Lord Jagannath and enjoy the evening spiritual atmosphere around Grand Road.",
        highlights: [
          "Hotel Check-in & Refreshment",
          "Jagannath Temple Darshan",
          "Evening Beach Walk",
        ],
      },
      {
        dayNumber: "Day 02",
        title: "Konark Sun Temple & Marine Drive Sightseeing",
        description:
          "After breakfast, explore the UNESCO World Heritage Sun Temple at Konark and the pristine Chandrabhaga Beach along the scenic Marine Drive.",
        highlights: [
          "Konark Sun Temple Visit",
          "Chandrabhaga Beach",
          "Local Craft & Handloom Village",
        ],
      },
      {
        dayNumber: "Day 03",
        title: "Chilika Lake Excursion & Departure",
        description:
          "Drive to Chilika Lake at Satapada for boating and Irrawaddy dolphin spotting. Evening drop-off at station or airport with beautiful memories.",
        highlights: [
          "Chilika Lake Boating",
          "Dolphin Point",
          "Return Transfer",
        ],
      },
    ];
  }

  /* =========================================================
     STATES
  ========================================================= */

  const [adultQty, setAdultQty] = useState(2);
  const [childQty, setChildQty] = useState(0);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [extraServices, setExtraServices] = useState({
    homePickup: false,
    nightFood: false,
    seaplane: false,
  });

  const [openDay, setOpenDay] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalForm, setModalForm] = useState({
    name: "",
    packageName:
      tour?.title || "Odisha Heritage Tour Package",
    phone: "",
    destination: tour?.destination || "Odisha",
    price: "",
    members: "",
    category: "Standard",
    checkIn: "",
    checkOut: "",
  });

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  /* =========================================================
     PRICING
  ========================================================= */

  const adultPrice = Number(tour?.price) || 2999;

  const childPrice =
    Number(tour?.discountPrice) > 0
      ? Number(tour.discountPrice)
      : Math.round(adultPrice * 0.5);

  const pickupCost = extraServices.homePickup
    ? SERVICE_PRICES.homePickup
    : 0;

  const foodCost = extraServices.nightFood
    ? SERVICE_PRICES.nightFood
    : 0;

  const seaplaneCost = extraServices.seaplane
    ? SERVICE_PRICES.seaplane
    : 0;

  const extrasTotal =
    pickupCost + foodCost + seaplaneCost;

  const adultTotal = adultPrice * adultQty;
  const childTotal = childPrice * childQty;

  const totalPrice =
    adultTotal + childTotal + extrasTotal;

  /* =========================================================
     HANDLERS
  ========================================================= */

  const toggleDay = (dayNumber) => {
    setOpenDay((current) =>
      current === dayNumber ? null : dayNumber
    );
  };

  const handleServiceChange = (serviceKey) => {
    setExtraServices((previous) => ({
      ...previous,
      [serviceKey]: !previous[serviceKey],
    }));
  };

  const handleOpenModal = () => {
    setModalForm((previous) => ({
      ...previous,
      packageName:
        tour?.title ||
        previous.packageName ||
        "Odisha Heritage Tour Package",

      destination:
        tour?.destination ||
        previous.destination ||
        "Odisha",

      price: `₹${totalPrice.toLocaleString("en-IN")}`,

      members: `${adultQty + childQty} (${adultQty} Adult${
        adultQty !== 1 ? "s" : ""
      }${childQty > 0 ? `, ${childQty} Child${childQty !== 1 ? "ren" : ""}` : ""})`,

      checkIn: checkInDate,
      checkOut: checkOutDate,
    }));

    setIsModalOpen(true);
  };

  const handleModalChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const digitsOnly = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setModalForm((previous) => ({
        ...previous,
        phone: digitsOnly,
      }));

      return;
    }

    setModalForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     SUBMIT BOOKING
  ========================================================= */

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    if (!modalForm.name.trim()) {
      alert("Please provide your full name.");
      return;
    }

    const cleanPhone = modalForm.phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        fullName: modalForm.name.trim(),

        mobileNumber: modalForm.phone.trim(),

        tourPackage:
          modalForm.packageName ||
          tour?.title ||
          "Tour Package Booking",

        destination:
          modalForm.destination ||
          tour?.destination ||
          "Odisha",

        startDate:
          modalForm.checkIn || checkInDate,

        endDate:
          modalForm.checkOut || checkOutDate,

        checkIn:
          modalForm.checkIn || checkInDate,

        checkOut:
          modalForm.checkOut || checkOutDate,

        adults: adultQty,

        children: childQty,

        guests:
          modalForm.members ||
          `${adultQty} Adult(s)${
            childQty > 0
              ? `, ${childQty} Child(ren)`
              : ""
          }`,

        category:
          modalForm.category || "Standard",

        price:
          modalForm.price ||
          `₹${totalPrice.toLocaleString("en-IN")}`,

        extraServices,

        agreedToTerms: true,
      };

      const response = await API.post(
        "/tour-bookings",
        payload
      );

      if (
        response.data?.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        alert(
          "🎉 Booking inquiry submitted successfully! Our team will contact you shortly."
        );

        setModalForm({
          name: "",
          packageName:
            tour?.title ||
            "Odisha Heritage Tour Package",
          phone: "",
          destination:
            tour?.destination || "Odisha",
          price: "",
          members: "",
          category: "Standard",
          checkIn: "",
          checkOut: "",
        });

        setCheckInDate("");
        setCheckOutDate("");

        setAdultQty(1);
        setChildQty(0);

        setExtraServices({
          homePickup: false,
          nightFood: false,
          seaplane: false,
        });

        setIsModalOpen(false);
      } else {
        alert(
          response.data?.message ||
            "Failed to submit booking inquiry. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Failed to submit tour booking:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Server error. Please try again or contact us on WhatsApp.";

      alert(`⚠️ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     WHATSAPP BOOKING
  ========================================================= */

  const handleBookNow = () => {
    const tourTitle =
      tour?.title || "Odisha Holiday Tour";

    let message =
      `Jai Jagannath! I would like to book the tour: *${tourTitle}*\n` +
      `- Destination: ${
        tour?.destination || "Odisha"
      }\n`;

    if (checkInDate) {
      message += `- Check In: ${checkInDate}\n`;
    }

    if (checkOutDate) {
      message += `- Check Out: ${checkOutDate}\n`;
    }

    message +=
      `- Adults: ${adultQty}\n` +
      `- Children: ${childQty}\n` +
      `- Total Price: ₹${totalPrice.toLocaleString(
        "en-IN"
      )}\n` +
      `Please share confirmation and itinerary details.`;

    const whatsappURL =
      `https://wa.me/919668892441?text=` +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <section className="TourExperience">
      <div className="TourExperience-container">

        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <main className="TourExperience-mainContent">

          <h1 className="TourExperience-title">
            {tour?.title ||
              "Jagannath Dham & Odisha Tour Package"}
          </h1>

          <div className="TourExperience-priceTag">
            <span className="TourExperience-priceAmount">
              ₹{adultPrice.toLocaleString("en-IN")}
            </span>

            <span className="TourExperience-priceUnit">
              / per person
            </span>
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
                <span>
                  Max People : {tour.maxPeople}
                </span>
              </div>
            )}

            {tour?.destination && (
              <div className="TourExperience-metaItem">
                <FaMapMarkerAlt className="TourExperience-metaIcon" />
                <span>{tour.destination}</span>
              </div>
            )}

          </div>

          {/* DESCRIPTION */}

          <div className="TourExperience-description">
            <p>
              {tour?.detailedDescription ||
                tour?.shortDescription ||
                "Experience the divine heritage of Odisha with our curated tour package. From the holy Puri Jagannath Temple to the architectural marvel of Konark Sun Temple and serene beaches, immerse yourself in an unforgettable journey of spiritual devotion, rich culture, and authentic Odia hospitality."}
            </p>
          </div>

          {/* INCLUDED / EXCLUDED */}

          <section className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">
              Included and Excluded
            </h2>

            <div className="TourExperience-incExcGrid">

              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-columnHeading">
                  <span className="TourExperience-headingDot included" />
                  Included
                </div>

                {includedList.map((item, index) => (
                  <div
                    className="TourExperience-incItem"
                    key={`include-${index}`}
                  >
                    <FaCheck className="TourExperience-checkIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="TourExperience-incExcColumn">
                <div className="TourExperience-columnHeading">
                  <span className="TourExperience-headingDot excluded" />
                  Excluded
                </div>

                {excludedList.map((item, index) => (
                  <div
                    className="TourExperience-excItem"
                    key={`exclude-${index}`}
                  >
                    <FaTimes className="TourExperience-timesIcon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* HIGHLIGHTS */}

          <section className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">
              Highlights of the Tour
            </h2>

            <div className="TourExperience-highlightsList">
              {highlightsList.map((item, index) => (
                <div
                  className="TourExperience-highlightItem"
                  key={`highlight-${index}`}
                >
                  <FaCheckCircle className="TourExperience-greenCircleIcon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ITINERARY */}

          <section className="TourExperience-section">
            <h2 className="TourExperience-sectionTitle">
              Itinerary
            </h2>

            <div className="TourExperience-itineraryAccordion">

              {itineraryList.map((dayItem, index) => {
                const dayNumber =
                  dayItem.dayNumber ||
                  `Day ${String(index + 1).padStart(
                    2,
                    "0"
                  )}`;

                const isOpen =
                  openDay === index + 1;

                const activities =
                  Array.isArray(dayItem.highlights)
                    ? dayItem.highlights
                    : Array.isArray(dayItem.activities)
                    ? dayItem.activities
                    : [];

                return (
                  <div
                    className={`TourExperience-accordionItem ${
                      isOpen
                        ? "TourExperience-open"
                        : ""
                    }`}
                    key={`day-${index}`}
                  >

                    <button
                      type="button"
                      className="TourExperience-accordionHeader"
                      onClick={() =>
                        toggleDay(index + 1)
                      }
                    >

                      <span className="TourExperience-dayBadge">
                        {dayNumber}
                      </span>

                      <span className="TourExperience-dayTitle">
                        {dayItem.title ||
                          `Day ${
                            index + 1
                          } Sightseeing`}
                      </span>

                      <span className="TourExperience-accordionIcon">
                        {isOpen ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>

                    </button>

                    {isOpen && (
                      <div className="TourExperience-accordionBody">

                        {dayItem.description && (
                          <p>
                            {dayItem.description}
                          </p>
                        )}

                        {activities.length > 0 && (
                          <div className="TourExperience-dayActivities">
                            {activities.map(
                              (activity, activityIndex) => (
                                <div
                                  className="TourExperience-daySubItem"
                                  key={`activity-${activityIndex}`}
                                >
                                  <FaCheck className="TourExperience-checkIcon" />
                                  <span>
                                    {activity}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          </section>
        </main>

        {/* =====================================================
            RIGHT SIDEBAR
        ===================================================== */}

        <aside className="TourExperience-sidebar">

          {/* BOOKING CARD */}

          <div className="TourExperience-bookingCard">

            <div className="TourExperience-bookingHeader">
              <span className="TourExperience-bookingBadge">
                QUICK BOOKING
              </span>

              <h2 className="TourExperience-bookingTitle">
                Book Your Tour
              </h2>

              <p className="TourExperience-bookingSubtitle">
                Reserve your ideal trip early for a
                hassle-free experience.
              </p>
            </div>

            {/* DATES */}

            <div className="TourExperience-datePickersContainer">

              <div className="TourExperience-dateInputGroup">
                <label className="TourExperience-dateFieldLabel">
                  <FaCalendarAlt />
                  Check In
                </label>

                <input
                  type="date"
                  min={today}
                  value={checkInDate}
                  onChange={(event) => {
                    const selectedDate =
                      event.target.value;

                    setCheckInDate(selectedDate);

                    if (
                      !checkOutDate ||
                      checkOutDate < selectedDate
                    ) {
                      setCheckOutDate(
                        selectedDate
                      );
                    }
                  }}
                  className="TourExperience-dateInputField"
                />
              </div>

              <div className="TourExperience-dateInputGroup">
                <label className="TourExperience-dateFieldLabel">
                  <FaCalendarAlt />
                  Check Out
                </label>

                <input
                  type="date"
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(event) =>
                    setCheckOutDate(
                      event.target.value
                    )
                  }
                  className="TourExperience-dateInputField"
                />
              </div>

            </div>

            {/* QUANTITY */}

            <div className="TourExperience-qtySection">

              <div className="TourExperience-qtyRow">

                <div className="TourExperience-qtyLabel">
                  <span className="TourExperience-personType">
                    Adult
                  </span>

                  <span className="TourExperience-priceSale">
                    ₹{adultPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="TourExperience-counter">

                  <button
                    type="button"
                    className="TourExperience-counterBtn"
                    onClick={() =>
                      setAdultQty(
                        Math.max(
                          1,
                          adultQty - 1
                        )
                      )
                    }
                  >
                    <FaMinus />
                  </button>

                  <span className="TourExperience-countValue">
                    {adultQty}
                  </span>

                  <button
                    type="button"
                    className="TourExperience-counterBtn"
                    onClick={() =>
                      setAdultQty(
                        adultQty + 1
                      )
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

              <div className="TourExperience-qtyRow">

                <div className="TourExperience-qtyLabel">
                  <span className="TourExperience-personType">
                    Children
                  </span>

                  <span className="TourExperience-priceSale">
                    ₹{childPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="TourExperience-counter">

                  <button
                    type="button"
                    className="TourExperience-counterBtn"
                    onClick={() =>
                      setChildQty(
                        Math.max(
                          0,
                          childQty - 1
                        )
                      )
                    }
                  >
                    <FaMinus />
                  </button>

                  <span className="TourExperience-countValue">
                    {childQty}
                  </span>

                  <button
                    type="button"
                    className="TourExperience-counterBtn"
                    onClick={() =>
                      setChildQty(
                        childQty + 1
                      )
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

            </div>

            {/* EXTRA SERVICES */}

            <div className="TourExperience-extraServices">

              <h3 className="TourExperience-extraTitle">
                Other Extra Services
              </h3>

              <button
                type="button"
                className={`TourExperience-extraRow ${
                  extraServices.homePickup
                    ? "TourExperience-extraRowActive"
                    : ""
                }`}
                onClick={() =>
                  handleServiceChange(
                    "homePickup"
                  )
                }
              >
                <span className="TourExperience-checkboxSquare">
                  {extraServices.homePickup && (
                    <FaCheck />
                  )}
                </span>

                <span className="TourExperience-extraName">
                  Home / Airport Pickup
                </span>

                <span className="TourExperience-extraPrice">
                  ₹{SERVICE_PRICES.homePickup}
                </span>
              </button>

              <button
                type="button"
                className={`TourExperience-extraRow ${
                  extraServices.nightFood
                    ? "TourExperience-extraRowActive"
                    : ""
                }`}
                onClick={() =>
                  handleServiceChange(
                    "nightFood"
                  )
                }
              >
                <span className="TourExperience-checkboxSquare">
                  {extraServices.nightFood && (
                    <FaCheck />
                  )}
                </span>

                <span className="TourExperience-extraName">
                  Special Mahaprasad / Food
                </span>

                <span className="TourExperience-extraPrice">
                  ₹{SERVICE_PRICES.nightFood}
                </span>
              </button>

              <button
                type="button"
                className={`TourExperience-extraRow ${
                  extraServices.seaplane
                    ? "TourExperience-extraRowActive"
                    : ""
                }`}
                onClick={() =>
                  handleServiceChange(
                    "seaplane"
                  )
                }
              >
                <span className="TourExperience-checkboxSquare">
                  {extraServices.seaplane && (
                    <FaCheck />
                  )}
                </span>

                <span className="TourExperience-extraName">
                  Chilika Boating & Sightseeing
                </span>

                <span className="TourExperience-extraPrice">
                  ₹{SERVICE_PRICES.seaplane}
                </span>
              </button>

            </div>

            {/* PRICE BREAKDOWN */}

            <div className="TourExperience-breakdownBox">

              <div className="TourExperience-breakdownItem">

                <span className="TourExperience-breakdownType">
                  Adult
                </span>

                <div className="TourExperience-formula">
                  <span>
                    ₹{adultPrice}
                    <small>PRICE</small>
                  </span>

                  <span className="TourExperience-operator">
                    ×
                  </span>

                  <span>
                    {String(adultQty).padStart(
                      2,
                      "0"
                    )}
                    <small>QTY</small>
                  </span>
                </div>

                <FaLongArrowAltRight className="TourExperience-breakdownArrow" />

                <span className="TourExperience-breakdownTotal">
                  ₹{adultTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {childQty > 0 && (
                <div className="TourExperience-breakdownItem">

                  <span className="TourExperience-breakdownType">
                    Children
                  </span>

                  <div className="TourExperience-formula">
                    <span>
                      ₹{childPrice}
                      <small>PRICE</small>
                    </span>

                    <span className="TourExperience-operator">
                      ×
                    </span>

                    <span>
                      {String(childQty).padStart(
                        2,
                        "0"
                      )}
                      <small>QTY</small>
                    </span>
                  </div>

                  <FaLongArrowAltRight className="TourExperience-breakdownArrow" />

                  <span className="TourExperience-breakdownTotal">
                    ₹{childTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>
              )}

              {extrasTotal > 0 && (
                <div className="TourExperience-breakdownItem">

                  <span className="TourExperience-breakdownType">
                    Extras
                  </span>

                  <div className="TourExperience-formula">
                    <span>
                      ₹{extrasTotal}
                      <small>SERVICES</small>
                    </span>
                  </div>

                  <span className="TourExperience-breakdownTotal">
                    ₹{extrasTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>
              )}

            </div>

            {/* TOTAL */}

            <div className="TourExperience-totalRow">
              <span className="TourExperience-totalLabel">
                Total Price
              </span>

              <span className="TourExperience-totalValue">
                ₹{totalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* BUTTONS */}

            <div className="TourExperience-actionButtons">

              <button
                type="button"
                className="TourExperience-whatsappBtn"
                onClick={handleBookNow}
              >
                WhatsApp Book
              </button>

              <button
                type="button"
                className="TourExperience-bookNowBtn"
                onClick={handleOpenModal}
              >
                Book Now
              </button>

            </div>

          </div>

          {/* SUPPORT CARD */}

          <div className="TourExperience-supportCard">

            <img
              src={supportAgent}
              alt="Customer Support Agent"
              className="TourExperience-supportImg"
            />

            <div className="TourExperience-supportBanner">

              <div className="TourExperience-phoneCircle">
                <FaPhoneAlt />
              </div>

              <div className="TourExperience-supportText">
                <span className="TourExperience-supportLabel">
                  For More Inquiries
                </span>

                <a
                  href="tel:+919668892441"
                  className="TourExperience-phoneNumber"
                >
                  +91 96688 92441
                </a>
              </div>

            </div>

          </div>

        </aside>

      </div>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {isModalOpen && (
        <div
          className="TourExperience-modalOverlay"
          onClick={() =>
            setIsModalOpen(false)
          }
        >

          <div
            className="TourExperience-modalBox"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="TourExperience-modalCloseBtn"
              onClick={() =>
                setIsModalOpen(false)
              }
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="TourExperience-modalHeader">
              <span className="TourExperience-modalBadge">
                TOUR BOOKING
              </span>

              <h2 className="TourExperience-modalTitle">
                Complete Booking Inquiry
              </h2>

              <p className="TourExperience-modalSubtitle">
                Fill in your details and our team
                will contact you shortly.
              </p>
            </div>

            <form
              className="TourExperience-modalForm"
              onSubmit={handleModalSubmit}
            >

              <div className="TourExperience-modalRow">

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Full Name
                  </label>

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
                  <label className="TourExperience-modalLabel">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    value={modalForm.phone}
                    onChange={handleModalChange}
                    required
                    className="TourExperience-modalInput"
                  />
                </div>

              </div>

              <div className="TourExperience-modalRow">

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Package Name
                  </label>

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
                  <label className="TourExperience-modalLabel">
                    Destination
                  </label>

                  <input
                    type="text"
                    name="destination"
                    value={modalForm.destination}
                    onChange={handleModalChange}
                    required
                    className="TourExperience-modalInput"
                  />
                </div>

              </div>

              <div className="TourExperience-modalRow">

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Check In Date
                  </label>

                  <input
                    type="date"
                    name="checkIn"
                    min={today}
                    value={modalForm.checkIn}
                    onChange={handleModalChange}
                    className="TourExperience-modalInput"
                  />
                </div>

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Check Out Date
                  </label>

                  <input
                    type="date"
                    name="checkOut"
                    min={
                      modalForm.checkIn ||
                      today
                    }
                    value={modalForm.checkOut}
                    onChange={handleModalChange}
                    className="TourExperience-modalInput"
                  />
                </div>

              </div>

              <div className="TourExperience-modalRow">

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Price
                  </label>

                  <input
                    type="text"
                    name="price"
                    value={modalForm.price}
                    onChange={handleModalChange}
                    className="TourExperience-modalInput"
                  />
                </div>

                <div className="TourExperience-modalGroup">
                  <label className="TourExperience-modalLabel">
                    Members
                  </label>

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

                <label className="TourExperience-modalLabel">
                  Category
                </label>

                <select
                  name="category"
                  value={modalForm.category}
                  onChange={handleModalChange}
                  className="TourExperience-modalSelect"
                >
                  <option value="Standard">
                    Standard
                  </option>

                  <option value="Deluxe">
                    Deluxe
                  </option>

                  <option value="Super Deluxe">
                    Super Deluxe
                  </option>

                  <option value="Luxury">
                    Luxury
                  </option>
                </select>

              </div>

              <button
                type="submit"
                className="TourExperience-modalSubmitBtn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting Booking..."
                  : "Submit Booking"}
              </button>

            </form>

          </div>

        </div>
      )}

    </section>
  );
};

export default TourExperiance;