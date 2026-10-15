// HiddenGemsPage Component (Assignments 8 & 9)
import React from 'react';
import HiddenGems from '../components/HiddenGems';

export default function HiddenGemsPage({ places, onViewDetails }) {
  const hiddenPlaces = places.filter(p => p.is_hidden_gem === 1 || p.category === 'Hidden Gems');

  return (
    <div style={{ paddingTop: 40 }}>
      <HiddenGems hiddenPlaces={hiddenPlaces} onViewDetails={onViewDetails} />
    </div>
  );
}
