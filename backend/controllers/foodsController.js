// Foods REST API Controller (Assignments 14 & 15)
const db = require('../config/db');

exports.getAllFoods = async (req, res) => {
  try {
    if (db.isMock()) {
      return res.json(db.mockDb.food);
    }
    const pool = db.getPool();
    const [rows] = await pool.query('SELECT * FROM food ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server Error fetching food' });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { name, category, description, popularity_indicator, image } = req.body;
    if (db.isMock()) {
      const newFood = { id: db.mockDb.food.length + 1, name, category, description, popularity_indicator, image };
      db.mockDb.food.unshift(newFood);
      return res.status(201).json(newFood);
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      'INSERT INTO food (name, category, description, popularity_indicator, image) VALUES (?, ?, ?, ?, ?)',
      [name, category, description, popularity_indicator || 'Local Specialty', image]
    );
    res.status(201).json({ id: result.insertId, name, category });
  } catch (error) {
    res.status(500).json({ error: 'Server Error creating food item' });
  }
};
