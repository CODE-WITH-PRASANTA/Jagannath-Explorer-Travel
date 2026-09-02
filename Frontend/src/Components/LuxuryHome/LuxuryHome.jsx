import React, { useEffect, useRef, useState } from 'react';
import './LuxuryHome.css';

/**
 * LuxuryHighwayPerspective
 * Signature immersive 4D highway backdrop tailored with gold and platinum 
 * streaks for luxury and wedding car showcases.
 */
const LuxuryHighwayPerspective = () => {
  const laneLines = Array.from({ length: 7 });
  const streaks = Array.from({ length: 6 });
  const vehicles = Array.from({ length: 3 });

  return (
    <div className="luxury-road" aria-hidden="true">
      <div className="luxury-road__horizon-glow" />
      <div className="luxury-road__grid-floor" />

      <svg className="luxury-road__lanes" viewBox="0 0 1000 500" preserveAspectRatio="none">
        {laneLines.map((_, i) => {
          const spread = (i - 3) * 90;
          return (
            <line
              key={i}
              x1="500"
              y1="180"
              x2={500 + spread}
              y2="500"
              className="luxury-road__lane-line"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          );
        })}
      </svg>

      {/* Cruising Luxury Sedan/SUV Silhouette Pack */}
      {vehicles.map((_, i) => (
        <div
          key={i}
          className={`luxury-road__car luxury-road__car--lane-${i}`}
          style={{
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${3.0 + i * 0.5}s`,
          }}
        >
          <div className="luxury-car__body">
            <div className="luxury-car__roof" />
            <div className="luxury-car__lights" />
            <div className="luxury-car__glow" />
          </div>
        </div>
      ))}

      {/* Ambient Gold & Platinum Light Streaks */}
      {streaks.map((_, i) => (
        <span
          key={i}
          className={`luxury-road__streak luxury-road__streak--${i % 2 === 0 ? 'gold' : 'platinum'}`}
          style={{
            top: `${18 + i * 11}%`,
            animationDelay: `${i * 0.75}s`,
            animationDuration: `${2.6 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * LuxuryBreadcrumb
 * Sleek, accessible breadcrumb navigation.
 */
const LuxuryBreadcrumb = ({ trail }) => (
  <nav className="luxury-breadcrumb" aria-label="Breadcrumb">
    <ol className="luxury-breadcrumb__list">
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <li className="luxury-breadcrumb__item" key={item.label}>
            {isLast ? (
              <span className="luxury-breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a className="luxury-breadcrumb__link" href={item.href}>
                {item.label}
              </a>
            )}
            {!isLast && (
              <svg
                className="luxury-breadcrumb__sep"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.5 3L10.5 8L5.5 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

/**
 * LuxuryHome
 * Immersive, compact 4D highway hero banner tailored for Luxury & Wedding Cars
 * based on the requested dark aesthetic.
 */
const LuxuryHome = ({
  title = 'Luxury & Wedding Cars',
  subtitle = 'Exquisite chauffeur-driven fleet for weddings, corporate galas, and VIP travel',
  trail = [{ label: 'Home', href: '/' }, { label: 'Luxury & Wedding Cars', href: '#' }],
}) => {
  const stageRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return undefined;

    let frame = null;

    const handleMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--tiltX', (y * -5).toFixed(2));
        stage.style.setProperty('--tiltY', (x * 7).toFixed(2));
      });
    };

    const handleLeave = () => {
      stage.style.setProperty('--tiltX', 0);
      stage.style.setProperty('--tiltY', 0);
    };

    stage.addEventListener('mousemove', handleMove);
    stage.addEventListener('mouseleave', handleLeave);
    return () => {
      stage.removeEventListener('mousemove', handleMove);
      stage.removeEventListener('mouseleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={`luxury-hero${loaded ? ' luxury-hero--loaded' : ''}`}
      ref={stageRef}
    >
      <LuxuryHighwayPerspective />
      <div className="luxury-hero__vignette" aria-hidden="true" />

      <div className="luxury-hero__stage">
        <div className="luxury-hero__content">
          <h1 className="luxury-hero__title">
            <span className="luxury-hero__title-shine">{title}</span>
          </h1>
          <p className="luxury-hero__subtitle">{subtitle}</p>

          <div className="luxury-hero__breadcrumb-wrap">
            <LuxuryBreadcrumb trail={trail} />
          </div>
        </div>
      </div>

      <div className="luxury-hero__floor" aria-hidden="true" />
    </section>
  );
};

export default LuxuryHome;