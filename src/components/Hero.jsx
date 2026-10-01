import { motion } from 'framer-motion';
import { Terminal, Folder, Zap } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import PlaceholderVisual from './PlaceholderVisual';
import { useRef } from 'react';

export default function Hero() {
  const constraintsRef = useRef(null);
  const { playClick, playHover } = useSoundEffects();

  return (
    <section className="min-h-[100svh] flex items-center pt-24 pb-12 relative overflow-hidden" ref={constraintsRef}>
      
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_2px,transparent_2px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start pt-12 lg:pt-0"
        >
          <div className="relative inline-flex items-center gap-2 px-3 py-1 border-2 border-retro-border bg-retro-yellow mb-6 shadow-retro-sm ui-scratch">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-border" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-border" />
            <span className="w-2 h-2 bg-retro-border animate-blink" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-retro-text">P1 READY</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-6 text-retro-text uppercase relative">
            <span className="relative z-10">Visual Designer building bold digital worlds.</span>
            <span className="absolute top-2 left-2 text-retro-blue/10 z-0 select-none">Visual Designer building bold digital worlds.</span>
          </h1>

          <p className="text-retro-text/80 text-lg md:text-xl font-sans max-w-lg mb-10 leading-relaxed font-medium relative">
            I create brand identities, social-first creatives, product visuals, motion assets, and digital compositions for brands, creators, and studios.
            <div className="absolute -left-6 top-2 w-1 h-12 bg-retro-border/20" />
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#works" onClick={playClick} onMouseEnter={playHover} className="retro-btn-primary flex items-center gap-2 cursor-none relative group offset-panel bg-retro-blue">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-border group-hover:bg-white transition-colors" />
              <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
              <Folder size={16} />
              View Works
            </a>
            <a href="#contact" onClick={playClick} onMouseEnter={playHover} className="retro-btn flex items-center gap-2 cursor-none relative group offset-panel">
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-border group-hover:bg-retro-text transition-colors" />
              <Terminal size={16} />
              Let's Talk
            </a>
          </div>
        </motion.div>

        {/* Right Content - Arcade Panels */}
        <div className="relative h-[400px] lg:h-[600px] w-full hidden sm:block">
          
          {/* Main Visual Window */}
          <motion.div 
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[400px] absolute top-10 right-0 cursor-grab active:cursor-grabbing group bg-white border-2 border-retro-border shadow-retro ui-scratch"
          >
            <div className="absolute -top-4 right-8 bg-retro-bg border-2 border-retro-border px-2 py-0.5 text-[8px] font-mono font-bold uppercase -rotate-6 shadow-retro-sm">SELECT MODE</div>
            <div className="bg-retro-blue text-white px-3 py-1.5 font-mono text-xs uppercase tracking-widest flex items-center justify-between select-none group-active:bg-retro-border transition-colors border-b-2 border-retro-border">
              <span>STAGE_01_SELECT</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white" />
                <div className="w-2 h-2 bg-white" />
              </div>
            </div>
            <div className="p-3 bg-white relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-border z-10" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-border z-10" />
              <div className="aspect-[4/3] w-full bg-retro-bg border-2 border-retro-border relative overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
                <PlaceholderVisual variant={3} label="MAIN SYSTEM" />
              </div>
            </div>
          </motion.div>

          {/* Secondary Stats Window */}
          <motion.div 
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            initial={{ opacity: 0, x: 50, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-64 absolute bottom-10 right-20 cursor-grab active:cursor-grabbing group z-10 bg-white border-2 border-retro-border shadow-retro offset-panel"
          >
            <div className="bg-retro-green text-white px-3 py-1.5 font-mono text-xs uppercase tracking-widest flex justify-between border-b-2 border-retro-border">
              <span>PLAYER_STATS</span>
            </div>
            <div className="p-4 flex flex-col gap-3 font-mono text-xs text-retro-text relative bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-retro-border" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-retro-border" />
              <div className="flex justify-between items-center border-b-[1px] border-retro-border/20 pb-1">
                <span>LVL</span>
                <span className="font-bold text-retro-blue">99</span>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-retro-border/20 pb-1">
                <span>EXP</span>
                <span className="font-bold text-retro-orange">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ENERGY</span>
                <span className="font-bold">MAX</span>
              </div>
              <div className="w-full h-4 border-2 border-retro-border mt-2 p-0.5 bg-retro-bg relative overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-retro-green relative"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tiny Floating Element */}
          <motion.div 
            drag
            dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute top-20 left-10 w-16 h-16 bg-retro-red border-2 border-retro-border shadow-retro flex items-center justify-center cursor-grab active:cursor-grabbing z-20 relative"
          >
            <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
            <Zap size={24} className="text-white" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
