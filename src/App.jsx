import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Copy,
  Check,
  FileText,
} from 'lucide-react';
import clsx from 'clsx';
import {
  brandbookProjects,
  socialProjects,
  socialClientGroups,
  curatedSocialSequence,
  heroShowcaseItems,
} from './data/portfolio';
import logoProjects from './data/logoProjects';
import LogoGallery from './components/LogoGallery';
import { HeroAeroSculpture, ContactAeroSculpture } from './components/AeroGlassArt';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const DISCIPLINES = [
  { id: 'all', label: 'All', count: brandbookProjects.length + logoProjects.length + socialProjects.length },
  { id: 'brandbooks', label: 'Branding & Brandbooks', count: brandbookProjects.length },
  { id: 'logos', label: 'Logo Design', count: logoProjects.length },
  { id: 'social', label: 'Social Media Design', count: socialProjects.length },
];

const TOOLS = [
  { name: 'Adobe Photoshop', color: '#5277C7' },
  { name: 'Adobe Illustrator', color: '#D98772' },
  { name: 'Figma', color: '#B8A7CE' },
  { name: 'Canva', color: '#7DD3C8' },
];

const CRAFT_SKILLS = [
  { name: 'Graphic Design', color: '#E9D88E' },
  { name: 'Typography', color: '#D98772' },
  { name: 'Logo Design', color: '#5277C7' },
  { name: 'Social Media Design', color: '#7DD3C8' },
  { name: 'Layout Design', color: '#9EAD91' },
  { name: 'Visual Communication', color: '#B8A7CE' },
];

const FOCUS_TAGS = [
  'Brand Identity',
  'Logo Design',
  'Typography',
  'Brandbooks',
  'Social Media Design',
  'Promotional Design',
];

const EXPERIENCE_ROLES = [
  {
    title: 'Graphic Design Team Lead',
    period: 'March 2026 — June 2026',
  },
  {
    title: 'Assistant Graphic Designer',
    period: 'May 2025 — February 2026',
  },
  {
    title: 'Graphic Design Intern',
    period: 'February 2025 — April 2025',
  },
];

