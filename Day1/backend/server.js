// //import
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// //load .env
// dotenv.config();

// //create express app
// const app = express();

// //port from env or fallback
// const PORT = process.env.PORT || 5000;

// //enable cors
// app.use(cors());
// //parse json body
// app.use(express.json());

// //connect mongodb
// // ///mongodb v7 tk ye user vala chalta tha new modern me change ho gya h
// // mongoose
// //   .connect(process.env.MONGO_URI, {
// //     userNewUrlParser: true,
// //     userUnifiedTopology: true,
// //   })
// //   .then(() => console.log("mongodb connected"))
// //   .catch((err) => console.log("mongodb connection error :", err));

// //modern mongodb ///mongodb v7 tk ye user vala chalta tha new modern me change ho gya h
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log("mongodb connection error :", err));

// //schema + model
// const noteSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   body: String,
//   createAt: { type: Date, default: Date.now },
// });

// const Note = mongoose.model("Note", noteSchema);

// //CROD Routes

// app.get("/api/notes", async (req, res) => {
//   const notes = (await Note.find()).sort({ createAt: -1 });
//   res.json(notes);
// });

// app.post("/api/notes", async (req, res) => {
//   const note = new Note(req.body);
//   await note.save();
//   res.status(201).json(note);
// });

// app.put("/api/notes/:id", async (req, res) => {
//   const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(note);
// });

// app.delete("/api/notes/:id", async (req, res) => {
//   await Note.findByIdAndDelete(req.params.id);
//   res.json({ message: "Delete" });
// });

// app.listen(PORT, () => console.log(`server running on ${PORT}`));

// -------------------- IMPORTS --------------------
const express = require("express"); // Express framework for server
const mongoose = require("mongoose"); // MongoDB object modeling
const cors = require("cors"); // Allow cross-origin requests
const dotenv = require("dotenv"); // Load .env variables

// -------------------- LOAD ENV VARIABLES --------------------
dotenv.config(); // Load .env file (PORT, MONGO_URI)

// -------------------- EXPRESS APP SETUP --------------------
const app = express(); // Create main Express app
const PORT = process.env.PORT || 5000; // Use PORT from env or fallback to 5000

// -------------------- MIDDLEWARE --------------------
app.use(cors()); // Allow frontend to make API calls (CORS)
app.use(express.json()); // Automatically parse incoming JSON data

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB Atlas
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- SCHEMA + MODEL --------------------
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Note title, required
  body: String, // Note body, optional
  createdAt: { type: Date, default: Date.now }, // Timestamp, default = now
});

// Create Note model to interact with 'notes' collection
const Note = mongoose.model("Note", noteSchema);

// -------------------- CRUD ROUTES --------------------

// GET all notes
app.get("/api/notes", async (req, res) => {
  try {
    // Fetch all notes from DB, newest first
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes); // Send notes as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new note
app.post("/api/notes", async (req, res) => {
  try {
    const note = new Note(req.body); // Create new note from request body
    await note.save(); // Save to MongoDB
    res.status(201).json(note); // Return created note
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a note by ID
app.put("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated note
    });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a note by ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id); // Delete note from DB
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------- TEST ROUTE --------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
