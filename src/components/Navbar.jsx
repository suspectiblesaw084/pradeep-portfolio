import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navigate = useNavigate();

  // Magnetic Button state handlers
  const buttonRef = useRef(null);
  const btnTargetX = useMotionValue(0);
  const btnTargetY = useMotionValue(0);
  const btnX = useSpring(btnTargetX, { damping: 15, stiffness: 180 });
  const btnY = useSpring(btnTargetY, { damping: 15, stiffness: 180 });

  const handleButtonMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Limit displacement to keep it subtle
    btnTargetX.set(x * 0.3);
    btnTargetY.set(y * 0.3);
  };

  const handleButtonMouseLeave = () => {
    btnTargetX.set(0);
    btnTargetY.set(0);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Works', href: '#works' },
    { name: 'Skills', href: '#skills' },
    { name: 'Brandbooks', href: '/brandbooks' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Monitor scrolling to add subtle border and background color opacity changes
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section for active tab styling
      const sections = ['home', 'works', 'skills', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle sticky scrolling on homepage and route redirects
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');

    if (location.pathname !== '/') {
      // Redirect to homepage first
      navigate('/');
      
      // Delay to allow homepage mounting before triggering scroll
      setTimeout(() => {
        const element = document.getElementById(targetId);
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
      }, 150);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Offset for sticky navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 overflow-visible transition-all duration-300 border-b ${
          isScrolled || location.pathname !== '/'
            ? 'bg-black/80 border-neutral-900/60 backdrop-blur-md py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <MotionLink 
            to="/" 
            onClick={(e) => handleScrollTo(e, '#home')}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-9 h-9 rounded-[10px] bg-white text-black font-extrabold font-display text-sm tracking-tighter flex items-center justify-center select-none shadow-md overflow-hidden cursor-none"
          >
            PV
          </MotionLink>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isRoute = link.href.startsWith('/');
                const targetId = isRoute ? 'brandbooks' : link.href.replace('#', '');
                const isActive = isRoute 
                  ? location.pathname === link.href 
                  : location.pathname === '/' && activeSection === targetId;

                return (
                  <li key={link.name}>
                    {isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xs font-mono uppercase tracking-widest relative py-1 transition-colors duration-300 group cursor-none ${
                          isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {link.name}
                        {/* Smooth slide-in underline on hover for inactive items */}
                        {!isActive && (
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-600 group-hover:w-full transition-all duration-300 ease-out" />
                        )}
                        {/* Layout-linked active underline */}
                        {isActive && (
                          <motion.span 
                            layoutId="navActiveLine"
                            className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className={`text-xs font-mono uppercase tracking-widest relative py-1 transition-colors duration-300 group cursor-none ${
                          isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {link.name}
                        {!isActive && (
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-600 group-hover:w-full transition-all duration-300 ease-out" />
                        )}
                        {isActive && (
                          <motion.span 
                            layoutId="navActiveLine"
                            className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Magnetic Sticky Contact Action */}
            <motion.a
              ref={buttonRef}
              style={{ x: btnX, y: btnY }}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-4 py-2 border border-neutral-800 hover:border-neutral-500 rounded-full text-xs tracking-widest uppercase transition-colors duration-300 bg-neutral-950/40 hover:bg-white hover:text-black flex items-center gap-1.5 font-mono cursor-none"
            >
              Get in Touch
              <ArrowUpRight size={12} />
            </motion.a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neutral-400 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-lg flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isRoute = link.href.startsWith('/');
                const targetId = isRoute ? 'brandbooks' : link.href.replace('#', '');
                const isActive = isRoute 
                  ? location.pathname === link.href 
                  : location.pathname === '/' && activeSection === targetId;

                return isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-bold tracking-tight font-display transition-colors py-2 pl-4 ${
                      isActive ? 'text-white border-l-2 border-white' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`text-2xl font-bold tracking-tight font-display transition-colors py-2 pl-4 ${
                      isActive ? 'text-white border-l-2 border-white' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-6 pl-4">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 rounded-full text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all font-mono"
                >
                  Get in Touch
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
