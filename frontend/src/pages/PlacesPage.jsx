// PlacesPage Component (Assignments 8 & 9)
import React from 'react';
import CategoryFilter from '../components/CategoryFilter';
import PlaceGrid from '../components/PlaceGrid';

export default function PlacesPage({ places, favorites, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onToggleFavorite, onViewDetails }) {
  const categories = ['All', 'Historical', 'Religious', 'Nature', 'Heritage', 'Adventure', 'Cultural', 'Hidden Gems'];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = searchQuery.trim() === '' ||
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">EXPLORE ALL DISCOVERIES</span>
          <h2 className="section-title">Places of Nashik</h2>
          <p className="section-description">Filter across historical caves, sacred temples, natural waterfalls, and wine heritage spots.</p>
        </div>

        <div style={{ maxWidth: 540, margin: '0 auto 32px auto' }}>
          <input
            type="text"
            placeholder="Search places by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: 30, border: '1px solid #CBD5E0', fontSize: '1rem', background: 'white' }}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <PlaceGrid
          places={filteredPlaces}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
}
