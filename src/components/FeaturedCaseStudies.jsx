import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import PlaceholderVisual from './PlaceholderVisual';
import { useSoundEffects } from '../hooks/useSoundEffects';

const caseStudies = [
  {
    id: 1,
    title: 'Placeholder Branding Project',
    category: 'BRAND IDENTITY / PLACEHOLDER',
    description: 'A temporary brand identity preview card. Replace this with a real project once the final case study is ready.',
  },
  {
    id: 2,
    title: 'Placeholder Studio Identity',
    category: 'VISUAL IDENTITY / PLACEHOLDER',
    description: 'A temporary visual identity preview card. Replace this with an actual logo or brand system project later.',
  },
  {
    id: 3,
    title: 'Placeholder Product Visual',
    category: 'PRODUCT VISUAL / PLACEHOLDER',
    description: 'A temporary product visual preview card. Replace this with a real product render or commercial visual later.',
  },
  {
    id: 4,
    title: 'Placeholder Social Archive',
    category: 'SOCIAL DESIGN / PLACEHOLDER',
    description: 'A temporary social media design preview card. Replace this with real posters, thumbnails, or campaign designs later.',
  }
];

export default function FeaturedCaseStudies() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <section id="case-studies" className="py-24 md:py-32 border-t-2 border-retro-border bg-retro-bg relative">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_2px,transparent_2px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-2 border-retro-border bg-white p-6 shadow-retro relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-retro-border" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-retro-border" />
          
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-bg border-2 border-retro-border mb-4 shadow-retro-sm ui-scratch rotate-1">
              <span className="w-2 h-2 bg-retro-blue animate-blink" />
              <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
                HIGH SCORES //
              </span>
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-display font-bold text-retro-text uppercase relative">
              <span className="relative z-10">Case Studies</span>
              <span className="absolute top-1 left-1 text-retro-text/10 z-0 select-none">Case Studies</span>
            </h2>
          </div>
          <a
            href="#contact"
            onClick={playClick}
            onMouseEnter={playHover}
            className="retro-btn inline-flex items-center gap-2 cursor-none bg-retro-bg hover:bg-white relative group"
          >
            <div className="absolute top-0 right-0 w-2 h-2 bg-retro-border group-hover:bg-retro-blue transition-colors" />
            Access Files
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Application Window Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {caseStudies.map((study, index) => {
            const offsetClass = index % 2 === 1 ? "md:translate-y-12" : "";

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${offsetClass}`}
              >
                {/* Application Window Container */}
                <div 
                  data-cursor="explore" 
                  className="w-full bg-white border-4 border-retro-border shadow-retro flex flex-col cursor-none group hover:shadow-retro-hover transition-all duration-150 active:translate-y-1 active:translate-x-1 active:shadow-retro-active relative"
                >
                  {/* Pixel Corners via pseudo-elements manually */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-border" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-retro-border" />

                  {/* Window Title Bar */}
                  <div className="bg-retro-border text-white px-3 py-1.5 flex justify-between items-center font-mono text-xs uppercase tracking-widest select-none">
                    <span className="truncate pr-4">FILE 0{study.id}</span>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span>STATUS:</span>
                      <span className="text-retro-yellow">PLACEHOLDER</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1A1A1A]">
                    {/* Visual Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden border-2 border-retro-border bg-white group-hover:bg-retro-blue transition-colors duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
                      <PlaceholderVisual 
                        variant={study.id} 
                        label="CASE STUDY" 
                        index={`0${study.id}`} 
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>

                  {/* Window Content / Metadata */}
                  <div className="p-5 flex flex-col gap-3 bg-white border-t-2 border-retro-border">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-retro-blue font-bold">
                      [{study.category}]
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-retro-text uppercase">
                      {study.title}
                    </h3>
                    <p className="text-sm text-retro-text font-medium leading-relaxed mb-4">
                      {study.description}
                    </p>
                    <button 
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="retro-btn-primary w-full self-start cursor-none group-active:translate-y-1 group-active:translate-x-1 group-active:shadow-none bg-retro-border hover:bg-black relative"
                    >
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white" />
                      VIEW DETAILS
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
