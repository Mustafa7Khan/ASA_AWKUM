import express from 'express';
import Cabinet from '../models/Cabinet.js';
import CabinetMember from '../models/CabinetMember.js';
import News from '../models/News.js';
import Milestone from '../models/Milestone.js';

const router = express.Router();


router.get('/overview', async (_req, res) => {
  try {
    // ✅ Get current cabinet
    const currentCabinet = await Cabinet.findOne({ isCurrent: true });

    // ✅ Get members of current cabinet
    const currentCabinetMembers = currentCabinet
      ? await CabinetMember.find({ cabinet: currentCabinet._id }).sort({ order: 1 })
      : [];

    // ✅ Get previous cabinets
    const previousCabinets = await Cabinet.find({ isCurrent: false }).sort({ year: -1 });

    // ✅ Latest news (limit for dashboard)
    const news = await News.find()
      .sort({ date: -1, createdAt: -1 })
      .limit(5);

    // ✅ Milestones (timeline)
    const milestones = await Milestone.find()
      .sort({ order: 1, year: 1 })
      .limit(10);

    res.json({
      currentCabinet: {
        cabinet: currentCabinet,
        members: currentCabinetMembers,
      },
      previousCabinets,
      news,
      milestones,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching overview data' });
  }
});

export default router;