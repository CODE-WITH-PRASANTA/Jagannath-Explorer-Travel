const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const {
  getGallery,
  getSingleGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");


// =========================================
// GET ALL GALLERY
// =========================================

router.get("/", getGallery);


// =========================================
// GET SINGLE GALLERY
// =========================================

router.get("/:id", getSingleGallery);


// =========================================
// CREATE GALLERY
// =========================================

router.post(
  "/",
  upload.single("image"),
  createGallery
);


// =========================================
// UPDATE GALLERY
// =========================================

router.put(
  "/:id",
  upload.single("image"),
  updateGallery
);


// =========================================
// DELETE GALLERY
// =========================================

router.delete(
  "/:id",
  deleteGallery
);


module.exports = router;