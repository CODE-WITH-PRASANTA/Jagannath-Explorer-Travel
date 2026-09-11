const Testimonial = require("../models/Testimonial");

// Helper to format date & time server-side if needed
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr) return { formattedDate: '', formattedTime: '' };
  const dateObj = new Date(`${dateStr}T${timeStr || '12:00'}`);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  return { formattedDate, formattedTime };
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
exports.createTestimonial = async (req, res) => {
  try {
    const { reviewer, location, reviewText, rating, date, time, platform, status } = req.body;

    const { formattedDate, formattedTime } = formatDateTime(date, time);

    // If an image was uploaded via multer, use its generated URL; otherwise fallback
    let avatarPath = req.file ? req.file.url : undefined;

    const newTestimonial = await Testimonial.create({
      reviewer,
      location,
      reviewText,
      rating,
      date,
      time,
      formattedDate,
      formattedTime,
      platform: platform || 'All Reviews',
      ...(avatarPath && { avatar: avatarPath }),
      status: status || 'Published'
    });

    res.status(201).json({
      success: true,
      data: newTestimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create testimonial',
      error: error.message
    });
  }
};

// @desc    Update an existing testimonial
// @route   PUT /api/testimonials/:id
exports.updateTestimonial = async (req, res) => {
  try {
    const { reviewer, location, reviewText, rating, date, time, platform, status } = req.body;
    
    const { formattedDate, formattedTime } = formatDateTime(date, time);

    const updatedData = {
      reviewer,
      location,
      reviewText,
      rating,
      date,
      time,
      formattedDate,
      formattedTime,
      platform,
      status
    };

    // If a new file was uploaded via multer, update the avatar path
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
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update testimonial',
      error: error.message
    });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};