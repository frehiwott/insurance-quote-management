import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MotorInsuranceDocumentSchema = new mongoose.Schema({
  motorDetailId: { type: Schema.Types.ObjectId, ref: "UserMotorDetail" },
  ownershipCertificate: {
    type: String,
  },
  salesAgreement: {
    type: String,
  },
  drivingLicense: {
    type: String,
  }
});

export default mongoose.model(
  "MotorInsuranceDocument",
  MotorInsuranceDocumentSchema
);
