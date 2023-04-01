import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InsuranceBranchEmployeesSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  insuranceBranch: { type: Schema.Types.ObjectId, ref: "insuranceBranch" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model(
  "insuranceBranchEmployees",
  InsuranceBranchEmployeesSchema
);
