// 5️⃣ routes/noteRoutes.js
const express = require("express");
const { getNotes, createNote } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getNotes);
router.post("/", protect, createNote);

module.exports = router;
