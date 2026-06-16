import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * FloatingVisual - Enhanced with:
 *  - Automatic viewport mouse-parallax (shifts cards slightly when mouse moves).
 *  - Slow idle floating animation.
 *  - Hover coordinate tilts.
 *  - Supports dragging as a secondary interaction.
 */
export default function FloatingVisual() {
  const containerRef = useRef(null);

  // Mouse parallax motion coordinates
  const mouseParallaxX = useMotionValue(0);
  const mouseParallaxY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { damping: 30, stiffness: 100 };
  const parallaxX = useSpring(mouseParallaxX, springConfig);
  const parallaxY = useSpring(mouseParallaxY, springConfig);

  // Map coordinate offsets to 3D tilt rotations
  const rotateX = useTransform(parallaxY, [-40, 40], [15, -15]);
  const rotateY = useTransform(parallaxX, [-40, 40], [-15, 15]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      // Calculate coordinates relative to screen center (-1 to 1)
      const relativeX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const relativeY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      // Move by max 35 pixels
      mouseParallaxX.set(relativeX * 35);
      mouseParallaxY.set(relativeY * 35);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseParallaxX, mouseParallaxY]);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[350px] md:h-[500px]"
    >
      {/* Background glow effects - soft white/neutral */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-neutral-900/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[150px] h-[150px] bg-white/[0.01] rounded-full blur-[60px] pointer-events-none" />
      
      {/* 3D Scene Wrapper */}
      <div style={{ perspective: 1200 }} className="relative flex items-center justify-center w-full h-full">
        {/* Main Floating Object Container */}
        <motion.div
          style={{ 
            x: parallaxX, 
            y: parallaxY, 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d" 
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          dragElastic={0.2}
          whileHover={{ 
            cursor: "grab",
            scale: 1.02,
          }}
          whileTap={{ cursor: "grabbing" }}
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
        >
          {/* Outer Rotating Dashed Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-neutral-800/30 border-dashed"
            style={{ transform: "translateZ(-40px)" }}
          />

          {/* Middle Ring with a Glass Accent */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-neutral-700/10"
            style={{ transform: "translateZ(-20px)" }}
          />

          {/* Core Glassmorphic Editorial Card */}
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="w-48 h-64 md:w-56 md:h-72 glass glass-border rounded-2xl flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Glossy shine reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />

            {/* Top designer tag */}
            <div className="flex justify-between items-center z-10">
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-mono">P.V // 2026</span>
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>

            {/* Inner abstract graphic */}
            <div className="my-auto flex flex-col items-start gap-2 z-10">
              <div className="w-12 h-[1px] bg-neutral-700" />
              <div className="w-20 h-[1px] bg-neutral-800" />
              <div className="w-8 h-[1px] bg-neutral-750" />
            </div>

            {/* Bottom details */}
            <div className="flex flex-col gap-1 z-10">
              <span className="text-[10px] font-medium tracking-wide text-neutral-400">DESIGN / SYSTEM</span>
              <span className="text-[8px] text-neutral-600 font-mono">53.0762° N, 8.8077° E</span>
            </div>
          </motion.div>

          {/* Accent Glass Circle floating in front */}
          <motion.div
            style={{ transform: "translateZ(60px)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full glass glass-border shadow-lg flex items-center justify-center text-[10px] tracking-widest text-white/50 font-mono"
          >
            INTERACT
          </motion.div>

          {/* Subtle floating wireframe cube or vector lines behind */}
          <motion.div
            style={{ transform: "translateZ(-60px)" }}
            className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full border border-neutral-900 flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-neutral-900/40 rounded" />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
