import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    department: String,
    image: String,
  },
  { _id: false }
);

const previousCabinetSchema = new mongoose.Schema(
  {
    year: String,
    members: [memberSchema],
  },
  { _id: false }
);

const struggleSchema = new mongoose.Schema(
  {
    year: String,
    text: String,
  },
  { _id: false }
);

const newsSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    body: String,
  },
  { _id: false }
);

const unionContentSchema = new mongoose.Schema(
  {
    news: [newsSchema],
    currentCabinet: [memberSchema],
    previousCabinets: [previousCabinetSchema],
    struggles: [struggleSchema],
  },
  { timestamps: true }
);

export default mongoose.model('UnionContent', unionContentSchema);
