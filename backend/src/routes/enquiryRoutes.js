const express = require('express');

const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');

const router = express.Router();

// Create enquiry
router.post('/', createEnquiry);

// Get all enquiries
router.get('/', getEnquiries);

// Get single enquiry
router.get('/:id', getEnquiryById);

// Update enquiry
router.put('/:id', updateEnquiry);

// Delete enquiry
router.delete('/:id', deleteEnquiry);

module.exports = router;