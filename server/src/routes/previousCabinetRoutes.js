import express from 'express';
import PreviousCabinet from '../models/PreviousCabinet.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await PreviousCabinet.find().sort({ year: -1 });
  res.json(items);
});

router.post('/', authMiddleware, async (req, res) => {

router.post('/', async (req, res) => {
  const created = await PreviousCabinet.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', authMiddleware, async (req, res) => {
router.put('/:id', async (req, res) => {
  const updated = await PreviousCabinet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Previous cabinet not found' });
  res.json(updated);
});

router.delete('/:id', authMiddleware, async (req, res) => {

router.delete('/:id', async (req, res) => {
  const deleted = await PreviousCabinet.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Previous cabinet not found' });
  res.json({ message: 'Previous cabinet deleted' });
});

export default router;
