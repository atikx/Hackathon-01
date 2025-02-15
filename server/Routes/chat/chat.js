import User from "../../models/User.js";
import { Router } from "express";
import { getans } from "../../middlewares/chatIntegration.js";
const router = Router();

router.post("/sendMsg/:id", async (req, res) => {
  console.log("hello");
  try {
    const user = await User.findById(req.user.mongoId);
    const chat = user.chats.id(req.params.id);
    const { que } = req.body;
    const title = chat.title;
    const ans = await getans(que, title);
    chat.messages.push({ que, ans });
    await user.save();
  } catch (error) {
    res.status(500).json("server error");
    console.log(error);
  }
});

export default router;
