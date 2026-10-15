// Loading Component (Assignment 9)
import React from 'react';
import { Compass } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
      <Compass className="animate-spin" style={{ width: 44, height: 44, color: 'var(--color-terracotta)', marginBottom: 16 }} />
      <p style={{ color: '#718096', fontWeight: 600 }}>Loading Nashik Discoveries...</p>
    </div>
  );
}
