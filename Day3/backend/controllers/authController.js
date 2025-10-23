// 2️⃣ controllers/authController.js
import User from "../models/User.js"; // User model
import generateToken from "../utils/generateToken.js"; // JWT token generator utility

// ================================
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (no authentication needed)
// ================================
export const registerUser = async (req, res, next) => {
  try {
    // 1️⃣ Destructure the incoming request body
    const { name, email, password } = req.body;

    // 2️⃣ Basic validation: check if all fields are provided
    if (!name || !email || !password) {
      res.status(400); // 400 = Bad Request
      throw new Error("Please provide name, email and password");
    }

    // 3️⃣ Check if a user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    // 4️⃣ Create a new user in the database
    // Password hashing happens automatically in User model pre-save middleware
    const user = await User.create({ name, email, password });

    // 5️⃣ Respond with user info + JWT token
    res.status(201).json({
      _id: user._id, // MongoDB user ID
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // Generate JWT token valid for 7 days
    });
  } catch (error) {
    // 6️⃣ Pass any errors to the central error handler
    next(error);
  }
};

// ================================
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ================================
export const loginUser = async (req, res, next) => {
  try {
    // 1️⃣ Destructure email and password from request body
    const { email, password } = req.body;

    // 2️⃣ Find user in database by email
    const user = await User.findOne({ email });

    // 3️⃣ Check if user exists and password matches
    // `matchPassword` is a method on User model that compares hashed password
    if (user && (await user.matchPassword(password))) {
      // 4️⃣ If valid, respond with user info + JWT token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 5️⃣ Invalid credentials
      res.status(401); // 401 = Unauthorized
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    // 6️⃣ Pass any errors to the central error handler
    next(error);
  }
};
