import express from 'express';
import News from '../models/News.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await News.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const created = await News.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'News not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await News.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'News not found' });
  res.json({ message: 'News deleted' });
});

export default router;
