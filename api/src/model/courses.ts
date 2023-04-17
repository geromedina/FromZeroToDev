import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ICourse } from "../utils/types";

const coursesSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true
    },

    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    video: {
      type: String,
      required: true,
    },
    reviews: {
      defaultValue: []
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", coursesSchema);
