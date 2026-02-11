import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import './App.css';

// --- Components ---
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/About/About';
import ProjectSection from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import Preloader from './components/UI/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 2. Simulate Loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      window.lenis = null;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {/* FIX: Navbar must be OUTSIDE the animated container 
            to maintain 'position: fixed' behavior relative to the viewport.
          */}
          <Navbar />
          
          <main className="animate-fade-in-up duration-700">
            <HeroSection />
            <AboutSection />
            <ProjectSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

export default App;