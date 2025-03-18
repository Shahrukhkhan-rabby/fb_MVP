const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary configuration
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer configuration for file upload (temporary storage in 'uploads' folder)
const upload = multer({ dest: "uploads/" });

// Route for updating profile picture with authentication
router.put(
  "/profilePic", // This route will handle updating the profile picture
  authMiddleware, // Middleware to verify JWT token and authenticate the user
  upload.single("file"), // Multer middleware for handling file uploads
  userController.updateProfilePic // Controller that handles the profile picture update
);

// Test route for uploading files to Cloudinary (optional)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Respond with the secure URL of the uploaded image
    res.json({
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error uploading image", error: error.message });
  }
});

module.exports = router;
