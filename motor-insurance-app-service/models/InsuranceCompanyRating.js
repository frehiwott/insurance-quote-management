import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InsuranceCompanyRatingSchema = new mongoose.Schema({
  insuranceCompany: { type: Schema.Types.ObjectId, ref: "InsuranceCompany" },
  question: { type: Schema.Types.ObjectId, ref: "QuestionOption" },
  rate: {
    type: Number,
  },
});

export default mongoose.model(
  "InsuranceCompanyRating",
  InsuranceCompanyRatingSchema
);
