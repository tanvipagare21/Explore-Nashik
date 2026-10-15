// EventCard Component (Assignment 4, 9)
import React from 'react';
import { Calendar, Tag } from 'lucide-react';

export default function EventCard({ event }) {
  return (
    <div className="place-card">
      <div className="place-card-image-wrapper">
        <img
          src={event.image}
          alt={event.name}
          className="place-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <span className="place-category-badge" style={{ background: '#1C3D2F' }}>{event.category}</span>
      </div>
      <div className="place-card-body">
        <h3 className="place-card-title">{event.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-terracotta)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>
          <Calendar style={{ width: 14, height: 14 }} />
          <span>{event.event_date}</span>
        </div>
        <p className="place-card-desc">{event.description}</p>
      </div>
    </div>
  );
}
