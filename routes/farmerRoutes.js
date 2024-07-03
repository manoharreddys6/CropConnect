import express from 'express';
import { getAllFarmers, addFarmer, verifyFarmer } from '../controllers/farmerController.js';

const router = express.Router();

// Get all farmers (both verified and unverified)
router.get('/', getAllFarmers);

// Add a new farmer request
router.post('/add', addFarmer);

// Verify a farmer request
router.put('/verify/:id', verifyFarmer);

export default router;
