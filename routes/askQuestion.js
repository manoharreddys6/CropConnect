import express from 'express';
import { askQuestion, upload } from '../controllers/askQuestionController.js';

const router = express.Router();

router.post('/', upload.single('imageUpload'), askQuestion);

export default router;
