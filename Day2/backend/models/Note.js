const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema defines structure of a Note docume
const noteSchema = new Schema(
  {
    title: { type: String, required: [true, "title is required"] }, //validation msg
    body: String,
  },
  { timesyamps: true }
); //automatically adds createdAt and updatedAt

//exporrt note model
module.exports = mongoose.model("Note", noteSchema);
//explain
// required: [true, 'msg'] → Mongoose validation error message if title missing

// timestamps: true → auto createdAt & updatedAt
