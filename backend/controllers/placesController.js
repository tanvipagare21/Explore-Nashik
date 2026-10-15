// Places REST API Controller (Assignments 14 & 15)
const db = require('../config/db');

exports.getAllPlaces = async (req, res) => {
  try {
    if (db.isMock()) {
      return res.json(db.mockDb.places);
    }
    const pool = db.getPool();
    const [rows] = await pool.query('SELECT * FROM places ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server Error fetching places' });
  }
};

exports.getPlaceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db.isMock()) {
      const place = db.mockDb.places.find(p => p.id === id);
      if (!place) return res.status(404).json({ error: 'Place not found' });
      return res.json(place);
    }
    const pool = db.getPool();
    const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Place not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server Error fetching place' });
  }
};

exports.createPlace = async (req, res) => {
  try {
    const { name, category, short_description, full_description, historical_significance, nearby_landmarks, location, image, is_hidden_gem } = req.body;
    if (!name || !category || !short_description || !location) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    if (db.isMock()) {
      const newPlace = {
        id: db.mockDb.places.length + 1,
        name, category, short_description,
        full_description: full_description || short_description,
        historical_significance: historical_significance || '',
        nearby_landmarks: nearby_landmarks || '',
        location, image: image || 'https://s7ap1.scene7.com/is/image/incredibleindia/2-pandavleni-caves-nashik-maharashtra-attr-hero?qlt=82&ts=1726669929981',
        is_hidden_gem: is_hidden_gem ? 1 : 0
      };
      db.mockDb.places.unshift(newPlace);
      return res.status(201).json(newPlace);
    }

    const pool = db.getPool();
    const [result] = await pool.query(
      'INSERT INTO places (name, category, short_description, full_description, historical_significance, nearby_landmarks, location, image, is_hidden_gem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, short_description, full_description || short_description, historical_significance || '', nearby_landmarks || '', location, image, is_hidden_gem ? 1 : 0]
    );
    res.status(201).json({ id: result.insertId, name, category, message: 'Place created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error creating place' });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, category, short_description, full_description, location, image } = req.body;

    if (db.isMock()) {
      const index = db.mockDb.places.findIndex(p => p.id === id);
      if (index === -1) return res.status(404).json({ error: 'Place not found' });
      db.mockDb.places[index] = { ...db.mockDb.places[index], name, category, short_description, full_description, location, image };
      return res.json(db.mockDb.places[index]);
    }

    const pool = db.getPool();
    await pool.query(
      'UPDATE places SET name=?, category=?, short_description=?, full_description=?, location=?, image=? WHERE id=?',
      [name, category, short_description, full_description, location, image, id]
    );
    res.json({ message: 'Place updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error updating place' });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db.isMock()) {
      db.mockDb.places = db.mockDb.places.filter(p => p.id !== id);
      return res.json({ message: 'Place deleted successfully' });
    }

    const pool = db.getPool();
    await pool.query('DELETE FROM places WHERE id = ?', [id]);
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error deleting place' });
  }
};
