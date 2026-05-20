import React, { useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
//  Antigravity-style Particle Background
//  • Teardrop / elongated-pixel particles (like the Google
//    Antigravity download page screenshot)
//  • Particles float in a loose nebula cloud and ATTRACT /
//    drift toward the cursor (gravity-well behaviour)
//  • Deep-black dark mode (#000000) matching the reference image
// ─────────────────────────────────────────────────────────────

const TWO_PI = Math.PI * 2;
const PARTICLE_COUNT = 450;
const MAX_ATTRACT_DIST = 260;   // px radius the cursor pulls from
const ATTRACT_FORCE    = 0.018; // how strongly particles rush in
const REPEL_DIST       = 55;    // inside this they gently push away
const RETURN_EASE      = 0.025; // drift back to base speed

// Teardrop sizes — width × height
const SIZES = [
  [1.5, 3.5],
  [1, 2.5],
  [2, 4.5],
  [1.2, 3],
  [0.8, 2],
];

// Variance in the "nebula" cluster shape
const CLUSTER_W = 0.7; // fraction of viewport width
const CLUSTER_H = 0.65;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Creates one particle with a teardrop silhouette
function createParticle(vw, vh) {
  // Cluster them mostly on the right-centre, sparse on left
  // (mirrors the Google Antigravity screenshot composition)
  const side = Math.random() < 0.62 ? 1 : 0; // 62% right half
  const bx = side
    ? rand(vw * 0.35, vw * 0.98)
    : rand(vw * 0.02, vw * 0.55);
  const by = rand(vh * 0.08, vh * 0.92);

  const [sw, sh] = SIZES[Math.floor(Math.random() * SIZES.length)];
  const rotation = rand(0, TWO_PI);
  const opacity   = rand(0.25, 0.9);

  // Slow ambient drift
  const vx = rand(-0.12, 0.12);
  const vy = rand(-0.10, 0.10);

  return {
    bx, by,          // base (home) position
    x: bx, y: by,   // current position
    vx, vy,          // ambient velocity
    sw, sh,          // teardrop width / height
    rotation,        // current draw rotation
    rotSpeed: rand(-0.004, 0.004), // slow spin
    opacity,
    opacityBase: opacity,
    twinkle: rand(0, TWO_PI), // phase for brightness twinkle
    twinkleSpeed: rand(0.008, 0.025),
  };
}

// Draw a teardrop shape centred at 0,0 pointing "up"
function drawTeardrop(ctx, sw, sh) {
  ctx.beginPath();
  // Upper pointed tip
  ctx.moveTo(0, -sh / 2);
  // Smooth bezier curves to form a teardrop
  ctx.bezierCurveTo(
     sw * 1.1,  -sh * 0.15,
     sw * 1.1,   sh * 0.45,
     0,          sh / 2
  );
  ctx.bezierCurveTo(
    -sw * 1.1,   sh * 0.45,
    -sw * 1.1,  -sh * 0.15,
     0,          -sh / 2
  );
  ctx.closePath();
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const state  = stateRef.current;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width  = vw;
      canvas.height = vh;
      // Re-scatter
      state.particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(vw, vh)
      );
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    };
    const onLeave = () => {
      state.mouse.x = -9999;
      state.mouse.y = -9999;
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // ── Main animation loop ──────────────────────────────────
    const animate = (ts) => {
      ctx.clearRect(0, 0, vw, vh);

      const isDark = document.documentElement.classList.contains('dark');
      const mx = state.mouse.x;
      const my = state.mouse.y;

      for (const p of state.particles) {
        // ➊ Twinkle opacity
        p.twinkle += p.twinkleSpeed;
        const twinkleMod = Math.sin(p.twinkle) * 0.15;
        const finalOpacity = Math.max(0.05, Math.min(1, p.opacityBase + twinkleMod));

        // ➋ Mouse interaction: attract toward cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_ATTRACT_DIST && dist > 0) {
          const norm = 1 / dist;
          if (dist > REPEL_DIST) {
            // Pull in smoothly (stronger as cursor is closer)
            const strength = ATTRACT_FORCE * (1 - dist / MAX_ATTRACT_DIST);
            p.vx += dx * norm * strength * dist * 0.06;
            p.vy += dy * norm * strength * dist * 0.06;
          } else {
            // Gentle push at very close range so they don't pile up
            p.vx -= dx * norm * 0.4;
            p.vy -= dy * norm * 0.4;
          }
        }

        // ➌ Apply velocity with damping
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x  += p.vx;
        p.y  += p.vy;

        // ➍ Drift home gently when far from cursor
        if (dist > MAX_ATTRACT_DIST) {
          p.x += (p.bx - p.x) * RETURN_EASE;
          p.y += (p.by - p.y) * RETURN_EASE;
        }

        // ➎ Slow ambient base drift
        p.bx += p.vx * 0.15;
        p.by += p.vy * 0.15;

        // ➏ Wrap base position at screen edges
        if (p.bx < -20)      p.bx = vw + 20;
        if (p.bx > vw + 20)  p.bx = -20;
        if (p.by < -20)      p.by = vh + 20;
        if (p.by > vh + 20)  p.by = -20;

        // ➐ Slow rotation
        p.rotation += p.rotSpeed;

        // ➑ Draw ─────────────────────────────────────────────
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        drawTeardrop(ctx, p.sw, p.sh);

        if (isDark) {
          // Glowing blue-violet pixels on pure black
          const grd = ctx.createRadialGradient(0, -p.sh * 0.1, 0, 0, 0, p.sh * 0.6);
          grd.addColorStop(0, `rgba(180, 190, 255, ${finalOpacity})`);
          grd.addColorStop(0.5, `rgba(110, 130, 255, ${finalOpacity * 0.85})`);
          grd.addColorStop(1, `rgba(80, 90, 230, 0)`);
          ctx.fillStyle = grd;

          // Glow halo
          ctx.shadowBlur  = 10;
          ctx.shadowColor = `rgba(130, 150, 255, ${finalOpacity * 0.7})`;
        } else {
          // Light mode: Vibrant gradient instead of dark specks
          const grd = ctx.createRadialGradient(0, -p.sh * 0.1, 0, 0, 0, p.sh * 0.6);
          grd.addColorStop(0, `rgba(99, 102, 241, ${finalOpacity})`); // accent color
          grd.addColorStop(0.5, `rgba(168, 85, 247, ${finalOpacity * 0.7})`); // neon purple
          grd.addColorStop(1, `rgba(236, 72, 153, 0)`); // neon pink fade
          ctx.fillStyle = grd;
          
          ctx.shadowBlur  = 8;
          ctx.shadowColor = `rgba(99, 102, 241, ${finalOpacity * 0.3})`;
        }

        ctx.fill();
        ctx.restore();
      }

      state.raf = requestAnimationFrame(animate);
    };

    state.raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default ParticleBackground;
