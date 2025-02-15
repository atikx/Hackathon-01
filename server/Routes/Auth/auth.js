import mongoose from "mongoose";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import { Router } from "express";
import { generateToken } from "../../functions/tokenGenerater.js";
import { authenticateToken } from "../../middlewares/jwtauth.js";

dotenv.config();
const router = Router();

// register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username: Math.random(),
    });
    res.cookie("token", generateToken(user), {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send("Registered Successfully");
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(420).send("wrong password");
    }
    res.cookie("token", generateToken(user), {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send("Logged in Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out Successfully");
});

export default router;
