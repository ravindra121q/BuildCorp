import React, { useRef, useEffect } from 'react';
import { m, useInView, useAnimation } from 'framer-motion';

export default function Reveal({ children, width = 'fit-content', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <m.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay, ease: [0.17, 0.55, 0.55, 1] }}
      >
        {children}
      </m.div>
    </div>
  );
}
