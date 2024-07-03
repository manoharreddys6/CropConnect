import { db } from '../config/db.js';
import multer from 'multer';

// Setup multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const askQuestion = (req, res) => {
    const { title, Desc, fullname } = req.body;
    const image = req.file;

    const sql = 'INSERT INTO query (title, description, image, name) VALUES (?, ?, ?, ?)';
    const values = [title, Desc, image ? image.buffer : null, fullname];

    db.execute(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }

        res.status(200).send('Question submitted successfully');
    });
};
