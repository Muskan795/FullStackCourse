// Load Node.js HTTP module
const http = require("http");

// randomUUID is used to create a unique ID for every note
const { randomUUID } = require("crypto");

// Import the functions from notes.js
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("./modules/notes");

// Function to send JSON response
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;

  // Tell the browser/client that we are sending JSON
  res.setHeader("Content-Type", "application/json");

  // Convert JavaScript data into JSON and send it
  res.end(JSON.stringify(data));
}

// Function to read data sent by the client
function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    // Request body may come in multiple chunks
    req.on("data", (chunk) => {
      body += chunk;
    });

    // When all the data is received
    req.on("end", () => {
      resolve(body);
    });

    // Handle request error
    req.on("error", (error) => {
      reject(error);
    });
  });
}

// Check if title and content are present
function validateNote(note) {
  if (
    typeof note.title !== "string" ||
    note.title.trim() === ""
  ) {
    return "Title is required";
  }

  if (
    typeof note.content !== "string" ||
    note.content.trim() === ""
  ) {
    return "Content is required";
  }

  return null;
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  try {
    // Create URL object from the request URL
    const url = new URL(
      req.url,
      `http://${req.headers.host}`
    );

    // Get only the path from the URL
    const pathname = url.pathname;

    // ==========================================
    // PART 5 - CREATE NOTE
    // POST /api/notes
    // ==========================================

    // Check if the request is POST /api/notes
    if (req.method === "POST" && pathname === "/api/notes") {
      let body;

      try {
        // Read the data sent by the client
        const rawBody = await readRequestBody(req);

        // Convert JSON text into JavaScript object
        body = JSON.parse(rawBody);
      } catch (error) {
        // If JSON is not valid
        return sendJson(res, 400, {
          error: "Invalid JSON request body",
        });
      }

      // Check if title and content are valid
      const validationError = validateNote(body);

      if (validationError) {
        return sendJson(res, 400, {
          error: validationError,
        });
      }

      // Create a new note object
      const note = {
        // Generate a unique ID
        id: randomUUID(),

        // Remove extra spaces from title
        title: body.title.trim(),

        // Remove extra spaces from content
        content: body.content.trim(),

        // Save the creation time
        createdAt: new Date().toISOString(),
      };

      // Save the note in notes.json
      const createdNote = await createNote(note);

      // Send created note with 201 status
      return sendJson(res, 201, createdNote);
    }

    // ==========================================
    // PART 6 - GET ALL NOTES
    // GET /api/notes
    // ==========================================

    // Get all notes
    if (req.method === "GET" && pathname === "/api/notes") {
      const notes = await getAllNotes();

      // Send all notes
      return sendJson(res, 200, notes);
    }

    // ==========================================
    // PART 7 - GET ONE NOTE
    // GET /api/notes/:id
    // ==========================================

    // Check if URL contains a note ID
    if (
      req.method === "GET" &&
      pathname.startsWith("/api/notes/")
    ) {
      // Get the ID from the URL
      const id = pathname.split("/")[3];

      // Find note using the ID
      const note = await getNoteById(id);

      // If note does not exist
      if (!note) {
        return sendJson(res, 404, {
          error: "Note not found",
        });
      }

      // Send the note
      return sendJson(res, 200, note);
    }

    // ==========================================
    // PART 8 - UPDATE NOTE
    // PUT /api/notes/:id
    // ==========================================

    // Check if request is PUT for a specific note
    if (
      req.method === "PUT" &&
      pathname.startsWith("/api/notes/")
    ) {
      // Get note ID from URL
      const id = pathname.split("/")[3];

      let body;

      try {
        // Read request body
        const rawBody = await readRequestBody(req);

        // Convert JSON text into JavaScript object
        body = JSON.parse(rawBody);
      } catch (error) {
        // Handle invalid JSON
        return sendJson(res, 400, {
          error: "Invalid JSON request body",
        });
      }

      // Check title and content
      const validationError = validateNote(body);

      if (validationError) {
        return sendJson(res, 400, {
          error: validationError,
        });
      }

      // Data that we want to update
      const changes = {
        title: body.title.trim(),
        content: body.content.trim(),

        // Save the time when note was updated
        updatedAt: new Date().toISOString(),
      };

      // Update the note
      const updatedNote = await updateNote(id, changes);

      // If note does not exist
      if (!updatedNote) {
        return sendJson(res, 404, {
          error: "Note not found",
        });
      }

      // Send updated note
      return sendJson(res, 200, updatedNote);
    }

    // ==========================================
    // PART 9 - DELETE NOTE
    // DELETE /api/notes/:id
    // ==========================================

    // Check if request is DELETE for a specific note
    if (
      req.method === "DELETE" &&
      pathname.startsWith("/api/notes/")
    ) {
      // Get note ID from URL
      const id = pathname.split("/")[3];

      // Delete the note
      const deleted = await deleteNote(id);

      // If note does not exist
      if (!deleted) {
        return sendJson(res, 404, {
          error: "Note not found",
        });
      }

      // 204 means delete was successful and no data is returned
      res.statusCode = 204;

      return res.end();
    }

    // ==========================================
    // PART 10 - METHOD NOT ALLOWED
    // ==========================================

    // If the API route exists but wrong HTTP method is used
    if (
      pathname === "/api/notes" ||
      pathname.startsWith("/api/notes/")
    ) {
      return sendJson(res, 405, {
        error: "Method Not Allowed",
      });
    }

    // ==========================================
    // UNKNOWN ROUTE
    // ==========================================

    // If requested URL does not match any route
    return sendJson(res, 404, {
      error: "Route not found",
    });

  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected server error:", error);

    return sendJson(res, 500, {
      error: "Internal Server Error",
    });
  }
});

// Handle server errors
server.on("error", (error) => {
  // Check if port 3000 is already being used
  if (error.code === "EADDRINUSE") {
    console.error("Port 3000 is already in use.");
  } else {
    console.error("Server error:", error.message);
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});