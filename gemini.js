// First, ensure proper loading of .env
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("node:fs");
console.log("API Key:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
require("dotenv").config();


// Check if API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API key not found in environment variables!");
  process.exit(1);
}

// Check if file exists before trying to use it
const imagePath = "./Images/2.jpeg";
if (!fs.existsSync(imagePath)) {
  console.error(`Image not found at path: ${imagePath}`);
  process.exit(1);
}

// Rest of your code...


function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const userPrompt = "I need my adhar card";
  const prompt = `I am providing you the user prompt tell me what does user want in short: ${userPrompt}`;
  const imagePart = fileToGenerativePart("./Images/2.jpeg", "image/jpeg"); // Ensure the path is correct

  try {
    const result = await model.generateContent([prompt, imagePart]);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

run();
