const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    instagram: {
      type: String,
      default: "@username",
      trim: true,
    },
    facebook: {
      type: String,
      default: "username",
      trim: true,
    },
    whatsapp: {
      type: String,
      default: "+91 00000 00000",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Profile image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);