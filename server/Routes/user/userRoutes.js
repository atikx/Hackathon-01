import { Router } from "express";
import { generateToken } from "../../functions/tokenGenerater.js";
import { authenticateToken } from "../../middlewares/jwtauth.js";
import User from "../../models/User.js";

const router = Router();

router.get("/getProfile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.mongoId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
});

export default router;
