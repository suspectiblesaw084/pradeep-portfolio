import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function IcarusHeroVisual() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax motion coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // Transforms for different depth layers
  const sunX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const sunY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  
  const fragmentsX = useTransform(smoothMouseX, [-1, 1], [-40, 40]);
  const fragmentsY = useTransform(smoothMouseY, [-1, 1], [-40, 40]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center overflow-visible select-none cursor-none group"
      data-cursor="explore"
    >
      {/* Glow that softly follows mouse */}
      <motion.div
        style={{ x: sunX, y: sunY }}
        className="absolute w-[300px] h-[300px] rounded-full border-[1px] border-gold-muted/40 flex items-center justify-center overflow-hidden transition-all duration-700 ease-out group-hover:border-gold/60"
      >
        <div className="absolute inset-0 bg-gold-muted/10 blur-2xl group-hover:bg-gold-muted/20 transition-all duration-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Abstract Wing Lines SVG */}
      <svg className="absolute w-[450px] h-[450px] pointer-events-none opacity-50" viewBox="0 0 400 400" fill="none">
        <motion.path 
          d="M 50 350 Q 200 150 350 50" 
          stroke="url(#wingGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -40] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 80 380 Q 250 200 380 80" 
          stroke="url(#wingGradient)" 
          strokeWidth="1" 
          strokeDasharray="2 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="wingGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Fragments (Dark Glass Cards / Geometry) */}
      <motion.div
        style={{ x: isMobile ? 0 : fragmentsX, y: isMobile ? 0 : fragmentsY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [2, 0, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[5%] right-[15%] w-32 h-44 bg-[#0a0a0a]/50 backdrop-blur-md border border-gold-muted/20 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [-4, 0, -4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[10%] w-40 h-28 bg-[#040404]/60 backdrop-blur-lg border border-gold-muted/10 rounded-lg shadow-2xl flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-gold-muted/20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [12, 10, 12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[25%] -left-[5%] w-16 h-16 bg-gold-muted/5 backdrop-blur-sm border border-gold-muted/40 rounded-full"
        />
      </motion.div>

      {/* Central interaction ripple layer */}
      <motion.div 
        whileTap={{ scale: 0.95 }}
        className="absolute inset-0 w-full h-full cursor-none z-10" 
      />
    </div>
  );
}
