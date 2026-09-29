const readline = require("node:readline/promises");
const fs = require("node:fs/promises");
const { stringify } = require("node:querystring");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const sentence1 = await rl.question("Enter sentence 1: ");
  const sentence2 = await rl.question("Enter sentence 2: ");
  const sentence3 = await rl.question("Enter sentence 3: ");
  const sentence4 = await rl.question("Enter sentence 4: ");
  const sentence5 = await rl.question("Enter sentence 5: ");

  const text = `${sentence1}
${sentence2}
${sentence3}
${sentence4}
${sentence5}`;

  await fs.writeFile("notes.txt", text);

  const data = await fs.readFile("notes.txt", "utf8");

  const lines = data.split("\n");
  const words = data.trim().split(/\s+/);

  const characters = data.length;

  //console.log(data);   this console just displays the stored text in data

  console.log("Characters:", characters); // this counts the  total number of characters

  console.log("Lines:", lines.length);
  console.log("Words:", words.length);

  const input = await rl.question("Enter numbers separated by spaces: ");

  const digits = input.split(" ");

  const numbers = digits.map(Number);
  await fs.writeFile("numbers.txt", JSON.stringify(numbers));

  const num = await fs.readFile("numbers.txt", "utf8");

  const numbersArray = JSON.parse(num);
  console.log("num:", numbersArray);

  const sum = numbersArray.reduce((total, number) => total + number, 0);
  console.log("Sum:", sum);

  const avg = sum / numbersArray.length;
  console.log("Avg:", avg);

  const min = Math.min(...numbersArray);
  console.log("Minimum:", min);

  const max = Math.max(...numbersArray);
  console.log("Maximum:", max);

  const namesData = await fs.readFile("names.txt", "utf8");
  console.log(namesData);

  const names = namesData.split("\n");

  const uniqueNames = new Set(names);
  console.log(uniqueNames);

  const uniqueNamesArray = [...uniqueNames];
  uniqueNamesArray.sort();

  console.log(uniqueNamesArray);

  await fs.writeFile("unique-names.txt", uniqueNamesArray.join("\n"), "utf8");

  const wordsData = await fs.readFile("words.txt", "utf8");
  console.log(wordsData);

  const wordList = wordsData.trim().split(/\s+/);
  console.log(wordList);

  const normalizedWords = wordList.map((word) => word.toLowerCase());
  console.log(normalizedWords);

  const wordCount = new Map();
  for (const word of normalizedWords) {
    if (wordCount.has(word)) {
      wordCount.set(word, wordCount.get(word) + 1);
    } else {
      wordCount.set(word, 1);
    }
  }
  const wordArray = [...wordCount];
  console.log(wordArray);

  // question 6

  const studentData = await fs.readFile("students.json", "utf8");
  console.log(studentData);

  const students = JSON.parse(studentData);
  console.log(students);

  const name = await rl.question("Enter student name: ");
  const marks = await rl.question("Enter student marks: ");

  const studentMarks = Number(marks);

  students[name] = studentMarks;
  await fs.writeFile(
    "students.json",
    JSON.stringify(students, null, 2),
    "utf8",
  );

  console.log(students);

  const updateName = await rl.question("Enter student name to update: ");
  const newMarks = await rl.question("Enter new marks: ");
  const updatedMarks = Number(newMarks);
  students[updateName] = updatedMarks;

  const searchName = await rl.question("Enter student name to search: ");

  await fs.writeFile(
    "students.json",
    JSON.stringify(students, null, 2),
    "utf8",
  );

  console.log("Marks:", students[searchName]);

  // question 7

  const todoData = await fs.readFile("todos.json", "utf8");
  let todos = JSON.parse(todoData);

  const task = await rl.question("Enter a task: ");

  const newTask = {
    task: task,
    completed: false,
  };

  todos.push(newTask);

  await fs.writeFile("todos.json", JSON.stringify(todos, null, 2), "utf8");

  const taskToComplete = await rl.question("Enter task to complete: ");
  const taskFound = todos.find((todo) => todo.task === taskToComplete);
  if (taskFound) {
    taskFound.completed = true;
  }

  console.log(todos);
  await fs.writeFile("todos.json", JSON.stringify(todos, null, 2), "utf8");

  const taskToDelete = await rl.question("Enter task to delete: ");
  const remainingTodos = todos.filter((todo) => todo.task !== taskToDelete);

  console.log(remainingTodos);

  todos = remainingTodos;

  await fs.writeFile("todos.json", JSON.stringify(todos, null, 2), "utf8");
  console.log("All Tasks:", todos);

  // question 8

  const textLines = [];
  while (true) {
    const line = await rl.question("Enter a line: ");
    if (line === "save") {
      await fs.writeFile("undo.txt", textLines.join("\n"), "utf8");
      break;
    }
    if (line === "undo") {
      textLines.pop();
    } else {
      textLines.push(line);
    }
  }

  rl.close();
}
main();
