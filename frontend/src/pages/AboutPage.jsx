// AboutPage Component - City Discovery Platform Overview
import React from 'react';
import {
  Compass,
  Landmark,
  Wine,
  Utensils,
  Sparkles,
  Heart,
  CloudSun,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: <Landmark size={24} style={{ color: 'var(--color-primary)' }} />,
      title: 'Sacred Heritage & Antiquity',
      desc: 'Discover Ram Kund, Trimbakeshwar Jyotirlinga, and centuries-old temples steeped in mythology and the sacred Godavari river.'
    },
    {
      icon: <MapPin size={24} style={{ color: 'var(--color-terracotta)' }} />,
      title: 'Ancient Rock-Cut Architecture',
      desc: 'Explore the 24 Hinayana Buddhist Pandavleni Caves carved into Trirashmi Hill dating back over 2,000 years to the 1st century BCE.'
    },
    {
      icon: <Wine size={24} style={{ color: 'var(--color-accent)' }} />,
      title: 'Wine Capital of India',
      desc: 'Uncover Nashik’s microclimate and viticulture terroir that nurtured India’s premier vineyards, rolling estates, and winery trails.'
    },
    {
      icon: <Utensils size={24} style={{ color: 'var(--color-gold)' }} />,
      title: 'Authentic Local Gastronomy',
      desc: 'Taste the fiery authentic Nashik Misal Pav, crisp Sabudana Vada, and legendary street eateries cherished across generations.'
    },
    {
      icon: <Sparkles size={24} style={{ color: '#805AD5' }} />,
      title: 'Offbeat & Hidden Treasures',
      desc: 'Venture beyond the crowded tourist spots to discover secret trails, quiet monsoon waterfalls, and Asia’s unique Coin Museum.'
    },
    {
      icon: <CloudSun size={24} style={{ color: '#319795' }} />,
      title: 'Live Real-Time Insights',
      desc: 'Stay informed with live Nashik meteorological data, personalized discovery bookmarks, and rich historical story archives.'
    }
  ];

  return (
    <div className="section" style={{ background: '#FAF7F2', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-subtitle" style={{ letterSpacing: 2 }}>DISCOVER THE SOUL OF NASHIK</span>
          <h2 className="section-title" style={{ fontSize: '2.4rem', marginTop: 8 }}>About Explore Nashik</h2>
          <p className="section-description" style={{ maxWidth: 680, margin: '12px auto 0' }}>
            A curated digital discovery platform dedicated to uncovering the living culture, deep history, holy riverfronts, and hidden treasures of Nashik.
          </p>
        </div>

        {/* Mission Card */}
        <div
          style={{
            background: 'white',
            padding: '36px 32px',
            borderRadius: 20,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            border: '1px solid #EAE5D9',
            marginBottom: 44
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'rgba(217, 119, 6, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)'
              }}
            >
              <Compass size={22} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-primary)' }}>Our Vision & Purpose</h3>
          </div>
          <p style={{ lineHeight: 1.8, color: '#4A5568', fontSize: '1.02rem', margin: 0 }}>
            Nashik is much more than a typical transit city or weekend getaway. It is one of the world’s oldest continuously inhabited regions, where ancient epics intertwine with Buddhist rock sanctuaries, vibrant agricultural markets, and modern viticulture. <strong>Explore Nashik</strong> was crafted to bring you authentic stories, local culinary recommendations, and offbeat trails without the noise of travel packages or commercial booking engines.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ marginBottom: 44 }}>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: 24, textAlign: 'center' }}>
            What You Can Discover Here
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20
            }}
          >
            {pillars.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 24,
                  border: '1px solid #EAE5D9',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-primary)' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#718096', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Features Notice */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
            color: 'white',
            padding: '32px',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--color-gold)' }}>
              Curate Your Personal Experience
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', maxWidth: 600, lineHeight: 1.6 }}>
              Bookmark your favorite landmarks, discover lesser-known viewpoints with the <strong>Hidden Gems</strong> filter, and explore traditional culinary gems in the <strong>Taste of Nashik</strong> section.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-gold)' }}>
            <Heart size={20} fill="var(--color-gold)" />
            <span style={{ fontWeight: 600 }}>Save & Explore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
