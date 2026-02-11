import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Download, Circle } from "lucide-react"; 

export function TubelightNavbar({ items, className, activeTab: propActiveTab, onItemClick }) {
  const [activeTab, setActiveTab] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (items?.length && !activeTab) {
        const firstItem = items.find(i => i.type !== 'separator');
        if(firstItem) setActiveTab(firstItem.name);
    }
  }, [items]);

  useEffect(() => {
    if (propActiveTab) setActiveTab(propActiveTab);
  }, [propActiveTab]);

  if (!isMounted || !items) return <div />;

  const handleItemClick = (e, item) => {
    if (item.name === "Resume") {
        if (activeTab !== "Resume") {
            e.preventDefault(); // Prevent full nav if it's just a download action
            setActiveTab("Resume");
        } 
        return; 
    }

    setActiveTab(item.name);
    if (onItemClick) onItemClick(e, item.url);
  };

  return (
    // Outer Container: Added max-w constraints to prevent screen overflow on mobile
    <div
      className={cn(
        "bg-main/90 border border-white/10 backdrop-blur-lg py-1 px-1 md:py-2 md:px-3 rounded-full shadow-2xl shadow-black/50 max-w-[95vw] mx-auto",
        className
      )}
    >
      {/* Inner Container: Adjusted gap and padding for mobile vs desktop */}
      <div className="flex items-center gap-1 md:gap-2 bg-main/90 border border-white/10 backdrop-blur-lg py-1 px-1 md:py-2 md:px-3 rounded-full shadow-2xl shadow-black/50 overflow-x-auto no-scrollbar">
        
        {items.map((item, index) => {
          // Separator: Smaller height on mobile
          if (item.type === 'separator') {
              return <div key={`sep-${index}`} className="w-px h-3 md:h-5 bg-white/20 mx-1"></div>;
          }

          let Icon = item.icon;
          if (!Icon && item.name === "Resume") Icon = Download;
          if (!Icon) Icon = Circle; 

          const isActive = activeTab === item.name;
          const isResume = item.name === "Resume";

          return (
            <a
              key={item.name || index}
              href={item.url}
              download={isResume && isActive ? true : undefined} 
              onClick={(e) => handleItemClick(e, item)}
              className={cn(
                "relative cursor-pointer font-semibold rounded-full transition-all duration-300 ease-in-out flex items-center justify-center select-none",
                // RESPONSIVE TWEAKS: 
                // Mobile: px-2 py-1, text-xs
                // Desktop: px-4 py-2, text-sm (Original values restored here)
                "px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm", 
                isActive ? "text-brand bg-white/10" : "text-text-secondary hover:text-brand"
              )}
            >
              <span className="relative z-10">
                {/* Responsive Icon Size: 14px on mobile, 18px on desktop */}
                <Icon className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
              </span>

              <span 
                className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out relative z-10",
                    // Adjusted margin for mobile/desktop
                    isActive ? "max-w-50 opacity-100 ml-1 md:ml-2" : "max-w-0 opacity-0"
                )}
              >
                {isResume ? "My Resume" : item.name}
              </span>

              {/* Active Glow Effect (Unchanged Logic) */}
              {isActive && (
                <div className="absolute inset-0 w-full rounded-full -z-10 bg-brand/5 transition-all duration-300 ease-out opacity-100 scale-100">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand rounded-t-full">
                    <div className="absolute w-12 h-6 bg-brand/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-brand/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-brand/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}