import express from 'express';
import CabinetMember from '../models/CabinetMember.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all members (Public)
router.get('/', async (_req, res) => {
  try {
    const items = await CabinetMember.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabinet members' });
  }
});

// POST new member (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const created = await CabinetMember.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update member (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await CabinetMember.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Cabinet member not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE member (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await CabinetMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Cabinet member not found' });
    res.json({ message: 'Cabinet member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;