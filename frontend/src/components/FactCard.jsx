// FactCard Component - Interactive "Did You Know?" (Assignment 9, 12)
import React, { useState } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { nashikFacts } from '../data/factsData';

export default function FactCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nashikFacts.length);
  };

  const currentFact = nashikFacts[currentIndex];

  return (
    <div className="fact-card-interactive">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: 'var(--color-gold-tint)',
            padding: 10,
            borderRadius: '50%',
            color: 'var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lightbulb size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-primary)' }}>Did You Know?</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '0.5px' }}>
              HERITAGE FACT #{currentIndex + 1} OF {nashikFacts.length}
            </span>
          </div>
        </div>
        <span style={{
          background: 'var(--color-primary-tint)',
          color: 'var(--color-primary)',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 12px',
          border: '1px solid rgba(23, 63, 53, 0.15)',
          borderRadius: 'var(--radius-pill)'
        }}>
          {currentFact.category}
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.35rem',
        lineHeight: 1.6,
        color: 'var(--color-text-dark)',
        margin: '0 0 24px 0',
        fontStyle: 'italic',
        fontWeight: 500
      }}>
        "{currentFact.fact}"
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 20 }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Explore trivia about Nashik's heritage
        </span>
        <button className="btn btn-primary" onClick={handleNextFact} style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
          <span>Next Fact</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
