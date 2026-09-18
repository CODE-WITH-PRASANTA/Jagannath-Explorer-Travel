// backend/src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middleware/multer'); // or your upload middleware path

router
  .route('/')
  .get(profileController.getAllProfiles)
  .post(upload.single('avatarFile', 'profiles'), profileController.createProfile);

router
  .route('/:id')
  .put(upload.single('avatarFile', 'profiles'), profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;