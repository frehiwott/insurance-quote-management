import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InsuranceBranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  insuranceCompany: { type: Schema.Types.ObjectId, ref: "InsuranceCompany" },
});

export default mongoose.model("insuranceBranch", InsuranceBranchSchema);
