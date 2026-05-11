import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import Cabinet from './models/Cabinet.js';
import CabinetMember from './models/CabinetMember.js';
import News from './models/News.js';
import Milestone from './models/Milestone.js';

import newsRoutes from './routes/newsRoutes.js';
import cabinetRoutes from './routes/cabinetRoutes.js';
import cabinetMemberRoutes from './routes/cabinetMemberRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// ================= ROUTES =================
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/cabinets', cabinetRoutes);
app.use('/api/cabinet-members', cabinetMemberRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/feedback', feedbackRoutes);


// ================= ERROR HANDLER =================
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});


// ================= SEED FUNCTION =================
async function seedIfEmpty() {
  const [newsCount, cabinetCount, milestoneCount] = await Promise.all([
    News.countDocuments(),
    Cabinet.countDocuments(),
    Milestone.countDocuments(),
  ]);

  const tasks = [];

  // 🔹 Seed News
  if (newsCount === 0) {
    tasks.push(News.insertMany(seedData.news));
  }

  // 🔹 Seed Cabinets
  if (cabinetCount === 0) {
    tasks.push(Cabinet.insertMany(seedData.cabinets));
  }

  // 🔹 Seed Milestones
  if (milestoneCount === 0) {
    tasks.push(Milestone.insertMany(seedData.milestones));
  }

  await Promise.all(tasks);
}


// ================= DB CONNECT =================
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    // ⚠️ Ensure seedData exists before using
    if (typeof seedData !== 'undefined') {
      await seedIfEmpty();
      console.log('Seeding complete');
    } else {
      console.log('No seedData found, skipping seeding');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });