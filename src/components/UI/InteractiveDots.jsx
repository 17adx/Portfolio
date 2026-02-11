import React, { useEffect, useRef, useMemo } from 'react';

// Helper: Moved outside component to prevent recreation
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 52, g: 211, b: 153 };
};

const InteractiveDots = ({
  backgroundColor = '#0f172a',
  dotColor = '#34D399',
  gridSpacing = 35,
  animationSpeed = 0.05,
  removeWaveLine = false
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const timeRef = useRef(0);
  
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef([]);
  const dotsRef = useRef([]);

  // Memoize RGB values to avoid calculation on every frame
  const rgb = useMemo(() => hexToRgb(dotColor), [dotColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Initialize & Resize Logic
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Re-initialize dots
      const dots = [];
      for (let x = gridSpacing / 2; x < rect.width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < rect.height; y += gridSpacing) {
          dots.push({
            x, y,
            originalX: x,
            originalY: y,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
      dotsRef.current = dots;
    };

    // Animation Loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const { r, g, b } = rgb;

      // 1. Clear Canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, rect.width, rect.height);

      timeRef.current += animationSpeed;
      const currentTime = Date.now();

      // 2. Draw Ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const age = currentTime - ripple.startTime;
        const lifeSpan = 1500;

        if (age < lifeSpan) {
          if (!removeWaveLine) {
            const progress = age / lifeSpan;
            const radius = progress * 400;
            const alpha = (1 - progress) * 0.4;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
          return true;
        }
        return false;
      });

      // 3. Draw Dots
      dotsRef.current.forEach((dot) => {
        // Mouse Interaction
        const dx = mouseRef.current.x - dot.originalX;
        const dy = mouseRef.current.y - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 150;
        const force = distance < maxDistance ? (maxDistance - distance) / maxDistance : 0;

        // Ripple Interaction
        let rippleForce = 0;
        ripplesRef.current.forEach(ripple => {
           const dRx = dot.originalX - ripple.x;
           const dRy = dot.originalY - ripple.y;
           const distR = Math.sqrt(dRx * dRx + dRy * dRy);
           const progress = (currentTime - ripple.startTime) / 1500;
           const radius = progress * 400;
           
           if (Math.abs(distR - radius) < 50) {
              rippleForce += 1 - (Math.abs(distR - radius) / 50);
           }
        });

        // Combined visual calculations
        const size = 1.5 + (force * 2) + (rippleForce * 1.5);
        const breathing = Math.sin(timeRef.current + dot.phase) * 0.1 + 0.2;
        const opacity = Math.min(1, breathing + (force * 0.5) + (rippleForce * 0.5));

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(render);
    };

    // Setup
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    render();       // Start loop

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [backgroundColor, rgb, gridSpacing, animationSpeed, removeWaveLine]);

  // Event Handlers
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ripplesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      startTime: Date.now()
    });
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div 
        className='absolute inset-0 w-full h-full'
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default InteractiveDots;