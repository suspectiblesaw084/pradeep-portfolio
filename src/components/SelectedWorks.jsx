import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const projects = [
  {
    id: '01',
    title: 'Placeholder Brand Identity',
    category: 'BRAND IDENTITY',
    role: 'Visual Direction',
  },
  {
    id: '02',
    title: 'Placeholder Social Campaign',
    category: 'SOCIAL DESIGN',
    role: 'Campaign Layout',
  },
  {
    id: '03',
    title: 'Placeholder Product Visual',
    category: 'PRODUCT VISUAL',
    role: '3D Mockups',
  },
  {
    id: '04',
    title: 'Placeholder 3D Render',
    category: '3D COMPOSITION',
    role: 'Rendering',
  },
  {
    id: '05',
    title: 'Placeholder Motion Frame',
    category: 'MOTION GRAPHICS',
    role: 'Keyframing',
  },
  {
    id: '06',
    title: 'Placeholder UI Concept',
    category: 'DIGITAL LAYOUT',
    role: 'Wireframing',
  }
];

export default function SelectedWorks() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <section id="works" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="mb-12 border-b-[4px] border-double border-retro-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-bg border-2 border-retro-border mb-4 shadow-retro-sm relative ui-scratch -rotate-2">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-retro-border" />
              <span className="w-2 h-2 bg-retro-red animate-blink" />
              <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
                SELECT STAGE
              </span>
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-display font-bold text-retro-text uppercase relative">
              <span className="relative z-10">Selected Works</span>
              <span className="absolute top-1 left-1 text-retro-text/10 z-0">Selected Works</span>
            </h2>
          </div>
          <p className="text-retro-text font-mono text-xs max-w-xs md:text-right uppercase font-bold">
            A curated set of branding, social design, product visuals, motion work, and digital concepts.
          </p>
        </div>

        {/* Directory Header */}
        <div className="hidden md:flex items-center justify-between py-2 px-4 border-2 border-retro-border bg-[#1A1A1A] text-retro-bg mb-4 font-mono text-xs font-bold uppercase select-none">
          <div className="w-24">LVL</div>
          <div className="flex-1">MISSION_NAME</div>
          <div className="w-48 hidden lg:block">CLASS</div>
          <div className="w-48 hidden xl:block">ROLE</div>
          <div className="w-8 text-center">STS</div>
        </div>

        {/* Project Directory Rows */}
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              data-cursor="play"
              onClick={playClick}
              onMouseEnter={playHover}
              className="group flex flex-col md:flex-row md:items-center justify-between py-4 md:py-3 px-4 border-2 border-retro-border bg-white cursor-pointer select-none hover:bg-retro-blue hover:text-white transition-colors duration-150 shadow-retro hover:shadow-retro-hover active:translate-y-[2px] active:translate-x-[2px] active:shadow-retro-active relative overflow-hidden"
            >
              {/* Scanline sweep effect on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
              
              {/* Arcade Select Arrow (Hidden until hover) */}
              <div className="absolute left-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-150 hidden md:block text-white z-10">
                <ChevronRight size={20} className="animate-blink" />
              </div>

              <div className="flex items-center gap-4 flex-1 md:pl-8 z-10 relative">
                <span className="w-16 md:w-20 font-mono text-[10px] md:text-xs font-bold group-hover:text-white text-retro-gray uppercase">
                  STAGE {project.id}
                </span>
                
                <h3 className="text-lg md:text-xl font-bold font-sans uppercase tracking-tight">
                  {project.title}
                </h3>
              </div>

              <div className="hidden lg:block w-48 font-mono text-xs opacity-70 group-hover:opacity-100 font-bold uppercase z-10 relative">
                {project.category}
              </div>

              <div className="hidden xl:block w-48 font-mono text-xs opacity-70 group-hover:opacity-100 font-bold uppercase z-10 relative">
                {project.role}
              </div>

              <div className="flex items-center justify-between mt-4 md:mt-0 w-full md:w-auto z-10 relative">
                <span className="md:hidden font-mono text-[10px] opacity-70 group-hover:opacity-100 font-bold uppercase">
                  {project.category}
                </span>
                
                {/* Status Indicator */}
                <div className="w-8 flex justify-center items-center relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-4 h-4 border border-retro-yellow animate-ping rounded-full" />
                  </div>
                  <div className="w-3 h-3 border-2 border-retro-border bg-retro-bg group-hover:bg-retro-yellow transition-colors relative z-10" />
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
