const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    tagline: { type: String, default: "" },
    aboutUs: { type: String, default: "" },
    logo: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    websiteStatus: { type: Boolean, default: true },
    allowBookings: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    currency: { type: String, default: "INR (₹)" },
    dateFormat: { type: String, default: "DD/MM/YYYY" },
    timeZone: { type: String, default: "(GMT+05:30) Asia/Kolkata" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);