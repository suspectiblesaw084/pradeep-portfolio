import { motion } from 'framer-motion';

export default function RetroFog() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden mix-blend-overlay">
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-2%', '2%', '-2%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 30% 50%, #E6C229 0%, transparent 40%), radial-gradient(circle at 70% 60%, #1A1A1A 0%, transparent 50%)'
        }}
      />
      <motion.div
        animate={{
          x: ['5%', '-5%', '5%'],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 40%, transparent 60%)',
          backgroundSize: '100% 200%'
        }}
      />
    </div>
  );
}
