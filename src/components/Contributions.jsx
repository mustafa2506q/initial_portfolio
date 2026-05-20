import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Star, GitFork, Users, BookOpen, Code2, Flame, AlertCircle, Loader2 } from 'lucide-react';

const GITHUB_USERNAME = 'mustafa2506q';

// Language colour map (most common languages)
const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Rust: '#dea584',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};
const getLangColor = (lang) => LANG_COLORS[lang] || '#6366f1';

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass rounded-2xl p-5 flex items-center gap-4 neon-border hover:box-glow transition-shadow duration-300"
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}22` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-500 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
        {value ?? <span className="text-slate-400 text-base">—</span>}
      </p>
    </div>
  </motion.div>
);

// ── Language Bar ───────────────────────────────────────────────────────────
const LangBar = ({ name, pct, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="space-y-1"
  >
    <div className="flex justify-between items-center text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
        {name}
      </span>
      <span className="text-slate-500 dark:text-slate-500 font-mono text-xs">{pct}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
      />
    </div>
  </motion.div>
);

// ── Main Component ─────────────────────────────────────────────────────────
const Contributions = () => {
  const [profile, setProfile] = useState(null);
  const [langs, setLangs] = useState([]);        // [{ name, pct, color }]
  const [totalStars, setTotalStars] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | done | error
  const [streakLoaded, setStreakLoaded] = useState(false);
  const [streakError, setStreakError] = useState(false);

  useEffect(() => {
    let alive = true;

    const fetchAll = async () => {
      try {
        // 1. Profile
        const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!profileRes.ok) throw new Error('profile fetch failed');
        const profileData = await profileRes.json();

        // 2. Repos (up to 100)
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!reposRes.ok) throw new Error('repos fetch failed');
        const repos = await reposRes.json();

        // Aggregate stars
        const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        // Aggregate languages by byte-count approximation (use language field on repo)
        const langCount = {};
        repos.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
        const sortedLangs = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 7)
          .map(([name, count]) => ({
            name,
            pct: Math.round((count / total) * 100),
            color: getLangColor(name),
          }));

        if (alive) {
          setProfile(profileData);
          setTotalStars(stars);
          setLangs(sortedLangs);
          setStatus('done');
        }
      } catch (err) {
        console.error('GitHub fetch error:', err);
        if (alive) setStatus('error');
      }
    };

    fetchAll();
    return () => { alive = false; };
  }, []);

  return (
    <section id="contributions" className="py-28 section-padding relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/10">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">Open Source</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400"
            >
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
              <p className="text-sm">Fetching GitHub data…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400"
          >
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm">Could not load GitHub stats. Check your connection.</p>
          </motion.div>
        )}

        {/* Content */}
        {status === 'done' && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={BookOpen}  label="Public Repos"  value={profile?.public_repos}  color="#6366f1" delay={0.1} />
              <StatCard icon={Star}      label="Total Stars"    value={totalStars}              color="#f59e0b" delay={0.2} />
              <StatCard icon={Users}     label="Followers"      value={profile?.followers}      color="#22d3ee" delay={0.3} />
              <StatCard icon={GitFork}   label="Following"      value={profile?.following}      color="#a78bfa" delay={0.4} />
            </div>

            {/* Languages + Streak side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Top Languages */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-3xl p-6 md:p-8 neon-border hover:box-glow transition-shadow duration-300"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Top Languages</h3>
                </div>
                {langs.length === 0 ? (
                  <p className="text-sm text-slate-400">No language data found.</p>
                ) : (
                  <div className="space-y-4">
                    {langs.map((l, i) => (
                      <LangBar key={l.name} {...l} delay={0.05 * i} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Streak card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-3xl p-6 md:p-8 neon-border hover:box-glow transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Contribution Streak</h3>
                </div>

                {!streakError ? (
                  <div className="flex-1 flex items-center justify-center min-h-[120px]">
                    {!streakLoaded && (
                      <Loader2 className="w-6 h-6 animate-spin text-accent absolute" />
                    )}
                    <img
                      src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=6366f1&fire=a855f7&currStreakLabel=6366f1&sideLabels=94a3b8&dates=64748b&currStreakNum=f8fafc&sideNums=f8fafc&background=00000000`}
                      alt="GitHub Streak"
                      className={`w-full h-auto transition-opacity duration-500 ${streakLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setStreakLoaded(true)}
                      onError={() => setStreakError(true)}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <Flame className="w-10 h-10 text-orange-300/40" />
                    <p className="text-sm text-center">Streak data unavailable right now</p>
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline"
                    >
                      View on GitHub →
                    </a>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Profile bio + link */}
            {profile?.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-slate-500 dark:text-slate-500 italic mb-8"
              >
                "{profile.bio}"
              </motion.p>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View Full Profile
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Contributions;
