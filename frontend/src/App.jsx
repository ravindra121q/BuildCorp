import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import SEO from './components/ui/SEO';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-50">
    <div className="w-16 h-16 border-4 border-brand-800 border-t-accent-500 rounded-full animate-spin"></div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <HelmetProvider>
      <SEO description="Enterprise Construction & Development" />
      <LazyMotion features={domAnimation}>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <AnimatedRoutes />
          </MainLayout>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
