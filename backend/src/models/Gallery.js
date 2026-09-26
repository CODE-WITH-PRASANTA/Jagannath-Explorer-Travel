const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    mediaName: {
      type: String,
      required: true,
      trim: true,
    },

    mediaType: {
      type: String,
      required: true,
      enum: ["image", "video"],
      default: "image",
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    uploadedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);