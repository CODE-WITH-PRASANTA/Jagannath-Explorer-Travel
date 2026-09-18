const express = require("express");
const router = express.Router();

// Your custom multer + sharp WebP middleware
const upload = require("../middleware/multer");

const {
  getTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  toggleTestimonialStatus,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Admin fetch
router.get("/admin", getAllTestimonialsAdmin);

// Status switch
router.patch("/:id/status", toggleTestimonialStatus);

// Base endpoints
router
  .route("/")
  .get(getTestimonials) // Returns only "Published"
  .post(upload.single("avatar", "users"), createTestimonial); // Automatically converts to .webp

router
  .route("/:id")
  .put(upload.single("avatar", "users"), updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;