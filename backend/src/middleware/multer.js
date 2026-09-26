
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =========================================
// HELPER: ENSURE DIRECTORY EXISTS
// =========================================

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Base upload directory: src/uploads
const baseUploadDir = path.join(__dirname, "../uploads");

ensureDirExists(baseUploadDir);

// =========================================
// MULTER MEMORY STORAGE
// =========================================

const storage = multer.memoryStorage();

// =========================================
// FILE FILTER
// =========================================

const fileFilter = (req, file, cb) => {
  // =========================================
  // GALLERY
  // Gallery supports IMAGE + VIDEO
  // =========================================

  if (
    req.baseUrl === "/api/gallery" ||
    req.originalUrl.startsWith("/api/gallery")
  ) {
    const allowedImages = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    const allowedVideos = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];

    if (
      allowedImages.includes(file.mimetype) ||
      allowedVideos.includes(file.mimetype)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP, AVIF, MP4, WEBM, OGG and MOV files are allowed for Gallery."
      ),
      false
    );
  }

  // =========================================
  // EXISTING IMAGE UPLOADS
  // TEAM / COUPEN / AVATAR / OTHER
  // =========================================

  if (
    file.mimetype &&
    file.mimetype.startsWith("image/")
  ) {
    return cb(null, true);
  }

  return cb(
    new Error("Only image files are allowed"),
    false
  );
};

// =========================================
// MULTER CONFIGURATION
// =========================================

const multerUpload = multer({
  storage: storage,

  fileFilter: fileFilter,

  limits: {
    // Maximum original upload size: 50 MB
    // Images: controller/frontend can restrict to 10 MB
    // Videos: Gallery can use up to 50 MB
    fileSize: 50 * 1024 * 1024,
  },
});

// =========================================
// SINGLE WEBP CONVERSION MIDDLEWARE
// WEBP CONVERSION MIDDLEWARE GENERATOR
// =========================================

