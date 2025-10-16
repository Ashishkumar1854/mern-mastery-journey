const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorHandler");

//load .env

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({ origin: "https//localhost:3000" }));
app.use(express.json());

//connect mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongodb not conected:", err));

//routes
app.use("./api/notes", noteRoutes);

//test route
app.get("/", (req, res) => res.send("Backend running"));

//error handling middleware
app.use(errorHandler);

// start server
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
