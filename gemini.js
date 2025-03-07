const GoogleGenerativeAI = require("@googel/generative-ai");
const fs = require("node:fs")

const genAI = new GoogleGenerativeAI("AIzaSyCH_VSNVC1r-IfeHloC0lfD8qkbK_toohY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const prompt = "Give oneword file name for this document along with the owner name in lowercase only";
const imagePart = fileToGenerativePart("./2.jpeg", "image/jpeg");


const result = await model.generateContent([prompt, imagePart]);
console.log(result.response.text());
