const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
  {
    // Hotel information
    hotelName: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },

    // Customer information
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must contain at least 2 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"],
    },

    // Destination
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },

    // Booking dates
    checkIn: {
      type: String,
      required: [true, "Check-in date is required"],
      trim: true,
    },

    checkOut: {
      type: String,
      required: [true, "Check-out date is required"],
      trim: true,
    },

    // Stay information
    stayNights: {
      type: String,
      required: true,
      default: "1 Night",
      trim: true,
    },

    roomType: {
      type: String,
      required: true,
      default: "Standard Room",
      trim: true,
    },

    // Guest information
    guests: {
      type: Number,
      required: true,
      min: [1, "At least 1 guest is required"],
    },

    adults: {
      type: Number,
      required: true,
      min: [1, "At least 1 adult is required"],
    },

    children: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Price
    price: {
      type: String,
      required: true,
      trim: true,
    },

    // Extra services
    extraServices: {
      homePickup: {
        type: Boolean,
        default: false,
      },

      nightFood: {
        type: Boolean,
        default: false,
      },
    },

    // Booking status
    status: {
      type: String,
      enum: ["Booked", "Pending", "Confirmed", "Cancelled"],
      default: "Booked",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelBooking", hotelBookingSchema);