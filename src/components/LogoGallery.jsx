import React, { useState } from 'react';
import logoProjects from '../data/logoProjects';

/**
 * LogoGallery — Curated Logo Design Exhibition.
 *
 * Default: Deep charcoal / black surface (#141311) + white logo artwork.
 * Hover (desktop) / Tap (mobile): Warm off-white surface (#F5F1E8) + black logo artwork.
 *
 * All 14 PNG files in public/assets/logos/ are referenced directly with no CSS color filters.
 */
function LogoGallery() {
  const [activeCard, setActiveCard] = useState(null);

  const handleToggle = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="logo-exhibition">
      <div className="logo-gallery-grid">
        {logoProjects.map((project, index) => {
          const isActive = activeCard === project.id;
          const indexStr = String(index + 1).padStart(2, '0');

          return (
            <div
              key={project.id}
              className={`logo-card${isActive ? ' logo-card--active' : ''}`}
              onClick={() => handleToggle(project.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${project.brand} — ${project.category}. Toggle light and dark logo preview.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle(project.id);
                }
              }}
            >
              {/* Top index */}
              <div className="logo-card__top">
                <span className="logo-card__index">{indexStr}</span>
              </div>

              {/* Default state — black/dark surface + white logo */}
              <div className="logo-card__face logo-card__face--dark">
                <img
                  src={project.white}
                  alt={`${project.brand} white logo on dark surface`}
                  className="logo-card__img"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>

              {/* Hover / Active state — warm off-white surface + black logo */}
              <div className="logo-card__face logo-card__face--light">
                <img
                  src={project.black}
                  alt={`${project.brand} black logo on light surface`}
                  className="logo-card__img"
                  loading="lazy"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>

              {/* Brand label strip */}
              <div className="logo-card__label">
                <span className="logo-card__brand">{project.brand}</span>
                <span className="logo-card__category">{project.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LogoGallery;
