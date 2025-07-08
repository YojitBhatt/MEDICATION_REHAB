import mongoose from "mongoose";

const RehabSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activity: String,
  scheduledTime: String,
  completed: { type: Boolean, default: false },
  notes: String
});

export default mongoose.model("Rehab", RehabSchema);