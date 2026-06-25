import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wide cursor-none";

const variantsMap = {
  primary: "bg-brand-900 text-white hover:bg-brand-800 shadow-premium",
  secondary: "bg-white text-brand-900 border border-brand-800 hover:bg-brand-50",
  accent: "bg-accent-400 text-white hover:bg-accent-500 shadow-premium",
  ghost: "bg-transparent text-brand-900 hover:bg-brand-50",
  link: "bg-transparent text-brand-900 hover:text-accent-500 underline-offset-4 hover:underline p-0"
};

const sizesMap = {
  sm: "text-sm px-4 py-2 rounded-full",
  md: "text-base px-6 py-3 rounded-full",
  lg: "text-lg px-8 py-4 rounded-full",
  icon: "p-2 rounded-full"
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href, 
  to,
  type = 'button',
  ...props 
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const appliedSize = variant === 'link' ? '' : sizesMap[size];
  const classes = `${baseStyles} ${variantsMap[variant]} ${appliedSize} ${className}`;

  const innerContent = (
    <m.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block relative z-10"
    >
      {children}
    </m.span>
  );

  const wrapperProps = {
    className: classes,
    ref: ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    ...props
  };

  return (
    <m.div
      className="inline-block"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {to ? (
        <Link to={to} {...wrapperProps}>
          {innerContent}
        </Link>
      ) : href ? (
        <a href={href} {...wrapperProps}>
          {innerContent}
        </a>
      ) : (
        <button type={type} {...wrapperProps}>
          {innerContent}
        </button>
      )}
    </m.div>
  );
}
