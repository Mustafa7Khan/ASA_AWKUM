import mongoose from 'mongoose';

const archivedMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
  },
  { _id: false }
);

const previousCabinetSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },
    members: { type: [archivedMemberSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('PreviousCabinet', previousCabinetSchema);
