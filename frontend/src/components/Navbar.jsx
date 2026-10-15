// Navbar Component - Premium Floating Navigation (Assignments 2, 4, 5)
import React, { useState, useEffect } from 'react';
import {
  Compass,
  Home,
  MapPin,
  Sparkles,
  BookOpen,
  Utensils,
  Calendar,
  Bookmark,
  Heart,
  Menu,
  X,
  Info
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, favoriteIdsCount, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar-floating-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-floating-card">
        {/* LEFT: Branding with click-to-home */}
        <div
          className="nav-brand"
          onClick={() => handleNavClick('home')}
          title="Return to Home screen"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
        >
          <div className="brand-icon-wrapper">
            <Compass className="brand-compass-icon" size={22} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">
              <span className="brand-explore">Explore</span>
              <span className="brand-nashik">Nashik</span>
            </div>
            <span className="brand-tagline">DISCOVER • EXPERIENCE • BELONG</span>
          </div>
        </div>

        {/* CENTER: Categorized Navigation Hierarchy */}
        <nav className="nav-groups-container" aria-label="Main Navigation">
          {/* GROUP 1: DISCOVER */}
          <div className="nav-category-group">
            <span className="nav-category-tag">DISCOVER</span>
            <div className="nav-items-cluster">
              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <Home className="nav-item-icon" size={14} />
                <span>Home</span>
              </button>

              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'places' ? 'active' : ''}`}
                onClick={() => handleNavClick('places')}
              >
                <MapPin className="nav-item-icon" size={14} />
                <span>Places</span>
              </button>

              <button
                type="button"
                className={`nav-pill-item nav-pill-special ${activeTab === 'hidden' ? 'active' : ''}`}
                onClick={() => handleNavClick('hidden')}
              >
                <Sparkles className="nav-item-icon sparkle-accent" size={14} />
                <span>Hidden Gems</span>
              </button>
            </div>
          </div>

          <div className="nav-group-divider" aria-hidden="true" />

          {/* GROUP 2: EXPERIENCE */}
          <div className="nav-category-group">
            <span className="nav-category-tag">EXPERIENCE</span>
            <div className="nav-items-cluster">
              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'stories' ? 'active' : ''}`}
                onClick={() => handleNavClick('stories')}
              >
                <BookOpen className="nav-item-icon" size={14} />
                <span>Stories</span>
              </button>

              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'food' ? 'active' : ''}`}
                onClick={() => handleNavClick('food')}
              >
                <Utensils className="nav-item-icon" size={14} />
                <span>Taste of Nashik</span>
              </button>

              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => handleNavClick('events')}
              >
                <Calendar className="nav-item-icon" size={14} />
                <span>Culture & Events</span>
              </button>
            </div>
          </div>

          <div className="nav-group-divider" aria-hidden="true" />

          {/* GROUP 3: MY NASHIK */}
          <div className="nav-category-group">
            <span className="nav-category-tag">MY NASHIK</span>
            <div className="nav-items-cluster">
              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'discoveries' ? 'active' : ''}`}
                onClick={() => handleNavClick('discoveries')}
              >
                <Bookmark className="nav-item-icon" size={14} />
                <span>My Discoveries</span>
              </button>

              <button
                type="button"
                className={`nav-pill-item ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                <Info className="nav-item-icon" size={14} />
                <span>About</span>
              </button>
            </div>
          </div>
        </nav>

        {/* RIGHT: Utilities & Favorites (No PHP Button as requested) */}
        <div className="nav-utilities-zone">
          {/* Refined Circular Favorites Button */}
          <button
            type="button"
            className={`nav-circle-favorite-btn ${favoriteIdsCount > 0 ? 'has-favorites' : ''} ${activeTab === 'discoveries' ? 'is-active-tab' : ''}`}
            onClick={() => handleNavClick('discoveries')}
            title="View Saved Discoveries & Favorites"
            aria-label="View Favorites"
          >
            <Heart
              className="fav-heart-icon"
              size={17}
              fill={favoriteIdsCount > 0 ? 'var(--color-accent)' : 'none'}
              color={favoriteIdsCount > 0 ? 'var(--color-accent)' : 'var(--color-text-muted)'}
            />
            {favoriteIdsCount > 0 && (
              <span className="fav-pill-badge">{favoriteIdsCount}</span>
            )}
          </button>



          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-title" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
                <span className="brand-explore">Explore</span>
                <span className="brand-nashik">Nashik</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-content">
              {/* DISCOVER */}
              <div className="mobile-nav-block">
                <span className="mobile-section-label">DISCOVER</span>
                <div className="mobile-nav-list">
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavClick('home')}
                  >
                    <Home size={16} />
                    <span>Home</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'places' ? 'active' : ''}`}
                    onClick={() => handleNavClick('places')}
                  >
                    <MapPin size={16} />
                    <span>Places</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-nav-link mobile-nav-special ${activeTab === 'hidden' ? 'active' : ''}`}
                    onClick={() => handleNavClick('hidden')}
                  >
                    <Sparkles size={16} />
                    <span>Hidden Gems</span>
                  </button>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="mobile-nav-block">
                <span className="mobile-section-label">EXPERIENCE</span>
                <div className="mobile-nav-list">
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'stories' ? 'active' : ''}`}
                    onClick={() => handleNavClick('stories')}
                  >
                    <BookOpen size={16} />
                    <span>Stories</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'food' ? 'active' : ''}`}
                    onClick={() => handleNavClick('food')}
                  >
                    <Utensils size={16} />
                    <span>Taste of Nashik</span>
                  </button>
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'events' ? 'active' : ''}`}
                    onClick={() => handleNavClick('events')}
                  >
                    <Calendar size={16} />
                    <span>Culture & Events</span>
                  </button>
                </div>
              </div>

              {/* MY NASHIK */}
              <div className="mobile-nav-block">
                <span className="mobile-section-label">MY NASHIK</span>
                <div className="mobile-nav-list">
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'discoveries' ? 'active' : ''}`}
                    onClick={() => handleNavClick('discoveries')}
                  >
                    <Bookmark size={16} />
                    <span>My Discoveries</span>
                    {favoriteIdsCount > 0 && (
                      <span className="mobile-badge-count">{favoriteIdsCount}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    className={`mobile-nav-link ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => handleNavClick('about')}
                  >
                    <Info size={16} />
                    <span>About</span>
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
    </header>
  );
}
