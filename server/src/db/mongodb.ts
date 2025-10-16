import mongoose from "mongoose";
import { DATABASE_URL } from "../config/env";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL!);
    return conn;
  } catch (error) {
    throw error;
  }
};
