import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, ArrowUpRight, Briefcase, MessageCircle, Code2 } from 'lucide-react';

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:mustafaqureshi252005@gmail.com', color: '#EA4335' },
  { icon: Briefcase, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-qureshi-70a2b73b0', color: '#0A66C2' },
  { icon: Code2, label: 'GitHub', href: 'https://github.com/mustafa2506q', color: '#6366f1' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, error: 'Please fill out all fields', success: false });
      return;
    }
    
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, error: data.message || 'Something went wrong', success: false });
      }
    } catch (error) {
      setStatus({ loading: false, error: 'Could not connect to server', success: false });
    }
  };

  return (
    <section id="contact" className="py-28 section-padding relative z-10">
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
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold tracking-widest uppercase text-accent">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-500 max-w-lg mx-auto">
            Got a project idea, freelance opportunity, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 neon-border space-y-6 relative z-20">
              {/* Name */}
              <div className="relative">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'name' || formData.name 
                    ? 'text-xs text-accent -top-2' 
                    : 'text-sm text-slate-500 top-3'
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  className="w-full bg-transparent border-b-2 border-slate-300/50 dark:border-white/10 focus:border-accent outline-none py-3 text-sm font-medium transition-colors duration-300 relative z-10"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'email' || formData.email 
                    ? 'text-xs text-accent -top-2' 
                    : 'text-sm text-slate-500 top-3'
                }`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  className="w-full bg-transparent border-b-2 border-slate-300/50 dark:border-white/10 focus:border-accent outline-none py-3 text-sm font-medium transition-colors duration-300 relative z-10"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'message' || formData.message 
                    ? 'text-xs text-accent -top-2' 
                    : 'text-sm text-slate-500 top-3'
                }`}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  className="w-full bg-transparent border-b-2 border-slate-300/50 dark:border-white/10 focus:border-accent outline-none py-3 text-sm font-medium transition-colors duration-300 resize-none relative z-10"
                />
              </div>

              {status.error && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                  {status.error}
                </div>
              )}
              {status.success && (
                <div className="text-emerald-500 text-sm text-center bg-emerald-500/10 py-2 rounded-lg">
                  Message sent successfully!
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status.loading}
                whileHover={{ scale: status.loading ? 1 : 1.02 }}
                whileTap={{ scale: status.loading ? 1 : 0.98 }}
                className={`w-full btn-primary justify-center text-base ${status.loading ? 'opacity-70 cursor-not-allowed' : 'hover:box-glow-strong'}`}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
                {!status.loading && <Send className="w-4 h-4" />}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links + Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Location card */}
            <div className="glass rounded-2xl p-6 neon-border">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="font-semibold text-sm">Location</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-500">India 🇮🇳</p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">Open to remote work globally</p>
            </div>

            {/* Social links */}
            {socialLinks.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl glass hover:box-glow transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="font-semibold text-sm flex-1">{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
