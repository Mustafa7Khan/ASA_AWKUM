import express from 'express';
import CabinetMember from '../models/CabinetMember.js';
import Cabinet from '../models/Cabinet.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();


// ✅ GET all members (with filtering)
router.get('/', async (req, res) => {
  try {
    const { cabinetId } = req.query;

    let filter = {};
    if (cabinetId) {
      filter.cabinet = cabinetId;
    }

    const members = await CabinetMember.find(filter)
      .populate('cabinet')
      .sort({ order: 1 });

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabinet members' });
  }
});


// ✅ GET current cabinet members
router.get('/current', async (_req, res) => {
  try {
    const currentCabinet = await Cabinet.findOne({ isCurrent: true });

    if (!currentCabinet) {
      return res.status(404).json({ message: 'No current cabinet found' });
    }

    const currentMembers = await CabinetMember.find({
      cabinet: currentCabinet._id,
    })
      .sort({ order: 1 });

    res.json({
      cabinet: currentCabinet,
      members:currentMembers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current cabinet' });
  }
});


// ✅ GET members by year
router.get('/year/:year', async (req, res) => {
  try {
    const cabinet = await Cabinet.findOne({ year: req.params.year });

    if (!cabinet) {
      return res.status(404).json({ message: 'Cabinet not found for this year' });
    }

    const members = await CabinetMember.find({
      cabinet: cabinet._id,
    }).sort({ order: 1 });

    res.json({
      cabinet,
      members,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabinet by year' });
  }
});


// ✅ POST new member (Protected)
router.post('/', authMiddleware,upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const { name, designation, department, cabinet } = req.body;

    if (!cabinet) {
      return res.status(400).json({ message: 'Cabinet ID is required' });
    }

    const created = await CabinetMember.create({ ...req.body, image: imagePath });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ✅ PUT update member (Protected)
router.put('/:id', authMiddleware,upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await CabinetMember.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imagePath },
      { new: true, runValidators: true }
    ).populate('cabinet');

    if (!updated) {
      return res.status(404).json({ message: 'Cabinet member not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ✅ DELETE member (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await CabinetMember.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Cabinet member not found' });
    }

    res.json({ message: 'Cabinet member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;