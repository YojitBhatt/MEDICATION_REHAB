import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/me", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
  res.json(user);
});

export default router;