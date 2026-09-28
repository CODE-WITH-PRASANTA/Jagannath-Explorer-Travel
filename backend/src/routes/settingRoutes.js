const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  getSettings,
  getSettingById,
  createSetting,
  updateSetting,
  deleteSetting,
} = require("../controllers/settingController");

// Base endpoint: /api/settings
router
  .route("/")
  .get(getSettings)
  .post(upload.single("logoFile", "settings"), createSetting);

router
  .route("/:id")
  .get(getSettingById)
  .put(upload.single("logoFile", "settings"), updateSetting)
  .delete(deleteSetting);

module.exports = router;