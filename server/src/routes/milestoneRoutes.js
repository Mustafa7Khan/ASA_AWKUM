import express from 'express';
import Milestone from '../models/Milestone.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();


// ✅ GET all milestones (with filters)
router.get('/', async (req, res) => {
  try {
    const { featured, limit } = req.query;

    let filter = {};
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    let query = Milestone.find(filter)
      .sort({ order: 1, year: 1 });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const milestones = await query;

    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching milestones' });
  }
});


// ✅ GET single milestone
router.get('/:id', async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.json(milestone);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching milestone' });
  }
});

// ✅ CREATE milestone (Protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { year, text } = req.body;

    if (!year || !text) {
      return res.status(400).json({ message: 'Year and text are required' });
    }

    // Capture the image path if a file was uploaded
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const created = await Milestone.create({ 
      ...req.body, 
      image: imagePath 
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ UPDATE milestone (Protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Only update the image field if a new file is actually uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Milestone.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE milestone (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    res.json({ message: 'Milestone deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;