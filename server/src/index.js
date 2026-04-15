import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import seedData from './seedData.js';
import CabinetMember from './models/CabinetMember.js';
import PreviousCabinet from './models/PreviousCabinet.js';
import News from './models/News.js';
import Milestone from './models/Milestone.js';
import newsRoutes from './routes/newsRoutes.js';
import currentCabinetRoutes from './routes/currentCabinetRoutes.js';
import previousCabinetRoutes from './routes/previousCabinetRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

import contentRoutes from './routes/contentRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/teachers_union';

app.use(cors());
app.use(express.json());

app.use('/api', contentRoutes);


app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api/public', publicRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/current-cabinet', currentCabinetRoutes);
app.use('/api/previous-cabinets', previousCabinetRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function seedIfEmpty() {
  const [newsCount, currentCount, previousCount, milestoneCount] = await Promise.all([
    News.countDocuments(),
    CabinetMember.countDocuments(),
    PreviousCabinet.countDocuments(),
    Milestone.countDocuments(),
  ]);

  const tasks = [];

  if (newsCount === 0) tasks.push(News.insertMany(seedData.news));
  if (currentCount === 0) tasks.push(CabinetMember.insertMany(seedData.currentCabinet));
  if (previousCount === 0) tasks.push(PreviousCabinet.insertMany(seedData.previousCabinets));
  if (milestoneCount === 0) tasks.push(Milestone.insertMany(seedData.milestones));

  await Promise.all(tasks);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    await seedIfEmpty();
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
