import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./Routes/Auth/auth.js";
import newChat from "./Routes/chat/newChat.js";
import chat from "./Routes/chat/chat.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user/userRoutes.js";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
