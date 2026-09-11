const CarBooking = require("../models/CarBooking");
const mongoose = require("mongoose");

// @desc    Create new car booking
// @route   POST /api/car-bookings (or /api/bookings)
// @access  Public
const createCarBooking = async (req, res) => {
  try {
    const {
      // Vehicle Info
      vehicleName,
      carName,
      vehicle,
      vehicleType,
      type,
      vehiclePrice,
      price,
      vehicleImage,
      image,

      // Locations & Dates
      pickupLocation,
      pickUpLocation,
      pickup,
      dropLocation,
      dropOffLocation,
      dropoffLocation,
      dropOff,
      dropoff,
      drop,
      pickupDateTime,
      pickUpDateTime,
      dropDateTime,
      dropOffDateTime,
      dropoffDateTime,

      // User details
      fullName,
      name,
      mobileNumber,
      phone,
      mobile,
      phoneNumber,
      email,
      message,
      agreedToTerms,
      agreedTerms,
      agreeTerms,
      termsAgreed,
    } = req.body;

    const finalVehicleName = (vehicleName || carName || vehicle || "Car Rental").trim();
    const finalVehicleType = (vehicleType || type || "SUV / Car Rental").trim();
    const finalVehiclePrice = (vehiclePrice || price || "").toString().trim();
    const finalVehicleImage = (vehicleImage || image || "").toString().trim();

    const finalPickupLocation = (pickupLocation || pickUpLocation || pickup || "").trim();
    const finalDropLocation = (dropLocation || dropOffLocation || dropoffLocation || dropOff || dropoff || drop || "").trim();
    const finalPickupDateTime = (pickupDateTime || pickUpDateTime || "").toString().trim();
    const finalDropDateTime = (dropDateTime || dropOffDateTime || dropoffDateTime || "").toString().trim();

    const finalFullName = (fullName || name || "").trim();
    const rawMobile = mobileNumber || phone || mobile || phoneNumber || "";
    const cleanedMobile = String(rawMobile).replace(/\D/g, "").slice(-10);

    const finalEmail = (email || "").trim();
    const finalMessage = (message || "").trim();
    const finalAgreed =
      agreedToTerms !== undefined
        ? agreedToTerms
        : agreedTerms !== undefined
        ? agreedTerms
        : agreeTerms !== undefined
        ? agreeTerms
        : termsAgreed !== undefined
        ? termsAgreed
        : true;

    // Validate essential fields
    if (!finalPickupLocation) {
      return res.status(400).json({
        success: false,
        message: "Pickup location is required",
      });
    }

    if (!finalDropLocation) {
      return res.status(400).json({
        success: false,
        message: "Drop location is required",
      });
    }

    if (!finalPickupDateTime) {
      return res.status(400).json({
        success: false,
        message: "Pickup date and time is required",
      });
    }

    if (!finalFullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!cleanedMobile || !/^[0-9]{10}$/.test(cleanedMobile)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    const newBooking = await CarBooking.create({
      vehicleName: finalVehicleName,
      vehicleType: finalVehicleType,
      vehiclePrice: finalVehiclePrice,
      vehicleImage: finalVehicleImage,
      pickupLocation: finalPickupLocation,
      dropLocation: finalDropLocation,
      pickupDateTime: finalPickupDateTime,
      dropDateTime: finalDropDateTime,
      fullName: finalFullName,
      mobileNumber: cleanedMobile,
      email: finalEmail,
      message: finalMessage,
      agreedToTerms: Boolean(finalAgreed),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: `Booking received successfully for ${newBooking.vehicleName}! Our team will contact you shortly.`,
      data: newBooking,
    });
  } catch (error) {
    console.error("CREATE CAR BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// @desc    Get all car bookings (with search & filters)
// @route   GET /api/car-bookings
// @access  Public / Admin
const getCarBookings = async (req, res) => {
  try {
    const { search, status, vehicleType } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { vehicleName: { $regex: search, $options: "i" } },
        { pickupLocation: { $regex: search, $options: "i" } },
        { dropLocation: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (vehicleType && vehicleType !== "All") {
      query.vehicleType = vehicleType;
    }

    const bookings = await CarBooking.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("GET CAR BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// @desc    Get single car booking by ID
// @route   GET /api/car-bookings/:id
// @access  Public / Admin
const getCarBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await CarBooking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("GET CAR BOOKING BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// @desc    Update car booking status or info
// @route   PUT /api/car-bookings/:id
// @access  Admin
const updateCarBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const updatedBooking = await CarBooking.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("UPDATE CAR BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

// @desc    Delete car booking
// @route   DELETE /api/car-bookings/:id
// @access  Admin
const deleteCarBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const deleted = await CarBooking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CAR BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

module.exports = {
  createCarBooking,
  getCarBookings,
  getCarBookingById,
  updateCarBooking,
  deleteCarBooking,
};
