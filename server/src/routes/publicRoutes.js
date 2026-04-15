import express from 'express';
import CabinetMember from '../models/CabinetMember.js';
import PreviousCabinet from '../models/PreviousCabinet.js';
import News from '../models/News.js';
import Milestone from '../models/Milestone.js';

const router = express.Router();

router.get('/overview', async (_req, res) => {
  const [currentCabinet, previousCabinets, news, milestones] = await Promise.all([
    CabinetMember.find().sort({ createdAt: -1 }),
    PreviousCabinet.find().sort({ year: -1 }),
    News.find().sort({ createdAt: -1 }),
    Milestone.find().sort({ year: 1 }),
  ]);

  res.json({ currentCabinet, previousCabinets, news, milestones });
});

export default router;
