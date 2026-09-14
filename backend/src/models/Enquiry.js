const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      default: '',
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    tour: {
      type: String,
      required: true,
      trim: true,
    },

    travelDate: {
      type: String,
      default: 'TBD',
    },

    travelers: {
      type: Number,
      default: 1,
    },

    departure: {
      type: String,
      default: 'N/A',
    },

    destination: {
      type: String,
      default: 'N/A',
    },

    budget: {
      type: String,
      default: 'Flexible',
    },

    message: {
      type: String,
      default: 'No requirements specified.',
    },

    status: {
      type: String,
      enum: ['New', 'In Progress', 'Replied', 'Closed'],
      default: 'New',
    },

    source: {
      type: String,
      default: 'Website',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);