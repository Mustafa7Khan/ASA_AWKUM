import express from 'express';
import Milestone from '../models/Milestone.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all milestones (Public - Sorted by year ascending)
router.get('/', async (_req, res) => {
  try {
    const items = await Milestone.find().sort({ year: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching milestones' });
  }
});

// POST new milestone (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const created = await Milestone.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update milestone (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Milestone.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Milestone not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE milestone (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Milestone not found' });
    res.json({ message: 'Milestone deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;