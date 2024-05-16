const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;

// or module.exports = mongoose.model('note',noteschema);
