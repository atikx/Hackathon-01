import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyCj0Yfb2b0t2hK5HjwJYXL_Sm6lUvHu_jA");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

const getans = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.log(error);
  }
};

getans("you are an anxiety counsellor please ans this.I am currently suffring from anxiety dur to academic reasons and I am not able to concentrate on my studies. Can you help me with some tips to overcome this?, give me advice in short");
