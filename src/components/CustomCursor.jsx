import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = 'none';
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      
      if (target || e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovered(true);
        if (target && target.dataset.cursor) {
          setCursorText(target.dataset.cursor);
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed z-[10000] pointer-events-none flex flex-col items-center justify-center"
    >
      {/* Retro Crosshair Center */}
      <div className={`transition-all duration-150 ease-out flex items-center justify-center relative
        ${isHovered ? 'w-8 h-8 scale-110' : 'w-5 h-5'}`}
      >
        <div className="absolute w-full h-[2px] bg-retro-border"></div>
        <div className="absolute h-full w-[2px] bg-retro-border"></div>
        {isHovered && <div className="absolute w-3 h-3 bg-retro-orange"></div>}
      </div>

      {/* Floating retro badge text */}
      {cursorText && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 20 }}
          className="absolute whitespace-nowrap bg-retro-blue text-white text-[10px] uppercase font-mono font-bold px-2 py-0.5 border-2 border-retro-border shadow-retro-sm"
        >
          {cursorText}
        </motion.div>
      )}
    </motion.div>
  );
}
