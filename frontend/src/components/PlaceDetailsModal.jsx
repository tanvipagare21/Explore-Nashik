// PlaceDetailsModal Component (Assignment 5 & 10)
import React, { useEffect } from 'react';
import { X, MapPin, Heart, Landmark, Navigation } from 'lucide-react';

export default function PlaceDetailsModal({ place, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!place) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close Modal">
          <X style={{ width: 20, height: 20, color: '#2D3748' }} />
        </button>

        <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
          <img
            src={place.image}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <span className="place-category-badge" style={{ top: 20, left: 20 }}>{place.category}</span>
        </div>

        <div style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: 0 }}>{place.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-terracotta)', fontWeight: 600, marginTop: 4 }}>
                <MapPin style={{ width: 16, height: 16 }} />
                <span>{place.location}</span>
              </div>
            </div>

            <button
              className={`btn ${isFavorite ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => onToggleFavorite(place.id)}
            >
              <Heart style={{ width: 18, height: 18, fill: isFavorite ? 'white' : 'none' }} />
              {isFavorite ? 'Saved to Discoveries' : 'Add to Favorites'}
            </button>
          </div>

          <div style={{ margin: '24px 0', lineHeight: 1.7, color: '#4A5568', fontSize: '1.05rem' }}>
            <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: 8 }}>About this Discovery</h4>
            <p>{place.full_description || place.short_description}</p>
          </div>

          {place.historical_significance && (
            <div style={{ background: '#FAF7F2', borderLeft: '4px solid var(--color-gold)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 700, marginBottom: 4 }}>
                <Landmark style={{ width: 18, height: 18, color: 'var(--color-terracotta)' }} />
                <span>Historical & Cultural Significance</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#2D3748' }}>{place.historical_significance}</p>
            </div>
          )}

          {place.nearby_landmarks && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#718096', fontSize: '0.9rem', paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
              <Navigation style={{ width: 16, height: 16, color: 'var(--color-terracotta)' }} />
              <span><strong>Nearby Attractions:</strong> {place.nearby_landmarks}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
