// App.jsx - Main Explore Nashik React Single Page Application (Assignments 8 & 9)
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlaceDetailsModal from './components/PlaceDetailsModal';
import Loading from './components/Loading';

import Home from './pages/Home';
import PlacesPage from './pages/PlacesPage';
import HiddenGemsPage from './pages/HiddenGemsPage';
import StoriesPage from './pages/StoriesPage';
import FoodPage from './pages/FoodPage';
import EventsPage from './pages/EventsPage';
import MyDiscoveriesPage from './pages/MyDiscoveriesPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import { ArrowUp } from 'lucide-react';

import { fetchPlaces, fetchFoods, fetchEvents } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [places, setPlaces] = useState([]);
  const [foods, setFoods] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlaceModal, setSelectedPlaceModal] = useState(null);

  // Favorites state persisted in localStorage (Assignment 11)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('explore_nashik_favorites');
      return saved ? JSON.parse(saved) : [1, 5, 6]; // Default seed favorites (Pandavleni, Anjaneri, Coin Museum)
    } catch (e) {
      return [1, 5, 6];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('explore_nashik_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Could not save favorites to localStorage');
    }
  }, [favorites]);

  // Fetch initial data on component mount (Assignment 9 & 10)
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      try {
        const [pData, fData, eData] = await Promise.all([
          fetchPlaces(),
          fetchFoods(),
          fetchEvents()
        ]);
        setPlaces(pData);
        setFoods(fData);
        setEvents(eData);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const handleToggleFavorite = (placeId) => {
    setFavorites(prev =>
      prev.includes(placeId) ? prev.filter(id => id !== placeId) : [...prev, placeId]
    );
  };

  const handleViewDetails = (place) => {
    setSelectedPlaceModal(place);
  };

  const renderActivePage = () => {
    if (loading) return <Loading />;

    switch (activeTab) {
      case 'home':
        return (
          <Home
            places={places}
            foods={foods}
            events={events}
            favorites={favorites}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            onNavigateTab={setActiveTab}
          />
        );
      case 'places':
        return (
          <PlacesPage
            places={places}
            favorites={favorites}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
          />
        );
      case 'hidden':
        return <HiddenGemsPage places={places} onViewDetails={handleViewDetails} />;
      case 'stories':
        return <StoriesPage />;
      case 'food':
        return <FoodPage foods={foods} />;
      case 'events':
        return <EventsPage events={events} />;
      case 'discoveries':
        return (
          <MyDiscoveriesPage
            places={places}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            onNavigateTab={setActiveTab}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return null;
    }
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteIdsCount={favorites.length}
      />

      <main style={{ flex: 1 }}>
        {renderActivePage()}
      </main>

      <Footer onNavClick={setActiveTab} />
 
      {/* Floating Back to Top & Home Button */}
      {showScrollTop && (
        <button
          type="button"
          className="back-to-top-btn"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Back to Top / Home Screen"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={22} />
        </button>
      )}

      {/* Place Details Modal (Assignment 5) */}
      <PlaceDetailsModal
        place={selectedPlaceModal}
        onClose={() => setSelectedPlaceModal(null)}
        isFavorite={selectedPlaceModal ? favorites.includes(selectedPlaceModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
