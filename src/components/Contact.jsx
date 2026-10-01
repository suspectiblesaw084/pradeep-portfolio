import { motion } from 'framer-motion';
import { Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

const INSTAGRAM_URL = "https://www.instagram.com/pradeeep.04?igsh=MXU1MWViNTExcWd5cA==";
const LINKEDIN_URL = "https://www.linkedin.com/in/pradeep-v-172099342";
const EMAIL_ADDRESS = "pradeepvenu64@gmail.com";

export default function Contact() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <section id="contact" className="py-24 md:py-36 border-t-2 border-b-2 border-retro-border bg-retro-bg relative overflow-hidden">
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_2px,transparent_2px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Call to Action Headers */}
          <div className="lg:col-span-8 flex flex-col items-start bg-white border-4 border-retro-border shadow-retro p-8 md:p-12 relative">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-border" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-retro-border" />

            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-retro-yellow border-2 border-retro-border mb-4 shadow-retro-sm ui-scratch -rotate-2">
                <span className="text-[10px] uppercase tracking-widest text-retro-text font-mono font-bold">
                  CONTINUE?_ 9
                </span>
              </div>
              <h2 className="section-title text-4xl md:text-6xl font-display font-bold text-retro-text uppercase leading-tight mb-6 relative">
                <span className="relative z-10">Have a visual idea? <br/> Let’s build something memorable.</span>
                <span className="absolute top-1 left-1 text-retro-text/10 z-0 select-none">Have a visual idea? <br/> Let’s build something memorable.</span>
              </h2>
              <p className="text-retro-text/80 font-medium max-w-xl text-lg font-sans">
                Available for branding, social media creatives, product visuals, motion graphics, digital design, and visual direction projects.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a 
                href={`mailto:${EMAIL_ADDRESS}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="retro-btn-primary flex items-center gap-2 cursor-none relative"
              >
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white" />
                Send Email
                <ArrowUpRight size={16} />
              </a>
              <a 
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="retro-btn flex items-center gap-2 cursor-none bg-retro-bg hover:bg-retro-blue hover:text-white transition-colors relative"
              >
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-retro-border" />
                View LinkedIn
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Side: Communication Terminal */}
          <div className="lg:col-span-4 flex flex-col border-4 border-retro-border bg-[#1A1A1A] shadow-retro relative">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-retro-border" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-retro-border" />

            <div className="bg-retro-border text-white px-3 py-1.5 flex justify-between items-center font-mono text-xs uppercase tracking-widest select-none border-b-2 border-retro-border">
              <span>network_links.exe</span>
              <span>_ O X</span>
            </div>
            
            <div className="p-6 font-mono text-xs tracking-widest uppercase flex flex-col gap-6 text-retro-green">
              <div>
                <span className="opacity-50 block mb-2">{'>'} PING EMAIL</span>
                <a 
                  href={`mailto:${EMAIL_ADDRESS}`}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="font-bold text-white hover:text-retro-yellow transition-colors duration-300 normal-case cursor-none inline-block border-b border-transparent hover:border-retro-yellow"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>

              <div>
                <span className="opacity-50 block mb-2">{'>'} PING SOCIAL</span>
                <div className="flex flex-col gap-4 mt-2">
                  <a 
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="font-bold text-white hover:text-retro-yellow transition-colors duration-300 flex items-center justify-between group cursor-none"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram size={14} className="opacity-50 group-hover:opacity-100" />
                      Instagram
                    </span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <a 
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="font-bold text-white hover:text-retro-yellow transition-colors duration-300 flex items-center justify-between group cursor-none"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin size={14} className="opacity-50 group-hover:opacity-100" />
                      LinkedIn
                    </span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 opacity-50">
                <span>{'>'} INSERT COIN</span>
                <span className="w-2 h-3 bg-retro-green animate-blink" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
