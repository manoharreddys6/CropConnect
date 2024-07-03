import pool from '../config/db.js';

// Get all farmers (both verified and unverified)
export async function getAllFarmers(req, res) {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM farmers');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add a new farmer request
export async function addFarmer(req, res) {
  const { name, description, contact, price } = req.body;

  try {
    await pool.promise().query('INSERT INTO farmers (name, description, contact, price, verified) VALUES (?, ?, ?, ?, false)', [name, description, contact, price]);
    res.status(200).json({ message: 'Farmer request submitted successfully' });
  } catch (error) {
    console.error('Error adding farmer request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Verify a farmer request (admin action)
export async function verifyFarmer(req, res) {
  const farmerId = req.params.id;

  try {
    await pool.promise().query('UPDATE farmers SET verified = true WHERE id = ?', [farmerId]);
    res.status(200).json({ message: 'Farmer request verified successfully' });
  } catch (error) {
    console.error('Error verifying farmer request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
