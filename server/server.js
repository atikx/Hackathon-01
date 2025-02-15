import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./Routes/Auth/auth.js";
import newChat from "./Routes/chat/newChat.js";
import chat from "./Routes/chat/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/chat/newChat", newChat);
app.use("/chat", chat);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
