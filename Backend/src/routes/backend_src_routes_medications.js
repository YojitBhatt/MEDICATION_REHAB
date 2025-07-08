import express from "express";
import Medication from "../models/Medication.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Get all medications for user
router.get("/", auth, async (req, res) => {
  const meds = await Medication.find({ user: req.user.id });
  res.json(meds);
});

// Add medication
router.post("/", auth, async (req, res) => {
  const { name, dosage, time, notes } = req.body;
  const med = new Medication({ user: req.user.id, name, dosage, time, notes });
  await med.save();
  res.json(med);
});

// Edit medication
router.put("/:id", auth, async (req, res) => {
  const med = await Medication.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(med);
});

// Delete medication
router.delete("/:id", auth, async (req, res) => {
  await Medication.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: "Deleted" });
});

export default router;