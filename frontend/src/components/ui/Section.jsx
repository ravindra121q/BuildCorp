import React from 'react';
import Container from './Container';

const themesMap = {
  light: "bg-background text-foreground",
  gray: "bg-brand-900 text-white",
  dark: "bg-black text-white",
  accent: "bg-accent-400 text-white"
};

export default function Section({ 
  children, 
  className = '', 
  containerClassName = '',
  containerSize = 'xl',
  theme = 'light',
  id 
}) {
  return (
    <section id={id} className={`${themesMap[theme]} py-32 md:py-48 ${className}`}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
