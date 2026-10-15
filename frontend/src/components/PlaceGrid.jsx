// PlaceGrid Component (Assignment 4 & 9)
import React from 'react';
import PlaceCard from './PlaceCard';
import { SearchX } from 'lucide-react';

export default function PlaceGrid({ places, favorites, onToggleFavorite, onViewDetails }) {
  if (!places || places.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 16, border: '1px dashed #CBD5E0' }}>
        <SearchX style={{ width: 48, height: 48, color: '#A0AEC0', marginBottom: 16 }} />
        <h3 style={{ color: '#2D3748', fontSize: '1.4rem', marginBottom: 8 }}>No Places Found</h3>
        <p style={{ color: '#718096' }}>Try searching with a different keyword or selecting 'All' categories.</p>
      </div>
    );
  }

  return (
    <div className="places-grid">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          isFavorite={favorites.includes(place.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
