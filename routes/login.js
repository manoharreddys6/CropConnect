// login.js

import express from 'express';
import { login } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', (req, res) => {
    // Your login route logic here
    login(req, res);
});

export default router;
