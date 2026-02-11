import React, { useState, useEffect } from 'react';
import { cn } from "../../lib/utils";

const Typewriter = ({
  text,              
  speed = 100,       
  deleteSpeed = 50,  
  waitTime = 1500,   
  cursorChar = "|",  
  className,
  loop = true,       
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const i = loopNum % text.length;
    const fullText = text[i];

    const handleTyping = () => {
      setDisplayedText((current) => 
        isDeleting 
          ? fullText.substring(0, current.length - 1) 
          : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? deleteSpeed : speed);

      // Finished typing word
      if (!isDeleting && displayedText === fullText) {
        if (!loop && loopNum === text.length - 1) return;
        
        setIsDeleting(true);
        setTypingSpeed(waitTime);
      } 
      // Finished deleting word
      else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, text, typingSpeed, speed, deleteSpeed, waitTime, loop]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {displayedText}
      <span className="animate-pulse ml-1 text-brand font-bold">{cursorChar}</span>
    </span>
  );
};

export default Typewriter;