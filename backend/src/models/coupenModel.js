const mongoose = require("mongoose");

const coupenSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    discount: {
      type: String,
      default: "",
      trim: true,
    },

    bgColor: {
      type: String,
      default: "#22c55e",
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Book Now",
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupen", coupenSchema);