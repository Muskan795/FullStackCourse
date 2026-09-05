const { getAllNotes } = require("./modules/notes");

getAllNotes()
  .then((notes) => {
    console.log(notes);
  })
  .catch((error) => {
    console.error(error);
  });