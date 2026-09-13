const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

// Route: /api/tours
router
  .route("/")
  .get(getTours)
  .post(upload.any("tours"), createTour);

// Route: /api/tours/:id
router
  .route("/:id")
  .get(getTourById)
  .put(upload.any("tours"), updateTour)
  .delete(deleteTour);

module.exports = router;
