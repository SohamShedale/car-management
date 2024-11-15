import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Car = mongoose.model("car", carSchema);
