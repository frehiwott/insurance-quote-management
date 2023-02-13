import { Timestamp } from "bson";
import mongoose from "mongoose";
const Schema = mongoose;
const NewUserSchema = new mongoose.Schema(
  {
    // user_code: { type: Schema.Types.ObjectId, ref: "UserType" },
    user_type: {
      type: Schema.Types.ObjectId, ref: "UserType" 
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    is_active: {
      type: String,
    },
    last_login_timestamp: {
      type: Date,
    },
    is_deleted: {
      type: Boolean,
    },
    refresh_token: {
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
export default mongoose.model("NewUser", NewUserSchema);
