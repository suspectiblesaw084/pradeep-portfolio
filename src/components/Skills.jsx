import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const software = [
  { name: "Adobe Photoshop", category: "Image Editing / Compositing" },
  { name: "Adobe Illustrator", category: "Vector Design / Logo Systems" },
  { name: "Figma", category: "UI Layout / Digital Design" },
  { name: "Blender", category: "3D Visuals / Product Scenes" },
  { name: "After Effects", category: "Motion Design / Animated Assets" },
  { name: "Premiere Pro", category: "Video Editing / Promo Cuts" },
  { name: "Canva", category: "Quick Layouts / Social Assets" },
  { name: "Lightroom", category: "Color Correction / Photo Direction" },
];

const capabilities = [
  "Brand Identity", 
  "Logo Design", 
  "Social Media Design", 
  "Poster Design", 
  "Product Visualization", 
  "E-commerce Creatives", 
  "Motion Graphics", 
  "3D Composition", 
  "UI Layout Design", 
  "Photography Direction", 
  "Video Editing",
  "Visual Direction"
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-neutral-900 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
            EXPERTISE
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            Tools & Capabilities
          </h2>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Software Toolset */}
          <div className="lg:col-span-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono font-bold mb-8">
              // SOFTWARE TOOLSET
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {software.map((tool) => (
                <SpotlightCard
                  key={tool.name}
                  hoverYOffset={-6} // Card lifts slightly upward by -6px on hover
                  className="border border-neutral-900 bg-transparent hover:border-neutral-500 transition-colors duration-300"
                >
                  <div className="p-5 flex flex-col justify-between h-24 relative group select-none">
                    {/* Tiny plus icon appearing in the top-right corner */}
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      +
                    </span>

                    <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-1">
                      <span className="text-sm font-semibold text-white">
                        {tool.name}
                      </span>
                      <span className="text-[9px] tracking-wide text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 uppercase font-mono">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Core Skills */}
          <div className="lg:col-span-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono font-bold mb-8">
              // CORE DESIGN SKILLS
            </h3>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-wrap gap-3"
            >
              {capabilities.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -3, // lifts slightly upward by -3px
                    borderColor: "rgba(255, 255, 255, 0.7)", // border turns brighter
                    color: "#ffffff", // text becomes white
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)" // soft white glow behind pill
                  }}
                  className="px-4 py-2.5 border border-neutral-900 rounded-full text-xs sm:text-sm text-neutral-400 font-light bg-neutral-950/40 cursor-default transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Tiny moving shine sweep left to right on hover */}
                  <span className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <span className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out absolute top-0 left-0" />
                  </span>

                  {/* Text expands slightly horizontally */}
                  <span className="relative z-10 transition-all duration-300 group-hover:mx-1 inline-block">
                    {skill}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* Editorial Philosophy Box */}
            <div className="mt-12 p-8 border border-neutral-900 border-dashed rounded-2xl flex flex-col gap-4 bg-neutral-950/10">
              <span className="text-[9px] tracking-widest text-neutral-600 font-mono uppercase font-bold">
                Design Philosophy
              </span>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                Good visuals should feel clear, intentional, and memorable. Every layout, type choice, color, and detail should serve the idea instead of just decorating it.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
