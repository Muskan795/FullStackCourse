// Load Node.js File System module with promise support
const fs = require("fs/promises");

// Load Node.js Path module
const path = require("path");

// Create a reliable path to notes.json
const notesFile = path.join(__dirname, "..", "data", "notes.json");

// Function to read all notes
async function getAllNotes() {
  const data = await fs.readFile(notesFile, "utf8");

  // Convert JSON text into JavaScript data
  return JSON.parse(data);
}

// Function to find one note using its ID
async function getNoteById(id) {
  const notes = await getAllNotes();

  // Find the note whose ID matches the given ID
  // If no note is found, return null
  return notes.find((note) => note.id === id) || null;
}

// Function to create a new note
async function createNote(note) {
  const notes = await getAllNotes();

  // Add the new note to the notes array
  notes.push(note);

  // Save the updated notes back to notes.json
  await fs.writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    "utf8"
  );

  // Return the created note
  return note;
}

// Function to update an existing note
async function updateNote(id, changes) {
  const notes = await getAllNotes();

  // Find the position of the note using its ID
  const index = notes.findIndex((note) => note.id === id);

  // If note is not found, return null
  if (index === -1) {
    return null;
  }

  // Keep the old note data and apply the new changes
  notes[index] = {
    ...notes[index],
    ...changes,
  };

  // Save the updated notes back to notes.json
  await fs.writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    "utf8"
  );

  // Return the updated note
  return notes[index];
}

// Function to delete a note
async function deleteNote(id) {
  const notes = await getAllNotes();

  // Find the position of the note using its ID
  const index = notes.findIndex((note) => note.id === id);

  // If note is not found, return false
  if (index === -1) {
    return false;
  }

  // Remove one note from the array
  notes.splice(index, 1);

  // Save the updated notes back to notes.json
  await fs.writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    "utf8"
  );

  // Return true when note is deleted successfully
  return true;
}

// Export these functions so app.js can use them
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};