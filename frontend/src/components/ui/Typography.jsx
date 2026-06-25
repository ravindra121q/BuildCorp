import React from 'react';

const headingSizes = {
  1: "text-5xl md:text-7xl font-semibold tracking-tighter leading-tight",
  2: "text-4xl md:text-5xl font-semibold tracking-tight leading-tight",
  3: "text-3xl md:text-4xl font-medium tracking-tight",
  4: "text-2xl md:text-3xl font-medium",
  5: "text-xl md:text-2xl font-medium",
  6: "text-lg md:text-xl font-medium"
};

const headingVariants = {
  default: "",
  accent: "text-accent-500",
  muted: "text-brand-500 dark:text-brand-300 opacity-80"
};

export function Heading({ 
  level = 2, 
  children, 
  className = '', 
  variant = 'default',
  as
}) {
  const Tag = as || `h${level}`;
  
  return (
    <Tag className={`font-heading ${headingSizes[level]} ${headingVariants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}

const textSizes = {
  sm: "text-sm",
  base: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl"
};

const textVariants = {
  default: "",
  muted: "text-brand-500 dark:text-brand-400 opacity-80",
  accent: "text-accent-600 dark:text-accent-400"
};

export function Text({ 
  children, 
  className = '', 
  size = 'base',
  variant = 'default',
  as = 'p'
}) {
  const Tag = as;
  
  return (
    <Tag className={`${textSizes[size]} ${textVariants[variant]} leading-relaxed ${className}`}>
      {children}
    </Tag>
  );
}
