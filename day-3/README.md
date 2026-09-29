# Day 3 - Node.js Practice

## Topic Studied

File handling and data structures in Node.js.

## What I Practiced

In Day 3, I practised different Node.js concepts using small programs.

The questions covered:

- Reading and writing files
- Counting lines, words, and characters
- Arrays of numbers
- Objects
- Set
- Map
- Stack
- Queue
- JSON files
- CSV files
- `push()` and `pop()`
- `push()` and `shift()`
- `find()` and `filter()`
- `sort()`
- `split()` and `join()`
- `Number()`
- `map()`
- `reduce()`
- `JSON.parse()`
- `JSON.stringify()`

## Files Created

```text
day-3/
├── app.js
├── notes.txt
├── numbers.txt
├── names.txt
├── unique-names.txt
├── words.txt
├── students.json
├── todos.json
├── undo.txt
├── customer-log.txt
├── expenses.csv
└── package.json




Question 1 - Write and read a text file
Took five sentences from the user, saved them in notes.txt, and displayed the file contents.
Status: ✅ Completed

Question 2 - Count lines, words, and characters
Read a file and counted:
Characters
Lines
Words
Status: ✅ Completed

Question 3 - Save and load numbers
Saved user-entered numbers to a file, read them back into an array, and calculated:
Sum
Average
Minimum
Maximum
Status: ✅ Completed

Question 4 - Remove duplicate names
Read names from a file, removed duplicate names using Set, sorted them alphabetically, and saved them to another file.
Status: ✅ Completed

Question 5 - Word frequency counter
Read words from a file, ignored capitalization, and counted word occurrences using Map.
I still need to complete the part where I sort the words by frequency and display the five most frequent words.
Status: ⏳ In Progress

Question 6 - Student marks manager
Stored student names and marks in an object.
Practised:
Adding students
Updating marks
Searching by name
Loading data from JSON
Saving data to JSON
Status: ✅ Completed

Question 7 - Persistent to-do list
Created a to-do list using an array of objects.
Practised:
Adding tasks
Completing tasks
Deleting tasks
Displaying tasks
Saving tasks to a JSON file
find()
filter()
Status: ✅ Completed

Question 8 - Undo using a stack
Stored text lines in an array and used:
push() to add a line
pop() to undo the last line
join() to save the remaining lines
Status: ✅ Completed

Question 9 - Customer-service queue
Created a customer queue using:
push() to add customers
shift() to serve the first customer
appendFile() to save served customers in a log file
Status: ✅ Completed

Question 10 - Expense tracker using CSV
Created an expense record with:
Date
Category
Amount
Used a CSV library to read and write CSV data.