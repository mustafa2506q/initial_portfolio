import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DynamicBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Interactive Blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 2 }}
      />
      
      {/* Background ambient blobs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 animate-blob"
        style={{ background: 'var(--accent)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-20 animate-blob"
        style={{ background: 'var(--accent)', animationDelay: '2s' }}
      />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default DynamicBackground;
