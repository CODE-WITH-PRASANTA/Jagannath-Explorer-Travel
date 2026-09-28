const Setting = require("../models/Setting");
const fs = require("fs");
const path = require("path");

// Helper: Delete old logo from disk when updated/deleted
const deleteOldFile = (relativeUrl) => {
  if (!relativeUrl || !relativeUrl.startsWith("/uploads/")) return;
  const fullPath = path.join(__dirname, "../", relativeUrl);
  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error("Failed to delete old file:", err);
    });
  }
};

// 1. GET ALL SETTINGS
exports.getSettings = async (req, res) => {
  try {
    const list = await Setting.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch settings",
      error: error.message,
    });
  }
};

// 2. GET SINGLE SETTING BY ID
exports.getSettingById = async (req, res) => {
  try {
    const record = await Setting.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. CREATE SETTING
exports.createSetting = async (req, res) => {
  try {
    const payload = { ...req.body };

    // Multer WebP middleware saves URL inside req.file.url or req.logoPath
    if (req.file && req.file.url) {
      payload.logo = req.file.url;
    }

    // Convert boolean strings sent via FormData
    if (typeof payload.websiteStatus === "string") {
      payload.websiteStatus = payload.websiteStatus === "true";
    }
    if (typeof payload.allowBookings === "string") {
      payload.allowBookings = payload.allowBookings === "true";
    }
    if (typeof payload.emailNotifications === "string") {
      payload.emailNotifications = payload.emailNotifications === "true";
    }

    const newRecord = await Setting.create(payload);

    return res.status(201).json({
      success: true,
      message: "Settings created successfully",
      data: newRecord,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create setting",
      error: error.message,
    });
  }
};

// 4. UPDATE SETTING
exports.updateSetting = async (req, res) => {
  try {
    const existing = await Setting.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found",
      });
    }

    const payload = { ...req.body };

    // Handle new uploaded logo
    if (req.file && req.file.url) {
      payload.logo = req.file.url;
      // Delete old logo file if it exists locally
      if (existing.logo && existing.logo !== payload.logo) {
        deleteOldFile(existing.logo);
      }
    }

    // Convert boolean strings sent via FormData
    if (typeof payload.websiteStatus === "string") {
      payload.websiteStatus = payload.websiteStatus === "true";
    }
    if (typeof payload.allowBookings === "string") {
      payload.allowBookings = payload.allowBookings === "true";
    }
    if (typeof payload.emailNotifications === "string") {
      payload.emailNotifications = payload.emailNotifications === "true";
    }

    const updated = await Setting.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update setting",
      error: error.message,
    });
  }
};

// 5. DELETE SETTING
exports.deleteSetting = async (req, res) => {
  try {
    const record = await Setting.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found",
      });
    }

    // Remove logo file from disk
    if (record.logo) {
      deleteOldFile(record.logo);
    }

    await Setting.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Settings deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete setting",
      error: error.message,
    });
  }
};