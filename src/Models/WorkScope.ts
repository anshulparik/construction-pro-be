import mongoose from "mongoose";

const workScopeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  displayTime: { type: String, required: true },
  variance: { type: Number, required: true },
});

export const WorkScope =
  mongoose.models.WorkScope || mongoose.model("WorkScope", workScopeSchema);
