import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Milestone', milestoneSchema);
