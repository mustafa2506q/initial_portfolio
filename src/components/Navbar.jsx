import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contributions', href: '#contributions' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3 glass-strong'
            : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto section-padding flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="relative group flex items-center gap-2"
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: '1.75rem',
                fontWeight: '900',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.7)) drop-shadow(0 0 20px rgba(56,189,248,0.4))',
                lineHeight: 1,
                display: 'inline-block',
                transition: 'filter 0.3s ease',
              }}
              className="select-none group-hover:[filter:drop-shadow(0_0_12px_rgba(139,92,246,0.9))_drop-shadow(0_0_28px_rgba(56,189,248,0.6))]"
            >
              M.
            </motion.span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 p-2.5 rounded-xl glass hover:box-glow transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-4 h-4 text-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-xl glass" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-accent" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl glass" aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden glass-strong mt-2 mx-4 rounded-2xl"
            >
              <div className="py-4 px-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      const id = link.href.replace('#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        setTimeout(() => {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 150);
                      }
                    }}
                    className="block py-3 px-4 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent hover:bg-accent/5 transition-all cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

// Scroll progress bar at top of page
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-neon-purple to-neon-pink rounded-r-full"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default Navbar;
