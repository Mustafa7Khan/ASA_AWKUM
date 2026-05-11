import express from 'express';
import News from '../models/News.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();


// ✅ GET all news (with filters)
router.get('/', async (req, res) => {
  try {
    const { featured, category, limit } = req.query;

    let filter = {};

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (category) {
      filter.category = category;
    }

    let query = News.find(filter)
      .sort({ date: -1, order: 1 });

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const items = await query;

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
});


// ✅ GET single news
router.get('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news item' });
  }
});


// ✅ POST new news (Protected)
router.post('/', authMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]), async (req, res) => {
  try {
     const image = req.files?.image?.[0]
        ? `/uploads/${req.files.image[0].filename}`
        : '';

      const document = req.files?.document?.[0]
        ? `/uploads/${req.files.document[0].filename}`
        : '';

    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const created = await News.create({ ...req.body, image, document });

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ✅ PUT update news (Protected)
router.put('/:id', authMiddleware, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 },
]), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Check if new files were uploaded and update the paths
    if (req.files?.image?.[0]) {
      updateData.image = `/uploads/${req.files.image[0].filename}`;
    }

    if (req.files?.document?.[0]) {
      updateData.document = `/uploads/${req.files.document[0].filename}`;
    }

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE news (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;