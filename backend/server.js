// Node.js & Express REST API Server (Assignments 14 & 15)
const express = require('express');
const cors = require('cors');

const placesRoutes = require('./routes/placesRoutes');
const foodsRoutes = require('./routes/foodsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (Assignment 15)
app.use('/api/places', placesRoutes);
app.use('/api/foods', foodsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Live Weather Proxy Route (Assignment 10 & 15)
app.get('/api/weather', async (req, res) => {
  try {
    // Nashik coordinates: Lat 20.0059, Lon 73.7898
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=20.0059&longitude=73.7898&current_weather=true';
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('Weather API error');
    const data = await response.json();
    res.json({
      location: 'Nashik, Maharashtra',
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
      weathercode: data.current_weather.weathercode,
      condition: data.current_weather.weathercode <= 3 ? 'Clear / Partly Cloudy' : 'Humid / Monsoon Breezes'
    });
  } catch (error) {
    // Fallback live weather object if offline
    res.json({
      location: 'Nashik, Maharashtra',
      temperature: 28.5,
      windspeed: 12.4,
      weathercode: 1,
      condition: 'Pleasant & Warm (Live Fallback)'
    });
  }
});

const db = require('./config/db');

// Root API Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Explore Nashik REST API Server Running',
    version: '1.0.0',
    endpoints: [
      '/api/places',
      '/api/foods',
      '/api/events',
      '/api/feedback',
      '/api/weather',
      '/admin/feedback'
    ]
  });
});

// Method 2: Beautiful Web Table for User Feedback & Responses
app.get(['/admin/feedback', '/feedback'], async (req, res) => {
  let list = [];
  try {
    if (db.isMock()) {
      if (req.query.delete_id) {
        const delId = parseInt(req.query.delete_id);
        db.mockDb.feedback = db.mockDb.feedback.filter(f => f.id !== delId);
        return res.redirect('/admin/feedback');
      }
      list = db.mockDb.feedback;
    } else {
      const pool = db.getPool();
      if (req.query.delete_id) {
        await pool.query('DELETE FROM feedback WHERE id = ?', [req.query.delete_id]);
        return res.redirect('/admin/feedback');
      }
      const [rows] = await pool.query('SELECT * FROM feedback ORDER BY id DESC');
      list = rows;
    }
  } catch (err) {
    list = db.mockDb.feedback || [];
  }

  const rowsHtml = list.length === 0
    ? '<tr><td colspan="8" style="text-align:center; padding: 30px; color: #718096;">No user feedback submitted yet.</td></tr>'
    : list.map(item => `
      <tr>
        <td style="font-weight:700; color: #718096;">#${item.id}</td>
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td><a href="mailto:${escapeHtml(item.email)}" style="color: #D9531E; text-decoration: none;">${escapeHtml(item.email)}</a></td>
        <td><span style="background: #FFF5F2; color: #D9531E; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 999px; border: 1px solid #FFD6C9;">${escapeHtml(item.favorite_place || 'N/A')}</span></td>
        <td style="color: #D4A359; font-weight: 700; font-size: 1.05rem;">${'★'.repeat(Number(item.rating) || 5)} <span style="font-size: 0.8rem; color: #718096;">(${item.rating || 5}/5)</span></td>
        <td style="max-width: 320px; line-height: 1.5; color: #2D3748;">${escapeHtml(item.message)}</td>
        <td style="font-size: 0.85rem; color: #718096;">${item.submitted_at || item.created_at || 'Recently'}</td>
        <td><a href="/admin/feedback?delete_id=${item.id}" style="background: #FFF5F5; color: #E53E3E; border: 1px solid #FEB2B2; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600;" onclick="return confirm('Delete this response?');">Delete</a></td>
      </tr>
    `).join('');

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Responses & Feedback - Explore Nashik</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #FAF7F2; color: #2D3748; padding: 30px 20px; }
    .container { max-width: 1100px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
    .title-block h1 { font-size: 1.8rem; color: #1C3D2F; margin-bottom: 4px; }
    .title-block p { color: #718096; font-size: 0.95rem; }
    .badge { background: #D9531E; color: white; padding: 6px 14px; border-radius: 999px; font-weight: 700; font-size: 0.85rem; }
    .card { background: white; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #E2E8F0; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: #F7FAFC; padding: 14px 18px; font-size: 0.8rem; text-transform: uppercase; color: #4A5568; letter-spacing: 0.5px; border-bottom: 2px solid #E2E8F0; }
    td { padding: 16px 18px; border-bottom: 1px solid #EDF2F7; vertical-align: middle; }
    tr:hover { background: #FFFDF9; }
    .actions { margin-top: 20px; display: flex; gap: 12px; }
    .btn { display: inline-block; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; }
    .btn-primary { background: #D9531E; color: white; }
    .btn-outline { background: white; border: 1px solid #CBD5E0; color: #4A5568; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title-block">
        <h1>User Responses & Feedback</h1>
        <p>Real-time discovery submissions from the Explore Nashik web platform.</p>
      </div>
      <div>
        <span class="badge">${list.length} Total Submissions</span>
      </div>
    </div>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Favorite Place</th>
            <th>Rating</th>
            <th>Message / Story</th>
            <th>Submitted On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
    <div class="actions">
      <a href="http://localhost:3000" class="btn btn-primary">← Back to Explore Nashik App</a>
      <a href="/api/feedback" target="_blank" class="btn btn-outline">{ } Raw JSON API</a>
    </div>
  </div>
</body>
</html>`);
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const DEFAULT_PORT = process.env.PORT || 5000;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\n🚀 Explore Nashik REST API Server is running on: http://localhost:${port}`);
    console.log(`👉 Test API in browser: http://localhost:${port}/api/places\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port == 5000) {
      console.log(`\n⚠️ Port 5000 is occupied (macOS AirPlay Receiver).`);
      console.log(`🔄 Automatically switching to port 5001...`);
      startServer(5001);
    } else {
      console.error(`\n❌ Failed to start server on port ${port}:`, err.message);
    }
  });
}

startServer(DEFAULT_PORT);
