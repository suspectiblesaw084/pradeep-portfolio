import { motion } from 'framer-motion';

export default function PlaceholderVisual({ variant = 1, label = "VISUAL", index = "01", className = "" }) {
  const v = ((variant - 1) % 4) + 1;

  return (
    <div className={`w-full h-full relative bg-white overflow-hidden flex items-center justify-center font-mono ${className}`}>
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.15]" />

      {/* Variant 1: Folder/File Icon */}
      {v === 1 && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center gap-2"
        >
          {/* Retro Folder Shape */}
          <div className="w-20 h-16 border-2 border-retro-border bg-retro-yellow shadow-retro-sm relative">
            <div className="absolute -top-3 left-0 w-8 h-3 border-t-2 border-l-2 border-r-2 border-retro-border bg-retro-yellow" />
            <div className="absolute top-2 left-2 w-12 h-2 bg-white border-2 border-retro-border opacity-50" />
            <div className="absolute top-6 left-2 w-8 h-2 bg-white border-2 border-retro-border opacity-50" />
          </div>
          <span className="bg-retro-border text-white text-[10px] px-2 py-0.5 uppercase">file_{index}.sys</span>
        </motion.div>
      )}

      {/* Variant 2: Terminal Output */}
      {v === 2 && (
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-32 h-32 border-2 border-retro-border bg-[#1A1A1A] p-2 flex flex-col gap-1 relative z-10 shadow-retro-sm"
        >
          <div className="w-full h-2 bg-[#333]" />
          <div className="w-3/4 h-2 bg-retro-green mb-2" />
          <div className="text-retro-green text-[8px]">{'>'} LOAD SYS</div>
          <div className="text-retro-green text-[8px]">{'>'} RENDERING...</div>
          <div className="flex gap-1 mt-auto">
            <div className="w-2 h-2 bg-retro-green animate-blink" />
          </div>
        </motion.div>
      )}

      {/* Variant 3: Abstract Pixel Matrix */}
      {v === 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 w-24 h-24 grid grid-cols-4 grid-rows-4 gap-1 p-1 border-2 border-retro-border bg-retro-bg shadow-retro-sm"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`border border-retro-border ${i % 3 === 0 ? 'bg-retro-blue' : i % 5 === 0 ? 'bg-retro-red' : 'bg-white'}`}
            />
          ))}
        </motion.div>
      )}

      {/* Variant 4: Error/Alert Dialog */}
      {v === 4 && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 w-40 border-2 border-retro-border bg-white shadow-retro flex flex-col"
        >
          <div className="bg-retro-border text-white text-[8px] px-1 py-0.5 flex justify-between">
            <span>ALERT</span>
            <span>x</span>
          </div>
          <div className="p-3 flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-retro-border bg-retro-red flex items-center justify-center text-white font-bold text-xs shrink-0 rounded-full">
              !
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="w-full h-1.5 bg-retro-border" />
              <div className="w-2/3 h-1.5 bg-retro-gray" />
            </div>
          </div>
          <div className="p-2 border-t-2 border-retro-border flex justify-end bg-retro-bg">
            <div className="border-2 border-retro-border px-2 py-0.5 text-[8px] bg-white text-retro-text font-bold">OK</div>
          </div>
        </motion.div>
      )}

      {/* Shared Overlay Labels */}
      <div className="absolute bottom-2 left-2 pointer-events-none z-20">
        <span className="text-[10px] uppercase tracking-widest text-retro-text font-bold bg-white px-1 border-2 border-retro-border shadow-retro-sm">
          {label} {index}
        </span>
      </div>
      
    </div>
  );
}
