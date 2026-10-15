// PlaceCard Component (Assignment 5 & 9)
import React from 'react';
import { MapPin, Heart, ArrowRight } from 'lucide-react';

export default function PlaceCard({ place, isFavorite, onToggleFavorite, onViewDetails }) {
  return (
    <div className="place-card">
      <div className="place-card-image-wrapper">
        <img
          src={place.image}
          alt={place.name}
          className="place-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <span className="place-category-badge">{place.category}</span>
        <button
          className={`favorite-btn-overlay ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(place.id);
          }}
          aria-label="Favorite toggle"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart style={{ width: 20, height: 20, fill: isFavorite ? '#E53E3E' : 'none' }} />
        </button>
      </div>

      <div className="place-card-body">
        <h3 className="place-card-title">{place.name}</h3>
        <div className="place-card-location">
          <MapPin style={{ width: 14, height: 14 }} />
          <span>{place.location}</span>
        </div>
        <p className="place-card-desc">{place.short_description}</p>

        <div className="place-card-footer">
          <button
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => onViewDetails(place)}
          >
            View Details <ArrowRight style={{ width: 14, height: 14 }} />
          </button>

          <span
            onClick={() => onToggleFavorite(place.id)}
            style={{ fontSize: '0.8rem', fontWeight: 600, color: isFavorite ? '#E53E3E' : '#718096', cursor: 'pointer' }}
          >
            {isFavorite ? '♥ Saved' : '♡ Save'}
          </span>
        </div>
      </div>
    </div>
  );
}
