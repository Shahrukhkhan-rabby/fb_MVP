// Import JWT to verify the token
const jwt = require("jsonwebtoken");

// Define the middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Retrieve token from the "Authorization" header
  const authHeader = req.header("Authorization");

  // If no token is present in the request, deny access
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove the "Bearer " prefix from the token if it's present
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7) // Remove "Bearer " and get the token
      : authHeader; // If no "Bearer ", use the token directly

    // Verify the token using the JWT secret from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, respond with an error
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Export the middleware to be used in other routes
module.exports = authMiddleware;
