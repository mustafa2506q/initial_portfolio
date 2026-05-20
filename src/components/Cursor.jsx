import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────
//  Antigravity-style Cursor
//  • Sharp inner dot  —  snaps instantly to pointer
//  • Outer ring       —  lags behind with spring physics
//  • Hover state      —  ring swells + glows on links/buttons
//  • Trail aura       —  subtle radial blur follows the ring
// ─────────────────────────────────────────────────────────

const SPRING_OPTIONS = { stiffness: 180, damping: 18, mass: 0.6 };

const Cursor = () => {
  const [hovering, setHovering]   = useState(false);
  const [clicking, setClicking]   = useState(false);
  const [visible,  setVisible]    = useState(false);

  // Raw pointer coords
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Springy outer ring coords
  const ringX = useSpring(rawX, SPRING_OPTIONS);
  const ringY = useSpring(rawY, SPRING_OPTIONS);

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target;
      const interactive =
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') ||
        el.closest('[role="button"]') ||
        el.closest('[data-cursor-hover]');
      setHovering(!!interactive);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mouseover',   onOver);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mouseover',   onOver);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  // Outer ring metrics
  const ringSize   = hovering ? 52 : clicking ? 22 : 36;
  const ringOffset = ringSize / 2;

  return (
    <div className="hidden md:block pointer-events-none select-none">

      {/* ── Outer trailing ring ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: -ringOffset,
          translateY: -ringOffset,
          width:  ringSize,
          height: ringSize,
          border: hovering
            ? '1.5px solid rgba(180, 190, 255, 0.9)'
            : '1.5px solid rgba(200, 210, 255, 0.55)',
          boxShadow: hovering
            ? '0 0 18px 4px rgba(140, 160, 255, 0.35), inset 0 0 12px rgba(140,160,255,0.08)'
            : '0 0 8px 2px rgba(140, 160, 255, 0.15)',
          backdropFilter: hovering ? 'blur(1px)' : 'none',
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          translateX: -ringOffset,
          translateY: -ringOffset,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
      />

      {/* ── Inner sharp dot — snaps instantly ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[9999]"
        style={{
          x: rawX,
          y: rawY,
          translateX: -4,
          translateY: -4,
          width:  8,
          height: 8,
          background: hovering
            ? 'radial-gradient(circle, #ffffff 30%, #b0baff 100%)'
            : 'radial-gradient(circle, #ffffff 40%, #8090f0 100%)',
          boxShadow: hovering
            ? '0 0 12px 4px rgba(180, 195, 255, 0.7)'
            : '0 0 8px 2px rgba(160, 180, 255, 0.5)',
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          opacity: clicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* ── Hover aura glow (only on interactive) ── */}
      {hovering && (
        <motion.div
          className="fixed top-0 left-0 rounded-full z-[9998]"
          style={{
            x: ringX,
            y: ringY,
            translateX: -36,
            translateY: -36,
            width:  72,
            height: 72,
            background: 'radial-gradient(circle, rgba(124,133,245,0.12) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </div>
  );
};

export default Cursor;
