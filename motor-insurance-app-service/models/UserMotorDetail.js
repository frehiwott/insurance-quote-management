import mongoose from "mongoose";
const { Schema } = mongoose;

const UserMotorDetail = new mongoose.Schema(
  {
    model: {
      type: String,
    },
    price: {
      type: Number,
    },
    dateOfManufacturing: {
      type: Date,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.model("UserMotorDetail", UserMotorDetail);
