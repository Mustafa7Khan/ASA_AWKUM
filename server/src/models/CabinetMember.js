import mongoose from 'mongoose';

const cabinetMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    image: { type: String, default: '' },

    // 🔗 RELATION
    cabinet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cabinet',
      required: true,
    },

    // 🔢 ORDERING (VERY IMPORTANT)
    order: { type: Number, default: 0 }, // President = 1, VP = 2, etc.

    // 📝 EXTRA (Optional but useful)
    bio: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('CabinetMember', cabinetMemberSchema);