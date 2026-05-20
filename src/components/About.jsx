import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-28 section-padding relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 dark:bg-accent/20">
              <User className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Turning ideas into
            <span className="text-gradient"> reality</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              I'm a <span className="font-semibold text-accent">B.Tech CSE student</span> with an appetite for growth that most people mistake for obsession. I don't just learn technologies — I dissect them, rebuild them, and push them further than they're supposed to go.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              From crafting pixel-precise frontends to architecting robust backends and building Android apps, I bridge <span className="font-semibold text-slate-800 dark:text-white">aesthetics with functionality</span> in everything I create. My drive to solve hard problems and think critically puts me a level above — and I'm only getting started.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { number: '10+', label: 'Projects' },
                { number: '2+', label: 'Years Coding' },
                { number: '2', label: 'Clients' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl glass"
                >
                  <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.number}</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-3xl p-8 neon-border"
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">What I Do</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Frontend Development', desc: 'HTML, CSS, JavaScript with modern UI principles' },
                { title: 'Backend Development', desc: 'PHP, Node.js, APIs & database management' },
                { title: 'Android Development', desc: 'Kotlin & Flutter cross-platform apps' },
                { title: 'DSA & Problem Solving', desc: 'Algorithmic thinking in C++ & Python' },
                { title: 'Critical & Creative Thinking', desc: 'Systems design, logic & innovation' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/[0.03] hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors duration-300 group"
                >
                  <p className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
