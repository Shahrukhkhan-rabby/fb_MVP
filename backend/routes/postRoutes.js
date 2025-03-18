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

router.get("/list", getAllPosts); // Get All Posts
router.post("/create", authMiddleware, upload.single("image"), createPost); // Create Post
router.put("/:id/like", authMiddleware, likePost); // Like/Unlike Post
router.post("/:id/comment", authMiddleware, commentPost); // Comment on Post

module.exports = router;
