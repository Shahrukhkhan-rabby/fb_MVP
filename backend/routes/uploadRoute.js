const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // Import the Cloudinary config
const router = express.Router();

// Setup Multer for file upload (temporary storage)
const upload = multer({ dest: "uploads/" });

// Test Cloudinary upload route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Return the secure URL of the uploaded image
    res.json({ message: "File uploaded successfully", url: result.secure_url });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error uploading image", error: error.message });
  }
});

module.exports = router;
