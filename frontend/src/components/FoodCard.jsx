// FoodCard Component (Assignment 4, 9)
import React from 'react';
import { Utensils, Star } from 'lucide-react';

export default function FoodCard({ food }) {
  return (
    <div className="place-card">
      <div className="place-card-image-wrapper">
        <img
          src={food.image}
          alt={food.name}
          className="place-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <span className="place-category-badge" style={{ background: 'var(--color-primary)' }}>{food.category}</span>
      </div>
      <div className="place-card-body">
        <h3 className="place-card-title">{food.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: 10 }}>
          <Star style={{ width: 14, height: 14, fill: '#D4A359', color: '#D4A359' }} />
          <span>{food.popularity_indicator || 'Local Favorite'}</span>
        </div>
        <p className="place-card-desc">{food.description}</p>
      </div>
    </div>
  );
}
