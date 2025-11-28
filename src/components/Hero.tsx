import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaGithub, FaLinkedin, FaTwitter, FaFilePdf } from 'react-icons/fa';
import type { Personal } from '../types';
import { getProfileImage } from '../utils/images';
import TypingEffect from './TypingEffect';

interface HeroProps {
  personal: Personal;
}

const Hero = ({ personal }: HeroProps) => {
  const [showResumePreviewCTA, setShowResumePreviewCTA] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Check if hero section is in view (with some threshold)
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight * 0.8;
        setIsHeroInView(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-20 pb-12 sm:pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue/10 via-blue-light/10 to-cream-dark/20 dark:from-blue/20 dark:via-blue-light/20 dark:to-black-light/30"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-light/20 rounded-full blur-3xl hidden sm:block"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue/20 rounded-full blur-3xl hidden sm:block"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
        {/* Resume Preview on Hover - Right Half - Full Height from Top */}
        <AnimatePresence>
          {showResumePreviewCTA && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:left-[calc(50%+3rem+25px)] lg:right-4 w-[calc(70%-2rem+10px)] lg:w-auto lg:max-w-[calc(35%-3rem+10px)] bg-cream dark:bg-black rounded-t-2xl lg:rounded-2xl shadow-2xl z-40 overflow-hidden border-2 border-blue-light/30 dark:border-blue/30 border-t-0 lg:border-t-2 hidden lg:block"
              onMouseEnter={() => setShowResumePreviewCTA(true)}
              onMouseLeave={() => setShowResumePreviewCTA(false)}
              style={{ height: 'calc(70vh - 2.25rem + 10px)', top: 'calc(15vh + 4.5rem)' }}
            >
              <div className="h-full w-full relative">
                <iframe
                  src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  className="w-full h-full"
                  title="Resume Preview"
                />
                <div className="absolute top-3 right-3">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-blue/20 dark:bg-blue-light/20 backdrop-blur-sm flex items-center justify-center text-blue dark:text-blue-light cursor-pointer hover:bg-blue/30 dark:hover:bg-blue-light/30 text-xl font-bold"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowResumePreviewCTA(false);
                    }}
                  >
                    ×
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-blue-light/20 dark:bg-blue/30 rounded-full border border-blue/30"
          >
            <span className="text-blue dark:text-blue-light font-medium">👋 Welcome to my portfolio</span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black dark:text-cream leading-tight"
          >
            Hi, I'm{' '}
            <TypingEffect 
              text={personal.name.split(' ')[0]} 
              speed={150}
              className="bg-gradient-primary bg-clip-text text-transparent"
            />
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-blue dark:text-blue-light font-semibold"
          >
            {personal.title}
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-black/70 dark:text-cream/70 max-w-xl leading-relaxed"
          >
            {personal.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-primary text-cream text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-blue/30 hover:shadow-xl hover:shadow-blue/40 transition-shadow inline-flex items-center justify-center min-h-[44px] sm:min-h-[3rem]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-blue dark:border-blue-light text-blue dark:text-blue-light text-sm sm:text-base font-semibold rounded-full hover:bg-blue/10 dark:hover:bg-blue-light/10 transition-colors inline-flex items-center justify-center min-h-[44px] sm:min-h-[3rem]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 pt-4"
          >
            {[
              { icon: FaGithub, href: 'https://github.com/Prateeeek7', label: 'GitHub' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/pratik-kumar-198172186', label: 'LinkedIn' },
              { icon: FaTwitter, href: 'https://x.com/PratikK54196490', label: 'Twitter' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-cream-dark dark:bg-black-light border border-blue-light/30 flex items-center justify-center text-blue dark:text-blue-light hover:bg-blue-light/10 dark:hover:bg-blue/20 transition-colors"
                whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                <social.icon className="text-xl" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex justify-center items-center mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-primary p-1">
              <img
                src={getProfileImage()}
                alt={personal.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-light/50"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue dark:text-blue-light"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
      >
        <FaArrowDown className="text-2xl" />
      </motion.a>

      {/* Resume PDF Icon - Top Right Corner */}
      <AnimatePresence>
        {isHeroInView && (
          <motion.a
            href="/resume.pdf"
            download="Pratik_Kumar_Resume.pdf"
            className="fixed right-4 sm:right-8 z-50 hidden sm:block"
            style={{ top: 'calc(5rem + 15px)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onMouseEnter={() => setShowResumePreviewCTA(true)}
            onMouseLeave={() => setShowResumePreviewCTA(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-primary shadow-lg shadow-blue/30 flex items-center justify-center text-cream hover:shadow-xl hover:shadow-blue/40 transition-all">
              <FaFilePdf className="text-xl sm:text-2xl" />
            </div>
          </motion.a>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;

