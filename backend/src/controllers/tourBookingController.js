const TourBooking = require("../models/TourBooking");

// @desc    Create new tour booking
// @route   POST /api/tour-bookings (or /api/tourbookings)
// @access  Public
const createTourBooking = async (req, res) => {
  try {
    const {
      name,
      fullName,
      phone,
      mobileNumber,
      mobile,
      phoneNumber,
      email,
      packageName,
      tourPackage,
      tourTitle,
      tourType,
      category,
      destination,
      startDate,
      endDate,
      checkIn,
      checkOut,
      checkInDate,
      checkOutDate,
      adults,
      adultQty,
      children,
      childQty,
      guests,
      members,
      price,
      totalPrice,
      extraServices,
      message,
      notes,
      agreedToTerms,
    } = req.body;

    const finalFullName = (fullName || name || "").trim();
    const rawPhone = mobileNumber || phone || mobile || phoneNumber || "";
    const finalPhone = String(rawPhone).trim();
    const finalTourPackage = (tourPackage || packageName || tourTitle || "Odisha Tour Package").trim();
    const finalCategory = (category || tourType || "Standard").trim();
    const finalDestination = (destination || "Odisha").trim();

    const finalCheckIn = (checkIn || checkInDate || startDate || "").trim();
    const finalCheckOut = (checkOut || checkOutDate || endDate || "").trim();

    const finalAdults = Number(adults || adultQty) || 1;
    const finalChildren = Number(children || childQty) || 0;
    const finalGuests = (guests || members || `${finalAdults} Adult(s)${finalChildren > 0 ? `, ${finalChildren} Child(ren)` : ""}`).trim();
    const finalPrice = (price || totalPrice || "0").toString().trim();

    if (!finalFullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!finalPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const newBooking = await TourBooking.create({
      fullName: finalFullName,
      mobileNumber: finalPhone,
      email: (email || "").trim(),
      tourPackage: finalTourPackage,
      tourType: finalCategory.includes("Tour") ? finalCategory : `${finalCategory} Tour`,
      category: finalCategory,
      destination: finalDestination,
      startDate: finalCheckIn,
      endDate: finalCheckOut,
      checkIn: finalCheckIn,
      checkOut: finalCheckOut,
      adults: finalAdults,
      children: finalChildren,
      guests: finalGuests,
      price: finalPrice,
      extraServices: typeof extraServices === "object" ? extraServices : {},
      message: (message || notes || "").trim(),
      agreedToTerms: agreedToTerms !== undefined ? agreedToTerms : true,
    });

    return res.status(201).json({
      success: true,
      message: "Tour booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Create Tour Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create tour booking",
    });
  }
};

// @desc    Get all tour bookings
// @route   GET /api/tour-bookings
// @access  Public / Admin
const getAllTourBookings = async (req, res) => {
  try {
    const { status, search, tourType } = req.query;
    let query = {};

    if (status && status !== "All Status" && status !== "all") {
      query.status = status;
    }

    if (tourType && tourType !== "All Tour Types" && tourType !== "all") {
      query.tourType = { $regex: tourType, $options: "i" };
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { fullName: { $regex: term, $options: "i" } },
        { mobileNumber: { $regex: term, $options: "i" } },
        { tourPackage: { $regex: term, $options: "i" } },
        { bookingId: { $regex: term, $options: "i" } },
        { destination: { $regex: term, $options: "i" } },
      ];
    }

    const bookings = await TourBooking.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get All Tour Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tour bookings",
    });
  }
};

// @desc    Get single tour booking by ID
// @route   GET /api/tour-bookings/:id
// @access  Public / Admin
const getTourBookingById = async (req, res) => {
  try {
    const booking = await TourBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Tour booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get Tour Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tour booking",
    });
  }
};

// @desc    Update tour booking (status or details)
// @route   PUT /api/tour-bookings/:id
// @access  Public / Admin
const updateTourBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBooking = await TourBooking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: "Tour booking not found",
      });
    }

    const updated = await TourBooking.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Tour booking updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update Tour Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update tour booking",
    });
  }
};

// @desc    Delete tour booking
// @route   DELETE /api/tour-bookings/:id
// @access  Public / Admin
const deleteTourBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TourBooking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Tour booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tour booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Tour Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete tour booking",
    });
  }
};

module.exports = {
  createTourBooking,
  getAllTourBookings,
  getTourBookingById,
  updateTourBooking,
  deleteTourBooking,
};