const convertToWebp = (
  subFolder = "gallery"
) => {
  return async (req, res, next) => {
    try {
      // If no file uploaded, proceed to controller
      if (!req.file) {
        return next();
      }

      // =========================================
      // GALLERY VIDEO
      // DO NOT SEND VIDEO THROUGH SHARP
      // =========================================

      if (
        req.file.mimetype &&
        req.file.mimetype.startsWith("video/")
      ) {
        const targetUploadPath = path.join(
          baseUploadDir,
          subFolder
        );

        ensureDirExists(targetUploadPath);

        // Original video extension
        const extension = path
          .extname(req.file.originalname)
          .toLowerCase();

        // Safe video name
        const originalName = path
          .parse(req.file.originalname)
          .name
          .replace(/[^a-zA-Z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase();

        const fileName = `${
          originalName || "video"
        }-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension || ".mp4"}`;

        const outputPath = path.join(
          targetUploadPath,
          fileName
        );

        // Save video buffer directly
        fs.writeFileSync(
          outputPath,
          req.file.buffer
        );

        // =========================================
        // UPDATE REQ.FILE DETAILS
        // =========================================

        req.file.filename = fileName;

        req.file.path = outputPath;

        req.file.destination =
          targetUploadPath;

        // Keep original video mimetype
        req.file.mimetype =
          req.file.mimetype || "video/mp4";

        req.file.originalname = fileName;

        req.file.size =
          fs.statSync(outputPath).size;

        // URL accessible from frontend static route
        const relativeUrl =
          `/uploads/${subFolder}/${fileName}`;

        req.file.url = relativeUrl;

        // Compatibility for controllers
        req.avatarPath = relativeUrl;

        return next();
      }

      // =========================================
      // IMAGE CONVERSION
      // EXISTING BEHAVIOR PRESERVED
      // =========================================

      // Determine target directory
      const targetUploadPath = path.join(
        baseUploadDir,
        subFolder
      );

      ensureDirExists(targetUploadPath);

      // Create safe sanitized file name
      const originalName = path
        .parse(req.file.originalname)
        .name
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

      const fileName = `${
        originalName || "image"
      }-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.webp`;

      const outputPath = path.join(
        targetUploadPath,
        fileName
      );

      // =========================================
      // CONVERT BUFFER TO WEBP VIA SHARP
      // =========================================

      await sharp(req.file.buffer)
        .webp({
          quality: 85,
          effort: 4,
        })
        .toFile(outputPath);

      // =========================================
      // UPDATE REQ.FILE DETAILS
      // =========================================

      req.file.filename = fileName;

      req.file.path = outputPath;

      req.file.destination =
        targetUploadPath;

      req.file.mimetype = "image/webp";

      req.file.originalname = fileName;

      req.file.size =
        fs.statSync(outputPath).size;

      // URL accessible from frontend static route
      const relativeUrl =
        `/uploads/${subFolder}/${fileName}`;

      req.file.url = relativeUrl;

      // Compatibility for controllers
      req.avatarPath = relativeUrl;

      next();

    } catch (error) {
      console.error(
        "IMAGE/VIDEO UPLOAD ERROR:",
        error
      );

      return res.status(400).json({
        success: false,
        message:
          "Failed to process uploaded media",
        error: error.message,
      });
    }
  };
};

// =========================================
// MULTIPLE WEBP CONVERSION MIDDLEWARE
// GENERATOR
// =========================================

const convertMultipleToWebp = (
  subFolder = "gallery"
) => {
  return async (req, res, next) => {
    try {
      let filesArray = [];

      if (Array.isArray(req.files)) {
        filesArray = req.files;
      } else if (
        req.files &&
        typeof req.files === "object"
      ) {
        filesArray = Object.values(
          req.files
        ).flat();
      }

      if (!filesArray.length) {
        return next();
      }

      const targetUploadPath = path.join(
        baseUploadDir,
        subFolder
      );

      ensureDirExists(targetUploadPath);

      await Promise.all(
        filesArray.map(async (file) => {

          // =========================================
          // VIDEO
          // DO NOT USE SHARP
          // =========================================

          if (
            file.mimetype &&
            file.mimetype.startsWith("video/")
          ) {
            const extension = path
              .extname(file.originalname)
              .toLowerCase();

            const originalName = path
              .parse(file.originalname)
              .name
              .replace(/[^a-zA-Z0-9]/g, "-")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "")
              .toLowerCase();

            const fileName = `${
              originalName || "video"
            }-${Date.now()}-${Math.round(
              Math.random() * 1e9
            )}${extension || ".mp4"}`;

            const outputPath = path.join(
              targetUploadPath,
              fileName
            );

            // Save video directly
            fs.writeFileSync(
              outputPath,
              file.buffer
            );

            file.filename = fileName;

            file.path = outputPath;

            file.destination =
              targetUploadPath;

            // Keep video mimetype
            file.originalname = fileName;

            file.size =
              fs.statSync(outputPath).size;

            file.url =
              `/uploads/${subFolder}/${fileName}`;

            return;
          }

          // =========================================
          // IMAGE
          // EXISTING WEBP BEHAVIOR
          // =========================================

          const originalName = path
            .parse(file.originalname)
            .name
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

          const fileName = `${
            originalName || "image"
          }-${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}.webp`;

          const outputPath = path.join(
            targetUploadPath,
            fileName
          );

          await sharp(file.buffer)
            .webp({
              quality: 85,
              effort: 4,
            })
            .toFile(outputPath);

          file.filename = fileName;

          file.path = outputPath;

          file.destination =
            targetUploadPath;

          file.mimetype = "image/webp";

          file.originalname = fileName;

          file.size =
            fs.statSync(outputPath).size;

          file.url =
            `/uploads/${subFolder}/${fileName}`;
        })
      );

      next();

    } catch (error) {
      console.error(
        "MULTIPLE IMAGE/VIDEO CONVERSION ERROR:",
        error
      );

      return res.status(400).json({
        success: false,
        message:
          "Failed to process uploaded media",
        error: error.message,
      });
    }
  };
};

// =========================================
// EXPORT
// BACKWARDS COMPATIBLE
// TEAM SUPPORTED
// COUPEN/BANNER SUPPORTED
// GALLERY IMAGE + VIDEO SUPPORTED
// =========================================

const upload = {

  // =========================================
  // SINGLE FILE UPLOAD
  // =========================================

  single: (
    fieldName,
    folder = "gallery"
  ) => {

    return [
      multerUpload.single(fieldName),

      async (req, res, next) => {

        /*
        ========================================
        GALLERY FIX
        ========================================

        Gallery route:
        /api/gallery

        Gallery can use:

        upload.single("image")

        OR

        upload.single("mediaFile")

        It supports:
        - Images
        - Videos

        Images:
        saved as WebP

        Videos:
        saved in original video format

        ========================================
        TEAM BEHAVIOR REMAINS SAME
        ========================================

        Team uses:
        upload.single("image")

        Team route:
        /api/team

        So it continues saving inside:
        src/uploads/team

        ========================================
        */

        let targetFolder = folder;

        // =====================================
        // GALLERY ROUTE
        // =====================================

        if (
          req.baseUrl === "/api/gallery" ||
          req.originalUrl.startsWith("/api/gallery")
        ) {
          targetFolder = "gallery";
        }

        // =====================================
        // COUPEN / BANNER
        // =====================================

        else if (folder === "coupen") {
          targetFolder = "coupen";
        }

        // =====================================
        // EXISTING AVATAR
        // =====================================

        else if (fieldName === "avatar") {
          targetFolder = "users";
        }

        // =====================================
        // EXISTING TEAM IMAGE
        // =====================================

        else if (fieldName === "image") {
          targetFolder = "team";
        }

        // =====================================
        // CONVERT IMAGE / SAVE VIDEO
        // =====================================

        return convertToWebp(
          targetFolder
        )(req, res, next);
      },
    ];
  },

  // =========================================
  // MULTIPLE FILE UPLOAD
  // =========================================

  array: (
    fieldName,
    maxCount,
    folder = "gallery"
  ) => [
    multerUpload.array(
      fieldName,
      maxCount
    ),
    convertMultipleToWebp(folder),
  ],

  // =========================================
  // MULTIPLE DIFFERENT FIELDS
  // =========================================

  fields: (
    fieldsArray,
    folder = "gallery"
  ) => [
    multerUpload.fields(
      fieldsArray
    ),
    convertMultipleToWebp(folder),
  ],

  // =========================================
  // ANY FILES
  // =========================================

  any: (
    folder = "gallery"
  ) => [
    multerUpload.any(),
    convertMultipleToWebp(folder),
  ],
};

// =========================================
// EXPORT
// =========================================

module.exports = upload;

