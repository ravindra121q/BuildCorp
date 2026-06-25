import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <m.div
        className="fixed top-0 left-0 w-4 h-4 bg-accent-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <m.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-300 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 0 : 1,
          opacity: mousePosition.x > 0 ? 0.5 : 0
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      />
    </>
  );
}
