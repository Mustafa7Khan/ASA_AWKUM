import express from 'express';
import PreviousCabinet from '../models/PreviousCabinet.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all previous cabinets (Public)
router.get('/', async (_req, res) => {
  try {
    const items = await PreviousCabinet.find().sort({ year: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching previous cabinets' });
  }
});

// POST new previous cabinet (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const created = await PreviousCabinet.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update previous cabinet (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await PreviousCabinet.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Previous cabinet not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE previous cabinet (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await PreviousCabinet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Previous cabinet not found' });
    res.json({ message: 'Previous cabinet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;