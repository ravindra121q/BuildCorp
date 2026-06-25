import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroll from '../ui/SmoothScroll';
import CustomCursor from '../ui/CustomCursor';
import NoiseOverlay from '../ui/NoiseOverlay';

export default function MainLayout({ children }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <NoiseOverlay />
      <div className="min-h-screen flex flex-col pt-16 bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
