const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createPost, getPosts } = require("../controllers/postController");

// Protected route: Only logged-in users can create a post
router.post("/", authMiddleware, createPost);

// Public route: Get all posts
router.get("/", getPosts);

module.exports = router;
