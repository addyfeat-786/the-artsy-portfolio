'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest('a, button, [data-cursor="hover"], input, textarea, select')
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] mix-blend-difference"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'spring', stiffness: 600, damping: 40, mass: 0.3 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
      <AnimatePresence>
        {hovering && (
          <motion.div
            className="pointer-events-none fixed z-[9998] mix-blend-difference"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: pos.x - 20,
              y: pos.y - 20,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div className="h-10 w-10 rounded-full border border-white/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
