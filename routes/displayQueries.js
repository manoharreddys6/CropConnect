// displayQueries.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllQueries, addQuery } from '../controllers/queryController.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to get all queries
router.get('/', getAllQueries);

// Route to handle adding a query
router.post('/add', upload.single('image'), addQuery);

export default router;
