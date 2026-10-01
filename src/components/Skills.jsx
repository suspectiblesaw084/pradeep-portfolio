import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

const skills = [
  'Brand Identity',
  'Logo Design',
  'Social Media Design',
  'Poster Design',
  'Product Visualization',
  'E-commerce Creatives',
  'Motion Graphics',
  '3D Composition',
  'UI Layout Design',
  'Photography Direction',
  'Video Editing',
  'Visual Direction'
];

const tools = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Figma',
  'Blender',
  'After Effects',
  'Premiere Pro',
  'Canva',
  'Lightroom'
];

function InteractiveCard({ title, items, color, titleTag }) {
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="relative w-full bg-white border-4 border-retro-border shadow-retro flex flex-col">
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />
      
      <div className={`bg-retro-border text-white px-3 py-1.5 flex justify-between items-center font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none`}>
        <span>{titleTag}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white" />
          <div className="w-2 h-2 bg-retro-red" />
        </div>
      </div>
      <div className="p-6 bg-retro-bg grow flex flex-col">
        <h3 className={`text-2xl font-display font-bold uppercase mb-6 text-${color}`}>{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <motion.span
              key={item}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 0 }}
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-3 py-1.5 border-2 border-retro-border bg-white text-xs md:text-sm text-retro-text font-mono font-bold select-none cursor-none shadow-retro-sm hover:shadow-retro transition-all hover:bg-retro-yellow relative"
            >
              <div className="absolute top-0 right-0 w-1 h-1 bg-retro-border" />
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t-2 border-retro-border bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-bg border-2 border-retro-border mb-4 shadow-retro-sm mx-auto relative ui-scratch -rotate-1">
            <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-retro-border" />
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-retro-border" />
            <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
              PLAYER INVENTORY
            </span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-display font-bold text-retro-text uppercase relative inline-block">
            <span className="relative z-10">Tools & Capabilities</span>
            <span className="absolute top-1 left-1 text-retro-text/10 z-0">Tools & Capabilities</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <InteractiveCard title="Capabilities" items={skills} color="retro-blue" titleTag="SKILLS.INV" />
          <InteractiveCard title="Software Toolkit" items={tools} color="retro-green" titleTag="SOFTWARE.INV" />
        </div>
      </div>
    </section>
  );
}
