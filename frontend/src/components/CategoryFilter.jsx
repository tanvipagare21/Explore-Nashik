// Category Filter Component (Assignment 6 & 9)
import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-container">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
