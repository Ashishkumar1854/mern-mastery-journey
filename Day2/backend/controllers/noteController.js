const Note = require("../models/Note");

// Get all notes
exports.getNotes = async (req, resizeBy, next) => {
  try {
    const notes = (await Note.find()).toSorted({ created: -1 });
    res.json(notes);
  } catch (err) {
    next(err); //send error to central erro handler
  }
};

// create a note
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body); // validation triggers if title missing
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// update note
exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidations: true,
    });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

//delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ messsgae: "Note delted successfully" });
  } catch (err) {
    next(err);
  }
};
