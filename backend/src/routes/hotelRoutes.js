const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

// Route: /api/hotels
router
  .route("/")
  .get(getHotels)
  .post(upload.array("images", 6, "hotels"), createHotel);

// Route: /api/hotels/:id
router
  .route("/:id")
  .get(getHotelById)
  .put(upload.array("images", 6, "hotels"), updateHotel)
  .delete(deleteHotel);

module.exports = router;
