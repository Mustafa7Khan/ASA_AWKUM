import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await Feedback.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const created = await Feedback.create(req.body);
  res.status(201).json(created);
});

export default router;
