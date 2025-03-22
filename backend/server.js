const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // Middleware for handling JSON requests

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/api/upload", require("./routes/uploadRoute")); // File upload route
app.use("/api/post", require("./routes/postRoutes")); // File upload route
app.use("/api/users", require("./routes/userRoutes")); // Add User Routes

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
