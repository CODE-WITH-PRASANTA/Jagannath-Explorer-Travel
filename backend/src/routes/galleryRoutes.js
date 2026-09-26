
const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

// =====================================================
// CREATE GALLERY
// POST /api/gallery
// =====================================================

router.post(
  "/",
  ...upload.single("mediaFile"),
  createGallery
);

// =====================================================
// GET ALL GALLERY
// GET /api/gallery
// =====================================================

router.get(
  "/",
  getGallery
);

// =====================================================
// GET SINGLE GALLERY
// GET /api/gallery/:id
// =====================================================

router.get(
  "/:id",
  getSingleGallery
);

// =====================================================
// UPDATE GALLERY
// PUT /api/gallery/:id
// =====================================================

router.put(
  "/:id",
  ...upload.single("mediaFile"),
  updateGallery
);

// =====================================================
// DELETE GALLERY
// DELETE /api/gallery/:id
// =====================================================

router.delete(
  "/:id",
  deleteGallery
);

module.exports = router;

