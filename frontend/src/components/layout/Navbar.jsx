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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-brand-950/80 backdrop-blur-md shadow-premium border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <Container size="xl" className="flex justify-between items-center">
        <Link to="/" className={`text-2xl font-heading font-semibold tracking-tighter text-white z-50`}>
          BUILD<span className="text-accent-500">CORP</span>
        </Link>
        
        {/* Desktop Nav */}
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

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden z-50 text-white focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-brand-950 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-2xl font-heading font-medium transition-colors hover:text-accent-500 ${location.pathname === link.path ? 'text-accent-500' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="primary" size="md" to="/contact">Get an Estimate</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
