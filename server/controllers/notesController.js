const Note = require("../models/note");

//======================================================
// Fetch All Notes
//======================================================
const fetchNotes = async (req, res) => {
  const notes = await Note.find(); // find the notes
  res.json({ notes });
};

//======================================================
// Fetch Note with id
//======================================================
const fetchNote = async (req, res) => {
  const noteId = req.params.id; // Get Id off the URL
  const note = await Note.findById(noteId); //Find the note using the id
  res.json({ note }); // Respond with the note
};

//======================================================
// Create Note
//======================================================
const createNote = async (req, res) => {
  const { title, body } = req.body;
  const note = await Note.create({
    // create a note with it
    title,
    body,
  });
  res.json({ note }); // respond with note
};

//======================================================
// Update Note
//======================================================
const updateNote = async (req, res) => {
  const noteId = req.params.id; //Get the Id of the url
  const { title, body } = req.body;
  await Note.findByIdAndUpdate(noteId, {
    //Find and update the record
    title,
    body,
  });
  const note = await Note.findById(noteId); // find by note
  res.json({ note }); //Respond with it
};

//======================================================
// Delete Note
//======================================================
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  await Note.deleteOne({ _id: noteId });
  res.json({ success: "Note Deleted Successfully" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
