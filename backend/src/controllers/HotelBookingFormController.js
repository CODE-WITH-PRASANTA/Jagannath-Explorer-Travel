const HotelBooking = require("../models/HotelBooking");

// =====================================================
// CREATE HOTEL BOOKING
// POST /api/hotel-bookings
// =====================================================

const createHotelBooking = async (req, res) => {
  try {
    const {
      hotelName,
      fullName,
      phone,
      destination,
      checkIn,
      checkOut,
      stayNights,
      roomType,
      guests,
      adults,
      children,
      price,
      status,
      extraServices,
    } = req.body;

    // =================================================
    // REQUIRED FIELD VALIDATION
    // =================================================

    if (!hotelName) {
      return res.status(400).json({
        success: false,
        message: "Hotel name is required",
      });
    }

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!destination) {
      return res.status(400).json({
        success: false,
        message: "Destination is required",
      });
    }

    if (!checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-in date is required",
      });
    }

    if (!checkOut) {
      return res.status(400).json({
        success: false,
        message: "Check-out date is required",
      });
    }

    if (!roomType) {
      return res.status(400).json({
        success: false,
        message: "Room type is required",
      });
    }

    // =================================================
    // PHONE VALIDATION
    // =================================================

    const cleanPhone = String(phone).replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian phone number",
      });
    }

    // =================================================
    // GUEST VALIDATION
    // =================================================

    const adultTotal = Number(adults) || 1;
    const childTotal = Number(children) || 0;

    const guestTotal =
      Number(guests) || adultTotal + childTotal;

    if (adultTotal < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one adult is required",
      });
    }

    // =================================================
    // CREATE BOOKING
    // =================================================

    const booking = new HotelBooking({
      hotelName: String(hotelName).trim(),

      fullName: String(fullName).trim(),

      phone: cleanPhone,

      destination: String(destination).trim(),

      checkIn: String(checkIn).trim(),

      checkOut: String(checkOut).trim(),

      stayNights: stayNights
        ? String(stayNights).trim()
        : "1 Night",

      roomType: String(roomType).trim(),

      guests: guestTotal,

      adults: adultTotal,

      children: childTotal,

      price: price
        ? String(price).trim()
        : "₹0",

      status: status || "Booked",

      extraServices: {
        homePickup:
          Boolean(extraServices?.homePickup),

        nightFood:
          Boolean(extraServices?.nightFood),
      },
    });

    // =================================================
    // SAVE TO MONGODB
    // =================================================

    const savedBooking = await booking.save();

    // =================================================
    // SUCCESS RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Hotel booking submitted successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error(
      "CREATE HOTEL BOOKING ERROR:",
      error
    );

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create hotel booking",
      error: error.message,
    });
  }
};

module.exports = {
  createHotelBooking,
};