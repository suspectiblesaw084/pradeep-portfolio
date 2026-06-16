import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    num: "01",
    title: "Brand Identity & Logo Systems",
    desc: "Visual systems, logo directions, and premium brand language for modern identities.",
    image: "/images/abhive_studios.png"
  },
  {
    num: "02",
    title: "Social Media Creatives",
    desc: "Scroll-stopping posts, thumbnails, campaign visuals, and marketing assets.",
    image: "/images/social_media_archive.png"
  },
  {
    num: "03",
    title: "Product & E-commerce Visuals",
    desc: "Clean commercial visuals, product compositions, and catalog-ready creatives.",
    image: "/images/product_visuals.png"
  },
  {
    num: "04",
    title: "3D-Inspired Visual Direction",
    desc: "Cinematic compositions, product-style scenes, and Blender-based visual experiments.",
    image: "/images/product_visuals.png"
  },
  {
    num: "05",
    title: "Motion Graphics & Video Assets",
    desc: "Animated layouts, title cards, reels, promo visuals, and video design elements.",
    image: "/images/abhive_studios.png"
  },
  {
    num: "06",
    title: "UI Layout & Web Concepts",
    desc: "Clean digital layouts, landing page concepts, and portfolio-style web interfaces.",
    image: "/images/social_media_archive.png"
  }
];

export default function SelectedWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      id="works" 
      className="py-24 md:py-32 border-b border-neutral-900 bg-black relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
              CURATED PORTFOLIO
            </span>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
              Selected Works
            </h2>
          </div>
          <p className="text-neutral-400 font-light text-sm max-w-xs md:text-right">
            A focused collection of branding, social media, product, motion, and digital visual projects.
          </p>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col border-t border-neutral-900">
          {projects.map((project, index) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="view" // Triggers the CustomCursor badge text "View"
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-neutral-900 cursor-pointer select-none hover:bg-neutral-950/30 transition-all duration-300 px-4 overflow-hidden"
            >
              {/* Sliding linear shine sweep overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out absolute top-0 left-0" />
              </div>

              {/* Left Details */}
              <div className="flex items-start md:items-center gap-6 md:gap-12 lg:gap-16 z-10 transition-transform duration-300 group-hover:translate-x-3">
                <span className="text-sm font-mono text-neutral-600 group-hover:text-white transition-colors duration-300 pt-1 md:pt-0">
                  {project.num}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-350 group-hover:text-white transition-colors duration-350 font-display">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 font-light max-w-xl">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Right Arrow / Mobile Image Preview */}
              <div className="flex items-center justify-between mt-4 md:mt-0 z-10">
                {/* Mobile static image view (Hidden on desktop) */}
                <div className="md:hidden w-full max-h-40 overflow-hidden rounded border border-neutral-900 mb-2">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-70"
                  />
                </div>
                
                <span className="text-neutral-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 hidden md:block">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Cursor-Following Floating Preview */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                left: mousePosition.x + 40,
                top: mousePosition.y - 120,
                pointerEvents: 'none',
              }}
              className="hidden md:block w-72 h-48 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-neutral-850 z-30"
            >
              <img
                src={projects[hoveredIndex].image}
                alt="Project Preview"
                className="w-full h-full object-cover filter brightness-90 saturate-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-[9px] tracking-widest text-white/80 font-mono uppercase bg-black/80 px-2.5 py-1 rounded border border-white/5 backdrop-blur-sm">
                  Preview Work
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
