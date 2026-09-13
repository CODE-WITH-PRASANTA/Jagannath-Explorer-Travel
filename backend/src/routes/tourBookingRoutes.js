const express = require("express");
const router = express.Router();
const {
  createTourBooking,
  getAllTourBookings,
  getTourBookingById,
  updateTourBooking,
  deleteTourBooking,
} = require("../controllers/tourBookingController");

// Public endpoints for creating & retrieving
router.post("/", createTourBooking);
router.get("/", getAllTourBookings);
router.get("/:id", getTourBookingById);
router.put("/:id", updateTourBooking);
router.delete("/:id", deleteTourBooking);

module.exports = router;
