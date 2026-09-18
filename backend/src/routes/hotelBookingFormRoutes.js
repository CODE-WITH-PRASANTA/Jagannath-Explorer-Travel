const express = require("express");

const {
  createHotelBooking,
} = require("../controllers/hotelBookingController");

const router = express.Router();

// =====================================================
// CREATE HOTEL BOOKING
// POST /api/hotel-bookings
// =====================================================

router.post("/", createHotelBooking);

module.exports = router;