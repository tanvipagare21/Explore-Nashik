// Home Page Component (Assignments 1, 2, 8, 9)
import React from 'react';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import PlaceGrid from '../components/PlaceGrid';
import HiddenGems from '../components/HiddenGems';
import FoodCard from '../components/FoodCard';
import EventCard from '../components/EventCard';
import FactCard from '../components/FactCard';
import WeatherWidget from '../components/WeatherWidget';
import FeedbackForm from '../components/FeedbackForm';
import { initialStories } from '../data/storiesData';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function Home({
  places,
  foods,
  events,
  favorites,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onToggleFavorite,
  onViewDetails,
  onNavigateTab
}) {
  const categories = ['All', 'Historical', 'Religious', 'Nature', 'Heritage', 'Adventure', 'Cultural', 'Hidden Gems'];

  // Global search filtering using Array methods (Assignment 6)
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = searchQuery.trim() === '' ||
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const hiddenPlaces = places.filter(p => p.is_hidden_gem === 1 || p.category === 'Hidden Gems');

  return (
    <div>
      {/* 2. Hero Section */}
      <Hero
        onExploreClick={() => onNavigateTab('places')}
        onHiddenClick={() => onNavigateTab('hidden')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 3. Short Nashik Introduction Section (Assignment 1 & 2) */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <span className="section-subtitle">WELCOME TO THE ANCIENT CITY</span>
            <h2 className="section-title">An Ancient Land on the Banks of Godavari</h2>
            <p style={{ fontSize: '1.15rem', color: '#4A5568', lineHeight: 1.8 }}>
              Nashik is one of Maharashtra's most historically rich and culturally vibrant cities. Situated on the banks of the sacred Godavari River and framed by the dramatic Western Ghats, Nashik blends 2,000-year-old Buddhist rock-cut architecture, Ramayana heritage, spiritual traditions, and India's finest grape vineyards into a unique living identity.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 40 }}>
              <div className="stat-box-card">
                <h3 style={{ fontSize: '2.4rem', color: 'var(--color-primary)', margin: 0 }}>2,000+</h3>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: 'var(--color-text-muted)' }}>Years of Rock-Cut History</p>
              </div>
              <div className="stat-box-card">
                <h3 style={{ fontSize: '2.4rem', color: 'var(--color-accent)', margin: 0 }}>#1</h3>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: 'var(--color-text-muted)' }}>Wine Capital of India</p>
              </div>
              <div className="stat-box-card">
                <h3 style={{ fontSize: '2.4rem', color: 'var(--color-gold)', margin: 0 }}>12 Yrs</h3>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: 'var(--color-text-muted)' }}>Kumbh Mela Periodicity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore by Category & 5. Famous Places Section */}
      <section className="section" id="places-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">DISCOVER PLACES</span>
            <h2 className="section-title">Explore Nashik Landmarks</h2>
            <p className="section-description">Filter across historical caves, sacred temples, natural waterfalls, and heritage vineyards.</p>
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
      </section>

      {/* 6. Hidden Nashik Section */}
      <HiddenGems hiddenPlaces={hiddenPlaces} onViewDetails={onViewDetails} />

      {/* 7. Nashik Stories Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">LOCAL CHRONICLES</span>
            <h2 className="section-title">Stories & Cultural Heritage</h2>
            <p className="section-description">Learn about the sagas, epics, and agricultural revolutions that shaped Nashik.</p>
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
      </section>

      {/* 8. Taste of Nashik Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">CULINARY DISCOVERIES</span>
            <h2 className="section-title">Taste of Nashik</h2>
            <p className="section-description">Discover the local misal pav, sabudana delicacies, and traditional snacks of the region.</p>
          </div>

          <div className="food-grid">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Culture & Events Section */}
      <section className="section" style={{ background: '#FAF7F2' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">FESTIVALS & CELEBRATIONS</span>
            <h2 className="section-title">Culture & Living Traditions</h2>
            <p className="section-description">Experience the Sinhastha Kumbh, Ram Rath Yatra, and grape harvest celebrations.</p>
          </div>

          <div className="events-grid">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Did You Know? Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <FactCard />
        </div>
      </section>

      {/* 11. Live Nashik Data / Weather */}
      <section className="section">
        <div className="container">
          <WeatherWidget />
        </div>
      </section>

      {/* 12. Feedback Form Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <FeedbackForm />
        </div>
      </section>
    </div>
  );
}
