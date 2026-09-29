const express = require("express");
const router = express.Router();
const needHelpController = require("../controllers/needHelpController");

// /api/need-help
router
  .route("/")
  .get(needHelpController.getAllNeedHelp)
  .post(needHelpController.createNeedHelp);

// /api/need-help/:id/status
router.patch("/:id/status", needHelpController.updateNeedHelpStatus);

// /api/need-help/:id
router.delete("/:id", needHelpController.deleteNeedHelp);

module.exports = router;