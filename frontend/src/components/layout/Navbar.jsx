import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-brand-950/80 backdrop-blur-md shadow-premium border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <Container size="xl" className="flex justify-between items-center">
        <Link to="/" className={`text-2xl font-heading font-semibold tracking-tighter text-white`}>
          BUILD<span className="text-accent-500">CORP</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${location.pathname === link.path ? 'text-accent-500' : 'text-white/80'}`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" size="sm" to="/contact">Get an Estimate</Button>
        </nav>
      </Container>
    </header>
  );
}
