// backend/src/controllers/profileController.js
const Profile = require('../models/Profile');
const fs = require('fs');
const path = require('path');

// Helper to remove local avatar files safely
const removeOldFile = (fileUrl) => {
  if (fileUrl && fileUrl.includes('/uploads/')) {
    // Extracts everything after '/uploads/' including the subfolder: "profiles/filename.webp"
    const relativeSubPath = fileUrl.split('/uploads/')[1];
    const filePath = path.join(__dirname, '..', 'uploads', relativeSubPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// GET all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email, travelerType, homeLocation, bio, status } = req.body;

    // The multer middleware writes the saved path to req.file.url or req.avatarPath
    const avatar = req.avatarPath || req.file?.url || req.body.avatar;

    const profile = await Profile.create({
      name,
      email,
      travelerType,
      homeLocation,
      bio,
      avatar,
      status: status || 'Active',
    });

    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Profile.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const updates = {
      name: req.body.name,
      email: req.body.email,
      travelerType: req.body.travelerType,
      homeLocation: req.body.homeLocation,
      bio: req.body.bio,
    };

    if (req.body.status) updates.status = req.body.status;

    const newAvatar = req.avatarPath || req.file?.url;
    if (newAvatar) {
      removeOldFile(existing.avatar);
      updates.avatar = newAvatar;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedProfile });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    removeOldFile(profile.avatar);
    await profile.deleteOne();

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};