// FoodPage Component (Assignments 8 & 9)
import React from 'react';
import FoodCard from '../components/FoodCard';

export default function FoodPage({ foods }) {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">LOCAL GASTRONOMY</span>
          <h2 className="section-title">Taste of Nashik</h2>
          <p className="section-description">Discover famous local delicacies like Misal Pav, Sabudana Vada, Kondaji Chivda, and Solkadhi.</p>
        </div>

        <div className="food-grid">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
}
