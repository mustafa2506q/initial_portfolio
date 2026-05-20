import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Layers } from 'lucide-react';

const projects = [
  {
    title: 'Spider Drainage System',
    description: 'An innovative IoT-based spider-inspired drainage monitoring and cleaning system. Filed for patent — combines embedded systems, sensors, and real-time data to automate urban drainage maintenance.',
    tech: ['IoT', 'C++', 'Embedded Systems', 'Patent'],
    github: '#',
    demo: '#',
    featured: true,
    badgeText: 'PATENT PROJECT',
  },
  {
    title: 'Planto — Farm Management System',
    description: 'A full-stack farm management platform enabling farmers to track crops, monitor resources, manage tasks, and get data-driven insights for better yield.',
    tech: ['Node.js', 'MongoDB', 'HTML/CSS/JS'],
    github: '#',
    demo: '#',
    featured: true,
    badgeText: 'FEATURED',
  },
  {
    title: 'Learning Management System (LMS)',
    description: 'A complete LMS platform with course creation, student enrollment, progress tracking, quizzes, and admin dashboard built for educational institutions.',
    tech: ['PHP', 'MySQL', 'HTML/CSS/JS'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    title: 'Library Management System',
    description: 'A dual-platform library solution — an admin web portal for book inventory and a Flutter mobile app for users to browse, search, and manage their borrowings.',
    tech: ['Flutter', 'PHP', 'MySQL'],
    github: '#',
    demo: '#',
    featured: false,
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
      className="h-full"
    >
      <div className={`glass rounded-3xl p-7 md:p-8 h-full flex flex-col neon-border transition-all duration-500 hover:box-glow group ${project.featured ? 'border-accent/20' : ''}`}>
        {/* Featured badge */}
        {project.featured && (
          <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-accent/10 dark:bg-accent/20 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-accent">{project.badgeText || 'Featured'}</span>
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border border-transparent hover:border-accent/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200/50 dark:border-white/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-accent transition-colors duration-300"
          >
            <Code2 className="w-4 h-4" />
            Code
          </a>
          <a
            href={project.demo}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-accent transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-28 section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10">
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
