import React, { useState, useEffect, useRef } from 'react';
import { projects } from './data/portfolio';
import { X, FileText } from 'lucide-react';
import clsx from 'clsx';

// Atmospheric Smoke / Ink Cursor Trail (Canvas)
function SmokeTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect touch devices and reduced motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle collection
    const particles = [];
    const MAX_PARTICLES = 60;

    let lastMouse = { x: -100, y: -100 };
    let hasMoved = false;

    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!hasMoved) {
        lastMouse.x = currentX;
        lastMouse.y = currentY;
        hasMoved = true;
      }

      const dx = currentX - lastMouse.x;
      const dy = currentY - lastMouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        // Interpolate along movement vector for seamless fluid trail
        const steps = Math.min(Math.floor(dist / 10) + 1, 5);
        for (let i = 0; i < steps; i++) {
          if (particles.length >= MAX_PARTICLES) {
            particles.shift();
          }

          const t = i / steps;
          const px = lastMouse.x + dx * t;
          const py = lastMouse.y + dy * t;

          const jitterAngle = Math.random() * Math.PI * 2;
          const jitterDist = Math.random() * 4;
          const speedFactor = Math.min(dist / 45, 1.8);

          particles.push({
            x: px + Math.cos(jitterAngle) * jitterDist,
            y: py + Math.sin(jitterAngle) * jitterDist,
            vx: (Math.random() - 0.5) * 0.35 - dx * 0.02,
            vy: (Math.random() - 0.5) * 0.35 - dy * 0.02,
            radius: 16 + Math.random() * 12,
            maxRadius: 42 + Math.random() * 24,
            growth: 0.35 + Math.random() * 0.25,
            alpha: Math.min(0.06 + speedFactor * 0.03, 0.11),
            decay: 0.0022 + Math.random() * 0.0014
          });
        }
      }

      lastMouse.x = currentX;
      lastMouse.y = currentY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
        }
        p.alpha -= p.decay;

        if (p.alpha > 0.001) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(230, 230, 236, ${p.alpha})`);
          grad.addColorStop(0.35, `rgba(205, 205, 215, ${p.alpha * 0.5})`);
          grad.addColorStop(0.7, `rgba(180, 180, 190, ${p.alpha * 0.15})`);
          grad.addColorStop(1, 'rgba(160, 160, 170, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Remove dissipated particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].alpha <= 0.001) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="smoke-trail-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// Seamless Dual-Row Social Media Marquee
function SocialMediaMarquee({ projects, onSelectProject }) {
  // Distribute items into two rows
  const row1 = projects.filter((_, i) => i % 2 === 0);
  const row2 = projects.filter((_, i) => i % 2 !== 0);

  return (
    <div className="social-marquee-section mt-lg fade-in">
      {/* Row 1 - moves right continuously */}
      <div className="marquee-row">
        <div className="marquee-track marquee-track-right">
          {row1.concat(row1).map((project, idx) => (
            <div
              key={`row1-${project.id}-${idx}`}
              className="marquee-card"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.thumbnail}
                alt=""
                loading="lazy"
                className="marquee-thumb protected-image"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - moves left continuously */}
      <div className="marquee-row mt-md">
        <div className="marquee-track marquee-track-left">
          {row2.concat(row2).map((project, idx) => (
            <div
              key={`row2-${project.id}-${idx}`}
              className="marquee-card"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.thumbnail}
                alt=""
                loading="lazy"
                className="marquee-thumb protected-image"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Interactive Hero Shape with subtle magnetic cursor reaction & idle breathing
function InteractiveHeroShape() {
  const shapeRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const el = shapeRef.current;
    if (!el) return;

    let animId;
    let targetX = 0;
    let targetY = 0;
    let targetRot = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    let currentX = 0;
    let currentY = 0;
    let currentRot = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e) => {
      if (isTouch) return;

      const rect = el.getBoundingClientRect();
      const shapeCenterX = rect.left + rect.width / 2;
      const shapeCenterY = rect.top + rect.height / 2;

      const diffX = e.clientX - shapeCenterX;
      const diffY = e.clientY - shapeCenterY;
      const dist = Math.hypot(diffX, diffY);

      const maxDist = 650;
      if (dist < maxDist) {
        // Proximity factor: stronger closer to shape, fades smoothly outward
        const proximity = Math.pow(1 - dist / maxDist, 1.2);

        // Clamped subtle limits: X: ±18px, Y: ±15px, Rot: ±3.5deg, Tilt: ±4deg
        targetX = Math.max(-18, Math.min(18, (diffX / 28) * (0.3 + proximity * 0.7)));
        targetY = Math.max(-15, Math.min(15, (diffY / 28) * (0.3 + proximity * 0.7)));
        targetRot = Math.max(-3.5, Math.min(3.5, (diffX / 100) * (0.3 + proximity * 0.7)));
        targetTiltX = Math.max(-4, Math.min(4, -(diffY / 70) * proximity));
        targetTiltY = Math.max(-4, Math.min(4, (diffX / 70) * proximity));
      } else {
        targetX = 0;
        targetY = 0;
        targetRot = 0;
        targetTiltX = 0;
        targetTiltY = 0;
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetRot = 0;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = (time) => {
      // Extremely subtle, slow organic idle breathing (2px translation, 0.4deg tilt)
      const idleX = Math.sin(time * 0.0006) * 2;
      const idleY = Math.cos(time * 0.00045) * 2.5;
      const idleRot = Math.sin(time * 0.0004) * 0.4;

      // Inertia smoothing (lerp factor: 0.05)
      const lerp = 0.05;
      currentX += (targetX + (isTouch ? 0 : idleX) - currentX) * lerp;
      currentY += (targetY + (isTouch ? 0 : idleY) - currentY) * lerp;
      currentRot += (targetRot + (isTouch ? 0 : idleRot) - currentRot) * lerp;
      currentTiltX += (targetTiltX - currentTiltX) * lerp;
      currentTiltY += (targetTiltY - currentTiltY) * lerp;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentRot.toFixed(2)}deg) perspective(600px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="abstract-composition" ref={shapeRef}>
      <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
        {/* Subtle Grid Lines */}
        <line x1="50" y1="0" x2="50" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="350" y1="0" x2="350" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="0" y1="400" x2="400" y2="400" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Geometric Art Direction */}
        <circle cx="200" cy="250" r="120" stroke="var(--color-border)" strokeWidth="1" />
        <rect x="180" y="120" width="60" height="260" fill="var(--color-text)" transform="rotate(15 210 250)" />
        <circle cx="120" cy="350" r="8" fill="var(--color-text-muted)" />
        <rect x="250" y="320" width="30" height="30" stroke="var(--color-text-muted)" strokeWidth="1" />

        {/* Technical Crosshairs */}
        <path d="M195 250 L205 250 M200 245 L200 255" stroke="var(--color-text-muted)" strokeWidth="1" />
      </svg>
    </div>
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
      <SmokeTrail />
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

      <main className="main-content">
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
                <p className="hero-subtext mt-sm">
                  Currently looking for full-time graphic / visual design opportunities.<br />
                  Based in Bengaluru, India.
                </p>
              </div>

              <div className="hero-socials mt-xl">
                <a href="mailto:pradeepvenu64@gmail.com" className="hover-link">Email</a>
                <a href="https://www.linkedin.com/in/pradeep-v-172099342" target="_blank" rel="noopener noreferrer" className="hover-link">LinkedIn</a>
                <a href="https://www.behance.net/20pc802pradeep" target="_blank" rel="noopener noreferrer" className="hover-link">Behance</a>
              </div>
            </div>

            <div className="hero-right">
              <InteractiveHeroShape />
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
            {displayCategories.map((cat, idx) => (
              <button
                key={cat}
                className={clsx('filter-btn', activeCategory === cat && 'active')}
                onClick={() => setActiveCategory(cat)}
              >
                <span className="filter-num">0{idx + 1} / </span>{cat}
              </button>
            ))}
          </div>

          {activeCategory === 'Social Media' ? (
            <SocialMediaMarquee
              projects={filteredProjects}
              onSelectProject={setSelectedProject}
            />
          ) : (
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
                          className="brandbook-thumb protected-image"
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
          )}
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
            <button className="modal-close glass-button" onClick={() => setSelectedProject(null)} aria-label="Close modal">
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
