// HiddenGems Component (Assignment 4, 9)
import React from 'react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';

export default function HiddenGems({ hiddenPlaces, onViewDetails }) {
  return (
    <section className="hidden-gems-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle" style={{ color: 'var(--color-gold-light)' }}>
            <Sparkles style={{ width: 14, height: 14, display: 'inline', marginRight: 6 }} />
            Off the Beaten Path
          </span>
          <h2 className="section-title">Hidden Nashik Discoveries</h2>
          <p className="section-description" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Lesser-known viewpoints, quiet numismatic museums, ancient hills, and peaceful natural spots known mostly to locals.
          </p>
        </div>

        <div className="places-grid">
          {hiddenPlaces.map((place) => (
            <div key={place.id} className="hidden-gem-card place-card">
              <div className="place-card-image-wrapper">
                <img
                  src={place.image}
                  alt={place.name}
                  className="place-card-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <span className="place-category-badge" style={{ background: 'var(--color-terracotta)' }}>Hidden Gem</span>
              </div>
              <div className="place-card-body">
                <h3 className="place-card-title">{place.name}</h3>
                <div className="place-card-location" style={{ color: 'var(--color-gold)' }}>
                  <MapPin style={{ width: 14, height: 14 }} />
                  <span>{place.location}</span>
                </div>
                <p className="place-card-desc">{place.short_description}</p>
                <div className="place-card-footer" style={{ borderTopColor: 'rgba(255, 255, 255, 0.15)' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    onClick={() => onViewDetails(place)}
                  >
                    Discover Secret <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
