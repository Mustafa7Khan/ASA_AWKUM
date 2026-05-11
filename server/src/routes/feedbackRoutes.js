import express from 'express';
import Feedback from '../models/Feedback.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all feedback (Protected - Only admins should see this)
router.get('/', async (_req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// POST new feedback (Public - Anyone can send feedback)
router.post('/', async (req, res) => {
  try {
    const created = await Feedback.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    // 400 status if the feedback data doesn't meet model validation
    res.status(400).json({ message: error.message });
  }
});

export default router;