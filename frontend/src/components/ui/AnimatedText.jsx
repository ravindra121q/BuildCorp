import React, { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: `1.2em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export default function AnimatedText({ 
  text, 
  className = '', 
  el: Wrapper = 'p',
  once = true 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const shouldReduceMotion = useReducedMotion();

  const isVisible = shouldReduceMotion || isInView;

  return (
    <Wrapper className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <m.span
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.03 }}
        aria-hidden
      >
        {text.split(' ').map((word, wordIndex) => (
          <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            {word.split('').map((char, charIndex) => (
              <span className="inline-block overflow-hidden" key={`${char}-${charIndex}`}>
                <m.span className="inline-block" variants={defaultAnimations}>
                  {char}
                </m.span>
              </span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </m.span>
    </Wrapper>
  );
}
