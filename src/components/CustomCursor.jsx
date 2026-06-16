import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * CustomCursor - A premium, high-performance custom cursor system.
 * Features:
 *  - Dual-circle pointer (instant inner dot, spring-lagged outer ring).
 *  - Organic mouse trail (8-particle lagging queue powered by requestAnimationFrame).
 *  - Click ripple expansion circles.
 *  - Interactive hover states (scales up, soft glow, custom text badges).
 *  - Automatic performance fallbacks (disabled on mobile and touch screens).
 */
export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'pointer' | 'badge'
  const [cursorText, setCursorText] = useState('');
  const [ripples, setRipples] = useState([]);

  // Mouse Coordinates (Raw values for instant response)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer Circle Springs (damping/stiffness creates a elegant lag)
  const outerX = useSpring(mouseX, { damping: 25, stiffness: 220 });
  const outerY = useSpring(mouseY, { damping: 25, stiffness: 220 });

  // Direct DOM Refs for Trail Particles (Avoids React re-renders)
  const trailRefs = useRef([]);
  const trailCoordsRef = useRef(Array(8).fill().map(() => ({ x: -100, y: -100 })));
  const coordsRef = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Check if device supports a fine pointer (mouse) and hover states
    const checkDeviceSupport = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(!hasFinePointer || isTouch || window.innerWidth < 768);
    };

    checkDeviceSupport();
    window.addEventListener('resize', checkDeviceSupport);

    return () => {
      window.removeEventListener('resize', checkDeviceSupport);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track cursor coordinates
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      coordsRef.current = { x: e.clientX, y: e.clientY };
    };

    // Listen to click events to render the ripple rings
    const handleMouseDown = (e) => {
      const newRipple = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    // Track hovering over links/buttons/interactive zones
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check if current target or parent matches interactive elements
      const interactiveEl = target.closest('a, button, select, input, textarea, [role="button"], .interactive-hover, [data-cursor]');
      
      if (interactiveEl) {
        // Read custom data-cursor text (e.g., "Explore" or "View")
        const badgeText = interactiveEl.getAttribute('data-cursor');
        if (badgeText) {
          setCursorType('badge');
          setCursorText(badgeText);
        } else {
          setCursorType('pointer');
        }
      }
    };

    // Reset cursor state on mouseleave
    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest('a, button, select, input, textarea, [role="button"], .interactive-hover, [data-cursor]');
      if (interactiveEl) {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Start requestAnimationFrame loop for the mouse trail
    const updateTrail = () => {
      let prevX = coordsRef.current.x;
      let prevY = coordsRef.current.y;

      trailCoordsRef.current.forEach((coord, i) => {
        // Exponential interpolation (LERP) makes dots follow organically
        const factor = 0.28 - (i * 0.02); // first dots follow faster
        const nextX = coord.x + (prevX - coord.x) * factor;
        const nextY = coord.y + (prevY - coord.y) * factor;

        coord.x = nextX;
        coord.y = nextY;

        const dot = trailRefs.current[i];
        if (dot) {
          dot.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%) scale(${(8 - i) / 8})`;
        }

        prevX = nextX;
        prevY = nextY;
      });

      rafId.current = requestAnimationFrame(updateTrail);
    };

    rafId.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, mouseX, mouseY]);

  // Clean completed ripple rings
  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isMobile) return null;

  return (
    <>
      {/* 1. Click Ripple Rings */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ x: ripple.x, y: ripple.y, scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          />
        ))}
      </AnimatePresence>

      {/* 2. Mouse Trail Dots (Direct DOM render for performance) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-neutral-600/15 rounded-full pointer-events-none z-[99998]"
          style={{ 
            opacity: (8 - i) / 10,
            transform: 'translate(-50%, -50%) translate3d(-100px, -100px, 0)'
          }}
        />
      ))}

      {/* 3. Outer Ring (Spring physics) */}
      <motion.div
        style={{ x: outerX, y: outerY }}
        animate={{
          width: cursorType === 'pointer' ? 44 : cursorType === 'badge' ? 70 : 20,
          height: cursorType === 'pointer' ? 44 : cursorType === 'badge' ? 70 : 20,
          backgroundColor: cursorType === 'badge' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
          borderColor: cursorType === 'pointer' ? 'rgba(255, 255, 255, 0.7)' : cursorType === 'badge' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.2 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-xl backdrop-blur-[1px] mix-blend-difference"
      >
        {/* Render text inside ring if cursor is a badge */}
        {cursorType === 'badge' && (
          <span className="text-[8px] tracking-[0.2em] font-mono text-white/80 font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* 4. Core Center Dot (Instant translation) */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: cursorType === 'pointer' ? 0.3 : cursorType === 'badge' ? 0 : 1,
          opacity: cursorType === 'badge' ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
