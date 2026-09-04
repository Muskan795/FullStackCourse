# Day 1 - Node.js Basics

## Topic Studied

Node.js basics, file handling, asynchronous operations, API requests, and creating a web server.

## Important Concepts

- Node.js allows us to run JavaScript outside the browser.
- `fs` is the File System module used to work with files.
- `writeFileSync()` creates/writes a file synchronously.
- `readFileSync()` reads a file synchronously.
- `readFile()` reads a file asynchronously using a callback.
- `err` is used to handle errors and `data` contains the result.
- `utf8` converts file bytes into readable text.
- Promises provide another way to handle asynchronous operations.
- `async/await` makes Promise-based code easier to read.
- `try...catch` is used to handle errors.
- `https` is used to make requests to APIs.
- API responses can arrive in multiple chunks.
- `JSON.parse()` converts JSON text into a JavaScript object.
- `JSON.stringify()` converts a JavaScript object into JSON text.
- `http` is used to create a web server.
- `req` contains the request information.
- `res` is used to send a response.
- HTTP routes can be created using `req.method` and `req.url`.

## Programs Completed

### File Handling

- Created `message.txt` using `writeFileSync()`.
- Read the file synchronously.
- Read the file asynchronously using a callback.
- Read the file using Promises and `async/await`.
- Added error handling.

### API Request

- Made a GET request using the built-in `https` module.
- Collected response data in chunks.
- Used `response.on("data")` and `response.on("end")`.
- Converted the JSON response into a JavaScript object.
- Displayed the API title.
- Handled HTTP errors, network errors, and invalid JSON.

### Web Server

- Created a server using the built-in `http` module.
- Used port `3000`.
- Created `GET /`.
- Created `GET /api/hello`.
- Added a 404 response for unknown routes.

## Commands Used

```bash
node app.js
pwd
ls
git status
git add .
git commit -m "Complete Day 1"
git push


## Problems Encountered

### 1. Buffer and UTF-8

When I first used `fs.readFileSync()` without `"utf8"`, the file content was returned as a Buffer instead of normal text.

I learned that files are stored as bytes and `"utf8"` tells Node.js to convert those bytes into readable text.

### 2. Asynchronous Callback

I did not initially understand how `fs.readFile()` works with a callback.


### 3. Collecting API Response Chunks

I did not know that data from an API can arrive in multiple chunks.

I learned that I need to collect each chunk using:

```js
data += chunk;

4. JSON Parsing

I learned how JSON.parse() converts JSON text into a JavaScript object and how to access values such as todo.title.

5. Error Handling for API Requests

I learned that there can be different types of errors when making an API request.

I learned how to handle:

Unsuccessful HTTP status codes.
Network errors.
Invalid JSON using try...catch.

6. Creating an HTTP Server

I had not used Node.js to create a web server before.

I learned that the built-in http module can be used with http.createServer() to create a server.

7. Understanding Routes

I initially did not understand how routes work in a Node.js server.

I learned how to check req.method and req.url to create routes such as:

GET /
GET /api/hello

I also learned how to return a 404 Not Found response for unknown routes.

8. Running the Server on a Port

I learned that server.listen(3000) starts the server and makes it listen for requests on port 3000.



## Questions That Remain

### 1. How do `req` and `res` work?

I understand that `req` contains information about the request and `res` is used to send a response, but I want to understand them more clearly.

### 2. How do routes work?

I understand that `req.method` tells us the HTTP method and `req.url` tells us the requested URL, but I want to understand how routing works in real-world applications.

### 3. Why do we use `res.end()`?

I understand that `res.end()` sends the response to the client, but I want to understand why the response needs to be ended and what happens internally.

### 4. Why do we use `res.setHeader()`?

I understand that it tells the client what type of data is being sent, such as JSON, but I want to understand headers in more detail.

### 5. Why do we use `JSON.stringify()`?

I understand that it converts a JavaScript object into JSON text before sending it to the client, but I want to understand more about why the conversion is necessary.

### 6. How does `server.listen(3000)` work?

I understand that it starts the server on port 3000, but I want to understand what a port is and how the server listens for incoming requests.

### 7. How does the request-response cycle work?

I understand the basic idea of:

Browser → request → server → response → browser

but I want to understand what happens internally between these steps.