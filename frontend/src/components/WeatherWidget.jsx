// WeatherWidget Component (Assignment 10)
import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Thermometer, RefreshCw, AlertTriangle } from 'lucide-react';
import { fetchNashikWeather } from '../services/weatherApi';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNashikWeather();
      setWeather(data);
    } catch (err) {
      setError('Unable to fetch live weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-widget-card" style={{ justifyContent: 'center', opacity: 0.8 }}>
        <RefreshCw className="animate-spin" style={{ width: 24, height: 24 }} />
        <span>Fetching live meteorological data for Nashik...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-widget-card" style={{ background: '#742A2A' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle style={{ width: 24, height: 24, color: '#FEB2B2' }} />
          <span>{error || 'Weather unavailable'}</span>
        </div>
        <button className="btn btn-secondary" onClick={loadWeather} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="weather-widget-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: 14, borderRadius: '50%' }}>
          <CloudSun style={{ width: 36, height: 36, color: '#F6AD55' }} />
        </div>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, opacity: 0.85, fontWeight: 700 }}>
            Live Nashik Data
          </span>
          <h3 style={{ color: 'white', margin: '2px 0 0 0', fontSize: '1.4rem' }}>{weather.location}</h3>
          <span style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>{weather.condition}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Thermometer style={{ width: 20, height: 20, color: '#F6AD55' }} />
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.8 }}>TEMPERATURE</span>
            <strong style={{ fontSize: '1.4rem' }}>{weather.temperature}°C</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Wind style={{ width: 20, height: 20, color: '#81E6D9' }} />
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.8 }}>WIND SPEED</span>
            <strong style={{ fontSize: '1.4rem' }}>{weather.windspeed} km/h</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
