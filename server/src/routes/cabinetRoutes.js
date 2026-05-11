import express from 'express';
import Cabinet from '../models/Cabinet.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


// ✅ GET all cabinets (current + previous)
router.get('/', async (_req, res) => {
  try {
    const cabinets = await Cabinet.find().sort({ year: -1 });
    res.json(cabinets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabinets' });
  }
});


// ✅ GET only previous cabinets
router.get('/previous', async (_req, res) => {
  try {
    const cabinets = await Cabinet.find({ isCurrent: false }).sort({ year: -1 });
    res.json(cabinets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching previous cabinets' });
  }
});


// ✅ GET current cabinet
router.get('/current', async (_req, res) => {
  try {
    const cabinet = await Cabinet.findOne({ isCurrent: true });

    if (!cabinet) {
      return res.status(404).json({ message: 'No current cabinet found' });
    }

    res.json(cabinet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current cabinet' });
  }
});


// ✅ GET cabinet by year
router.get('/year/:year', async (req, res) => {
  try {
    const cabinet = await Cabinet.findOne({ year: req.params.year });

    if (!cabinet) {
      return res.status(404).json({ message: 'Cabinet not found' });
    }

    res.json(cabinet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cabinet' });
  }
});


// ✅ CREATE cabinet
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { year, isCurrent } = req.body;

    // ⚠️ Ensure only ONE current cabinet
    if (isCurrent) {
      await Cabinet.updateMany({}, { isCurrent: false });
    }

    const created = await Cabinet.create(req.body);

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ✅ UPDATE cabinet
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { isCurrent } = req.body;

    if (isCurrent) {
      await Cabinet.updateMany({}, { isCurrent: false });
    }

    const updated = await Cabinet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Cabinet not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ✅ DELETE cabinet
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Cabinet.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Cabinet not found' });
    }

    res.json({ message: 'Cabinet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;