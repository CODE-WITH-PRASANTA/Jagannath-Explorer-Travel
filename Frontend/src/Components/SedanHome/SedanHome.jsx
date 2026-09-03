import React, { useEffect, useRef, useState } from 'react';
import './SedanHome.css';

/**
 * RoadPerspective
 * Compact, high-speed 4D highway with continuous vector cars
 * scaling dynamically from the glowing horizon.
 */
const RoadPerspective = () => {
  const laneLines = Array.from({ length: 7 });
  const streaks = Array.from({ length: 6 });
  const cars = Array.from({ length: 4 }); // Multiple cars traveling down lanes

  return (
    <div className="road" aria-hidden="true">
      <div className="road__horizon-glow" />
      
      {/* 3D Perspective Grid Floor */}
      <div className="road__grid-floor" />

      <svg
        className="road__lanes"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        {laneLines.map((_, i) => {
          const spread = (i - 3) * 90;
          return (
            <line
              key={i}
              x1="500"
              y1="180"
              x2={500 + spread}
              y2="500"
              className="road__lane-line"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          );
        })}
      </svg>

      {/* Cruising 4D Vector Cars */}
      {cars.map((_, i) => (
        <div
          key={i}
          className={`road__car road__car--lane-${i % 3}`}
          style={{
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${2.8 + (i * 0.4)}s`,
          }}
        >
          <div className="car__body">
            <div className="car__roof" />
            <div className="car__headlights" />
            <div className="car__taillights" />
            <div className="car__glow" />
          </div>
        </div>
      ))}

      {/* Ambient Speed Streaks */}
      {streaks.map((_, i) => (
        <span
          key={i}
          className={`road__streak road__streak--${i % 2 === 0 ? 'warm' : 'cool'}`}
          style={{
            top: `${20 + i * 11}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${2.4 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Breadcrumb
 * Compact, sleek accessible breadcrumb trail.
 */
const Breadcrumb = ({ trail }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li className="breadcrumb__item" key={item.label}>
              {isLast ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className="breadcrumb__link" href={item.href}>
                  {item.label}
                </a>
              )}
              {!isLast && (
                <svg
                  className="breadcrumb__sep"
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
};

/**
 * SedanHome
 * Streamlined compact banner with active animated vehicles.
 */
const SedanHome = ({
  title = 'Sedan Car',
  subtitle = 'Comfortable rides for the city and beyond',
  trail = [{ label: 'Home', href: '/' }, { label: 'Sedan Car', href: '#' }],
}) => {
  const stageRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    let frame = null;

    const handleMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--tiltX', (y * -6).toFixed(2));
        stage.style.setProperty('--tiltY', (x * 8).toFixed(2));
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
      className={`sedan-hero${loaded ? ' sedan-hero--loaded' : ''}`}
      ref={stageRef}
    >
      <RoadPerspective />
      <div className="sedan-hero__vignette" aria-hidden="true" />

      <div className="sedan-hero__stage">
        <div className="sedan-hero__content">
          <h1 className="sedan-hero__title">
            <span className="sedan-hero__title-shine">{title}</span>
          </h1>
          <p className="sedan-hero__subtitle">{subtitle}</p>

          <div className="sedan-hero__breadcrumb-wrap">
            <Breadcrumb trail={trail} />
          </div>
        </div>
      </div>

      <div className="sedan-hero__floor" aria-hidden="true" />
    </section>
  );
};

export default SedanHome;