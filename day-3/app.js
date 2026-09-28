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

await fs.writeFile("notes.txt",text);

const data = await fs.readFile("notes.txt", "utf8");

const lines = data.split("\n");
const words = data.trim().split(/\s+/);

const characters = data.length;

//console.log(data);   this console just displays the stored text in data 

console.log("Characters:", characters);  // this counts the  total number of characters

console.log("Lines:", lines.length);
console.log("Words:", words.length);



const input = await rl.question("Enter numbers separated by spaces: ");

const digits = input.split(" ");

const numbers = digits.map(Number);
await fs.writeFile("numbers.txt", JSON.stringify(numbers));

const num  = await fs.readFile("numbers.txt", "utf8");

const numbersArray = JSON.parse(num);
console.log("num:",numbersArray);


const sum = numbersArray.reduce((total,number) => total + number,0)
console.log("Sum:",sum);

const avg = sum / numbersArray.length;
console.log("Avg:",avg);

const min = Math.min(...numbersArray);
console.log("Minimum:", min)

const max = Math.max(...numbersArray);
console.log("Maximum:", max)

const namesData = await fs.readFile("names.txt","utf8");
console.log(namesData);

const names = namesData.split("\n");

const uniqueNames = new Set(names);
console.log(uniqueNames);

const uniqueNamesArray = [...uniqueNames];
uniqueNamesArray.sort();

console.log(uniqueNamesArray);

await fs.writeFile("unique-names.txt",uniqueNamesArray.join("\n"),"utf8")


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

 rl.close();


}
main();