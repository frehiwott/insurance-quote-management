import { Timestamp } from "bson";
import mongoose from "mongoose";
const Schema = mongoose;
const UserTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    created_by: {
      type: String,
    },
    updated_by: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("UserType", UserTypeSchema);
