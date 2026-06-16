import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const caseStudies = [
  {
    title: "BharatBrew Coffee Branding",
    category: "BRAND IDENTITY / PACKAGING",
    desc: "A premium coffee brand direction with earthy tones, packaging mood, and a clean visual system.",
    image: "/images/bharatbrew_branding.png",
    aspect: "aspect-[4/3] md:aspect-[4/5]", // Tall editorial aspect
  },
  {
    title: "ABHIVE Studios Identity",
    category: "CINEMATIC BRAND IDENTITY",
    desc: "A film studio identity concept built around cinematic symbols, strong contrast, and visual storytelling.",
    image: "/images/abhive_studios.png",
    aspect: "aspect-[4/3]", // Wide aspect
  },
  {
    title: "Product Visual Experiments",
    category: "PRODUCT / COMMERCIAL VISUALS",
    desc: "High-end product compositions, realistic lighting, and premium e-commerce-style presentation.",
    image: "/images/product_visuals.png",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Social Media Design Archive",
    category: "SOCIAL / CAMPAIGN DESIGN",
    desc: "Posters, thumbnails, launch creatives, campaign layouts, and marketing visuals created for digital platforms.",
    image: "/images/social_media_archive.png",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
  }
];

export default function FeaturedCaseStudies() {
  return (
    <section className="py-24 md:py-32 border-b border-neutral-900 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
            FEATURED PROJECTS
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white max-w-xl">
            Case Studies
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {caseStudies.map((study, index) => {
            // Apply vertical offsets for odd columns on large screens to create asymmetrical rhythm
            const offsetClass = index % 2 === 1 ? "md:translate-y-16" : "";

            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col group ${offsetClass}`}
              >
                {/* Wrapped in SpotlightCard for mouse trails/spotlight glow & magnetic physics */}
                <SpotlightCard 
                  className="w-full bg-black/40 border border-neutral-900 hover:border-neutral-700/60 p-4 rounded-3xl"
                  hoverYOffset={0}
                >
                  <div 
                    data-cursor="explore" // Triggers the CustomCursor badge text "Explore"
                    className={`w-full ${study.aspect} overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-900 relative cursor-pointer`}
                  >
                    
                    {/* Shadow overlay gradient for maximum text readability and depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500 z-10" />

                    {/* Image Scales on Hover */}
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                    />
                    
                    {/* Floating Action Badge - Slides and fades in */}
                    <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg transform group-hover:translate-x-0 translate-x-2">
                      <span className="text-[9px] tracking-widest text-neutral-300 font-mono uppercase font-bold">EXPLORE</span>
                      <ArrowUpRight size={10} className="text-white animate-pulse" />
                    </div>
                  </div>

                  {/* Case Study Details */}
                  <div className="mt-6 flex flex-col items-start gap-2 px-2 pb-2">
                    <span className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase font-mono font-bold">
                      {study.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neutral-300 transition-colors duration-300 font-display">
                      {study.title}
                    </h3>
                    <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-lg">
                      {study.desc}
                    </p>

                    <a 
                      href="#contact"
                      className="mt-3 text-xs uppercase tracking-widest text-white/60 hover:text-white inline-flex items-center gap-1 group-hover:underline decoration-neutral-500 underline-offset-4 font-mono"
                    >
                      View Details
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Spacing bottom offset to balance the asymmetric grid */}
        <div className="hidden md:block h-16" />

      </div>
    </section>
  );
}
