const readline = require("node:readline/promises");
const fs = require("node:fs/promises");


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

rl.close();
}

main();