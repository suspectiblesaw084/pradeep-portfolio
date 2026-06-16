import { motion } from 'framer-motion';

// Replace this PlaceholderVisual component with your real project image tags 
// (e.g. <img src="/images/my-project.jpg" alt="Project Name" />) once your actual work is ready.
export default function PlaceholderVisual({ variant = 1, label = "PLACEHOLDER VISUAL", index = "01", className = "" }) {
  // Normalize variant to be between 1 and 4
  const v = ((variant - 1) % 4) + 1;

  return (
    <div className={`w-full h-full relative bg-[#080808] overflow-hidden flex items-center justify-center border border-neutral-900/50 ${className}`}>
      
      {/* Variant 1: Thin dot grid + small center circle */}
      {v === 1 && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center relative z-10"
          >
            <div className="w-2 h-2 rounded-full bg-neutral-700" />
          </motion.div>
        </>
      )}

      {/* Variant 2: Diagonal pinstripes + minimal rectangle */}
      {v === 2 && (
        <>
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #262626 10px, #262626 11px)' }}
          />
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-24 h-32 border border-neutral-700 bg-black/50 backdrop-blur-sm relative z-10"
          />
        </>
      )}

      {/* Variant 3: Soft radial glow + corner brackets */}
      {v === 3 && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/40 via-black to-black opacity-60" />
          
          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-neutral-600" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-neutral-600" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-neutral-600" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-neutral-600" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-500 to-transparent relative z-10"
          />
        </>
      )}

      {/* Variant 4: Frosted overlapping cards */}
      {v === 4 && (
        <>
          <div className="absolute inset-0 bg-[#060606]" />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-20 h-28 border border-neutral-800 bg-neutral-900/40 backdrop-blur-md -ml-12 -mt-8"
            />
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute w-24 h-32 border border-neutral-700 bg-black/60 backdrop-blur-md ml-8 mt-6"
            />
          </div>
        </>
      )}

      {/* Shared Overlay Labels */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-20">
        <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-mono">
          {index}
        </span>
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono self-end bg-black/50 px-1 backdrop-blur-sm">
          {label}
        </span>
      </div>
      
    </div>
  );
}
