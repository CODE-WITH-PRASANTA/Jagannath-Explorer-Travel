const Tour = require("../models/Tour");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Base upload directory: src/uploads
const baseUploadDir = path.join(__dirname, "../uploads");

// Helper to remove files from uploads
const deleteUploadedFile = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") return;
  try {
    let cleanPath = fileUrl;
    // Extract part starting with /uploads/ if URL contains domain
    if (cleanPath.includes("/uploads/")) {
      cleanPath = cleanPath.substring(cleanPath.indexOf("/uploads/"));
    }

    if (cleanPath.startsWith("/uploads/")) {
      const relativePart = cleanPath.replace(/^\/uploads\//, "");
      const filePath = path.join(baseUploadDir, relativePart);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else if (
      cleanPath.startsWith("tours/") ||
      cleanPath.startsWith("hotels/") ||
      cleanPath.startsWith("gallery/")
    ) {
      const filePath = path.join(baseUploadDir, cleanPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    console.error("Error deleting image file:", err.message);
  }
};

// Helper: Safely parse JSON or return original value / fallback
const safeJsonParse = (value, fallback = []) => {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      // If comma-separated string, convert to array
      if (Array.isArray(fallback)) {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return value;
    }
  }
  return fallback;
};

// Helper: Generate slug from title
const generateSlug = (title) => {
  if (!title) return `tour-${Date.now()}`;
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// @desc    Get all tours with optional search & filters
// @route   GET /api/tours
const getTours = async (req, res) => {
  try {
    const { search, destination, category, difficulty, status, visibility } =
      req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (destination && destination !== "All") {
      query.destination = { $regex: `^${destination}$`, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (difficulty && difficulty !== "All") {
      query.difficulty = difficulty;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (visibility && visibility !== "All") {
      query.visibility = visibility;
    }

    const tours = await Tour.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    console.error("GET TOURS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
      error: error.message,
    });
  }
};

// @desc    Get single tour by ID or Slug
// @route   GET /api/tours/:id
const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    let tour = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      tour = await Tour.findById(id);
    }

    if (!tour) {
      // Try lookup by slug
      tour = await Tour.findOne({ slug: id.toLowerCase().trim() });
    }

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error("GET SINGLE TOUR ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour details",
      error: error.message,
    });
  }
};

// @desc    Create a new tour package
// @route   POST /api/tours
const createTour = async (req, res) => {
  try {
    const {
      title,
      slug: customSlug,
      destination,
      duration,
      shortDescription,
      detailedDescription,
      videoUrl,
      itinerary,
      location,
      faqs,
      status,
      visibility,
      publishDate,
      metaTitle,
      metaDescription,
      focusKeyword,
      price,
      discountPrice,
      maxPeople,
      difficulty,
      bestTimeToVisit,
      category,
      includes,
      excludes,
      tags,
    } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tour title is required",
      });
    }

    if (!destination || !destination.trim()) {
      return res.status(400).json({
        success: false,
        message: "Destination is required",
      });
    }

    if (!duration || !duration.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tour duration is required",
      });
    }

    if (!shortDescription || !shortDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Short description is required",
      });
    }

    if (!detailedDescription || !detailedDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: "Detailed description is required",
      });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        success: false,
        message: "Tour price is required",
      });
    }

    // Determine slug
    let finalSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    const existingTour = await Tour.findOne({ slug: finalSlug });
    if (existingTour) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    // Extract uploaded files
    let mainImageUrl = "";
    let galleryImageUrls = [];
    let seoImageUrl = "";

    if (req.files) {
      // Multer.fields structure or any
      if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
          if (file.fieldname === "mainImage" || file.fieldname === "featuredImage") {
            mainImageUrl = file.url;
          } else if (file.fieldname === "seoImage") {
            seoImageUrl = file.url;
          } else if (file.fieldname === "galleryImages" || file.fieldname === "images") {
            galleryImageUrls.push(file.url);
          }
        });
      } else if (typeof req.files === "object") {
        if (req.files.mainImage && req.files.mainImage[0]) {
          mainImageUrl = req.files.mainImage[0].url;
        }
        if (req.files.seoImage && req.files.seoImage[0]) {
          seoImageUrl = req.files.seoImage[0].url;
        }
        if (req.files.galleryImages) {
          galleryImageUrls = req.files.galleryImages.map((f) => f.url);
        }
      }
    } else if (req.file) {
      mainImageUrl = req.file.url;
    }

    // Fallback if image URLs were passed in body
    if (!mainImageUrl && req.body.mainImage && typeof req.body.mainImage === "string") {
      mainImageUrl = req.body.mainImage;
    }
    if (!seoImageUrl && req.body.seoImage && typeof req.body.seoImage === "string") {
      seoImageUrl = req.body.seoImage;
    }
    if (galleryImageUrls.length === 0 && req.body.galleryImages) {
      galleryImageUrls = safeJsonParse(req.body.galleryImages, []);
    }

    // Parse structured data
    const parsedItinerary = safeJsonParse(itinerary, []);
    const parsedLocation = safeJsonParse(location, {
      address: req.body.address || "",
      coordinates: req.body.coordinates || "",
      mapUrl: req.body.mapUrl || "",
    });
    const parsedFaqs = safeJsonParse(faqs, []);
    const parsedIncludes = safeJsonParse(includes, []);
    const parsedExcludes = safeJsonParse(excludes, []);
    const parsedTags = safeJsonParse(tags, []);

    const newTour = await Tour.create({
      title: title.trim(),
      slug: finalSlug,
      destination: destination.trim(),
      duration: duration.trim(),
      shortDescription: shortDescription.trim(),
      detailedDescription: detailedDescription.trim(),
      mainImage: mainImageUrl,
      galleryImages: galleryImageUrls,
      videoUrl: (videoUrl || "").trim(),
      itinerary: parsedItinerary,
      location: parsedLocation,
      faqs: parsedFaqs,
      status: status || "Draft",
      visibility: visibility || "Public",
      publishDate: publishDate || "Immediately",
      metaTitle: (metaTitle || "").trim(),
      metaDescription: (metaDescription || "").trim(),
      focusKeyword: (focusKeyword || "").trim(),
      seoImage: seoImageUrl,
      price: Number(price) || 0,
      discountPrice: Number(discountPrice) || 0,
      maxPeople: Number(maxPeople) || 20,
      difficulty: difficulty || "Easy",
      bestTimeToVisit: bestTimeToVisit || "March to May",
      category: (category || "").trim(),
      includes: parsedIncludes,
      excludes: parsedExcludes,
      tags: parsedTags,
    });

    res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      data: newTour,
    });
  } catch (error) {
    console.error("CREATE TOUR ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create tour package",
      error: error.message,
    });
  }
};

