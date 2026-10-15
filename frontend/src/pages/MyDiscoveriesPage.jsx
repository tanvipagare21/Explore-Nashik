// MyDiscoveriesPage Component (Assignment 9, 11)
import React from 'react';
import PlaceGrid from '../components/PlaceGrid';
import { Heart } from 'lucide-react';

export default function MyDiscoveriesPage({ places, favorites, onToggleFavorite, onViewDetails, onNavigateTab }) {
  const favoritePlaces = places.filter(place => favorites.includes(place.id));

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">YOUR SAVED PLACES</span>
          <h2 className="section-title">My Discoveries</h2>
          <p className="section-description">Your personalized collection of bookmarked places across Nashik.</p>
        </div>

        {favoritePlaces.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 16, border: '1px dashed #CBD5E0' }}>
            <Heart style={{ width: 48, height: 48, color: '#A0AEC0', marginBottom: 16 }} />
            <h3 style={{ color: '#2D3748', fontSize: '1.4rem', marginBottom: 8 }}>No Saved Discoveries Yet</h3>
            <p style={{ color: '#718096', marginBottom: 20 }}>Click the heart icon on any place card to bookmark your favorite locations.</p>
            <button className="btn btn-primary" onClick={() => onNavigateTab('places')}>
              Browse Places
            </button>
          </div>
        ) : (
          <PlaceGrid
            places={favoritePlaces}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
          />
        )}
      </div>
    </div>
  );
}
