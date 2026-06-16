import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import HeroPortfolioCards from './HeroPortfolioCards';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-24 pb-16 md:pb-24 overflow-hidden bg-black"
    >
      {/* Background radial soft light for depth */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-neutral-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[20vw] h-[20vw] bg-white/[0.01] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        
        {/* Left Side Copywriting */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Header Subtitle */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono font-medium">
              PRADEEP V
            </h2>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="hero-title text-[clamp(3.5rem,9.5vw,10.5rem)] font-bold text-white mb-8 leading-[0.85] tracking-tighter"
          >
            Visual<br />
            <span className="text-neutral-500 font-normal italic font-display font-light">Designer</span>
          </motion.h1>
          
          {/* Subtitle / Description */}
          <motion.p 
            variants={itemVariants}
            className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10"
          >
            I create brand identities, social-first creatives, product visuals, and cinematic digital compositions for brands, creators, and studios.
          </motion.p>

          {/* Call-to-actions buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* View Works Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#works"
              onClick={(e) => handleScrollTo(e, 'works')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-semibold rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:bg-neutral-200 font-mono"
            >
              View Works
              <motion.span
                className="inline-block"
                variants={{
                  hover: { x: 3 }
                }}
                whileHover="hover"
              >
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.span>
            </motion.a>

            {/* Let's Talk Button */}
            <motion.a
              whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-neutral-800 rounded-full text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-all duration-300 bg-neutral-950/20 font-mono"
            >
              Let’s Talk
              <MessageSquare size={14} className="group-hover:scale-105 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side Stack of Portfolio Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          <HeroPortfolioCards />
        </motion.div>
      </div>

      {/* Editorial grid division border at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-950" />
    </section>
  );
}
