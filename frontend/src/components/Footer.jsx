// Footer Component (Assignment 2)
import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';

export default function Footer({ onNavClick }) {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Compass style={{ color: 'var(--color-gold)', width: 28, height: 28 }} />
              <h3 style={{ color: 'white', margin: 0, fontSize: '1.4rem' }}>Explore Nashik</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 360 }}>
              An interactive digital discovery guide showcasing the rich history, sacred heritage, vineyard identity, hidden natural gems, and culinary culture of Nashik, Maharashtra.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-gold)', marginBottom: 16, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Explore Sections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => onNavClick('places')}>Famous Places</li>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => onNavClick('hidden')}>Hidden Gems</li>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => onNavClick('stories')}>Nashik Stories</li>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => onNavClick('food')}>Taste of Nashik</li>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => onNavClick('events')}>Culture & Events</li>
              <li style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.85)' }} onClick={() => {
                onNavClick('home');
                setTimeout(() => {
                  document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}>Share Feedback</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-gold)', marginBottom: 16, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Demonstrations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem' }}>
              <li>
                <a href="../vanilla-js/dom-demo.html" target="_blank" rel="noreferrer" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Assignment 11: Vanilla JS DOM <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="../php/login.php" target="_blank" rel="noreferrer" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Assignment 12 & 13: PHP Admin <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="http://localhost:5001/api/places" target="_blank" rel="noreferrer" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Assignment 14 & 15: Node REST API <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="http://localhost:5001/admin/feedback" target="_blank" rel="noreferrer" style={{ color: '#FBD38D', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  Feedback Responses Table <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-gold)', marginBottom: 16, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Course Project</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
              B.Tech Web Technology Course Project demonstrating integrated HTML5, CSS3, JavaScript ES6+, React SPA, REST APIs, PHP Sessions & MySQL Database.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Explore Nashik Platform. Built for Web Technology Course Viva & Academic Demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
