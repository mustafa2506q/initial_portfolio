import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ChevronDown } from 'lucide-react';

const roles = [
  'Critical & Creative Thinker',
  'Problem Solver',
  'Full Stack Developer',
  'Android Developer',
  'DSA Enthusiast',
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-padding pt-32 z-10">
      <div className="max-w-5xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-slate-600 dark:text-slate-400">2nd Year B.Tech CSE Student</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6"
        >
          Hi, I'm{' '}
          <span className="text-gradient dark:text-glow">Mustafa</span>
        </motion.h1>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-10"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-500 dark:text-slate-400">
            {displayText}
            <span className="ml-1 inline-block w-[3px] h-[1em] bg-accent animate-pulse align-middle" />
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-500 max-w-2xl mb-12 leading-relaxed"
        >
          Building <span className="text-accent font-semibold">systems that think</span>, interfaces that feel, 
          and solutions that last — one elegant line of code at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#projects" className="btn-primary">
            View Projects
            <Rocket className="w-5 h-5" />
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase font-medium text-slate-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
