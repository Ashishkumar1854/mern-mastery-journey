// 3️⃣ middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ================================
// @desc    Protect routes (JWT auth middleware)
// @access  Private (requires valid token)
// ================================
const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check for Authorization header and Bearer token
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // 2️⃣ Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Attach user object to req.user, exclude password
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Continue to next middleware or route
      next();
    } catch (error) {
      res.status(401); // Unauthorized
      throw new Error("Not authorized, token failed");
    }
  }

  // 6️⃣ No token provided
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
};

export default protect;
