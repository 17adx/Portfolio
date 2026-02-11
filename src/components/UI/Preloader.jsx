import React from 'react';

const Preloader = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] transition-opacity duration-500"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        
        {/* Logo & Spinner Animation */}
        <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Background Ping */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-20" />
            
            {/* Rotating Ring */}
            <div className="relative inline-flex h-20 w-20 rounded-full border-[3px] border-brand/20 border-t-brand animate-spin" />
            
            {/* Centered Brand Letter */}
            <span className="absolute text-brand text-3xl font-bold font-heading animate-pulse select-none">
                A
            </span>
        </div>
        
        {/* Text & Dots */}
        <div className="flex items-end gap-1 mt-2">
            <span className="text-brand/80 font-mono text-xs tracking-[0.3em] font-semibold">
                INITIALIZING
            </span>

            <div className="flex gap-1 mb-1">
                <span className="w-1 h-1 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-brand rounded-full animate-bounce" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;