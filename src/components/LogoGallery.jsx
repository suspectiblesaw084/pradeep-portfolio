import React, { useState } from 'react';
import logoProjects from '../data/logoProjects';

/**
 * LogoGallery — Premium logo showcase with dark/light hover swap.
 *
 * Default: white logo on dark charcoal card.
 * Hover (desktop): transitions to black logo on warm off-white (#F2F0EB).
 * Mobile: tap toggles the state.
 */
function LogoGallery() {
  const [activeCard, setActiveCard] = useState(null);

  const handleTap = (id) => {
    // Toggle on mobile tap
    setActiveCard(prev => prev === id ? null : id);
  };

  return (
    <div className="logo-gallery-grid">
      {logoProjects.map((project) => {
        const isActive = activeCard === project.id;

        return (
          <div
            key={project.id}
            className={`logo-card${isActive ? ' logo-card--active' : ''}`}
            onClick={() => handleTap(project.id)}
            role="button"
            tabIndex={0}
            aria-label={`${project.brand} — ${project.category}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTap(project.id);
              }
            }}
          >
            {/* Dark state — white logo (default) */}
            <div className="logo-card__face logo-card__face--dark">
              <img
                src={project.white}
                alt={`${project.brand} logo`}
                className="logo-card__img"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            {/* Light state — black logo (hover / active) */}
            <div className="logo-card__face logo-card__face--light">
              <img
                src={project.black}
                alt={`${project.brand} logo`}
                className="logo-card__img"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            {/* Brand label */}
            <div className="logo-card__label">
              <span className="logo-card__brand">{project.brand}</span>
              <span className="logo-card__category">{project.category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LogoGallery;
