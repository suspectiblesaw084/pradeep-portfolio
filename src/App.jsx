import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import FeaturedCaseStudies from './components/FeaturedCaseStudies';
import Skills from './components/Skills';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BrandbooksPage from './components/BrandbooksPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <SelectedWorks />
      <FeaturedCaseStudies />
      <Skills />
      <Process />
      <About />
      <Contact />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden"
    >
      {/* Premium Custom Mouse Cursor system (active on Desktop) */}
      <CustomCursor />

      {/* Cinematic Film Grain Noise Overlay */}
      <div className="grain-overlay" />

      {/* Navigation Header */}
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/brandbooks" element={<BrandbooksPage />} />
        </Routes>
      </AnimatePresence>

      {/* Footer copyright */}
      <Footer />
    </motion.div>
  );
}
