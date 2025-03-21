const express = require("express");
const {
  createPost,
  likePost,
  commentPost,
  getAllPosts,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer"); // Multer for handling file uploads

const router = express.Router();

// Get All Posts (Home Page)
router.get("/", getAllPosts); // Fetch posts with likes & comments

// Create a New Post (With Image Upload)
router.post("/create", authMiddleware, upload.single("image"), createPost);

// Like/Unlike a Post
router.put("/:id/like", authMiddleware, likePost);

// Comment on a Post
router.post("/:id/comment", authMiddleware, commentPost);

module.exports = router;
