// C:\Shahrukh\fb_MVP\backend\routes\authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Protected route example (getting user details)
router.get("/user", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You have accessed a protected route!", user: req.user });
});

module.exports = router;
