const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

router
  .route("/")
  .get(getTestimonials)
  .post(upload.single("avatar"), createTestimonial);

router
  .route("/:id")
  .put(upload.single("avatar"), updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;