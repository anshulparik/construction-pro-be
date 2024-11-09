import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["complete", "incomplete"],
      default: "incomplete",
    },
    workScope: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkScope",
      required: false,
    },
  },
  { timestamps: true }
);

export const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
