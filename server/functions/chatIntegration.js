import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(`${process.env.API_KEY}`);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

const getans = async (que, type) => {
  const prompt =
    `you are a professional ${type} counsellor. please help me and answer in less than 100 words` + que;
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

export { getans };
