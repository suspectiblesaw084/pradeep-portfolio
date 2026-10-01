import Hero from './Hero';
import SelectedWorks from './SelectedWorks';
import FeaturedCaseStudies from './FeaturedCaseStudies';
import Skills from './Skills';
import About from './About';
import Contact from './Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SelectedWorks />
      <FeaturedCaseStudies />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
