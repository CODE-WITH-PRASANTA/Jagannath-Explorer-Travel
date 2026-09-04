import React, { useEffect, useRef, useState } from 'react';
import './UrbaniaTravellerBreadcrumb.css';

/* ---------------------------------------------------------------------------
   RoadPerspective
--------------------------------------------------------------------------- */
const RoadPerspective = () => {
  const laneLines = Array.from({ length: 7 });
  const streaks = Array.from({ length: 6 });
  const vans = Array.from({ length: 3 });

  return (
    <div className="urbania-traveller-breadcrumb-road" aria-hidden="true">
      <div className="urbania-traveller-breadcrumb-road__horizon-glow" />
      <div className="urbania-traveller-breadcrumb-road__grid-floor" />

      <svg
        className="urbania-traveller-breadcrumb-road__lanes"
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
              className="urbania-traveller-breadcrumb-road__lane-line"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          );
        })}
      </svg>

      {/* Cruising Vans */}
      {vans.map((_, i) => (
        <div
          key={i}
          className={`urbania-traveller-breadcrumb-road__van urbania-traveller-breadcrumb-road__van--lane-${i}`}
          style={{
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${3.4 + i * 0.6}s`,
          }}
        >
          <div className="urbania-traveller-breadcrumb-van__body">
            <div className="urbania-traveller-breadcrumb-van__roof" />
            <div className="urbania-traveller-breadcrumb-van__windows" />
            <div className="urbania-traveller-breadcrumb-van__taillights" />
            <div className="urbania-traveller-breadcrumb-van__glow" />
          </div>
        </div>
      ))}

      {streaks.map((_, i) => (
        <span
          key={i}
          className={`urbania-traveller-breadcrumb-road__streak urbania-traveller-breadcrumb-road__streak--${
            i % 2 === 0 ? 'amber' : 'cyan'
          }`}
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
  <nav className="urbania-traveller-breadcrumb-nav" aria-label="Breadcrumb">
    <ol className="urbania-traveller-breadcrumb-nav__list">
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <li className="urbania-traveller-breadcrumb-nav__item" key={item.label}>
            {isLast ? (
              <span
                className="urbania-traveller-breadcrumb-nav__current"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <a className="urbania-traveller-breadcrumb-nav__link" href={item.href}>
                {item.label}
              </a>
            )}
            {!isLast && (
              <svg
                className="urbania-traveller-breadcrumb-nav__sep"
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
   UrbaniaTravellerBreadcrumb Main Component
--------------------------------------------------------------------------- */
const UrbaniaTravellerBreadcrumb = ({
  title = 'Force Urbania & Traveller',
  subtitle = 'Next-generation luxury executive travel, family vacations, and group touring',
  trail = [
    { label: 'Home', href: '/' },
    { label: 'Fleet', href: '/fleet' },
    { label: 'Urbania & Traveller', href: '#' },
  ],
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

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      stage.style.setProperty('--tiltX', '0');
      stage.style.setProperty('--tiltY', '0');
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
      className={`urbania-traveller-breadcrumb${
        loaded ? ' urbania-traveller-breadcrumb--loaded' : ''
      }`}
      ref={stageRef}
    >
      <RoadPerspective />
      <div className="urbania-traveller-breadcrumb__vignette" aria-hidden="true" />

      <div className="urbania-traveller-breadcrumb__stage">
        <div className="urbania-traveller-breadcrumb__content">
          <div className="urbania-traveller-breadcrumb__badge">Executive Luxury Van</div>
          <h1 className="urbania-traveller-breadcrumb__title">
            <span className="urbania-traveller-breadcrumb__title-shine">{title}</span>
          </h1>
          <p className="urbania-traveller-breadcrumb__subtitle">{subtitle}</p>

          <div className="urbania-traveller-breadcrumb__nav-wrap">
            <Breadcrumb trail={trail} />
          </div>
        </div>
      </div>

      <div className="urbania-traveller-breadcrumb__floor" aria-hidden="true" />
    </section>
  );
};

export default UrbaniaTravellerBreadcrumb;