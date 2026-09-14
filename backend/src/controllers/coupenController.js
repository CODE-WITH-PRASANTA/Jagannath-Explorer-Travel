const path = require("path");
const fs = require("fs");
const Coupen = require("../models/coupenModel");

// ======================================================
// HELPER - DELETE IMAGE
// ======================================================

const deleteImage = (imagePath) => {
  try {
    if (!imagePath) return;

    const fileName = path.basename(imagePath);

    const fullPath = path.join(
      __dirname,
      "../uploads/coupen",
      fileName
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.log("Image delete error:", error.message);
  }
};

// ======================================================
// CREATE COUPEN / BANNER
// POST /api/coupen
// ======================================================

const createCoupen = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      discount,
      bgColor,
      buttonText,
      status,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Banner title is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required.",
      });
    }

    const image = req.file.url || `/uploads/coupen/${req.file.filename}`;

    const coupen = await Coupen.create({
      title: title.trim(),
      subtitle: subtitle ? subtitle.trim() : "",
      discount: discount ? discount.trim() : "",
      bgColor: bgColor && bgColor.trim() ? bgColor.trim() : "#22c55e",
      buttonText: buttonText && buttonText.trim() ? buttonText.trim() : "Book Now",
      image,
      status: status === "Inactive" ? "Inactive" : "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Banner created successfully.",
      data: coupen,
    });
  } catch (error) {
    console.error("Create Coupen Error:", error);

    if (req.file) {
      deleteImage(req.file.url || `/uploads/coupen/${req.file.filename}`);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create banner.",
      error: error.message,
    });
  }
};

// ======================================================
// GET ALL COUPENS
// GET /api/coupen
// ======================================================

const getCoupens = async (req, res) => {
  try {
    const coupens = await Coupen.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: coupens.length,
      data: coupens,
    });
  } catch (error) {
    console.error("Get Coupens Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners.",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE COUPEN
// GET /api/coupen/:id
// ======================================================

const getCoupenById = async (req, res) => {
  try {
    const coupen = await Coupen.findById(req.params.id);

    if (!coupen) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: coupen,
    });
  } catch (error) {
    console.error("Get Coupen By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch banner.",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE COUPEN
// PUT /api/coupen/:id
// ======================================================

const updateCoupen = async (req, res) => {
  try {
    const coupen = await Coupen.findById(req.params.id);

    if (!coupen) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    const {
      title,
      subtitle,
      discount,
      bgColor,
      buttonText,
      status,
    } = req.body;

    if (title !== undefined) coupen.title = title.trim();
    if (subtitle !== undefined) coupen.subtitle = subtitle.trim();
    if (discount !== undefined) coupen.discount = discount.trim();
    if (bgColor !== undefined) coupen.bgColor = bgColor.trim();
    if (buttonText !== undefined) coupen.buttonText = buttonText.trim();
    if (status !== undefined) {
      coupen.status = status === "Inactive" ? "Inactive" : "Active";
    }

    if (req.file) {
      const oldImage = coupen.image;
      coupen.image = req.file.url || `/uploads/coupen/${req.file.filename}`;
      deleteImage(oldImage);
    }

    const updatedCoupen = await coupen.save();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully.",
      data: updatedCoupen,
    });
  } catch (error) {
    console.error("Update Coupen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update banner.",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE COUPEN
// DELETE /api/coupen/:id
// ======================================================

const deleteCoupen = async (req, res) => {
  try {
    const coupen = await Coupen.findById(req.params.id);

    if (!coupen) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    deleteImage(coupen.image);
    await Coupen.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Coupen Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete banner.",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  createCoupen,
  getCoupens,
  getCoupenById,
  updateCoupen,
  deleteCoupen,
};