const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
    },
    vehicleType: {
      type: String,
      default: "Car Rental",
      trim: true,
    },
    vehiclePrice: {
      type: String,
      default: "",
      trim: true,
    },
    vehicleImage: {
      type: String,
      default: "",
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    dropLocation: {
      type: String,
      required: [true, "Drop location is required"],
      trim: true,
    },
    pickupDateTime: {
      type: String,
      required: [true, "Pickup date and time is required"],
      trim: true,
    },
    dropDateTime: {
      type: String,
      default: "",
      trim: true,
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
      match: [/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"],
    },
    email: {
      type: String,
      default: "",
      trim: true,
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

module.exports = mongoose.model("CarBooking", carBookingSchema);
