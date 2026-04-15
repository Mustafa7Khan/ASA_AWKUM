import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    feedback: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
