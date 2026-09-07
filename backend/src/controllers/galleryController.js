const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

/*
=========================================
GET ALL GALLERY
=========================================
*/

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("GET GALLERY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};


/*
=========================================
GET SINGLE GALLERY
=========================================
*/

const getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("GET SINGLE GALLERY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery image",
      error: error.message,
    });
  }
};


/*
=========================================
CREATE GALLERY
=========================================
*/

const createGallery = async (req, res) => {
  try {
    const { imageName } = req.body;

    // Validate image name
    if (!imageName || !imageName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image name is required",
      });
    }

    // Validate uploaded image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }

    const gallery = await Gallery.create({
      imageName: imageName.trim(),
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image added successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("CREATE GALLERY ERROR:", error);

    // Delete uploaded file if database save fails
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../uploads/gallery",
        req.file.filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to add gallery image",
      error: error.message,
    });
  }
};


/*
=========================================
UPDATE GALLERY
=========================================
*/

const updateGallery = async (req, res) => {
  try {
    const { imageName } = req.body;

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      // If multer uploaded a file but gallery doesn't exist,
      // remove the newly uploaded file.
      if (req.file) {
        const newFilePath = path.join(
          __dirname,
          "../uploads/gallery",
          req.file.filename
        );

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
      }

      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    if (!imageName || !imageName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image name is required",
      });
    }

    // Keep old image initially
    let oldImage = gallery.image;

    gallery.imageName = imageName.trim();

    // If a new image was uploaded
    if (req.file) {
      gallery.image = req.file.filename;
    }

    const updatedGallery = await gallery.save();

    // Delete old image after successful DB update
    if (req.file && oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads/gallery",
        oldImage
      );

      if (
        fs.existsSync(oldImagePath) &&
        oldImage !== req.file.filename
      ) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: "Gallery image updated successfully",
      data: updatedGallery,
    });
  } catch (error) {
    console.error("UPDATE GALLERY ERROR:", error);

    // Delete newly uploaded image if update fails
    if (req.file) {
      const newFilePath = path.join(
        __dirname,
        "../uploads/gallery",
        req.file.filename
      );

      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath);
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to update gallery image",
      error: error.message,
    });
  }
};


/*
=========================================
DELETE GALLERY
=========================================
*/

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete image from uploads folder
    if (gallery.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads/gallery",
        gallery.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete MongoDB document
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE GALLERY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete gallery image",
      error: error.message,
    });
  }
};


module.exports = {
  getGallery,
  getSingleGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};