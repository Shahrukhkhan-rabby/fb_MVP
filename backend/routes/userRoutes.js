const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Route for updating the profile picture with authentication
router.put(
  "/profilePic",
  authMiddleware,
  upload.single("file"),
  userController.updateProfilePic
);

module.exports = router;
