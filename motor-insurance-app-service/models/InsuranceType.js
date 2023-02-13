import mongoose from "mongoose";

const { schema } = mongoose;

const InsuranceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

export default mongoose.model("InsuranceType", InsuranceTypeSchema);
