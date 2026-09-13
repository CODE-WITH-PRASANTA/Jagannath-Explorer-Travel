const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },
    shortDesc: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    detailedDesc: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: [true, "City/destination is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    landmark: {
      type: String,
      default: "",
      trim: true,
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    amenities: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price per night is required"],
    },
    rooms: {
      type: Number,
      default: 0,
    },
    checkIn: {
      type: String,
      default: "14:00",
      trim: true,
    },
    checkOut: {
      type: String,
      default: "11:00",
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
