import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserInsuranceFeeSchema = new mongoose.Schema({
  fee: {
    type: Number,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  motorDetailId: { type: Schema.Types.ObjectId, ref: "UserMotorDetail" },
  insuranceCompany: { type: Schema.Types.ObjectId, ref: "InsuranceCompany" },
  questionId: { type: Schema.Types.ObjectId, ref: "QuestionOption" },
  
});

export default mongoose.model("UserInsuranceFee", UserInsuranceFeeSchema);
