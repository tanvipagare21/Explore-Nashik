// Hero Component (Assignment 2, 4, 5)
import React from 'react';
import { Search, Compass, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onHiddenClick, searchQuery, setSearchQuery }) {
  return (
    <section className="hero-wrapper">
      <div className="hero-bg-overlay" />
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">
            <Sparkles style={{ width: 14, height: 14, display: 'inline', marginRight: 6 }} />
            Digital City Discovery Guide
          </span>
          <h1 className="hero-title">
            Discover Nashik Beyond the Obvious
          </h1>
          <p className="hero-subtitle">
            Explore the ancient caves, sacred riverfronts, wine heritage, hidden natural spots, culinary flavors, and rich living identity of Nashik, Maharashtra.
          </p>

          {/* Interactive Global Search Input */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search style={{ color: '#A0AEC0', marginRight: 12, width: 22, height: 22 }} />
              <input
                type="text"
                placeholder="Search places, food, history, hidden gems (e.g. Pandavleni, Misal, Anjaneri)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: '#EDF2F7', border: 'none', borderRadius: '50%', padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="hero-cta-group" style={{ marginTop: 32 }}>
            <button className="btn btn-primary" onClick={onExploreClick}>
              <Compass style={{ width: 18, height: 18 }} />
              Explore Places
            </button>
            <button className="btn btn-secondary" onClick={onHiddenClick}>
              <Sparkles style={{ width: 18, height: 18 }} />
              Discover Hidden Gems
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
