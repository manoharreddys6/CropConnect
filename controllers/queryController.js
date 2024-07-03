// Import necessary modules and pool
import pool from '../config/db.js';
import fs from 'fs';

// Function to get all queries
export const getAllQueries = (req, res) => {
    pool.query('SELECT * FROM query', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Convert BLOB data to Base64 encoded URLs
        const queries = results.map(query => {
            if (query.image) {
                const imageBase64 = Buffer.from(query.image, 'binary').toString('base64');
                query.image = `data:image/jpeg;base64,${imageBase64}`;
            }
            return query;
        });

        res.json(queries);
    });
};

// Function to add a new query
export const addQuery = (req, res) => {
    const { title, description, name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    let sql = `INSERT INTO query (title, description, name${image ? ', image' : ''}) VALUES (?, ?, ?${image ? ', ?' : ''})`;
    let params = [title, description, name];
    if (image) {
        params.push(image);
    }

    pool.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ title, description, name, image });
    });
};
