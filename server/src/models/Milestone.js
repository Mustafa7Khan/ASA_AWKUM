import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },

    title: { type: String, default: '' }, // optional (better UI)
    
    text: { type: String, required: true, trim: true },

    // 🎥📷 MEDIA SUPPORT
    media: [
      {
        url: { type: String, required: true },
        type: { 
          type: String, 
          enum: ['image', 'video'], 
          required: true 
        },
      },
    ],

    // ⭐ Highlight important milestones
    isFeatured: { type: Boolean, default: false },

    // 🔢 For timeline ordering
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Milestone', milestoneSchema);