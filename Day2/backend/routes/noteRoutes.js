const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

//Define routes
router.get("/", getNotes);
router.post("/", createNote);
router.put("/", updateNote);
router.delete("/", deleteNote);

module.exports = router;
