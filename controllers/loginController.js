// loginController.js

import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

export const login = (req, res) => {
    const { phone, password } = req.body;

    pool.query('SELECT fullname FROM register WHERE phone = ? AND password = ?', [phone, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Successful login
        const fullname = results[0].fullname;
        res.redirect(`/home.html?fullname=${fullname}`); // Redirect with fullname as query parameter
    });
};
