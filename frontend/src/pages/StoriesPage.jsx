// StoriesPage Component (Assignments 8 & 9)
import React from 'react';
import { initialStories } from '../data/storiesData';

export default function StoriesPage() {
  return (
    <div className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">CHRONICLES & MYTHOLOGY</span>
          <h2 className="section-title">Nashik Stories</h2>
          <p className="section-description">Read about the ancient legends, epic Ramayana history, and grape farming pioneers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {initialStories.map((story) => (
            <div key={story.id} className="place-card">
              <div className="place-card-image-wrapper">
                <img
                  src={story.image}
                  alt={story.title}
                  className="place-card-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Ramkund_Nashik.jpg';
                  }}
                />
                <span className="place-category-badge">{story.category}</span>
              </div>
              <div className="place-card-body">
                <h3 className="place-card-title">{story.title}</h3>
                <p className="place-card-desc">{story.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
