import express from 'express';
import Milestone from '../models/Milestone.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await Milestone.find().sort({ year: 1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const created = await Milestone.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const updated = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Milestone not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Milestone.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Milestone not found' });
  res.json({ message: 'Milestone deleted' });
});

export default router;
