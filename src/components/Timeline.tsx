import React, { useRef, useState } from 'react';
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative w-full overflow-visible py-4 select-none">
      {/* Central axis line */}
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-zinc-900" />
      
      {/* Animated progress tracking line */}
      <motion.div
        className="absolute left-6 sm:left-8 top-0 w-[1px] bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 origin-top"
        style={{ height: progressHeight }}
      />
      
      <div className="relative space-y-12">
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
  const isInView = useInView(itemRef, { once: false, margin: '-150px 0px' });
  
  const itemProgressStart = index / totalItems;
  const itemProgressEnd = (index + 1) / totalItems;
  
  const itemProgress = useTransform(
    scrollProgress,
    [itemProgressStart, itemProgressEnd],
    [0, 1]
  );

  const dotScale = useTransform(itemProgress, [0, 0.5, 1], [1, 1.25, 1]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative pl-12 sm:pl-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Telemetry node point */}
      <motion.div
        className="absolute left-[19px] sm:left-[27px] top-1.5 h-[11px] w-[11px] rounded-full bg-black border-2 border-cyan-400 z-10 cursor-pointer"
        style={{
          scale: hovered ? 1.3 : dotScale,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Pulsing telemetry node border */}
        {isInView && (
          <motion.div
            className="absolute -inset-2 rounded-full border border-cyan-400/30"
            animate={{
              scale: [1, 1.8, 1],
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

      {/* Date / Title indicator */}
      <motion.h3
        className="text-xs sm:text-sm font-tech font-bold text-zinc-400 uppercase tracking-widest mb-2"
        animate={{ 
          x: hovered ? 3 : 0,
          color: hovered ? '#00E5FF' : '#a1a1aa'
        }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>

      {/* Trajectory description card */}
      <motion.div
        className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 hover:border-zinc-800 transition-all select-none"
        animate={{
          y: hovered ? -2 : 0,
          boxShadow: hovered ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
};
