import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * SpotlightCard - A reusable card wrapper that provides:
 *  1. A mouse-following spotlight radial gradient (spotlight effect).
 *  2. A subtle magnetic pull dragging the card slightly toward the cursor.
 * 
 * Configured to degrade gracefully on mobile/touch screens.
 */
export default function SpotlightCard({ children, className = '', hoverYOffset = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Spotlight Relative Coordinates
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Magnetic Spring Vectors
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const magneticX = useSpring(targetX, springConfig);
  const magneticY = useSpring(targetY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // 1. Calculate spotlight position relative to card boundaries
    const spotX = e.clientX - rect.left;
    const spotY = e.clientY - rect.top;
    setSpotlightPos({ x: spotX, y: spotY });

    // 2. Calculate magnetic pull vectors relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pullX = (spotX - centerX) * 0.08; // 8% pull strength
    const pullY = (spotY - centerY) * 0.08;

    // Apply elevation (hoverYOffset) if requested
    targetX.set(pullX);
    targetY.set(pullY + hoverYOffset);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly spring back to origin
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: magneticX,
        y: magneticY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden transition-colors duration-500 rounded-2xl bg-black border border-neutral-900 ${className}`}
    >
      {/* Spotlight Radial Light Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.05), transparent 60%)`,
          }}
        />
      )}

      {/* Inner Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
