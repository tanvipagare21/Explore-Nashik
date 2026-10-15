// Feedback REST API Controller (Assignments 14 & 15)
const db = require('../config/db');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, favorite_place, rating, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email and Message are required' });
    }

    if (db.isMock()) {
      const fb = { id: db.mockDb.feedback.length + 1, name, email, favorite_place, rating, message, created_at: new Date() };
      db.mockDb.feedback.push(fb);
      return res.status(201).json({ message: 'Feedback submitted successfully', feedback: fb });
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      'INSERT INTO feedback (name, email, favorite_place, rating, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, favorite_place || '', rating || 5, message]
    );
    res.status(201).json({ id: result.insertId, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error processing feedback' });
  }
};
