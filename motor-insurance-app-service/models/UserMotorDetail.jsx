
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserMotorDetail = new mongoose.Schema(
  {
    model:{
        type: String
    }
  },
  { timestamps: true }
);
export default mongoose.model('UserMotorDetail', UserMotorDetail);
