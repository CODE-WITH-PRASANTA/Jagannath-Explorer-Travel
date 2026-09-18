const Testimonial = require("../models/Testimonial");
const path = require("path");
const fs = require("fs");

// Helper to remove files from disk when deleted
const deletePhysicalImage = (relativeUrl) => {
  if (!relativeUrl || relativeUrl.startsWith("http")) return;
  const diskPath = path.join(__dirname, "../..", relativeUrl);
  if (fs.existsSync(diskPath)) {
    try {
      fs.unlinkSync(diskPath);
    } catch (err) {
      console.error("Failed to delete physical file:", err);
    }
  }
};

// Helper to format date & time server-side
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr) return { formattedDate: "", formattedTime: "" };
  const dateObj = new Date(`${dateStr}T${timeStr || "12:00"}`);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
};

// @desc    Get ONLY Published testimonials (For public carousel/website)
// @route   GET /api/testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "Published" }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get ALL testimonials (For Admin ReviewTable)
// @route   GET /api/testimonials/admin
exports.getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Create a new testimonial (from User Form or Admin)
// @route   POST /api/testimonials
exports.createTestimonial = async (req, res) => {
  try {
    const {
      reviewer,
      location,
      reviewText,
      rating,
      date,
      time,
      platform,
      status,
    } = req.body;

    const { formattedDate, formattedTime } = formatDateTime(date, time);

    // If an image was processed by sharp, req.file.url holds the /uploads/users/...webp path
    const avatarPath = req.file ? req.file.url : undefined;

    const newTestimonial = await Testimonial.create({
      reviewer,
      location,
      reviewText,
      rating: Number(rating) || 5,
      date: date || new Date().toISOString().split("T")[0],
      time: time || "12:00",
      formattedDate,
      formattedTime,
      platform: platform || "All Reviews",
      ...(avatarPath && { avatar: avatarPath }),
      // Client submissions default to "Pending" so they require approval in ReviewTable
      status: status || "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      data: newTestimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// @desc    Update an existing testimonial
// @route   PUT /api/testimonials/:id
exports.updateTestimonial = async (req, res) => {
  try {
    const {
      reviewer,
      location,
      reviewText,
      rating,
      date,
      time,
      platform,
      status,
    } = req.body;

    const { formattedDate, formattedTime } = formatDateTime(date, time);

    const updatedData = {
      reviewer,
      location,
      reviewText,
      rating: Number(rating) || 5,
      date,
      time,
      formattedDate,
      formattedTime,
      platform,
      status,
    };

    if (req.file) {
      updatedData.avatar = req.file.url;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

// @desc    Toggle Publish / Unpublish Status (For ReviewTable switches)
// @route   PATCH /api/testimonials/:id/status
exports.toggleTestimonialStatus = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Toggle between Published and Pending
    testimonial.status =
      testimonial.status === "Published" ? "Pending" : "Published";

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: `Testimonial is now ${testimonial.status}`,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    deletePhysicalImage(testimonial.avatar);
    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};