import React, { useEffect, useRef, useState } from 'react';
import './SuvHome.css';

/* ---------------------------------------------------------------------------
   RoadPerspective
   Dynamic 4D perspective highway with crisp light streaks and grid lines.
--------------------------------------------------------------------------- */

const RoadPerspective = () => {
  const laneLines = Array.from({ length: 7 });
  const streaks = Array.from({ length: 6 });
  const cars = Array.from({ length: 3 });

  return (
    <div className="suv-road" aria-hidden="true">
      <div className="suv-road__horizon-glow" />
      <div className="suv-road__grid-floor" />

      <svg className="suv-road__lanes" viewBox="0 0 1000 500" preserveAspectRatio="none">
        {laneLines.map((_, i) => {
          const spread = (i - 3) * 90;
          return (
            <line
              key={i}
              x1="500"
              y1="180"
              x2={500 + spread}
              y2="500"
              className="suv-road__lane-line"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          );
        })}
      </svg>

      {/* Cruising 3D Vector Cars */}
      {cars.map((_, i) => (
        <div
          key={i}
          className={`suv-road__car suv-road__car--lane-${i}`}
          style={{
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${3.2 + i * 0.6}s`,
          }}
        >
          <div className="suv-car__body">
            <div className="suv-car__roof" />
            <div className="suv-car__lights" />
            <div className="suv-car__glow" />
          </div>
        </div>
      ))}

      {streaks.map((_, i) => (
        <span
          key={i}
          className={`suv-road__streak suv-road__streak--${i % 2 === 0 ? 'warm' : 'cool'}`}
          style={{
            top: `${16 + i * 12}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2.8 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Breadcrumb
--------------------------------------------------------------------------- */

const Breadcrumb = ({ trail }) => (
  <nav className="suv-breadcrumb" aria-label="Breadcrumb">
    <ol className="suv-breadcrumb__list">
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <li className="suv-breadcrumb__item" key={item.label}>
            {isLast ? (
              <span className="suv-breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a className="suv-breadcrumb__link" href={item.href}>
                {item.label}
              </a>
            )}
            {!isLast && (
              <svg
                className="suv-breadcrumb__sep"
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

/* ---------------------------------------------------------------------------
   SuvHome — Compact, Immersive Modern Showroom Hero
--------------------------------------------------------------------------- */

const SuvHome = ({
  title = 'SUV Car',
  subtitle = 'Spacious, powerful rides built for family trips and highways',
  trail = [{ label: 'Home', href: '/' }, { label: 'SUV Car', href: '#' }],
  image = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
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
      className={`suv-hero${loaded ? ' suv-hero--loaded' : ''}`}
      ref={stageRef}
    >
      <RoadPerspective />
      <div className="suv-hero__vignette" aria-hidden="true" />

      <div className="suv-hero__stage">
        <div className="suv-hero__content">
          <h1 className="suv-hero__title">
            <span className="suv-hero__title-shine">{title}</span>
          </h1>
          <p className="suv-hero__subtitle">{subtitle}</p>

          <div className="suv-hero__breadcrumb-wrap">
            <Breadcrumb trail={trail} />
          </div>
        </div>
      </div>

      <div className="suv-hero__floor" aria-hidden="true" />
    </section>
  );
};

export default SuvHome;