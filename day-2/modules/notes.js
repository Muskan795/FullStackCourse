const fs = require("fs/promises");
const path = require("path");

// Reliable path to notes.json
const notesFile = path.join(__dirname, "..", "data", "notes.json");

async function getAllNotes() {
  const data = await fs.readFile(notesFile, "utf8");
  return JSON.parse(data);
}

async function getNoteById(id) {
  const notes = await getAllNotes();

  return notes.find((note) => note.id === id) || null;
}

async function createNote(note) {
  const notes = await getAllNotes();

  notes.push(note);

  await fs.writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    "utf8"
  );

  return note;
}

// Keep these for later
async function updateNote(id, changes) {
  // Part 8
}

async function deleteNote(id) {
  // Part 9
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};