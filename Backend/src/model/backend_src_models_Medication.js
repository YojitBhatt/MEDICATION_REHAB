import mongoose from "mongoose";

const MedicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  dosage: String,
  time: String,
  notes: String
});

export default mongoose.model("Medication", MedicationSchema);