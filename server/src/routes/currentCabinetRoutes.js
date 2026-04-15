import express from 'express';
import CabinetMember from '../models/CabinetMember.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', async (_req, res) => {
  const items = await CabinetMember.find().sort({ createdAt: -1 });
  res.json(items);
});


router.post('/', authMiddleware, async (req, res) => {

router.post('/', async (req, res) => {
  const created = await CabinetMember.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', authMiddleware, async (req, res) => {
router.put('/:id', async (req, res) => {
  const updated = await CabinetMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Cabinet member not found' });
  res.json(updated);
});

router.delete('/:id', authMiddleware, async (req, res) => {

router.delete('/:id', async (req, res) => {
  const deleted = await CabinetMember.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Cabinet member not found' });
  res.json({ message: 'Cabinet member deleted' });
});

export default router;