// @desc    Update a tour package
// @route   PUT /api/tours/:id
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    const {
      title,
      slug: customSlug,
      destination,
      duration,
      shortDescription,
      detailedDescription,
      videoUrl,
      itinerary,
      location,
      faqs,
      status,
      visibility,
      publishDate,
      metaTitle,
      metaDescription,
      focusKeyword,
      price,
      discountPrice,
      maxPeople,
      difficulty,
      bestTimeToVisit,
      category,
      includes,
      excludes,
      tags,
      existingGalleryImages,
    } = req.body;

    // Handle Image Updates
    let updatedMainImage = tour.mainImage;
    let updatedSeoImage = tour.seoImage;
    let newlyUploadedGallery = [];

    if (req.files) {
      if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
          if (file.fieldname === "mainImage" || file.fieldname === "featuredImage") {
            // Delete old main image if different
            if (tour.mainImage && tour.mainImage !== file.url) {
              deleteUploadedFile(tour.mainImage);
            }
            updatedMainImage = file.url;
          } else if (file.fieldname === "seoImage") {
            if (tour.seoImage && tour.seoImage !== file.url) {
              deleteUploadedFile(tour.seoImage);
            }
            updatedSeoImage = file.url;
          } else if (file.fieldname === "galleryImages" || file.fieldname === "images") {
            newlyUploadedGallery.push(file.url);
          }
        });
      } else if (typeof req.files === "object") {
        if (req.files.mainImage && req.files.mainImage[0]) {
          if (tour.mainImage && tour.mainImage !== req.files.mainImage[0].url) {
            deleteUploadedFile(tour.mainImage);
          }
          updatedMainImage = req.files.mainImage[0].url;
        }
        if (req.files.seoImage && req.files.seoImage[0]) {
          if (tour.seoImage && tour.seoImage !== req.files.seoImage[0].url) {
            deleteUploadedFile(tour.seoImage);
          }
          updatedSeoImage = req.files.seoImage[0].url;
        }
        if (req.files.galleryImages) {
          newlyUploadedGallery = req.files.galleryImages.map((f) => f.url);
        }
      }
    }

    // Preserve existing gallery images and delete removed ones
    let retainedGallery = tour.galleryImages || [];
    if (existingGalleryImages !== undefined) {
      const parsedExisting = safeJsonParse(existingGalleryImages, []);
      // Identify deleted gallery images
      const removedImages = retainedGallery.filter((img) => !parsedExisting.includes(img));
      removedImages.forEach((img) => deleteUploadedFile(img));
      retainedGallery = parsedExisting;
    }

    const finalGalleryImages = [...retainedGallery, ...newlyUploadedGallery];

    // Check slug uniqueness if changed
    let finalSlug = tour.slug;
    if (customSlug && customSlug !== tour.slug) {
      finalSlug = generateSlug(customSlug);
      const duplicateSlug = await Tour.findOne({ slug: finalSlug, _id: { $ne: id } });
      if (duplicateSlug) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }
    } else if (title && !customSlug && title !== tour.title) {
      finalSlug = generateSlug(title);
      const duplicateSlug = await Tour.findOne({ slug: finalSlug, _id: { $ne: id } });
      if (duplicateSlug) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }
    }

    // Update fields
    if (title !== undefined) tour.title = title.trim();
    tour.slug = finalSlug;
    if (destination !== undefined) tour.destination = destination.trim();
    if (duration !== undefined) tour.duration = duration.trim();
    if (shortDescription !== undefined) tour.shortDescription = shortDescription.trim();
    if (detailedDescription !== undefined) tour.detailedDescription = detailedDescription.trim();
    if (videoUrl !== undefined) tour.videoUrl = videoUrl.trim();
    if (itinerary !== undefined) tour.itinerary = safeJsonParse(itinerary, tour.itinerary);
    if (location !== undefined) tour.location = safeJsonParse(location, tour.location);
    if (faqs !== undefined) tour.faqs = safeJsonParse(faqs, tour.faqs);
    if (status !== undefined) tour.status = status;
    if (visibility !== undefined) tour.visibility = visibility;
    if (publishDate !== undefined) tour.publishDate = publishDate;
    if (metaTitle !== undefined) tour.metaTitle = metaTitle.trim();
    if (metaDescription !== undefined) tour.metaDescription = metaDescription.trim();
    if (focusKeyword !== undefined) tour.focusKeyword = focusKeyword.trim();
    if (price !== undefined) tour.price = Number(price);
    if (discountPrice !== undefined) tour.discountPrice = Number(discountPrice);
    if (maxPeople !== undefined) tour.maxPeople = Number(maxPeople);
    if (difficulty !== undefined) tour.difficulty = difficulty;
    if (bestTimeToVisit !== undefined) tour.bestTimeToVisit = bestTimeToVisit;
    if (category !== undefined) tour.category = category.trim();
    if (includes !== undefined) tour.includes = safeJsonParse(includes, tour.includes);
    if (excludes !== undefined) tour.excludes = safeJsonParse(excludes, tour.excludes);
    if (tags !== undefined) tour.tags = safeJsonParse(tags, tour.tags);

    tour.mainImage = updatedMainImage;
    tour.seoImage = updatedSeoImage;
    tour.galleryImages = finalGalleryImages;

    const updatedTour = await tour.save();

    res.status(200).json({
      success: true,
      message: "Tour package updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    console.error("UPDATE TOUR ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update tour package",
      error: error.message,
    });
  }
};

// @desc    Delete a tour package and all associated images
// @route   DELETE /api/tours/:id
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // 1. Delete associated main image from disk
    if (tour.mainImage) {
      deleteUploadedFile(tour.mainImage);
    }

    // 2. Delete all associated gallery images from disk
    if (Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0) {
      tour.galleryImages.forEach((imageUrl) => {
        deleteUploadedFile(imageUrl);
      });
    }

    // 3. Delete associated SEO image from disk
    if (tour.seoImage) {
      deleteUploadedFile(tour.seoImage);
    }

    // 4. Delete tour document from database
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour package and all associated images deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("DELETE TOUR ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete tour package",
      error: error.message,
    });
  }
};

module.exports = {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
