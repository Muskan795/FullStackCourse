# Day 2 - Notes REST API

## Topic Studied

Node.js REST API using built-in modules.

## What I Built

I built a simple Notes REST API without using Express.

The notes are stored in a JSON file.

The API supports:

- Create a note
- Get all notes
- Get one note
- Update a note
- Delete a note

## Folder Structure

```text
day-2/
├── data/
│   └── notes.json
├── modules/
│   └── notes.js
├── app.js
└── README.md




What I Practiced
Node.js modules
require() and module.exports
fs/promises
path
JSON file operations
HTTP methods
REST API routes
Request body
URL parameters
async/await
Error handling
HTTP status codes
What I Understood

I understood how different API routes are created using the HTTP method and URL.

I understood that notes can be stored inside a JSON file and can be created, read, updated and deleted.

I also understood how request data is collected before converting it into JSON.

I learned that JSON.parse() converts JSON text into JavaScript data and JSON.stringify() converts JavaScript data into JSON text.

What I Still Need to Learn

I still need to properly understand:

How require() and module.exports work
How fs/promises works
How path.join() and __dirname work
How Promise works in readRequestBody()
How new URL() works
How find() and findIndex() work
How spread syntax works
How REST APIs work in more detail
HTTP status codes in more detail
How Express simplifies this code
How a database would replace the JSON file
Testing

I tested the following:

Create note ✅
Get all notes ✅
Get one note ✅
Update note ✅
Delete note ✅
Invalid JSON ✅
Empty title ✅
Empty content ✅
Unknown route ✅
Wrong HTTP method ✅
Note not found ✅
Restart server and check saved data ✅
Problems I Faced
Port 3000 was already in use

I got an error because another server was already running on port 3000.

I learned how to stop the old server and start the server again.

Invalid JSON

I tested an invalid JSON request and learned that the API returns a 400 error.

Understanding the code

I was able to build and test the API, but I still need to study several parts of the code properly.

I will revise these concepts through tutorials before moving ahead.

Questions I Still Have

- How does `req.method` decide which code should run?
- How does `req.url` help us find the correct route?
- How do URL parameters like `/api/notes/:id` work?
- Why do we need `JSON.parse()` when receiving data?
- Why do we need `JSON.stringify()` when sending data?
- How does `async/await` work?
- How do `require()` and `module.exports` work?
- How do `find()` and `findIndex()` work?
- How does `...` (spread syntax) work?
- How does the server handle multiple requests at the same time?
- How would I replace the JSON file with a database?