const express = require("express");
const router = express.Router();
const {
  createHotelBooking,
  getHotelBookings,
  getHotelBookingById,
  updateHotelBooking,
  deleteHotelBooking,
} = require("../controllers/hotelBookingController");

// /api/hotel-bookings
router.route("/").post(createHotelBooking).get(getHotelBookings);

// /api/hotel-bookings/:id
router
  .route("/:id")
  .get(getHotelBookingById)
  .put(updateHotelBooking)
  .delete(deleteHotelBooking);

module.exports = router;
