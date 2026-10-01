import { motion } from 'framer-motion';
import { User, Zap, Heart, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t-2 border-retro-border bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col items-start md:items-center relative">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-bg border-2 border-retro-border mb-4 shadow-retro-sm ui-scratch rotate-1">
            <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
              PLAYER PROFILE
            </span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-display font-bold text-retro-text uppercase relative">
            <span className="relative z-10">About Me</span>
            <span className="absolute top-1 left-1 text-retro-text/10 z-0 select-none">About Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Retro Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 bg-retro-bg border-4 border-retro-border shadow-retro flex flex-col relative"
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />
            
            <div className="bg-retro-border text-white px-3 py-1.5 flex justify-between items-center font-mono text-xs uppercase tracking-widest select-none">
              <span>PLAYER_1.SYS</span>
              <div className="flex gap-1 text-[10px]">
                <Heart size={12} className="text-retro-red" fill="#C13030" />
                <Heart size={12} className="text-retro-red" fill="#C13030" />
                <Heart size={12} className="text-retro-red" fill="#C13030" />
              </div>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 border-4 border-retro-border bg-white mb-6 flex items-center justify-center shadow-retro-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:8px_8px] opacity-10" />
                <User size={48} className="text-retro-gray relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-0 right-0 bg-retro-border text-white text-[10px] font-mono px-1 font-bold z-20">
                  PV
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 font-mono text-xs uppercase tracking-widest">
                <div className="flex justify-between border-b-2 border-retro-border border-dashed pb-1">
                  <span className="text-retro-gray">User</span>
                  <span className="font-bold text-retro-text">Pradeep V</span>
                </div>
                <div className="flex justify-between border-b-2 border-retro-border border-dashed pb-1">
                  <span className="text-retro-gray">Location</span>
                  <span className="font-bold text-retro-text">Bengaluru, IN</span>
                </div>
                <div className="flex justify-between border-b-2 border-retro-border border-dashed pb-1">
                  <span className="text-retro-gray">Focus</span>
                  <span className="font-bold text-retro-blue text-right max-w-[120px]">Vis Design, Branding, Motion</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-retro-gray">Status</span>
                  <span className="font-bold text-retro-green flex items-center gap-1 bg-retro-green/10 px-1 border border-retro-green">
                    <span className="w-1.5 h-1.5 bg-retro-green rounded-full animate-blink" />
                    OPEN TO WORK
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col gap-8 bg-white border-2 border-retro-border shadow-retro p-8 md:p-12 relative"
          >
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 border border-retro-border" />
              <div className="w-2 h-2 border border-retro-border" />
            </div>

            <p className="text-xl sm:text-2xl text-retro-text font-bold font-sans leading-relaxed">
              I’m <span className="text-retro-blue font-display text-3xl uppercase tracking-widest bg-retro-bg px-1 border border-retro-border">Pradeep V</span>, a Visual Designer based in Bengaluru. I create clean, bold, and cinematic visual work across branding, social media, product visuals, motion, and digital layouts.
            </p>
            
            <p className="text-base text-retro-text/80 font-medium font-sans leading-relaxed max-w-2xl">
              My work focuses on strong composition, modern typography, visual storytelling, and polished presentation. I like making brands and ideas look sharper, clearer, and more memorable.
            </p>

            <div className="mt-4 flex gap-4 border-t-2 border-retro-border pt-6">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-retro-green" />
                <span className="font-mono text-xs font-bold uppercase">STRATEGY</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-retro-orange" />
                <span className="font-mono text-xs font-bold uppercase">EXECUTION</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
