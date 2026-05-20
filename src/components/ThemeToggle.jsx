import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark'); // Dark mode default as requested

  useEffect(() => {
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass hover-glow transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-slate-800" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
