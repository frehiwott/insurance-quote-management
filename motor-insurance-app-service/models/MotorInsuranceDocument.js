import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MotorInsuranceDocumentSchema = new mongoose.Schema({
  motorDetailId: { type: Schema.Types.ObjectId, ref: "UserMotorDetail" },
  insuranceCompany: { type: Schema.Types.ObjectId, ref: "InsuranceCompany" },
  ownershipCertificate: {
    type: String,
  },
  salesAgreement: {
    type: String,
  },
  drivingLicense: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model(
  "MotorInsuranceDocument",
  MotorInsuranceDocumentSchema
);
