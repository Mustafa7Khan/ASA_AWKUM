import mongoose from 'mongoose';

const cabinetMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('CabinetMember', cabinetMemberSchema);
