import React, { useState, useRef, useEffect, useCallback } from 'react';
import logoProjects from '../data/logoProjects';

/**
 * LogoCard — Three-state interactive logo showcase card:
 *   State 1 (Default):      Dark card (#141311) + white monochrome logo
 *   State 2 (Card hover):   Pure white card (#FFFFFF) + complete black monochrome logo
 *   State 3 (Logo hover):   Pure white card (#FFFFFF) + coloured logo revealed inside
 *                           a soft cursor-following circular spotlight over the black logo
 *
 * Zero React re-renders on pointermove (uses refs + requestAnimationFrame + CSS vars).
 * Touch/mobile retains clean static State 1 appearance.
 */
function LogoCard({ project, indexStr }) {
  const cardRef = useRef(null);
  const artworkRef = useRef(null);
  const rafRef = useRef(null);
  const pointerState = useRef({
    spotlightActive: false,
    targetX: 0,
    targetY: 0,
    curX: 0,
    curY: 0,
  });

  const [blackAvailable, setBlackAvailable] = useState(Boolean(project.black));
  const [coloredAvailable, setColoredAvailable] = useState(Boolean(project.colored));

  useEffect(() => {
    setBlackAvailable(Boolean(project.black));
    setColoredAvailable(Boolean(project.colored));
  }, [project.black, project.colored]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopLoop();
  }, [stopLoop]);

  const applySpotlightCoords = useCallback((x, y) => {
    const el = artworkRef.current;
    if (!el) return;
    el.style.setProperty('--lx', `${x.toFixed(1)}px`);
    el.style.setProperty('--ly', `${y.toFixed(1)}px`);
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const s = pointerState.current;
      const dx = s.targetX - s.curX;
      const dy = s.targetY - s.curY;

      s.curX += dx * 0.28;
      s.curY += dy * 0.28;
      applySpotlightCoords(s.curX, s.curY);

      if (s.spotlightActive || Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        s.curX = s.targetX;
        s.curY = s.targetY;
        applySpotlightCoords(s.curX, s.curY);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [applySpotlightCoords]);

  const isDesktopPointer = (e) => {
    if (e.pointerType === 'touch') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  };

  // STATE 2: Card hover enter / leave
  const handleCardPointerEnter = (e) => {
    if (!isDesktopPointer(e)) return;
    if (cardRef.current) {
      cardRef.current.dataset.cardHover = 'true';
    }
  };

  const handleCardPointerLeave = () => {
    pointerState.current.spotlightActive = false;
    stopLoop();
    if (artworkRef.current) {
      artworkRef.current.dataset.spotlight = 'false';
    }
    if (cardRef.current) {
      cardRef.current.dataset.cardHover = 'false';
    }
  };

  // STATE 3: Spotlight enter / move / leave strictly over logo artwork bounding box
  const handleArtworkPointerEnter = (e) => {
    if (!isDesktopPointer(e)) return;
    if (cardRef.current) {
      cardRef.current.dataset.cardHover = 'true';
    }
    if (!coloredAvailable) return;

    const artEl = artworkRef.current;
    if (!artEl) return;

    const rect = artEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = pointerState.current;
    s.spotlightActive = true;
    s.targetX = x;
    s.targetY = y;
    s.curX = x;
    s.curY = y;
    applySpotlightCoords(x, y);
    artEl.dataset.spotlight = 'true';
  };

  const handleArtworkPointerMove = (e) => {
    if (!coloredAvailable || !isDesktopPointer(e)) return;
    const artEl = artworkRef.current;
    if (!artEl) return;

    const rect = artEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const s = pointerState.current;
    if (!s.spotlightActive) {
      s.spotlightActive = true;
      s.curX = x;
      s.curY = y;
      applySpotlightCoords(x, y);
      artEl.dataset.spotlight = 'true';
    }
    s.targetX = x;
    s.targetY = y;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      s.curX = x;
      s.curY = y;
      applySpotlightCoords(x, y);
      return;
    }

    startLoop();
  };

  const handleArtworkPointerLeave = () => {
    // Leaves logo artwork while possibly remaining inside card -> returns cleanly to State 2
    pointerState.current.spotlightActive = false;
    stopLoop();
    if (artworkRef.current) {
      artworkRef.current.dataset.spotlight = 'false';
    }
  };

  return (
    <div
      ref={cardRef}
      className="logo-card"
      data-card-hover="false"
      tabIndex={0}
      aria-label={`${project.brand} — ${project.category}`}
      onPointerEnter={handleCardPointerEnter}
      onPointerLeave={handleCardPointerLeave}
      onPointerCancel={handleCardPointerLeave}
    >
      {/* Top index */}
      <div className="logo-card__top">
        <span className="logo-card__index">{indexStr}</span>
      </div>

      {/* Synchronised three-layer logo artwork stage (exact hit-box for State 3 spotlight) */}
      <div
        ref={artworkRef}
        className="logo-card__artwork"
        data-spotlight="false"
        onPointerEnter={handleArtworkPointerEnter}
        onPointerMove={handleArtworkPointerMove}
        onPointerLeave={handleArtworkPointerLeave}
        onPointerCancel={handleArtworkPointerLeave}
      >
        {/* Layer 1 (State 1 Default): White monochrome logo on dark card */}
        <div className="logo-card__layer logo-card__layer--white">
          <img
            src={project.white}
            alt={`${project.brand} logo`}
            className="logo-card__img"
            loading="lazy"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Layer 2 (State 2 Card Hover): Complete black monochrome logo on pure white card */}
        {blackAvailable && (
          <div className="logo-card__layer logo-card__layer--black" aria-hidden="true">
            <img
              src={project.black}
              alt=""
              className="logo-card__img"
              loading="lazy"
              draggable="false"
              onError={() => setBlackAvailable(false)}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}

        {/* Layer 3 (State 3 Logo Hover): Coloured logo revealed inside circular cursor spotlight */}
        {coloredAvailable && (
          <div className="logo-card__layer logo-card__layer--color" aria-hidden="true">
            <img
              src={project.colored}
              alt=""
              className="logo-card__img"
              loading="lazy"
              draggable="false"
              onError={() => setColoredAvailable(false)}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>

      {/* Brand label strip */}
      <div className="logo-card__label">
        <span className="logo-card__brand">{project.brand}</span>
        <span className="logo-card__category">{project.category}</span>
      </div>
    </div>
  );
}

/**
 * LogoGallery — Three-state interactive logo showcase gallery.
 */
function LogoGallery() {
  return (
    <div className="logo-exhibition">
      <div className="logo-gallery-grid">
        {logoProjects.map((project, index) => (
          <LogoCard
            key={project.id}
            project={project}
            indexStr={String(index + 1).padStart(2, '0')}
          />
        ))}
      </div>
    </div>
  );
}

export default LogoGallery;
