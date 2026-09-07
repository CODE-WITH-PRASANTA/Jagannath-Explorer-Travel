const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    reviewer: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: [500, 'Review cannot exceed 500 characters'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    formattedDate: {
      type: String
    },
    formattedTime: {
      type: String
    },
    platform: {
      type: String,
      default: 'All Reviews'
    },
    status: {
      type: String,
      enum: ['Published', 'Pending', 'Archived'],
      default: 'Published'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);