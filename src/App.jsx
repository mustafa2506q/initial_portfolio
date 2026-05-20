import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contributions from './components/Contributions';
import PaidProjects from './components/PaidProjects';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Antigravity-style particle background */}
      <ParticleBackground />

      {/* Navigation + Theme Toggle + Scroll Progress */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Divider */}
        <div className="max-w-6xl mx-auto section-padding">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <About />
        <Skills />

        <div className="max-w-6xl mx-auto section-padding">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <Projects />
        <Contributions />

        <div className="max-w-6xl mx-auto section-padding">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <PaidProjects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 section-padding border-t border-slate-200/50 dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-600">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-700 dark:text-slate-400">Mustafa</span>. All rights reserved. Developed by Mustafa Qureshi.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-700">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
