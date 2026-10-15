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
      '/api/weather'
    ]
  });
});

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