function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll('.reveal');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('reveal--visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Floating liquid-glass pill nav indicator geometry
  const navPillRef = useRef(null);
  const navLinkRefs = useRef({});
  const scrollSpyLockUntil = useRef(0);
  const [pillIndicator, setPillIndicator] = useState({ left: 0, width: 0, ready: false });

  // Hero studio window state
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  // Work filters
  const [activeDiscipline, setActiveDiscipline] = useState('all');
  const [activeClient, setActiveClient] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  // Lightbox state: holds { items: [...], index: number }
  const [lightbox, setLightbox] = useState(null);

  // Copy email feedback
  const [copiedEmail, setCopiedEmail] = useState(false);

  useScrollReveal();

  // Track reduced-motion preference dynamically
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Measure active nav link for smooth gliding aqua pill indicator
  const updatePillIndicator = useCallback((id) => {
    const pillEl = navPillRef.current;
    const linkEl = navLinkRefs.current[id];
    if (!pillEl || !linkEl) return;

    const pillRect = pillEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setPillIndicator({
      left: linkRect.left - pillRect.left,
      width: linkRect.width,
      ready: true,
    });
  }, []);

  useEffect(() => {
    updatePillIndicator(activeNav);
  }, [activeNav, updatePillIndicator]);

  useEffect(() => {
    const onResize = () => updatePillIndicator(activeNav);
    window.addEventListener('resize', onResize);

    let ro;
    if (navPillRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updatePillIndicator(activeNav));
      ro.observe(navPillRef.current);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updatePillIndicator(activeNav));
    }

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [activeNav, updatePillIndicator]);

  // Smooth, flicker-free scroll spy + scrolled nav state
  useEffect(() => {
    let ticking = false;
    const sectionIds = ['home', 'work', 'about', 'contact'];

    const evaluateScroll = () => {
      ticking = false;
      const scrollY = window.scrollY;
      setNavScrolled(scrollY > 24);

      if (Date.now() < scrollSpyLockUntil.current) return;

      const docHeight = document.documentElement.scrollHeight;
      if (window.innerHeight + scrollY >= docHeight - 80) {
        setActiveNav('contact');
        return;
      }

      const probeY = window.innerHeight * 0.34;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = id;
        }
      }
      setActiveNav(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluateScroll);
      }
    };

    evaluateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveNav(id);
    scrollSpyLockUntil.current = Date.now() + 800;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Gentle auto-cycle for Hero Studio Window (pauses on hover & reduced motion)
  useEffect(() => {
    if (heroShowcaseItems.length <= 1 || heroPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroShowcaseItems.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroPaused]);

  // Lock body scroll & keyboard navigation for Lightbox
  useEffect(() => {
    if (lightbox) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [lightbox]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (lightbox && e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
        );
      } else if (lightbox && e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev
            ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }
            : null
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  // Filtered social media artworks
  const filteredSocialItems = useMemo(() => {
    if (activeClient === 'all') {
      return curatedSocialSequence;
    }
    const group = socialClientGroups.find((g) => g.key === activeClient);
    return group ? group.items : [];
  }, [activeClient]);

  const displayedSocialItems = useMemo(() => {
    if (activeClient !== 'all') return filteredSocialItems;
    return filteredSocialItems.slice(0, visibleCount);
  }, [activeClient, filteredSocialItems, visibleCount]);

  const activeHeroItem = heroShowcaseItems[heroIndex] || socialProjects[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('pradeepvenu64@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = 'mailto:pradeepvenu64@gmail.com';
    }
  };

  const showBrandbooks = activeDiscipline === 'all' || activeDiscipline === 'brandbooks';
  const showLogos = activeDiscipline === 'all' || activeDiscipline === 'logos';
  const showSocial = activeDiscipline === 'all' || activeDiscipline === 'social';

  return (
    <div className="app-wrapper">
      {/* Subtle uncoated print grain texture */}
      <div className="paper-grain" aria-hidden="true" />

      {/* ====================================================================
          FLOATING LIQUID-GLASS PILL NAVIGATION
         ==================================================================== */}
      <header className={clsx('site-nav', navScrolled && 'site-nav--scrolled')}>
        <div className="container nav-container">
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <span className="nav-brand__orb" aria-hidden="true" />
            <span>Pradeep V.</span>
          </a>

          <nav
            ref={navPillRef}
            className="nav-pill"
            aria-label="Primary"
          >
            <motion.span
              className="nav-pill__indicator"
              aria-hidden="true"
              initial={false}
              animate={{
                x: pillIndicator.left,
                width: pillIndicator.width,
                opacity: pillIndicator.ready ? 1 : 0,
              }}
              transition={
                reducedMotion
                  ? { duration: 0.01 }
                  : { type: 'spring', stiffness: 295, damping: 28, mass: 0.88 }
              }
            />

            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    navLinkRefs.current[item.id] = el;
                  }}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx('nav-pill__link', isActive && 'nav-pill__link--active')}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span className="nav-pill__text">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="nav-status" aria-label="Location and availability">
            <span className="nav-status__dot" aria-hidden="true" />
            <span>Bengaluru · Open to roles</span>
          </div>
        </div>
      </header>

      <main>
        {/* ====================================================================
            HERO — POSTER-INSPIRED ART-DIRECTED COMPOSITION
           ==================================================================== */}
        <section id="home" className="hero">
          <div className="hero__aura" aria-hidden="true" />

          <div className="container">
            <div className="hero__grid">
              {/* Left Editorial Poster Column */}
              <div className="hero__copy">
                <div className="hero__meta-bar">
                  <span className="hero__tag">Graphic Designer</span>
                  <span className="eyebrow">Bengaluru, India</span>
                </div>

                <h1 className="hero__headline">
                  <span className="hero__headline-line">
                    Designing <em className="hero__headline-accent">ideas</em>
                  </span>
                  <span className="hero__headline-line">into visual</span>
                  <span className="hero__headline-line">
                    <em>experiences.</em>
                  </span>
                </h1>

                <div className="hero__subrow">
                  <p className="hero__lead">
                    I&rsquo;m <strong>Pradeep V.</strong>, a graphic designer working on brand
                    identities, logos, brandbooks, and social media design.
                  </p>

                  <div className="hero__facts">
                    <div className="hero__fact">
                      <span className="hero__fact-label">Focus</span>
                      <span className="hero__fact-val">Branding · Logos · Social Media</span>
                    </div>
                    <div className="hero__fact">
                      <span className="hero__fact-label">Availability</span>
                      <span className="hero__fact-val">Open to full-time roles</span>
                    </div>
                  </div>
                </div>

                <div className="hero__actions">
                  <a
                    href="#work"
                    className="btn-primary"
                    onClick={(e) => handleNavClick(e, 'work')}
                  >
                    <span>Explore Selected Work</span>
                    <ArrowDown size={16} />
                  </a>
                  <a
                    href="#contact"
                    className="btn-glass"
                    onClick={(e) => handleNavClick(e, 'contact')}
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Interactive Studio Window + Organic Frutiger Aero Glass Composition */}
              <div
                className="hero__stage"
                onMouseEnter={() => setHeroPaused(true)}
                onMouseLeave={() => setHeroPaused(false)}
              >
                <HeroAeroSculpture />

                {activeHeroItem && (
                  <div className="studio-window">
                    <div className="studio-window__chrome">
                      <div className="studio-window__dots" aria-hidden="true">
                        <span className="studio-window__dot studio-window__dot--1" />
                        <span className="studio-window__dot studio-window__dot--2" />
                        <span className="studio-window__dot studio-window__dot--3" />
                      </div>
                      <span className="studio-window__title">Selected Work</span>
                      <div className="studio-window__controls">
                        <button
                          className="studio-window__nav-btn"
                          onClick={() =>
                            setHeroIndex(
                              (prev) =>
                                (prev - 1 + heroShowcaseItems.length) % heroShowcaseItems.length
                            )
                          }
                          aria-label="Previous featured artwork"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          className="studio-window__nav-btn"
                          onClick={() =>
                            setHeroIndex((prev) => (prev + 1) % heroShowcaseItems.length)
                          }
                          aria-label="Next featured artwork"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div
                      className="studio-window__viewport"
                      onClick={() =>
                        setLightbox({ items: heroShowcaseItems, index: heroIndex })
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${activeHeroItem.clientName} social media design`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setLightbox({ items: heroShowcaseItems, index: heroIndex });
                        }
                      }}
                    >
                      <img
                        src={activeHeroItem.thumbnail}
                        alt={`${activeHeroItem.clientName} social media design`}
                        className="studio-window__img protected-image"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>

                    <div className="studio-window__footer">
                      <div className="studio-window__caption">
                        <span className="studio-window__client">{activeHeroItem.clientName}</span>
                        <span className="studio-window__sub">Social Media Design</span>
                      </div>
                      <span className="studio-window__counter">
                        {String(heroIndex + 1).padStart(2, '0')} /{' '}
                        {String(heroShowcaseItems.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hero__scroll-bar">
              <a
                href="#work"
                className="hero__scroll-cue"
                onClick={(e) => handleNavClick(e, 'work')}
              >
                <span>View Selected Work</span>
                <ArrowDown size={14} />
              </a>
              <span className="eyebrow">Bengaluru, India</span>
            </div>
          </div>
        </section>

        {/* ====================================================================
            01 — SELECTED WORK
           ==================================================================== */}
        <section id="work" className="work-section">
          <div className="container">
            <div className="section-kicker reveal">
              <span className="section-index">01</span>
              <span className="eyebrow">Work</span>
              <span className="section-rule" />
            </div>

            <div className="work-header reveal">
              <h2 className="section-heading">
                Selected <em>Work</em>
              </h2>
              <p className="work-header__desc">
                Brandbooks, logo designs, and social media graphics created for clients across
                healthcare, hospitality, education, retail, and media.
              </p>
            </div>

            {/* Translucent Discipline Switcher */}
            <div className="discipline-dock reveal" role="tablist" aria-label="Filter work by discipline">
              {DISCIPLINES.map((disc) => (
                <button
                  key={disc.id}
                  role="tab"
                  aria-selected={activeDiscipline === disc.id}
                  className={clsx(
                    'discipline-tab',
                    activeDiscipline === disc.id && 'discipline-tab--active'
                  )}
                  onClick={() => setActiveDiscipline(disc.id)}
                >
                  <span>{disc.label}</span>
                  <span className="discipline-tab__count">{disc.count}</span>
                </button>
              ))}
            </div>

            {/* ── 01A: BRANDING & BRANDBOOKS ── */}
            {showBrandbooks && (
              <div className="work-block">
                <div className="work-block__head">
                  <div className="work-block__title-wrap">
                    <span className="work-block__code">01A</span>
                    <h3 className="work-block__title">Branding &amp; Brandbooks</h3>
                  </div>
                  <p className="work-block__note">
                    Brand identity guidelines and brandbooks. Select any project to view the PDF.
                  </p>
                </div>

                <div className="brandbook-grid">
                  {brandbookProjects.map((book, idx) => (
                    <a
                      key={book.id}
                      href={book.details.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brandbook-card stagger-item"
                      style={{ '--stagger': idx }}
                      aria-label={`Open ${book.title} Brandbook PDF`}
                    >
                      <div
                        className="brandbook-card__cover"
                        style={{ backgroundColor: book.coverBg }}
                      >
                        <div
                          className="brandbook-card__spine"
                          style={{ backgroundColor: book.spineBg }}
                          aria-hidden="true"
                        />
                        <span className="brandbook-card__badge">PDF</span>

                        {book.thumbnail !== 'PDF' ? (
                          <img
                            src={book.thumbnail}
                            alt={`${book.title} logo`}
                            className="brandbook-card__logo protected-image"
                            loading="lazy"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                          />
                        ) : (
                          <FileText size={42} color="#FAF9F5" strokeWidth={1.3} />
                        )}
                      </div>

                      <div className="brandbook-card__meta">
                        <div className="brandbook-card__info">
                          <span className="brandbook-card__title">{book.title}</span>
                          <span className="brandbook-card__tag">{book.tag}</span>
                        </div>
                        <span className="brandbook-card__cta">
                          <span>View PDF</span>
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── 01B: LOGO DESIGN ── */}
            {showLogos && (
              <div className="work-block">
                <div className="work-block__head">
                  <div className="work-block__title-wrap">
                    <span className="work-block__code">01B</span>
                    <h3 className="work-block__title">Logo Design</h3>
                  </div>
                  <p className="work-block__note">
                    Logo designs shown in white and black versions. Hover or tap any logo to switch.
                  </p>
                </div>

                <div className="logo-exhibition-frame">
                  <div className="logo-exhibition__bar">
                    <span className="eyebrow">07 Logos</span>
                    <span className="logo-exhibition__hint">
                      <span className="logo-exhibition__chips" aria-hidden="true">
                        <span className="logo-chip-dark" />
                        <span className="logo-chip-light" />
                      </span>
                      <span>Hover or tap to switch dark / light</span>
                    </span>
                  </div>
                  <LogoGallery />
                </div>
              </div>
            )}

            {/* ── 01C: SOCIAL MEDIA DESIGN ── */}
            {showSocial && (
              <div className="work-block">
                <div className="work-block__head">
                  <div className="work-block__title-wrap">
                    <span className="work-block__code">01C</span>
                    <h3 className="work-block__title">Social Media Design</h3>
                  </div>
                  <p className="work-block__note">
                    {socialProjects.length} social media creatives across {socialClientGroups.length}{' '}
                    clients. Select any piece to view full size.
                  </p>
                </div>

                {/* Client Filter */}
                <div className="client-filter-bar" role="group" aria-label="Filter social media designs by client">
                  <button
                    className={clsx('client-chip', activeClient === 'all' && 'client-chip--active')}
                    onClick={() => {
                      setActiveClient('all');
                      setVisibleCount(12);
                    }}
                  >
                    <span>All</span>
                    <span className="client-chip__count">{socialProjects.length}</span>
                  </button>

                  {socialClientGroups.map((group) => (
                    <button
                      key={group.key}
                      className={clsx(
                        'client-chip',
                        activeClient === group.key && 'client-chip--active'
                      )}
                      onClick={() => setActiveClient(group.key)}
                    >
                      <span
                        className="client-chip__dot"
                        style={{ backgroundColor: group.accent }}
                        aria-hidden="true"
                      />
                      <span>{group.name}</span>
                      <span className="client-chip__count">{group.items.length}</span>
                    </button>
                  ))}
                </div>

                {/* Uncropped Social Media Grid */}
                <div className="campaign-grid">
                  {displayedSocialItems.map((item, idx) => (
                    <article
                      key={item.id}
                      className="campaign-card stagger-item"
                      style={{ '--stagger': idx % 8 }}
                      onClick={() =>
                        setLightbox({ items: filteredSocialItems, index: idx })
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${item.clientName} social media design full screen`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setLightbox({ items: filteredSocialItems, index: idx });
                        }
                      }}
                    >
                      <div className="campaign-card__media">
                        <img
                          src={item.thumbnail}
                          alt={`${item.clientName} social media design`}
                          className="campaign-card__img protected-image"
                          loading="lazy"
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        <span className="campaign-card__zoom" aria-hidden="true">
                          <Maximize2 size={14} />
                        </span>
                      </div>

                      <div className="campaign-card__foot">
                        <span className="campaign-card__client">
                          <span
                            className="client-chip__dot"
                            style={{ backgroundColor: item.accent }}
                            aria-hidden="true"
                          />
                          <span>{item.clientName}</span>
                        </span>
                        <span className="campaign-card__type">Social Media</span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination controls */}
                {activeClient === 'all' && visibleCount < filteredSocialItems.length && (
                  <div className="campaign-more-wrap">
                    <button
                      className="btn-primary"
                      onClick={() =>
                        setVisibleCount((prev) =>
                          Math.min(prev + 12, filteredSocialItems.length)
                        )
                      }
                    >
                      <span>
                        Load More ({filteredSocialItems.length - visibleCount} remaining)
                      </span>
                    </button>
                    <button
                      className="btn-glass"
                      onClick={() => setVisibleCount(filteredSocialItems.length)}
                    >
                      <span>View All {filteredSocialItems.length}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ====================================================================
            02 — ABOUT
           ==================================================================== */}
        <section id="about" className="about-section">
          <div className="container">
            <div className="section-kicker reveal">
              <span className="section-index">02</span>
              <span className="eyebrow">Profile</span>
              <span className="section-rule" />
            </div>

            <div className="about-grid">
              {/* Left Editorial Studio Dossier Card */}
              <div className="reveal">
                <div className="dossier-card">
                  <div className="dossier-card__monogram">
                    <span className="dossier-card__letters">Pradeep V.</span>
                    <div className="aero-orb dossier-card__orb" aria-hidden="true" />
                  </div>

                  <div className="dossier-card__rows">
                    <div className="dossier-row">
                      <span className="dossier-row__k">Name</span>
                      <span className="dossier-row__v">Pradeep V</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-row__k">Role</span>
                      <span className="dossier-row__v">Graphic &amp; Visual Designer</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-row__k">Base</span>
                      <span className="dossier-row__v">Bengaluru, India</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-row__k">Status</span>
                      <span className="dossier-row__v">Open to full-time roles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Authentic Story */}
              <div className="about-story reveal">
                <h2 className="section-heading">
                  About <em>Pradeep</em>
                </h2>

                <p className="about-lead">
                  I&rsquo;m Pradeep, a graphic designer based in Bengaluru, India. I enjoy
                  exploring <em>visual identities</em>, typography, layouts, and creative ways of
                  communicating ideas.
                </p>

                <p className="about-body">
                  My experience spans graphic design, social media creatives, promotional artwork,
                  logo design, and visual communication — growing from a Graphic Design Intern to
                  leading a design team at Sripada Studios.
                </p>

                <p className="about-body">
                  I&rsquo;m always interested in learning, experimenting, and finding clearer,
                  more memorable ways to bring visual ideas to life.
                </p>

                <div className="about-focus-tags">
                  {FOCUS_TAGS.map((tag) => (
                    <span key={tag} className="focus-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            03 — EXPERIENCE & SKILLS
           ==================================================================== */}
        <section id="experience" className="experience-section">
          <div className="container">
            <div className="section-kicker reveal">
              <span className="section-index">03</span>
              <span className="eyebrow">Experience &amp; Skills</span>
              <span className="section-rule" />
            </div>

            <div className="exp-skills-grid">
              {/* Experience Timeline */}
              <div className="reveal">
                <div className="exp-company-header">
                  <h2 className="exp-company-name">Sripada Studios</h2>
                  <span className="exp-company-loc">Bengaluru · 2025 — 2026</span>
                </div>

                <div className="exp-timeline">
                  {EXPERIENCE_ROLES.map((role) => (
                    <div key={role.title} className="exp-role">
                      <span className="exp-role__title">{role.title}</span>
                      <span className="exp-role__period">{role.period}</span>
                    </div>
                  ))}
                </div>

                <p className="exp-context-note">
                  Worked on brand identities, brandbooks, social media design, promotional
                  creatives, and movie promotions including <strong>45</strong>,{' '}
                  <strong>Manada Kadalu</strong>, and <strong>Yudhakanda</strong>.
                </p>
              </div>

              {/* Tools & Skills Structured Panels */}
              <div className="skills-stack reveal">
                <div className="skill-panel">
                  <div className="skill-panel__head skill-panel__head--butter">
                    <span className="skill-panel__title">Tools</span>
                    <span className="eyebrow">04</span>
                  </div>
                  <ul className="skill-panel__list">
                    {TOOLS.map((tool) => (
                      <li key={tool.name} className="skill-panel__item">
                        <span
                          className="skill-panel__bullet"
                          style={{ backgroundColor: tool.color }}
                          aria-hidden="true"
                        />
                        <span>{tool.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="skill-panel">
                  <div className="skill-panel__head skill-panel__head--aqua">
                    <span className="skill-panel__title">Skills</span>
                    <span className="eyebrow">06</span>
                  </div>
                  <ul className="skill-panel__list">
                    {CRAFT_SKILLS.map((skill) => (
                      <li key={skill.name} className="skill-panel__item">
                        <span
                          className="skill-panel__bullet"
                          style={{ backgroundColor: skill.color }}
                          aria-hidden="true"
                        />
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            04 — CONTACT
           ==================================================================== */}
        <section id="contact" className="contact-section">
          <div className="contact-aura" aria-hidden="true" />

          <div className="container">
            <div className="section-kicker reveal">
              <span className="section-index">04</span>
              <span className="eyebrow">Get in Touch</span>
              <span className="section-rule" />
            </div>

            <div className="contact-card reveal">
              <ContactAeroSculpture />

              <div className="contact-card__content">
                <h2 className="contact-heading">
                  Have something <em>in mind?</em>
                </h2>
                <p className="contact-sub">Let&rsquo;s make something meaningful.</p>

                <div className="contact-actions">
                  <a href="mailto:pradeepvenu64@gmail.com" className="contact-email-link">
                    <span>pradeepvenu64@gmail.com</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="contact-social-link"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
                  </button>

                  <a
                    href="https://www.linkedin.com/in/pradeep-v-172099342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="https://www.behance.net/20pc802pradeep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span>Behance</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER
         ==================================================================== */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-copy">
            <span>&copy; 2026 Pradeep V. — Bengaluru, India</span>
          </div>

          <div className="footer-links">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Top &uarr;</a>
            <a href="#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          EDITORIAL LIGHTBOX MODAL
         ==================================================================== */}
      {lightbox && lightbox.items[lightbox.index] && (
        <div
          className="modal-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Artwork preview"
        >
          <div className="modal-shell" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar">
              <div className="modal-bar__meta">
                <span
                  className="client-chip__dot"
                  style={{ backgroundColor: lightbox.items[lightbox.index].accent || '#5277C7' }}
                  aria-hidden="true"
                />
                <span className="modal-bar__client">
                  {lightbox.items[lightbox.index].clientName || lightbox.items[lightbox.index].title}
                </span>
                <span className="modal-bar__counter">
                  {lightbox.index + 1} / {lightbox.items.length}
                </span>
              </div>

              <div className="modal-bar__actions">
                {lightbox.items.length > 1 && (
                  <>
                    <button
                      className="modal-icon-btn"
                      onClick={() =>
                        setLightbox((prev) => ({
                          ...prev,
                          index: (prev.index - 1 + prev.items.length) % prev.items.length,
                        }))
                      }
                      aria-label="Previous artwork"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="modal-icon-btn"
                      onClick={() =>
                        setLightbox((prev) => ({
                          ...prev,
                          index: (prev.index + 1) % prev.items.length,
                        }))
                      }
                      aria-label="Next artwork"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                <button
                  className="modal-icon-btn"
                  onClick={() => setLightbox(null)}
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="modal-stage">
              <img
                src={lightbox.items[lightbox.index].thumbnail}
                alt={`${lightbox.items[lightbox.index].clientName || 'Selected'} design artwork`}
                className="modal-image protected-image"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
