import express from 'express';
import UnionContent from '../models/UnionContent.js';
import seedData from '../seedData.js';

const router = express.Router();

router.get('/content', async (_req, res) => {
  const content = await UnionContent.findOne().lean();
  if (!content) {
    return res.json(seedData);
  }
  return res.json(content);
});

router.put('/content', async (req, res) => {
  const updated = await UnionContent.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
  return res.json(updated);
});

export default router;
