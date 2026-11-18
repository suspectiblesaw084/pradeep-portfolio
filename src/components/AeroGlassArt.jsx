import React, { useEffect, useRef } from 'react';

/**
 * HeroAeroSculpture — Art-directed organic 3D Frutiger Aero glass composition.
 *
 * Sits cleanly in the negative space behind and around the studio window (z-index: 0,
 * pointer-events: none) so it NEVER overlaps or intercepts buttons, links, or text.
 * Features multi-layered optical glass refraction, flowing liquid ribbons, subtle water
 * ripple rings, and gentle depth parallax.
 */
export function HeroAeroSculpture() {
  const ribbonRef = useRef(null);
  const sphereLargeRef = useRef(null);
  const sphereSmallRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) return;

    let rafId;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;

      if (ribbonRef.current) {
        ribbonRef.current.style.transform = `translate3d(${(curX * 8).toFixed(2)}px, ${(curY * 6).toFixed(2)}px, 0)`;
      }
      if (sphereLargeRef.current) {
        sphereLargeRef.current.style.transform = `translate3d(${(-curX * 14).toFixed(2)}px, ${(-curY * 11).toFixed(2)}px, 0)`;
      }
      if (sphereSmallRef.current) {
        sphereSmallRef.current.style.transform = `translate3d(${(curX * 16).toFixed(2)}px, ${(-curY * 13).toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hero-aero-art" aria-hidden="true">
      {/* Layer 1: Flowing translucent cyan-to-mint organic liquid ribbon & water ripples in background negative space */}
      <div ref={ribbonRef} className="hero-aero-art__ribbon-wrap">
        <svg
          className="hero-aero-art__svg"
          viewBox="0 0 640 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aeroRibbonMain" x1="60" y1="90" x2="580" y2="540" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6CD4F0" stopOpacity="0.52" />
              <stop offset="38%" stopColor="#58D6C9" stopOpacity="0.44" />
              <stop offset="72%" stopColor="#8CE2B0" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#B4EBF5" stopOpacity="0.16" />
            </linearGradient>

            <linearGradient id="aeroRibbonHighlight" x1="120" y1="80" x2="480" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="45%" stopColor="#D8F8FF" stopOpacity="0.46" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="aeroWaveSecondary" x1="560" y1="140" x2="90" y2="560" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4BC3E8" stopOpacity="0.34" />
              <stop offset="50%" stopColor="#7DE5CE" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E9D88E" stopOpacity="0.18" />
            </linearGradient>

            <radialGradient id="aeroCausticGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#72E2EB" stopOpacity="0.48" />
              <stop offset="52%" stopColor="#94E6C5" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <filter id="aeroSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Soft atmospheric water caustic glow */}
          <circle cx="340" cy="310" r="230" fill="url(#aeroCausticGlow)" />

          {/* Subtle concentric water ripple rings */}
          <circle cx="356" cy="296" r="196" stroke="rgba(116, 214, 232, 0.28)" strokeWidth="1.2" />
          <circle cx="356" cy="296" r="246" stroke="rgba(128, 222, 206, 0.2)" strokeWidth="1" />
          <circle cx="356" cy="296" r="292" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />

          {/* Flowing organic liquid-glass ribbon (outer sweep) */}
          <path
            d="M42 420C106 290 218 118 392 92C514 74 600 156 594 276C588 394 494 522 332 548C196 570 98 518 42 420Z"
            fill="url(#aeroWaveSecondary)"
            filter="url(#aeroSoftBlur)"
          />

          {/* Sculpted glossy glass wave arc */}
          <path
            d="M74 374C132 232 276 118 432 126C542 132 602 222 574 336C546 448 420 538 270 526C148 516 38 462 74 374Z"
            fill="url(#aeroRibbonMain)"
            stroke="rgba(255, 255, 255, 0.72)"
            strokeWidth="1.5"
          />

          {/* Specular pearlescent glass highlight streak along top edge */}
          <path
            d="M112 318C172 204 294 134 426 140C498 144 548 186 558 242C514 198 446 176 364 186C256 198 168 256 112 318Z"
            fill="url(#aeroRibbonHighlight)"
          />
        </svg>
      </div>

      {/* Layer 2: Large optical 3D glass sphere tucked cleanly in bottom-left negative space */}
      <div ref={sphereLargeRef} className="hero-aero-art__sphere-wrap hero-aero-art__sphere-wrap--bl">
        <div className="aero-sphere aero-sphere--lg" />
      </div>

      {/* Layer 3: Sculpted translucent mint-cyan water droplet orb in bottom-right negative space */}
      <div ref={sphereSmallRef} className="hero-aero-art__sphere-wrap hero-aero-art__sphere-wrap--br">
        <div className="aero-sphere aero-sphere--sm aero-sphere--mint" />
      </div>
    </div>
  );
}

/**
 * ContactAeroSculpture — Luminous organic glass accent tucked in the Contact card's
 * top-right negative space (strictly behind text/buttons, pointer-events: none).
 */
export function ContactAeroSculpture() {
  return (
    <div className="contact-aero-art" aria-hidden="true">
      <svg
        className="contact-aero-art__wave"
        viewBox="0 0 420 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="contactGlassArc" x1="40" y1="20" x2="390" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6AD5EE" stopOpacity="0.44" />
            <stop offset="50%" stopColor="#6FE0CC" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#A6E6BA" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M42 186C110 88 232 22 372 34C412 38 430 98 398 158C362 224 260 250 156 238C82 228 10 232 42 186Z"
          fill="url(#contactGlassArc)"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.2"
        />
        <circle cx="292" cy="110" r="88" stroke="rgba(120, 218, 232, 0.34)" strokeWidth="1" />
        <circle cx="292" cy="110" r="126" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
      </svg>
      <div className="aero-sphere aero-sphere--contact-lg" />
      <div className="aero-sphere aero-sphere--contact-sm aero-sphere--mint" />
    </div>
  );
}
