const mongoose = require("mongoose");

const tourBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      trim: true,
      default: () => `TR${Math.floor(1000 + Math.random() * 9000)}`,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    tourPackage: {
      type: String,
      required: [true, "Tour package name is required"],
      trim: true,
    },
    tourType: {
      type: String,
      default: "Standard Tour",
      trim: true,
    },
    destination: {
      type: String,
      default: "Odisha",
      trim: true,
    },
    startDate: {
      type: String,
      default: "",
      trim: true,
    },
    endDate: {
      type: String,
      default: "",
      trim: true,
    },
    checkIn: {
      type: String,
      default: "",
      trim: true,
    },
    checkOut: {
      type: String,
      default: "",
      trim: true,
    },
    adults: {
      type: Number,
      default: 1,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
    },
    guests: {
      type: String,
      default: "1 Person",
      trim: true,
    },
    category: {
      type: String,
      default: "Standard",
      trim: true,
    },
    price: {
      type: String,
      default: "0",
      trim: true,
    },
    extraServices: {
      homePickup: { type: Boolean, default: false },
      nightFood: { type: Boolean, default: false },
      seaplane: { type: Boolean, default: false },
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    agreedToTerms: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("TourBooking", tourBookingSchema);
