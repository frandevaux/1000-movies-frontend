import { select } from "@nextui-org/react";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    seenMovies: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
