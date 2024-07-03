// db.js

import mysql from 'mysql2';

// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'target_farmer',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            console.log('Database connected');
            connection.release();
            resolve();
        });
    });
};

export default pool;
