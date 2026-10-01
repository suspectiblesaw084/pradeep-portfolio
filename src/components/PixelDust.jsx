import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PixelDust() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 40;
    
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.floor(Math.random() * 3) + 1, // 1px to 3px
      color: Math.random() > 0.8 ? '#E6C229' : (Math.random() > 0.5 ? '#808080' : '#404040'),
      duration: Math.random() * 15 + 15, // 15 to 30 seconds to fall
      delay: Math.random() * -30, // Start at different times
      wobble: Math.random() * 20 - 10, // horizontal drift
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-none"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: '-5%',
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.wobble, -p.wobble, 0]
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            },
            x: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay
            }
          }}
        />
      ))}
    </div>
  );
}
