const fs = require("fs/promises");
const path = require("path");

// Create a reliable path to notes.json
// __dirname = current folder of this file (modules)
// .. = go one folder up to day-2
const notesFile = path.join(__dirname, "..", "data", "notes.json");

// Read notes from the JSON file
async function getAllNotes() {
  try {
    const data = await fs.readFile(notesFile, "utf8");

    // Convert JSON text into a JavaScript array
    const notes = JSON.parse(data);

    return notes;
  } catch (error) {
    console.error("Error reading notes:", error.message);
    throw error;
  }
}

// These will be implemented in the next parts
async function getNoteById(id) {
  // Next part
}

async function createNote(note) {
  // Next part
}

async function updateNote(id, changes) {
  // Next part
}

async function deleteNote(id) {
  // Next part
}

// Export functions so app.js can use them
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};