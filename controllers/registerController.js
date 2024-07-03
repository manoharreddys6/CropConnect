import pool from '../config/db.js';

export async function register(req, res) {
    const { fullname, age, phone, email, password, address1, address2, city, pincode, state, gender } = req.body;

    try {
        const connection = await pool.promise().getConnection();
        
        // Insert user data into the database
        await connection.query(
            'INSERT INTO register (fullname, age, phone, email, password, address1, address2, city, pincode, state, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [fullname, age, phone, email, password, address1, address2, city, pincode, state, gender]
        );
        
        connection.release();

        // Respond with success message
        res.send("Registration Successful");
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
