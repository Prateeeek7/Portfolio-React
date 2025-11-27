import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  delayBeforeRestart?: number;
}

const TypingEffect = ({ text, speed = 150, className = '', delayBeforeRestart = 2000 }: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const clearAll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    
    const typeText = () => {
      clearAll();
      currentIndex = 0;
      setDisplayedText('');
      
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          // Restart after delay
          timeoutRef.current = setTimeout(() => {
            typeText();
          }, delayBeforeRestart);
        }
      }, speed);
    };

    typeText();

    return () => {
      clearAll();
    };
  }, [text, speed, delayBeforeRestart]);

  return (
    <span className="inline-flex items-baseline">
      <span className={className}>
        {displayedText}
      </span>
      <motion.span
        key="cursor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          repeatDelay: 0
        }}
        className="inline-block ml-1 text-blue dark:text-blue-light font-bold"
        style={{
          width: '2px',
        }}
        aria-hidden="true"
      >
        |
      </motion.span>
    </span>
  );
};

export default TypingEffect;

