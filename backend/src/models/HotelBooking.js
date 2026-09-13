const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      trim: true,
    },
    hotelName: {
      type: String,
      required: [true, "Hotel or package name is required"],
      trim: true,
      default: "Grand Luxury Hotel & Resort Stay",
    },
    fullName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    destination: {
      type: String,
      default: "Puri, Odisha, India",
      trim: true,
    },
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
    stayNights: {
      type: String,
      default: "1 Night",
      trim: true,
    },
    roomType: {
      type: String,
      default: "Standard Room",
      trim: true,
    },
    roomNo: {
      type: String,
      default: "Unassigned",
      trim: true,
    },
    guests: {
      type: Number,
      default: 2,
    },
    adults: {
      type: Number,
      default: 2,
    },
    children: {
      type: Number,
      default: 0,
    },
    price: {
      type: String,
      required: [true, "Total price is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Checked In", "Checked Out", "Pending", "Cancelled"],
      default: "Booked",
    },
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
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelBooking", hotelBookingSchema);
