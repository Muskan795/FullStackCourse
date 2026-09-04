console.log("Program started");

// Load Node.js File System module
const fs = require("fs");

fs.writeFileSync("message.txt", "Hard work can overcome talent.");

console.log("Before synchronous operation");

const data = fs.readFileSync("message.txt", "utf8"); //utf8 is encoding system which tells node.js how byte values should be converted into characters/text.

console.log("After synchronous operation");

console.log(data);

console.log("Before asynchronous operation");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.log("file not exist/unavailable.");
  } else {
    console.log(data);
  }
});

console.log("After asynchronous operation");

const fsPromises = require("fs/promises");

async function readMessage() {
  try {
    const data = await fsPromises.readFile("message.txt", "utf8");
    console.log(data);
  } catch (error) {
    // Handle errors from the Promise-based file operation
    console.error(error);
  }
}
// call async function
readMessage();

// loads builtin  nodes HTTPS module
const https = require("https");

const request = https.get(
  "https://jsonplaceholder.typicode.com/todos/1",
  (response) => {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      console.error("Request failed:", response.statusCode);
      return;
    }
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        // Parse the string into a JavaScript object
        const todo = JSON.parse(data);

        // Now you can access its properties
        console.log(todo);
        console.log(`Title: ${todo.title}`);
      } catch (error) {
        console.error("Failed to parse JSON:", error.message);
      }
    });
  },
);
request.on("error", (error) => {
  console.error("Network error:", error.message);
});


const http = require("http");

//req = incoming request
// res = response that the server sends back

const server = http.createServer((req, res) => {

  // Handle GET /
  if (req.method === "GET" && req.url === "/") {
    res.end("Hello, World!");
  }
// Handle GET /api/hello
  else if (req.method === "GET" && req.url === "/api/hello") {
    res.setHeader("Content-Type", "application/json");
    // JavaScript object.
    const responseData = {
      message: "Hello, World!",
      technology: "Node.js",
    };

    res.end(JSON.stringify(responseData));
  }
//unknown routes
  else{ res.statusCode = 404;
  res.end("Not Found");}
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});