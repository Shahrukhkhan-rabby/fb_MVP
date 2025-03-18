const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

exports.updateProfilePic = async (req, res) => {
  try {
    // Check if a user is authenticated
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Get the user from the database using the authenticated user ID
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (req.file) {
      // If the user already has a profile picture, delete it from Cloudinary
      if (user.profilePic) {
        const publicId = user.profilePic.split("/").pop().split(".")[0]; // Extract public ID
        await cloudinary.uploader.destroy(publicId); // Delete the old image from Cloudinary
      }

      // Upload the new file to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Update the user's profile picture URL in the database
        user.profilePic = result.secure_url;

        // Save the updated user information
        await user.save();

        // Return the updated profile picture URL in the response
        res.json({
          msg: "Profile picture updated successfully",
          profilePic: user.profilePic, // Return the updated profile picture URL
        });
      } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        return res
          .status(500)
          .json({ msg: "Error uploading image", error: error.message });
      }
    } else {
      return res.status(400).json({ msg: "No file uploaded" });
    }
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
