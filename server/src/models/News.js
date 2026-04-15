import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('News', newsSchema);
