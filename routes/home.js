import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('home.html', { root: 'public' });
});

export default router;
