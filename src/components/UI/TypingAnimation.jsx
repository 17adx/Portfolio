import { useEffect, useState } from "react";
import { cn } from "../../lib/utils"; 

export default function TypingAnimation({
  text,
  duration = 200,
  className,
  onComplete, 
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If we haven't finished typing the text
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      // Typing finished
      if (onComplete) onComplete();
    }
  }, [currentIndex, duration, text, onComplete]);

  return (
    <span
      className={cn(
        "font-display text-center leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {displayedText}
    </span>
  );
}