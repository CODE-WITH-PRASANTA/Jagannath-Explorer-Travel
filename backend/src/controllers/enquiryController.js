const Enquiry = require('../models/Enquiry');

// ===============================
// CREATE ENQUIRY
// ===============================
const createEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      name,
      email,
      mobile,
      phone,
      service,
      tour,
      tourPackage,
      travelDate,
      travelers,
      departure,
      destination,
      budget,
      message,
    } = req.body;

    const enquiryName = fullName || name;
    const enquiryPhone = mobile || phone;
    const enquiryTour = service || tour || tourPackage;

    if (!enquiryName || !enquiryPhone || !enquiryTour) {
      return res.status(400).json({
        success: false,
        message: 'Name, mobile number and service are required.',
      });
    }

    const enquiry = await Enquiry.create({
      name: enquiryName,
      email: email || '',
      phone: enquiryPhone,
      tour: enquiryTour,
      travelDate: travelDate || 'TBD',
      travelers: travelers ? Number(travelers) : 1,
      departure: departure || 'N/A',
      destination: destination || 'N/A',
      budget: budget || 'Flexible',
      message: message || 'No requirements specified.',
      status: 'New',
      source: 'Website',
    });

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully.',
      enquiry,
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry.',
      error: error.message,
    });
  }
};

// ===============================
// GET ALL ENQUIRIES
// ===============================
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error('Get Enquiries Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries.',
      error: error.message,
    });
  }
};

// ===============================
// GET SINGLE ENQUIRY
// ===============================
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error('Get Enquiry Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry.',
      error: error.message,
    });
  }
};

// ===============================
// UPDATE ENQUIRY
// ===============================
const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      enquiry,
    });
  } catch (error) {
    console.error('Update Enquiry Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry.',
      error: error.message,
    });
  }
};

// ===============================
// DELETE ENQUIRY
// ===============================
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Enquiry Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
      error: error.message,
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};