import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    body: { type: String, required: true, trim: true },

    // 📅 Use Date type (NOT string)
    date: { type: Date, default: Date.now },

    // 🖼️🎥📄 MEDIA (Images, Videos, Docs)
    media: [
      {
        url: { type: String, required: true },

        type: {
          type: String,
          enum: ['image', 'video', 'document'],
          required: true,
        },

        name: { type: String, default: '' }, // for documents (e.g., "Notice.pdf")
      },
    ],

    // ⭐ Highlight important news
    isFeatured: { type: Boolean, default: false },

    // 🔢 Sorting / priority
    order: { type: Number, default: 0 },

    // 🏷️ Optional category
    category: {
      type: String,
      enum: ['announcement', 'event', 'notice'],
      default: 'announcement',
    },
  },
  { timestamps: true }
);

export default mongoose.model('News', newsSchema);