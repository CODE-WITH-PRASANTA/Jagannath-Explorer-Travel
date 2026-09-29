const mongoose = require("mongoose");

const NeedHelpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["New", "Replied", "Closed"],
      default: "New",
    },
    avatarColor: {
      type: String,
      enum: ["blue", "purple", "pink", "green", "orange"],
      default: "blue",
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("NeedHelp", NeedHelpSchema);