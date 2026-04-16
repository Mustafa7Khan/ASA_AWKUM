import express from 'express';
import News from '../models/News.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all news (Publicly accessible)
router.get('/', async (_req, res) => {
  try {
    const items = await News.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// POST new news (Protected by authMiddleware)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const created = await News.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update news (Protected by authMiddleware)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!updated) return res.status(404).json({ message: 'News not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE news (Protected by authMiddleware)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;