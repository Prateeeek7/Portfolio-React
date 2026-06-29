import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFilePdf, FaEnvelope, FaTimes } from 'react-icons/fa';
import type { Personal } from '../types';
import { getProfileImage } from '../utils/images';

interface HeroProps {
  personal: Personal;
}

const Hero = ({ personal }: HeroProps) => {
  const [showResumePreviewCTA, setShowResumePreviewCTA] = useState(false);

  // Lock background scroll when resume preview drawer is open
  useEffect(() => {
    if (showResumePreviewCTA) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showResumePreviewCTA]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid overflow-hidden">
      {/* Subtle radial overlay behind content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />

      {/* Background Glow spotlight */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
        
        {/* Resume Preview overlay (Right half drawer) */}
        <AnimatePresence>
          {showResumePreviewCTA && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full lg:w-1/2 bg-zinc-950 border-l border-zinc-800/80 z-50 shadow-2xl overflow-hidden pointer-events-auto flex flex-col pt-16 pb-6 px-4"
              onMouseEnter={() => setShowResumePreviewCTA(true)}
              onMouseLeave={() => setShowResumePreviewCTA(false)}
            >
              {/* Header: Close CTA */}
              <div className="flex justify-between items-center mb-4 px-2">
                <button
                  onClick={() => setShowResumePreviewCTA(false)}
                  className="text-[10px] font-tech text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  <FaTimes />
                  CLOSE PREVIEW
                </button>
                <span className="text-[9px] font-tech text-zinc-650 uppercase">TELEMETRY DOCS</span>
              </div>

              {/* PDF Document Frame */}
              <div className="flex-1 w-full bg-zinc-900 border border-zinc-900 rounded overflow-hidden relative">
                <iframe
                  src="/resume.pdf?v=2#toolbar=0&navpanes=0&scrollbar=1"
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Column: Telemetry info details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          {/* Engineering Philosophy statement */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <span className="text-[10px] sm:text-xs font-tech text-zinc-500 tracking-wider uppercase block mb-1">DESIGN PHILOSOPHY</span>
            <p className="text-zinc-400 font-tech text-xs sm:text-sm leading-relaxed border-l-2 border-cyan-400 pl-4 py-1">
              — Not just building websites - engineering responsive, intelligent, and scalable full-stack hardware integrations.
            </p>
          </motion.div>

          {/* Name Display */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-serif-display font-extrabold text-white tracking-tight leading-[1.05]">
              {personal.name}
            </h1>
            <p className="text-xs sm:text-sm font-tech text-cyan-400 tracking-widest uppercase">
              {personal.title}
            </p>
          </motion.div>

          {/* Grid Metadata HUD */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-2 gap-4 border-t border-b border-zinc-900 py-6 max-w-md"
          >
            <div>
              <span className="text-[9px] font-tech text-zinc-500 tracking-widest block uppercase">CURRENT ROLE</span>
              <span className="text-xs font-tech text-zinc-300">UI/UX & Web Dev Intern</span>
            </div>
            <div>
              <span className="text-[9px] font-tech text-zinc-500 tracking-widest block uppercase">AFFILIATION</span>
              <span className="text-xs font-tech text-zinc-300">
                Founder and Lead Developer,{' '}
                <a
                  href="https://www.mmew3.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 hover:underline transition-all cursor-pointer pointer-events-auto"
                >
                  MMEW3 make me worldwideweb
                </a>
              </span>
            </div>
            <div className="mt-2">
              <span className="text-[9px] font-tech text-zinc-500 tracking-widest block uppercase">ACADEMICS</span>
              <span className="text-xs font-tech text-zinc-300">B.Tech ECE at VIT Vellore</span>
            </div>
            <div className="mt-2">
              <span className="text-[9px] font-tech text-zinc-500 tracking-widest block uppercase">GPS LOCATION</span>
              <span className="text-xs font-tech text-zinc-300">Vellore, Tamil Nadu, IN</span>
            </div>
          </motion.div>

          {/* Action buttons & socials */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              href="/resume.pdf?v=2"
              download="Pratik_Kumar_Resume.pdf"
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black text-xs sm:text-sm font-tech font-bold rounded-full hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 select-none cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) {
                  setShowResumePreviewCTA(true);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 1024) {
                  setShowResumePreviewCTA(false);
                }
              }}
            >
              <FaFilePdf className="text-sm" />
              DOWNLOAD RESUME
            </motion.a>

            <motion.a
              href="#contact"
              className="px-6 py-2.5 sm:px-8 sm:py-3 border border-zinc-800 hover:border-zinc-500 text-white text-xs sm:text-sm font-tech font-bold rounded-full transition-colors inline-flex items-center justify-center select-none cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH
            </motion.a>

            {/* Outlined Socials */}
            <div className="flex gap-3 pl-2 sm:pl-4">
              {[
                { icon: FaGithub, href: 'https://github.com/Prateeeek7', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/pratik-kumar-198172186', label: 'LinkedIn' },
                { icon: FaEnvelope, href: 'mailto:pratik2002singh@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-sm sm:text-base" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile image card */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-[280px] sm:w-[320px] bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 hover:border-zinc-700 transition-all group select-none">
            {/* Aspect ratio box for image */}
            <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-zinc-900 border border-zinc-800/40">
              <img
                src={getProfileImage()}
                alt={personal.name}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            
            {/* Tags row */}
            <div className="mt-3.5 pt-3.5 border-t border-zinc-900 flex flex-col items-center">
              <div className="text-[10px] font-tech text-zinc-300 text-center tracking-wider leading-relaxed">
                FULL STACK & AI • VIT VELLORE • FIGMA • REACT • PYTORCH • TENSORFLOW • KERAS
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
