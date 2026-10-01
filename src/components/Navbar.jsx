import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSoundEffects } from '../hooks/useSoundEffects';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Works', href: '/#works' },
  { name: 'Case Studies', href: '/#case-studies' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Brandbooks', href: '/brandbooks' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isMuted, toggleMute, playClick, playHover } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-retro-bg/90 backdrop-blur-md border-b-2 border-retro-border shadow-retro-sm py-2' 
          : 'bg-retro-bg/50 backdrop-blur-sm py-4 border-b-2 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo / System ID */}
        <Link 
          to="/" 
          onClick={() => {
            window.scrollTo(0, 0);
            handleLinkClick();
          }}
          className="flex items-center gap-3 cursor-none group"
        >
          <div className="w-8 h-8 bg-retro-blue border-2 border-retro-border flex items-center justify-center shadow-retro-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-retro-active transition-all">
            <span className="text-white font-display font-bold text-lg leading-none mt-0.5">PV</span>
          </div>
          <span className="font-mono font-bold text-sm tracking-widest hidden sm:block text-retro-border">SYS.ARCADE</span>
        </Link>

        {/* Mute Toggle and Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <button 
            onClick={() => { playClick(); toggleMute(); }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-3 py-1 mr-4 border-2 border-retro-border bg-white shadow-retro-sm hover:bg-retro-yellow transition-colors cursor-none active:translate-y-[2px]"
          >
            {isMuted ? <VolumeX size={14} className="text-retro-text" /> : <Volume2 size={14} className="text-retro-text" />}
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-text">
              {isMuted ? 'SOUND: OFF' : 'SOUND: ON'}
            </span>
          </button>

          {navLinks.map((link) => {
            if (link.href === '/brandbooks' || link.href === '/') {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="px-3 py-1 font-mono text-sm uppercase tracking-widest text-retro-text hover:bg-retro-border hover:text-retro-bg transition-colors cursor-none border-2 border-transparent hover:border-retro-border"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-3 py-1 font-mono text-sm uppercase tracking-widest text-retro-text hover:bg-retro-border hover:text-retro-bg transition-colors cursor-none border-2 border-transparent hover:border-retro-border"
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => { playClick(); toggleMute(); }}
            className="p-1 border-2 border-retro-border shadow-retro-sm bg-white cursor-none active:translate-y-1 transition-all"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button 
            className="p-1 border-2 border-retro-border shadow-retro-sm bg-retro-bg cursor-none active:translate-y-1 active:shadow-none transition-all"
            onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-retro-bg border-b-2 border-retro-border shadow-retro overflow-hidden absolute top-full left-0 w-full"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => {
                if (link.href === '/brandbooks' || link.href === '/') {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={handleLinkClick}
                      className="px-4 py-3 font-mono text-sm uppercase tracking-widest border-2 border-retro-border hover:bg-retro-border hover:text-retro-bg transition-colors text-center shadow-retro-sm active:translate-y-1 active:shadow-none"
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="px-4 py-3 font-mono text-sm uppercase tracking-widest border-2 border-retro-border hover:bg-retro-border hover:text-retro-bg transition-colors text-center shadow-retro-sm active:translate-y-1 active:shadow-none"
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
