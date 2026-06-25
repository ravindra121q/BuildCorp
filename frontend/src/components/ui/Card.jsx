import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  href,
  to
}) {
  const baseClasses = `bg-white dark:bg-brand-900 border border-brand-900 dark:border-brand-800 p-8 transition-all duration-500 ${hover ? 'hover:shadow-premium-hover hover:-translate-y-1' : 'shadow-premium'} ${className}`;

  if (to) {
    return <Link to={to} className={`block ${baseClasses}`}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={`block ${baseClasses}`}>{children}</a>;
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
