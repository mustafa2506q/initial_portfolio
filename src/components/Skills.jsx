import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

// Import assets
import cppLogo from '../assets/C++.png';
import pythonLogo from '../assets/python_logo_icon_168886.webp';
import kotlinLogo from '../assets/Kotlin_(programming_language)-Logo.wine.png';
import mongodbLogo from '../assets/mongodb-logo-png_seeklogo-481256-removebg-preview.png';
import githubLogo from '../assets/GITHUB-removebg-preview.png';
import figmaLogo from '../assets/figma-logo_brandlogos.net_6n1pb-512x512.png';
import iotLogo from '../assets/internet-of-things-iot-icon-with-circuit-connections-r8whVWkM_t.jpg';
import flutterLogo from '../assets/FLUTTER-removebg-preview.png';

const skills = [
  { name: 'C / C++', level: 80, color: '#00599C' },
  { name: 'Python', level: 75, color: '#3776AB' },
  { name: 'Kotlin', level: 65, color: '#B125EA' },
  { name: 'Flutter', level: 60, color: '#02569B' },
  { name: 'MongoDB', level: 70, color: '#47A248' },
  { name: 'Git / GitHub', level: 85, color: '#F05032' },
  { name: 'Figma', level: 72, color: '#F24E1E' },
  { name: 'DSA', level: 78, color: '#FF9900' },
  { name: 'HTML / CSS / JS', level: 82, color: '#E34F26' },
  { name: 'IoT', level: 60, color: '#00A859' },
];

const techStack = [
  { name: 'C++', icon: cppLogo, isImage: true },
  { name: 'Python', icon: pythonLogo, isImage: true },
  { name: 'Kotlin', icon: kotlinLogo, isImage: true },
  { name: 'Flutter', icon: flutterLogo, isImage: true },
  { name: 'MongoDB', icon: mongodbLogo, isImage: true },
  { name: 'Git/GitHub', icon: githubLogo, isImage: true },
  { name: 'Figma', icon: figmaLogo, isImage: true },
  { name: 'IoT', icon: iotLogo, isImage: true },
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 section-padding relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        {/* Tech Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl glass hover:box-glow transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {tech.isImage ? (
                  <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-3xl">{tech.icon}</span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bars */}
        <div className="glass rounded-3xl p-8 md:p-10 neon-border">
          <h3 className="text-xl font-bold mb-8 text-center">Proficiency Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">{skill.name}</span>
                  <span className="text-xs font-medium text-slate-500">{skill.level}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200/50 dark:bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                      boxShadow: `0 0 20px ${skill.color}40`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
