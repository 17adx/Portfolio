import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react'; 
import Container from '../UI/Container';
import TypingAnimation from '../UI/TypingAnimation';
import Typewriter from '../UI/Typewriter';
import InteractiveDots from '../UI/InteractiveDots';

const HeroSection = () => {
  const [isIntroDone, setIsIntroDone] = useState(false);

  // Generic smooth scroll handler using Lenis or fallback
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-screen bg-main overflow-hidden flex items-center justify-center">
      
      <style>{`
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-scroll-wheel {
          animation: scrollWheel 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background & Masks */}
      <div className="absolute inset-0 z-0">
        <InteractiveDots 
          backgroundColor="#0f172a" 
          dotColor="#34D399" 
          gridSpacing={40} 
        />
        <div 
          className="absolute inset-0 pointer-events-none bg-main opacity-40"
          style={{ maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)' }}
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 150px #0f172a' }} 
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full pointer-events-none">
        <Container className="flex flex-col items-center text-center">
            
            {/* Badge */}
            <div 
                className="opacity-0 animate-fade-in-up pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-brand/20 mb-8 backdrop-blur-sm"
                style={{ animationDelay: '0.1s' }} 
            >
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                <span className="text-brand text-xs font-code tracking-wide">
                    OPEN FOR NEW OPPORTUNITIES
                </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-primary mb-6 tracking-tight flex flex-col md:block items-center gap-2">
                <TypingAnimation 
                    text="Hello, I'm " 
                    duration={80}
                    onComplete={() => setIsIntroDone(true)} 
                />
                
                {isIntroDone && (
                    <Typewriter 
                        text={["Anas", "a Developer", "an Engineer", "a Solver"]}
                        speed={100}
                        deleteSpeed={50}
                        waitTime={2000}
                        cursorChar="_"
                        className="text-brand ml-2 md:ml-0"
                        loop={true}
                    />
                )}
            </h1>

            {/* Subtitle */}
            <div 
                className="opacity-0 animate-fade-in-up text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed mt-6"
                style={{ animationDelay: '1.2s' }}
            >
                Creating <span className="text-text-primary font-semibold">Scalable Software</span> & Engineering <span className="text-text-primary font-semibold">Hardware Logic</span>.
                <br />
                <span className="text-base opacity-80 mt-2 block">
                    Bridging the gap between full-stack development and embedded systems.
                </span>
            </div>

            {/* CTA Button */}
            <div 
                className="opacity-0 animate-fade-in-up flex items-center justify-center mt-2 pointer-events-auto"
                style={{ animationDelay: '1.6s' }}
            >
                <a 
                    href="#projects" 
                    onClick={(e) => handleScrollTo(e, 'projects')}
                    className="group relative px-8 py-3 rounded-full bg-transparent border border-brand text-brand font-semibold overflow-hidden isolate transition-all hover:text-main"
                >
                    <div className="absolute top-0 left-0 h-full w-0 bg-brand opacity-0 -z-10 transition-all duration-500 ease-out group-hover:w-full group-hover:opacity-100"></div>
                    <span className="relative flex items-center gap-2 z-10">
                        View My Work <ArrowRight size={18} />
                    </span>
                </a>
            </div>

        </Container>
      </div>  

      {/* Mouse Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in-up pointer-events-auto"
        style={{ animationDelay: '2.5s' }}
      >
        <a 
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className="flex flex-col items-center gap-2 group cursor-pointer transition-opacity hover:opacity-80"
            aria-label="Scroll Down"
        >
            <div className="w-[30px] h-[50px] rounded-[15px] border-2 border-text-secondary/50 flex justify-center p-2 box-border shadow-[0_0_20px_rgba(52,211,153,0.1)] transition-colors group-hover:border-brand/50 bg-[#0f172a]/50 backdrop-blur-sm">
                <div className="w-1 h-2 bg-brand rounded-full animate-scroll-wheel shadow-[0_0_10px_#34D399]"></div>
            </div>
        </a>
      </div>

    </section>
  );
};

export default HeroSection;