import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Star } from 'lucide-react';

const paidProjects = [
  {
    title: 'Library Management System',
    description: 'Built a full web admin portal and a Flutter app for users — complete with book inventory, borrowing history, and search features for a college institution.',
    tech: ['Flutter', 'PHP', 'MySQL'],
    status: 'DELIVERED',
  },
  {
    title: 'Farm Management System — Planto',
    description: 'Delivered a responsive farm management web platform helping farmers digitize crop tracking, task scheduling, and resource planning.',
    tech: ['Node.js', 'MongoDB', 'HTML/CSS/JS'],
    status: 'DELIVERED',
  },
];

const PaidProjects = () => {
  return (
    <section id="paid-projects" className="py-28 section-padding relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10">
            <Briefcase className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">Freelance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Client Work <span className="text-gradient">Timeline</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-500 max-w-lg mx-auto">
            Professional client work showcasing real-world delivery and quality.
          </p>
        </motion.div>

        {/* Timeline-style cards */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/50 via-neon-purple/30 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {paidProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent box-glow-strong z-10" />

                {/* Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}`}>
                  <div className="glass rounded-3xl p-7 neon-border hover:box-glow transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                        project.status === 'DELIVERED' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {project.status}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">{project.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidProjects;
