const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure destination folder exists inside src/uploads/gallery
const uploadDir = path.join(__dirname, '../uploads/gallery');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer memory storage
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Inline WebP converter
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const originalName = path
      .parse(req.file.originalname)
      .name
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();

    const fileName = `${originalName || 'avatar'}-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(uploadDir, fileName);

    await sharp(req.file.buffer)
      .webp({ quality: 85, effort: 4 })
      .toFile(outputPath);

    req.file.filename = fileName;
    req.file.path = outputPath;
    req.file.destination = uploadDir;
    req.file.mimetype = 'image/webp';
    req.file.originalname = fileName;
    req.file.size = fs.statSync(outputPath).size;
    req.file.url = `/uploads/gallery/${fileName}`;

    next();
  } catch (error) {
    console.error('IMAGE CONVERSION ERROR:', error);
    return res.status(400).json({
      success: false,
      message: 'Failed to convert image to WebP',
      error: error.message
    });
  }
};

const upload = [multerUpload.single('avatar'), convertToWebp];

// Routes
router.get('/', userController.getAllUsers);
router.post('/', upload, userController.createUser);
router.put('/:id', upload, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;