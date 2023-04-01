import mongoose from "mongoose";
const Schema = mongoose;
const NewUserSchema = new mongoose.Schema(
  {
    // user_code: { type: Schema.Types.ObjectId, ref: "UserType" },
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
    phoneNumber: {
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
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    insuranceCompany: { type: Schema.Types.ObjectId },
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
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", NewUserSchema);
