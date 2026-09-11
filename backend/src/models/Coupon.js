const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    discountType: {
      type: String,
      enum: ['Percentage', 'Fixed'],
      required: true
    },
    discountValue: {
      type: Number,
      required: true
    },
    minBooking: {
      type: Number,
      default: 0
    },
    maxDiscount: {
      type: Number,
      default: 0
    },
    validFrom: {
      type: String,
      required: true
    },
    validTo: {
      type: String,
      required: true
    },
    usageLimit: {
      type: Number,
      default: 100
    },
    used: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
    applicableFor: {
      type: String,
      default: 'All Users'
    },
    applicableTours: {
      type: String,
      default: 'All Tours'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);