const http = require("http");
const { randomUUID } = require("crypto");

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("./modules/notes");

// Create the server
const server = http.createServer(async (req, res) => {
  try {

    // POST /api/notes
    if (req.method === "POST" && req.url === "/api/notes") {

      let body = "";

      // Request body can arrive in multiple chunks
      req.on("data", (chunk) => {
        body += chunk;
      });

      // Runs when the complete request body has arrived
      req.on("end", async () => {
        try {

          // Convert JSON text into a JavaScript object
          const noteData = JSON.parse(body);

          // Validate title
          if (
            typeof noteData.title !== "string" ||
            noteData.title.trim() === ""
          ) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");

            return res.end(
              JSON.stringify({
                error: "Title is required",
              })
            );
          }

          // Validate content
          if (
            typeof noteData.content !== "string" ||
            noteData.content.trim() === ""
          ) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");

            return res.end(
              JSON.stringify({
                error: "Content is required",
              })
            );
          }

          // Create a new note
          const note = {
            id: randomUUID(),
            title: noteData.title.trim(),
            content: noteData.content.trim(),
            createdAt: new Date().toISOString(),
          };

          // Save the note
          const createdNote = await createNote(note);

          // Send successful response
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");

          res.end(JSON.stringify(createdNote));

        } catch (error) {

          // Invalid JSON
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");

          res.end(
            JSON.stringify({
              error: "Invalid JSON request body",
            })
          );
        }
      });

      return;
    }

    // Temporary response for other routes
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: "Route not found",
      })
    );

  } catch (error) {

    // Unexpected server error
    console.error(error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: "Internal Server Error",
      })
    );
  }
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Port 3000 is already in use.");
  } else {
    console.error("Server error:", error.message);
  }
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});