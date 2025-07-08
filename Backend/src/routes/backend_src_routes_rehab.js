import express from "express";
import Rehab from "../models/Rehab.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Get all rehab activities for user
router.get("/", auth, async (req, res) => {
  const activities = await Rehab.find({ user: req.user.id });
  res.json(activities);
});

// Add rehab activity
router.post("/", auth, async (req, res) => {
  const { activity, scheduledTime, notes } = req.body;
  const rehab = new Rehab({ user: req.user.id, activity, scheduledTime, notes });
  await rehab.save();
  res.json(rehab);
});

// Edit rehab activity
router.put("/:id", auth, async (req, res) => {
  const rehab = await Rehab.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(rehab);
});

// Delete rehab activity
router.delete("/:id", auth, async (req, res) => {
  await Rehab.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: "Deleted" });
});

export default router;