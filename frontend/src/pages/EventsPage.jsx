// EventsPage Component (Assignments 8 & 9)
import React from 'react';
import EventCard from '../components/EventCard';

export default function EventsPage({ events }) {
  return (
    <div className="section" style={{ background: '#FAF7F2' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">ANNUAL CELEBRATIONS</span>
          <h2 className="section-title">Nashik Culture & Events</h2>
          <p className="section-description">Spiritual Kumbh gatherings, sacred Ram Rath processions, and vineyard harvest festivals.</p>
        </div>

        <div className="events-grid">
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
}
