import { motion } from 'framer-motion';

export default function BrandbooksPage() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen border-b border-neutral-900 bg-black relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
            BRANDBOOK ARCHIVE
          </span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            Brandbooks
          </h1>
          <p className="text-neutral-400 font-light text-base md:text-lg max-w-xl leading-relaxed">
            A curated collection of brand guidelines, identity systems, visual rules, and design documentation.
          </p>
        </div>

        {/* Temporary Placeholder UI Archive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, title: 'Placeholder Brandbook 01', category: 'BRAND GUIDELINES', desc: 'Temporary brandbook preview. Replace this with a real brand guideline PDF.', year: '2026' },
            { id: 2, title: 'Placeholder Identity Manual', category: 'IDENTITY SYSTEM', desc: 'Temporary identity system preview. Replace this with an actual brand manual.', year: '2026' },
            { id: 3, title: 'Placeholder Visual System', category: 'DESIGN DOCUMENTATION', desc: 'Temporary visual system preview. Replace this with a finished visual guideline book.', year: '2026' },
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col p-6 rounded-2xl bg-[#0a0a0a] border border-neutral-900 hover:border-neutral-700/60 transition-colors"
            >
              <div 
                data-cursor="view" 
                className="w-full aspect-[3/4] bg-neutral-950 border border-neutral-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono z-10">Cover Image</span>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] tracking-[0.2em] text-neutral-500 uppercase font-mono font-bold">
                  {item.category}
                </span>
                <span className="text-[9px] tracking-widest text-neutral-600 font-mono">
                  {item.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h3>
              
              <p className="text-neutral-400 text-sm font-light mb-6 flex-grow leading-relaxed">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-3 mt-auto">
                <button className="px-5 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest font-mono rounded-full hover:bg-neutral-200 transition-colors w-full cursor-none">
                  View Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
