import mongoose from 'mongoose';

const cabinetSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, unique: true },
    isCurrent: { type: Boolean, default: false },
    title: { type: String, default: '' }, // optional: "2024–25 Cabinet"
  },
  { timestamps: true }
);

export default mongoose.model('Cabinet', cabinetSchema);