import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-b border-neutral-900 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-3">
            PROFILE
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            About Me
          </h2>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Metadata & Focus */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-6 font-mono text-[11px] tracking-widest text-neutral-500 uppercase"
          >
            <div className="pb-4 border-b border-neutral-900">
              <span className="text-neutral-600 block mb-1">Status</span>
              <span className="text-white font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to freelance & full-time opportunities
              </span>
            </div>
            
            <div className="pb-4 border-b border-neutral-900">
              <span className="text-neutral-600 block mb-1">Creative Focus</span>
              <span className="text-white font-medium normal-case">
                Brand visuals, social media, product visuals, motion, and digital design
              </span>
            </div>

            <div className="pb-4 border-b border-neutral-900">
              <span className="text-neutral-600 block mb-1">Location</span>
              <span className="text-white font-medium">Bengaluru, India</span>
            </div>
          </motion.div>

          {/* Right Column: Confident Biography Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light leading-relaxed">
              I’m <span className="text-white font-semibold font-display">Pradeep V</span>, a Visual Designer based in Bengaluru. I create clean, bold, and cinematic visual work across branding, social media, product visuals, motion, and digital layouts.
            </p>
            
            <p className="text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
              My work focuses on strong composition, modern typography, visual storytelling, and polished presentation. I like making brands and ideas look sharper, clearer, and more memorable.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
