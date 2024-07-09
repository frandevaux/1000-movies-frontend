import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri || "");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
