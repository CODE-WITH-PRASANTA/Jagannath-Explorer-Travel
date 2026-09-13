const mongoose = require("mongoose");

const itineraryDaySchema = new mongoose.Schema({
  dayNumber: {
    type: String,
    default: "Day 01",
    trim: true,
  },
  title: {
    type: String,
    default: "",
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
});

const faqItemSchema = new mongoose.Schema({
  number: {
    type: String,
    default: "01",
    trim: true,
  },
  question: {
    type: String,
    default: "",
    trim: true,
  },
  answer: {
    type: String,
    default: "",
    trim: true,
  },
});

const tourSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "Tour title is required"],
      trim: true,
      maxlength: [100, "Tour title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: [100, "Slug cannot exceed 100 characters"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Tour duration is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },
    detailedDescription: {
      type: String,
      required: [true, "Detailed description is required"],
      trim: true,
    },

    // Media & Images
    mainImage: {
      type: String,
      default: "",
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Day by Day Itinerary
    itinerary: {
      type: [itineraryDaySchema],
      default: [],
    },

    // Location & Map
    location: {
      address: {
        type: String,
        default: "",
        trim: true,
      },
      coordinates: {
        type: String,
        default: "",
        trim: true,
      },
      mapUrl: {
        type: String,
        default: "",
      },
    },

    // FAQs
    faqs: {
      type: [faqItemSchema],
      default: [],
    },

    // Publishing & Status
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    publishDate: {
      type: String,
      default: "Immediately",
      trim: true,
    },

    // SEO Settings
    metaTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Meta title cannot exceed 100 characters"],
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: [200, "Meta description cannot exceed 200 characters"],
    },
    focusKeyword: {
      type: String,
      default: "",
      trim: true,
    },
    seoImage: {
      type: String,
      default: "",
    },

    // Pricing & Details
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    maxPeople: {
      type: Number,
      default: 20,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Difficult"],
      default: "Easy",
    },
    bestTimeToVisit: {
      type: String,
      default: "March to May",
      trim: true,
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },

    // Inclusions, Exclusions & Tags
    includes: {
      type: [String],
      default: [],
    },
    excludes: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
