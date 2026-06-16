import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PlaceholderVisual from './PlaceholderVisual';

/**
 * HeroPortfolioCards - A premium interactive stack of floating portfolio
 * cards with mouse parallax, spring tilts, hover zooms, and dynamic shadows.
 */
export default function HeroPortfolioCards() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax motion coordinates (-1 to 1 relative to container)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for high-end organic lag
  const springConfig = { damping: 30, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Track responsive status & screen width to scale down effects
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse coordinates on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      // Keep within [-1, 1] bounds
      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, mouseX, mouseY]);

  // Curated visual portfolio designer cards configuration
  const cardData = [
    {
      id: 1,
      // Change category label here
      category: "PLACEHOLDER / 01",
      // Change card title here
      title: "Project Preview",
      className: "w-full lg:w-[285px] lg:h-[340px] lg:absolute lg:left-[18%] lg:top-[20%] z-30 lg:rotate-[1deg]",
      depth: 12, // parallax translation scale
      tilt: true // allows 3D card tilt
    },
    {
      id: 2,
      // Change category label here
      category: "PLACEHOLDER / 02",
      // Change card title here
      title: "Brand Visual",
      className: "w-full lg:w-[200px] lg:h-[240px] lg:absolute lg:right-[8%] lg:top-[8%] z-10 lg:rotate-[3deg]",
      depth: 6,
      tilt: false
    },
    {
      id: 3,
      // Change category label here
      category: "PLACEHOLDER / 03",
      // Change card title here
      title: "Render Frame",
      className: "w-full lg:w-[195px] lg:h-[235px] lg:absolute lg:right-[12%] lg:bottom-[8%] z-15 lg:rotate-[-2deg]",
      depth: 8,
      tilt: false
    },
    {
      id: 4,
      // Change category label here
      category: "PLACEHOLDER / 04",
      // Change card title here
      title: "Campaign Layout",
      className: "w-full lg:w-[185px] lg:h-[225px] lg:absolute lg:left-[2%] lg:bottom-[12%] z-20 lg:rotate-[-4deg]",
      depth: 10,
      tilt: false
    },
    {
      id: 5,
      // Change category label here
      category: "PLACEHOLDER / UPDATE SOON",
      // Change card title here
      title: "Archive '26",
      className: "w-full lg:w-[150px] lg:h-[85px] lg:absolute lg:left-[10%] lg:top-[6%] z-40 lg:rotate-[4deg]",
      depth: 15,
      tilt: false,
      isTag: true
    }
  ];

  // Animation variants for load-in stagger effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full relative lg:h-[600px] py-8 lg:py-0 select-none overflow-visible flex flex-col gap-6"
    >
      {/* Background depth glow radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neutral-900/10 rounded-full blur-[100px] pointer-events-none lg:block hidden" />

      {/* Grid container for tablet & mobile, absolute stack for desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:block gap-6 w-full lg:h-full overflow-visible">
        {cardData.map((card, idx) => {
          // Responsive values: disable translations on mobile/tablet
          const cardX = useTransform(smoothMouseX, [-1, 1], [-card.depth, card.depth]);
          const cardY = useTransform(smoothMouseY, [-1, 1], [-card.depth, card.depth]);
          
          // Map mouse coordinates to 3D rotation tilts for the main card only
          const cardRotateX = card.tilt ? useTransform(smoothMouseY, [-1, 1], [4, -4]) : 0;
          const cardRotateY = card.tilt ? useTransform(smoothMouseX, [-1, 1], [-6, 6]) : 0;

          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              // Gentle float drift loops on the outer container
              animate={{
                y: [0, -6, 0],
                rotate: [0, 0.25, -0.25, 0],
              }}
              transition={{
                duration: 6 + idx, // offset frequency to keep it organic
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.15
              }}
              className={`${card.className} overflow-visible group`}
            >
              {/* Inner container applying parallax and tilts */}
              <motion.div
                style={{
                  x: isMobile ? 0 : cardX,
                  y: isMobile ? 0 : cardY,
                  rotateX: isMobile ? 0 : cardRotateX,
                  rotateY: isMobile ? 0 : cardRotateY,
                  transformStyle: "preserve-3d"
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8, // slight lift on hover
                  transition: { type: "spring", stiffness: 350, damping: 20 }
                }}
                data-cursor="view" // triggers custom pointer scale/badge
                className="w-full h-full glass glass-border rounded-2xl p-4 shadow-2xl relative flex flex-col justify-between overflow-hidden cursor-none"
              >
                {/* Micro hover shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                {card.isTag ? (
                  // Typographic floating tag card design
                  <div className="flex flex-col justify-between h-full py-1">
                    <div className="flex justify-between items-center text-[8px] tracking-widest font-mono text-neutral-500 select-none">
                      <span>{card.category}</span>
                      <span className="text-neutral-700">PV // '26</span>
                    </div>
                    <div className="flex justify-between items-end mt-4 select-none">
                      <span className="text-xs font-bold tracking-wider text-neutral-300 group-hover:text-white uppercase transition-colors duration-300">
                        {card.title}
                      </span>
                      <ArrowUpRight size={12} className="text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                ) : (
                  // Standard card design with image preview area
                  <div className="flex flex-col h-full overflow-visible">
                    {/* Header */}
                    <div className="flex justify-between items-center text-[9px] tracking-widest font-mono text-neutral-500 mb-3 select-none">
                      <span>{card.category}</span>
                      <span className="text-neutral-700">0{card.id}</span>
                    </div>

                    {/* Image Area */}
                    <div className="w-full flex-grow rounded-lg overflow-hidden bg-neutral-900/60 border border-neutral-800/20 mb-3 select-none aspect-video lg:aspect-auto">
                      <PlaceholderVisual variant={card.id} index={`0${card.id}`} label="PLACEHOLDER VISUAL" />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-auto select-none">
                      <span className="text-xs font-bold tracking-wider text-neutral-300 group-hover:text-white uppercase transition-colors duration-300">
                        {card.title}
                      </span>
                      <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
