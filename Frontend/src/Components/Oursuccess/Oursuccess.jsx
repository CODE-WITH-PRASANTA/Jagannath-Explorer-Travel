import React from 'react';
import './Oursuccess.css';

const featuresData = [
  {
    id: 1,
    title: 'Odisha & Worldwide Tours',
    description: 'Bhubaneswar se lekar Puri, Konark aur international destinations tak seamless travel packages.',
    theme: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M12 3a14.5 14.5 0 0 0 0 18M12 3a14.5 14.5 0 0 1 0 18" />
        <path d="M18 6l2 2-4 1" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Affordable & Transparent Pricing',
    description: 'Bhubaneswar me sabse kifayati aur transparent rates, bina kisi hidden charges ke.',
    theme: 'orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7v8l9-12h-7z" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M7 10.5l3-3" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Instant Cab & Tour Booking',
    description: 'Airport transfers, outstation cabs aur holiday packages ke liye fast online booking support.',
    theme: 'yellow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 9h18" />
        <circle cx="8" cy="13" r="1" />
        <circle cx="12" cy="13" r="1" />
        <circle cx="16" cy="13" r="1" />
        <circle cx="8" cy="17" r="1" />
        <circle cx="12" cy="17" r="1" />
        <circle cx="16" cy="17" r="1" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Expert Local Guides',
    description: 'Odisha ke historical temples aur tourist attractions ke liye anubhavi local tour guides.',
    theme: 'lime',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
        <path d="M8 4h8M19 11v6M19 11l-3 2 3 2" />
      </svg>
    )
  },
  {
    id: 5,
    title: '24/7 Dedicated Support',
    description: 'Aapki poori yatra ke dauraan 24 ghante customer support aur roadside assistance.',
    theme: 'mint',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <polyline points="12 6 12 9 14 10" />
        <path d="M4 18c2.5 3 6.5 3 8 3 4 0 8-2.5 8-5.5-2 0-4-1-6-2.5" />
      </svg>
    )
  },
  {
    id: 6,
    title: 'Customizable Itineraries',
    description: 'Family trips, corporate tours aur solo travels ke hisab se customized travel plans.',
    theme: 'peach',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h10a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H4" />
        <path d="M7 4L4 7l3 3M7 14l-3 3 3 3" />
        <circle cx="18" cy="17" r="3" />
      </svg>
    )
  }
];

const Oursuccess = () => {
  // Local SEO Schema for Google Search
  const travelAgencySchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'TripRex - Best Travels and Tours Agency',
    description: 'Top-rated travel and tour agency in Bhubaneswar, Odisha offering car rentals, customized holiday packages, and temple tours across Puri, Konark, and Chilika.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhubaneswar',
      addressRegion: 'Odisha',
      addressCountry: 'IN'
    },
    areaServed: [
      { '@type': 'City', name: 'Bhubaneswar' },
      { '@type': 'City', name: 'Cuttack' },
      { '@type': 'City', name: 'Puri' },
      { '@type': 'AdministrativeArea', name: 'Odisha' }
    ],
    priceRange: '₹₹'
  };

  return (
    <section 
      className="oursuccess-section" 
      itemScope 
      itemType="https://schema.org/TravelAgency"
      aria-labelledby="section-main-heading"
    >
      {/* Schema Markup for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />

      {/* Decorative Background Graphics */}
      <div className="bg-anim-wrap" aria-hidden="true">
        <svg className="bg-trail-svg" viewBox="0 0 1440 600" fill="none">
          <path
            d="M-50 420 C 350 480, 500 280, 850 350 C 1150 400, 1300 210, 1500 240"
            stroke="#ecefe9"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>

        <div className="float-balloon">
          <svg viewBox="0 0 100 130" fill="none" stroke="#d5dbd0" strokeWidth="1.8">
            <ellipse cx="50" cy="50" rx="36" ry="44" />
            <path d="M30 18 C40 35, 40 65, 30 82" />
            <path d="M70 18 C60 35, 60 65, 70 82" />
            <line x1="50" y1="6" x2="50" y2="94" />
            <path d="M38 94 L42 110 M62 94 L58 110" />
            <rect x="42" y="110" width="16" height="12" rx="2" />
          </svg>
        </div>

        <div className="float-mountain">
          <svg viewBox="0 0 200 120" fill="none" stroke="#dbe2d6" strokeWidth="1.5">
            <polygon points="20,110 80,25 130,110" />
            <polygon points="90,110 145,45 190,110" />
            <polyline points="65,48 78,55 88,46" />
            <polyline points="130,65 142,72 153,63" />
          </svg>
        </div>
      </div>

      <div className="oursuccess-container">
        {/* SEO-Optimized Header */}
        <header className="oursuccess-header">
          <div className="oursuccess-badge">
            <span className="badge-arrow">➔</span>
            <span className="badge-text">Why We Are The Best</span>
            <span className="badge-sparkle">✦</span>
          </div>
          
          <h2 id="section-main-heading" className="oursuccess-title" itemProp="name">
            Best Travels and Tours Agency in Bhubaneswar, Odisha
          </h2>
          
          <p className="oursuccess-subtitle" itemProp="description">
            Odisha Tourism ke trusted partner. Ham pradan karte hain affordable cab service, custom holiday packages, aur Puri-Konark temple tours.
          </p>
        </header>

        {/* 3x2 Features Grid */}
        <div className="features-grid">
          {featuresData.map((item) => (
            <article 
              key={item.id} 
              className={`feature-card theme-${item.theme}`}
              itemScope 
              itemType="https://schema.org/Offer"
            >
              <div className="card-icon-bubble" aria-hidden="true">
                {item.icon}
              </div>
              <div className="card-text-content">
                <h3 className="card-heading" itemProp="itemOffered">{item.title}</h3>
                <p className="card-desc" itemProp="description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Oursuccess;