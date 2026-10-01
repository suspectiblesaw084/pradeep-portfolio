import { motion } from 'framer-motion';

export default function IcarusBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Soft warm sun/eclipse radial glow (top right) */}
      <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-amber-950/5 to-transparent blur-[120px]" />
      
      {/* Lower subtle atmospheric glow (bottom left) */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#b8860b]/5 via-transparent to-transparent blur-[100px]" />

      {/* Subtle floating gold corner marks for editorial framing */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold-muted/30 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold-muted/30 hidden lg:block" />

      {/* Abstract wing-line/flight-path pattern (subtle SVG lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 200 Q 400 100, 800 600 T 1800 200" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" />
        <path d="M-200 400 Q 500 300, 900 800 T 2000 400" fill="none" stroke="url(#goldGradient)" strokeWidth="0.5" />
        <path d="M0 800 Q 600 700, 1000 400 T 2200 600" fill="none" stroke="url(#goldGradient)" strokeWidth="0.25" />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating geometric fragments */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[20%] w-px h-16 bg-gradient-to-b from-transparent via-gold-muted/30 to-transparent transform rotate-45"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[40%] left-[15%] w-px h-24 bg-gradient-to-b from-transparent via-gold-muted/20 to-transparent transform -rotate-12"
      />
    </div>
  );
}
