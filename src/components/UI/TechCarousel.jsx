import React, { useRef, useState, useEffect, useCallback } from "react";

export const TechCarousel = ({
  title = "My Tech Stack",
  highlight = "", 
  items = [], 
  speed = 0.8, 
}) => {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const animationRef = useRef(null);
  const isHovered = useRef(false);
  const exactLocation = useRef(0); 
  const [isDragging, setIsDragging] = useState(false);

  // --- 1. Initialization & Resize Logic ---
  // We use useCallback to ensure this function is stable
  const initPosition = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    // Calculate widths
    const totalWidth = slider.scrollWidth;
    const oneSetWidth = totalWidth / 4;

    // Only set position if we are clearly in the "danger zone" (start or end)
    // or if we need to initialize for the first time
    if (slider.scrollLeft < 50 || slider.scrollLeft > (totalWidth - 50)) {
        slider.scrollLeft = oneSetWidth;
        exactLocation.current = oneSetWidth;
    }
  }, []);

  // Use ResizeObserver to handle screen rotation or layout shifts on iPhone
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Run initially
    const timer = setTimeout(initPosition, 100);

    // Watch for size changes
    const observer = new ResizeObserver(() => {
        initPosition();
    });
    observer.observe(slider);

    return () => {
        clearTimeout(timer);
        observer.disconnect();
    };
  }, [initPosition, items]);

  // --- 2. Animation Loop ---
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animate = () => {
      const totalWidth = slider.scrollWidth;
      const oneSetWidth = totalWidth / 4;
      
      // --- Infinite Loop Boundaries ---
      // If we go too far Left -> Jump forward
      if (exactLocation.current <= 0) {
        exactLocation.current = oneSetWidth * 2; 
        slider.scrollLeft = exactLocation.current;
      }
      // If we go too far Right -> Jump backward
      else if (exactLocation.current >= oneSetWidth * 3) {
        exactLocation.current = oneSetWidth; 
        slider.scrollLeft = exactLocation.current;
      }

      // --- Movement ---
      if (!isDown.current && !isHovered.current) {
        exactLocation.current += speed;
        slider.scrollLeft = exactLocation.current;
      } else {
        // While dragging, we let the event handlers update scrollLeft,
        // but we MUST sync exactLocation to keep the loop valid.
        exactLocation.current = slider.scrollLeft;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed]);

  // --- Unified Input Handlers ---
  const handleStart = (pageX) => {
    isDown.current = true;
    setIsDragging(true);
    if (sliderRef.current) {
      startX.current = pageX - sliderRef.current.offsetLeft;
      scrollLeftStart.current = sliderRef.current.scrollLeft;
    }
  };

  const handleMove = (e, pageX) => {
    if (!isDown.current) return;
    
    // Prevent text selection
    if (e.type === 'mousemove') {
        e.preventDefault();
    }
    
    if (sliderRef.current) {
      const x = pageX - sliderRef.current.offsetLeft;
      
      // FIX FOR IPHONE:
      // Removed the (* 2) multiplier. On small screens, 1:1 movement feels more natural
      // and prevents the user from accidentally flinging the carousel out of bounds.
      const walk = (x - startX.current) * 1; 
      
      sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleEnd = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  // Event Wrappers
  const onMouseDown = (e) => handleStart(e.pageX);
  const onMouseLeave = () => { handleEnd(); isHovered.current = false; };
  const onMouseUp = () => handleEnd();
  const onMouseMove = (e) => handleMove(e, e.pageX);
  const onMouseEnter = () => { isHovered.current = true; };

  const onTouchStart = (e) => handleStart(e.touches[0].pageX);
  const onTouchMove = (e) => handleMove(e, e.touches[0].pageX);
  const onTouchEnd = () => handleEnd();

  // Helper: Title
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const duplicatedItems = [...items, ...items, ...items, ...items];
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-brand"></span>
            <span className="text-brand font-code text-sm tracking-widest uppercase">Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">
            {renderTitle()}
          </h2>
        </div>
          
        {/* Carousel Track */}
        <div 
          className="w-full relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div 
            ref={sliderRef}
            className={`
              flex gap-6 pb-8 pt-4 px-4 select-none
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            `}
            // Handlers
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}

            style={{ 
                // CRITICAL FOR IPHONE:
                // 1. overflow-hidden: We hide native scrollbar completely so JS has full control.
                //    This stops the "fighting" between native momentum and our loop logic.
                // 2. touch-action: pan-y allows vertical scroll but captures horizontal swipes.
                overflowX: 'hidden', 
                touchAction: 'pan-y',
                willChange: 'scroll-position',
            }} 
          >
            {duplicatedItems.map((tech, index) => (
              <div 
                key={index}
                className="
                  group flex-shrink-0 w-40 md:w-48 h-48 
                  flex flex-col items-center justify-center 
                  p-6 rounded-2xl bg-[#0f172a] border border-white/5 
                  transition-all duration-300 ease-out pointer-events-auto
                  hover:bg-brand hover:border-brand hover:-translate-y-2 
                  hover:shadow-[0_10px_30px_rgba(52,211,153,0.3)]
                "
              >
                <div className="
                  w-16 h-16 mb-5 rounded-full flex items-center justify-center 
                  bg-white/5 border border-white/10 text-brand
                  transition-all duration-300
                  group-hover:bg-[#0b1121] group-hover:text-brand group-hover:scale-110 group-hover:shadow-lg
                ">
                  {tech.icon && <tech.icon size={32} />}
                </div>

                <span className="
                  font-medium tracking-wide text-sm md:text-base pointer-events-none 
                  transition-colors duration-300 text-text-primary
                  group-hover:text-[#0b1121] group-hover:font-bold
                ">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};