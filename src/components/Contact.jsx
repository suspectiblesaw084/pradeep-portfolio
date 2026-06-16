import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

// Replace these with your actual social profile URLs
// Replace this placeholder link with your real Instagram URL
const INSTAGRAM_URL = "https://www.instagram.com/pradeeep.04?igsh=MXU1MWViNTExcWd5cA==";

// Replace this placeholder link with your real LinkedIn URL
const LINKEDIN_URL = "https://www.linkedin.com/in/pradeep-v-172099342";

// Replace this placeholder email with your real email address
const EMAIL_ADDRESS = "pradeepvenu64@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 border-b border-neutral-900 bg-[#050505] relative overflow-hidden">
      {/* Background glowing light gradient */}
      <div className="absolute -bottom-20 right-10 w-[30vw] h-[30vw] bg-white/[0.01] rounded-full blur-[90px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Call to Action Headers */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-4">
              GET IN TOUCH
            </span>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-bold text-white mb-8"
            >
              Have a visual idea? <br />
              Let’s make it look <br />
              <span className="text-neutral-500 font-normal italic font-display font-light">premium.</span>
            </motion.h2>
            
            <p className="text-neutral-400 font-light text-base md:text-lg max-w-xl mb-12 leading-relaxed">
              Available for branding, social media creatives, product visuals, motion graphics, digital design, and visual direction projects.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${EMAIL_ADDRESS}`}
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-white text-black font-semibold rounded-full text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 font-mono"
              >
                Send Email
                <Mail size={14} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
                whileTap={{ scale: 0.98 }}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-neutral-800 rounded-full text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 bg-neutral-950/20 font-mono"
              >
                View LinkedIn
                <Linkedin size={14} />
              </motion.a>
            </div>
          </div>

          {/* Right Side: Social links & Email Details */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:mt-16 font-mono text-xs tracking-widest uppercase">
            
            <div className="pb-6 border-b border-neutral-900">
              <span className="text-neutral-600 block mb-2">// Direct Mail</span>
              <a 
                href={`mailto:${EMAIL_ADDRESS}`}
                className="text-sm text-white font-medium hover:text-neutral-400 transition-colors duration-300 normal-case"
              >
                {EMAIL_ADDRESS}
              </a>
            </div>

            <div className="pb-6 border-b border-neutral-900">
              <span className="text-neutral-600 block mb-3">// Social Channels</span>
              <div className="flex flex-col gap-3">
                <a 
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-neutral-400 transition-colors duration-300 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Instagram size={14} className="text-neutral-500" />
                    Instagram
                  </span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-neutral-400 transition-colors duration-300 flex items-center justify-between group animate-none"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin size={14} className="text-neutral-500" />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            <div>
              <span className="text-neutral-600 block mb-2">// Availability</span>
              <span className="text-white font-medium">Open to opportunities // 2026</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
