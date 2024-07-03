import express from 'express';
import { getItems, addItem } from '../controllers/ecommerceController.js';
import path from 'path';
import multer from 'multer';

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/ecommerce.html'));
});

router.get('/items', getItems);
router.post('/add-item', upload.single('image'), addItem);

export default router;
