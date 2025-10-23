// ================================
// Entry point of backend server
// ================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors"; // optional: colored console logs
import connectDB from "./config/db.js"; // MongoDB connection
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// ================================
// 1️⃣ Load environment variables
// ================================
dotenv.config();

// ================================
// 2️⃣ Connect to MongoDB
// ================================
connectDB();

// ================================
// 3️⃣ Initialize Express app
// ================================
const app = express();

// ================================
// 4️⃣ Middleware
// ================================
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" })); // Dynamic CORS
app.use(express.json()); // Parse JSON requests

// ================================
// 5️⃣ API Routes
// ================================
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// ================================
// 6️⃣ Global Error Handler
// ================================
app.use(errorHandler);

// ================================
// 7️⃣ Start Server
// ================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .bold
  )
);
