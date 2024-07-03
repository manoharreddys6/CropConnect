// routes/rss.js
import express from 'express';
import { getRSSFeed } from '../controllers/rssController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', getRSSFeed);
router.get('/rss-feed', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/rssFeed.html'));
});

export default router;
