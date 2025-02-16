import User from "../../models/User.js";
import { Router } from "express";
import { authenticateToken } from "../../middlewares/jwtauth.js";
import { getans } from "../../functions/chatIntegration.js";

const router = Router();

router.post("/", authenticateToken, async (req, res) => {
  console.log("hello");
  try {
    const user = await User.findById(req.user.mongoId);
    const { title, que } = req.body;
    const ans = await getans(que, title);
    user.chats.push({ title, messages: [{ que, ans }] });
    await user.save();
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
});

export default router;
