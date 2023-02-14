import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  controlType: {
    type: String,
  },
  description:{
    type: String
  },
  insuranceType: { type: Schema.Types.ObjectId, ref: "InsuranceType" },
  isFirst:{
    type: Boolean,
    default: false
  },

  btnNext: {
    type: Boolean,
  },
});

export default mongoose.model("NewQuestion", NewQuestionSchema);
