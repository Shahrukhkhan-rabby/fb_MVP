const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

// Create a New Post (With or Without Image)
exports.createPost = async (req, res) => {
  try {
    let imageUrl = "";

    // If there's an image, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      image: imageUrl, // Save image URL if uploaded
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Like/Unlike a Post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    // Check if the post is already liked by the user
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Add a Comment to a Post
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Posts (With User & Comments)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profilePic")
      .populate("comments.user", "name profilePic")
      .sort({ createdAt: -1 }); // Sort by latest post

    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
