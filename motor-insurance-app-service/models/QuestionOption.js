import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  parentQuestion: { type: Schema.Types.ObjectId, ref: "NewQuestion" },
  nextQuestion: { type: Schema.Types.ObjectId, ref: "NewQuestion" },
});

export default mongoose.model("QuestionOption", QuestionOptionSchema);
