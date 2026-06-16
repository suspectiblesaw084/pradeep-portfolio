import { motion } from 'framer-motion';
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

export default function App() {
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

      {/* Main Single Page Content */}
      <main>
        {/* Hero Area */}
        <Hero />

        {/* Selected Works (Interactive lists with hover previews) */}
        <SelectedWorks />

        {/* Featured Case Studies (Asymmetric grid inside SpotlightCards) */}
        <FeaturedCaseStudies />

        {/* Tools & Capabilities */}
        <Skills />

        {/* Process Steps */}
        <Process />

        {/* About Profile Info */}
        <About />

        {/* Contact Block */}
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer />
    </motion.div>
  );
}
