import React, { useState, useEffect, useRef } from 'react';
import { projects } from './data/portfolio';
import { X, FileText } from 'lucide-react';
import clsx from 'clsx';

// Fading Mouse Trail (Canvas)
function MouseTrail() {
  const canvasRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const mouse = { x: -100, y: -100 };
    let lastTime = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      particles.push({
        x: mouse.x,
        y: mouse.y,
        alpha: 0.6,
        size: 3
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.alpha -= 0.02; // Fade out gradually
        p.size *= 0.98; // Shrink slightly
      }
      
      particles = particles.filter(p => p.alpha > 0.01);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="mouse-trail-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}

const displayCategories = [
  'Brand Identity & Brandbooks',
  'Logo Design',
  'Social Media'
];

function App() {
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [selectedProject]);

  const filteredProjects = projects.filter(project => project.category === activeCategory);

  return (
    <div className="app-wrapper">
      <MouseTrail />
      <nav className="site-nav glass-nav">
        <div className="container nav-container">
          <div className="nav-logo">Pradeep V.</div>
          <div className="nav-links">
            <a href="#work" className="hover-link">Work</a>
            <a href="#about" className="hover-link">About</a>
            <a href="#experience" className="hover-link">Experience</a>
            <a href="#contact" className="hover-link">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* EDITORIAL HERO SECTION */}
        <section className="hero container fade-in">
          <div className="hero-grid">
            
            <div className="hero-left">
              <div className="hero-meta-top">
                <span className="tiny-label">12° 58' N, 77° 35' E</span>
                <span className="tiny-label divider-line"></span>
                <span className="tiny-label">EST. 2026</span>
              </div>
              
              <h1 className="hero-name">Pradeep V.</h1>
              <h2 className="hero-role">Visual Designer</h2>
              
              <div className="hero-desc-box">
                <p className="hero-tagline">Graphic design, branding & visual communication.</p>
                <p className="hero-subtext mt-sm">Currently looking for full-time graphic / visual design opportunities.<br/>Based in Bengaluru, India.</p>
              </div>

              <div className="hero-socials mt-xl">
                <a href="mailto:pradeepvenu64@gmail.com" className="hover-link">Email</a>
                <a href="https://www.linkedin.com/in/pradeep-v-172099342" target="_blank" rel="noopener noreferrer" className="hover-link">LinkedIn</a>
                <a href="https://www.behance.net/20pc802pradeep" target="_blank" rel="noopener noreferrer" className="hover-link">Behance</a>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="abstract-composition">
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
                  {/* Subtle Grid Lines */}
                  <line x1="50" y1="0" x2="50" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="350" y1="0" x2="350" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="400" x2="400" y2="400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Geometric Art Direction */}
                  <circle cx="200" cy="250" r="120" stroke="var(--color-border)" strokeWidth="1"/>
                  <rect x="180" y="120" width="60" height="260" fill="var(--color-text)" transform="rotate(15 210 250)"/>
                  <circle cx="120" cy="350" r="8" fill="var(--color-text-muted)"/>
                  <rect x="250" y="320" width="30" height="30" stroke="var(--color-text-muted)" strokeWidth="1" />
                  
                  {/* Technical Crosshairs */}
                  <path d="M195 250 L205 250 M200 245 L200 255" stroke="var(--color-text-muted)" strokeWidth="1" />
                </svg>
              </div>
            </div>

          </div>
        </section>

        {/* WORK SECTION WITH SELECTORS */}
        <section id="work" className="work-section container mt-xl">
          <div className="section-header">
            <h2 className="section-title">Selected Work</h2>
            <div className="section-divider"></div>
            <span className="tiny-label text-muted">01</span>
          </div>

          <div className="category-filters mt-md">
            {displayCategories.map(cat => (
              <button 
                key={cat} 
                className={clsx('filter-btn', activeCategory === cat && 'active')}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="masonry-grid mt-lg">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="project-card fade-in"
                onClick={() => {
                  if (project.type === 'pdf' && project.details?.pdfLink) {
                    window.open(project.details.pdfLink, '_blank', 'noopener,noreferrer');
                  } else {
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="project-thumb-wrapper glass-border">
                  {project.type === 'pdf' && project.thumbnail === 'PDF' ? (
                    <div className="pdf-placeholder protected-image" onContextMenu={(e) => e.preventDefault()}>
                      <div className="pdf-label-overlay">
                        <FileText size={18} strokeWidth={1.5} className="pdf-small-icon" />
                        <span className="pdf-label-text">{project.title}</span>
                      </div>
                    </div>
                  ) : project.type === 'pdf' && project.thumbnail !== 'PDF' ? (
                    <div className="pdf-placeholder protected-image" onContextMenu={(e) => e.preventDefault()}>
                      <img 
                        src={project.thumbnail} 
                        alt="" 
                        className="project-thumb protected-image" 
                        loading="lazy" 
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <div className="pdf-label-overlay">
                        <FileText size={18} strokeWidth={1.5} className="pdf-small-icon" />
                        <span className="pdf-label-text">{project.title}</span>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={project.thumbnail} 
                      alt="" 
                      className={clsx("project-thumb protected-image", project.category === 'Logo Design' && "logo-thumb")} 
                      loading="lazy" 
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="about-section container mt-xl">
          <div className="editorial-grid">
            <div className="grid-sidebar">
              <h2 className="section-title">About</h2>
              <div className="section-divider"></div>
              <span className="tiny-label text-muted mt-sm">02</span>
            </div>
            <div className="grid-content">
              <p className="editorial-text">
                I'm Pradeep, a visual designer from Bengaluru with experience across branding, advertising, social media, entertainment and print design.
              </p>
              <p className="editorial-text mt-sm">
                I've worked on brand identities, campaigns, promotional creatives and visual communication, with experience progressing from Assistant Graphic Designer to Graphic Design Team Lead.
              </p>
              <p className="editorial-text mt-sm">
                I enjoy turning ideas into visuals that are clear, memorable and visually engaging.
              </p>
              
              <div className="skills-list mt-lg">
                <span>Brand Identity</span>
                <span>Graphic Design</span>
                <span>Social Media Design</span>
                <span>Advertising</span>
                <span>Print Design</span>
                <span>Art Direction</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="experience-section container mt-xl">
          <div className="editorial-grid">
            <div className="grid-sidebar">
              <h2 className="section-title">Experience</h2>
              <div className="section-divider"></div>
              <span className="tiny-label text-muted mt-sm">03</span>
            </div>
            <div className="grid-content">
              <div className="timeline">
                <div className="timeline-item">
                  <h3 className="company">Sripada Studios</h3>
                  <div className="role-group mt-sm">
                    <div className="role-item">
                      <span className="role-title">Graphic Design Team Lead</span>
                      <span className="role-date text-muted tiny-label">MAR 2026 – JUN 2026</span>
                    </div>
                    <div className="role-item">
                      <span className="role-title">Assistant Graphic Designer</span>
                      <span className="role-date text-muted tiny-label">MAY 2025 – FEB 2026</span>
                    </div>
                    <div className="role-item">
                      <span className="role-title">Assistant Graphic Designer Intern</span>
                      <span className="role-date text-muted tiny-label">FEB 2025 – APR 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact-section container mt-xl mb-xl">
          <div className="editorial-grid">
            <div className="grid-sidebar">
              <h2 className="section-title">Contact</h2>
              <div className="section-divider"></div>
              <span className="tiny-label text-muted mt-sm">04</span>
            </div>
            <div className="grid-content">
              <h2 className="contact-heading">Have a project or an opportunity? Let's talk.</h2>
              <div className="hero-socials mt-lg">
                <a href="mailto:pradeepvenu64@gmail.com" className="hover-link">Email</a>
                <a href="https://www.linkedin.com/in/pradeep-v-172099342" target="_blank" rel="noopener noreferrer" className="hover-link">LinkedIn</a>
                <a href="https://www.behance.net/20pc802pradeep" target="_blank" rel="noopener noreferrer" className="hover-link">Behance</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <p className="tiny-label text-muted">© 2026 PRADEEP V. — ALL RIGHTS RESERVED</p>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="modal-overlay fade-in glass-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close glass-button" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>

            <div className="modal-body">
              <div className={clsx('modal-gallery', selectedProject.type === 'carousel' && 'carousel-gallery')}>
                {selectedProject.details?.images?.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="" 
                    loading="lazy" 
                    className="modal-image protected-image" 
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
