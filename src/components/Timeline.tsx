import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Transform scroll progress to timeline progress
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative w-full overflow-visible">
      {/* Timeline line background */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-light/30 dark:bg-blue/30" />
      
      {/* Animated progress line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue via-blue-light to-blue dark:from-blue-light dark:via-blue dark:to-blue-light origin-top"
        style={{ height: progressHeight }}
      />
      
      <div ref={containerRef} className="relative space-y-12">
        {data.map((item, index) => (
          <TimelineItemComponent
            key={index}
            title={item.title}
            content={item.content}
            index={index}
            scrollProgress={scrollYProgress}
            totalItems={data.length}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineItemComponent = ({ 
  title, 
  content, 
  index,
  scrollProgress,
  totalItems
}: { 
  title: string; 
  content: React.ReactNode; 
  index: number;
  scrollProgress: any;
  totalItems: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, margin: '-200px 0px' });
  
  // Calculate when this item should be active based on scroll progress
  const itemProgressStart = index / totalItems;
  const itemProgressEnd = (index + 1) / totalItems;
  
  const itemProgress = useTransform(
    scrollProgress,
    [itemProgressStart, itemProgressEnd],
    [0, 1]
  );

  const dotScale = useTransform(itemProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const dotGlow = useTransform(
    itemProgress,
    [0, 0.5, 1],
    ['0 0 10px rgba(79, 112, 169, 0.3)', '0 0 25px rgba(79, 112, 169, 0.8)', '0 0 10px rgba(79, 112, 169, 0.3)']
  );

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0.3, x: -50, y: 20 }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative pl-12 sm:pl-16 md:pl-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline dot with scroll animation */}
      <motion.div
        className="absolute left-2 sm:left-3 md:left-4 top-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-primary border-2 sm:border-[3px] md:border-4 border-cream dark:border-black z-10"
        style={{
          scale: hovered ? 1.2 : dotScale,
          boxShadow: hovered ? '0 0 20px rgba(79, 112, 169, 0.6)' : dotGlow,
        }}
        transition={hovered ? { duration: 0.3 } : { duration: 0.5 }}
      >
        {/* Pulsing ring effect when in view */}
        {isInView && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-light dark:border-blue"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* Title with scroll animation */}
      <motion.h3
              className="text-xl sm:text-2xl font-bold text-black dark:text-cream mb-3 sm:mb-4"
        animate={{ 
          x: hovered ? 5 : 0,
          opacity: isInView ? 1 : 0.6
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>

      {/* Content card with scroll animation */}
      <motion.div
              className="bg-cream-dark dark:bg-black-light rounded-xl p-4 sm:p-6 shadow-lg"
        animate={{
          scale: hovered ? 1.02 : isInView ? 1 : 0.98,
          boxShadow: hovered
            ? '0 20px 40px rgba(0, 0, 0, 0.15)'
            : isInView
            ? '0 10px 20px rgba(0, 0, 0, 0.1)'
            : '0 5px 10px rgba(0, 0, 0, 0.05)',
          opacity: isInView ? 1 : 0.7,
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {content}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

