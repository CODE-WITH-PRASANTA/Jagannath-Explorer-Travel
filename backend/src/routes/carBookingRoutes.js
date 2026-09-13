const express = require("express");
const router = express.Router();
const {
  createCarBooking,
  getCarBookings,
  getCarBookingById,
  updateCarBooking,
  deleteCarBooking,
} = require("../controllers/carBookingController");

// /api/car-bookings
router.route("/").post(createCarBooking).get(getCarBookings);

// /api/car-bookings/:id
router
  .route("/:id")
  .get(getCarBookingById)
  .put(updateCarBooking)
  .delete(deleteCarBooking);

module.exports = router;
