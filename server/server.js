import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./Routes/Auth/auth.js";
import newChat from "./Routes/chat/newChat.js";
import chat from "./Routes/chat/chat.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user/userRoutes.js";
import User from "./models/User.js";
import { authenticateToken } from "./middlewares/jwtauth.js";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use("/chat/newChat", newChat);
app.use("/chat", chat);
app.use("/user", userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI);

app.post("/test", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.mongoId);
    user.chats.push({
      title: "Test Chat",
      messages: [
        {
          que: "Why do I feel anxious all the time?",
          ans: "Anxiety can stem from various factors like stress, lifestyle, or past experiences. Practicing mindfulness and deep breathing may help.",
        },
        {
          que: "Can anxiety be completely cured?",
          ans: "While anxiety may not always be completely cured, it can be effectively managed with therapy, lifestyle changes, and medication if necessary.",
        },
        {
          que: "What are some quick ways to reduce anxiety?",
          ans: "Try deep breathing exercises, progressive muscle relaxation, or grounding techniques like focusing on your senses.",
        },
      ],
    });

    await user.save();
    res.status(200).send("Chat created successfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
