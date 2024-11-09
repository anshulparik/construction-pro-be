import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  workScope: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkScope",
    required: true,
  },
  isComplete: { type: Boolean, default: false },
});

export const Logs = mongoose.models.Logs || mongoose.model("Logs", logsSchema);
