const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// =====================================================
// CREATE GALLERY
// POST /api/gallery
// =====================================================

const createGallery = async (req, res) => {
  try {
    const { mediaName, mediaType } = req.body;

    // Validate title
    if (!mediaName || !mediaName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Media title/name is required.",
      });
    }

    // Validate uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image or video.",
      });
    }

    let detectedMediaType = "image";

    if (req.file.mimetype.startsWith("video/")) {
      detectedMediaType = "video";
    }

    // If frontend sends mediaType, validate it
    if (
      mediaType &&
      !["image", "video"].includes(mediaType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid media type.",
      });
    }

    const finalMediaType =
      mediaType || detectedMediaType;

    // Create URL
    const mediaUrl =
      `/uploads/gallery/${req.file.filename}`;

    // Create MongoDB document
    const gallery = await Gallery.create({
      mediaName: mediaName.trim(),
      mediaType: finalMediaType,
      mediaUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery media uploaded successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);

    // Remove uploaded file if DB creation fails
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../../uploads/gallery",
        req.file.filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create gallery media.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL GALLERY
// GET /api/gallery
// =====================================================

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE GALLERY
// GET /api/gallery/:id
// =====================================================

const getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery media not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("GET SINGLE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery media.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE GALLERY
// PUT /api/gallery/:id
// =====================================================

const updateGallery = async (req, res) => {
  try {
    const { mediaName, mediaType } = req.body;

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      if (req.file) {
        const uploadedPath = path.join(
          __dirname,
          "../../uploads/gallery",
          req.file.filename
        );

        if (fs.existsSync(uploadedPath)) {
          fs.unlinkSync(uploadedPath);
        }
      }

      return res.status(404).json({
        success: false,
        message: "Gallery media not found.",
      });
    }

    // Update title
    if (mediaName && mediaName.trim()) {
      gallery.mediaName = mediaName.trim();
    }

    // If new file uploaded
    if (req.file) {
      const oldMediaUrl = gallery.mediaUrl;

      let newMediaType = "image";

      if (req.file.mimetype.startsWith("video/")) {
        newMediaType = "video";
      }

      gallery.mediaUrl =
        `/uploads/gallery/${req.file.filename}`;

      gallery.mediaType =
        mediaType || newMediaType;

      // Delete old physical file
      if (oldMediaUrl) {
        const oldFileName =
          path.basename(oldMediaUrl);

        const oldFilePath = path.join(
          __dirname,
          "../../uploads/gallery",
          oldFileName
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    } else if (mediaType) {
      gallery.mediaType = mediaType;
    }

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Gallery media updated successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);

    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../../uploads/gallery",
        req.file.filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery media.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE GALLERY
// DELETE /api/gallery/:id
// =====================================================

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery media not found.",
      });
    }

    // Delete physical file
    if (gallery.mediaUrl) {
      const fileName =
        path.basename(gallery.mediaUrl);

      const filePath = path.join(
        __dirname,
        "../../uploads/gallery",
        fileName
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete MongoDB document
    await Gallery.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Gallery media deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery media.",
      error: error.message,
    });
  }
};

module.exports = {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
};