// Events REST API Controller (Assignments 14 & 15)
const db = require('../config/db');

exports.getAllEvents = async (req, res) => {
  try {
    if (db.isMock()) {
      return res.json(db.mockDb.events);
    }
    const pool = db.getPool();
    const [rows] = await pool.query('SELECT * FROM events ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server Error fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { name, category, description, event_date, image } = req.body;
    if (db.isMock()) {
      const newEvent = { id: db.mockDb.events.length + 1, name, category, description, event_date, image };
      db.mockDb.events.unshift(newEvent);
      return res.status(201).json(newEvent);
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      'INSERT INTO events (name, category, description, event_date, image) VALUES (?, ?, ?, ?, ?)',
      [name, category, description, event_date, image]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: 'Server Error creating event' });
  }
};
