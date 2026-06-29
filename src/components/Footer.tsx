import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { Personal, Social } from '../types';

interface FooterProps {
  personal: Personal;
  social: Social;
}

const Footer = ({ personal, social }: FooterProps) => {
  return (
    <footer className="bg-black py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pb-12 select-none relative overflow-hidden">
      {/* Subtle bottom grid background lines */}
      <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 sm:gap-8 items-start text-left relative z-10">
        {/* Profile identity info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-lg font-serif-display font-extrabold text-white tracking-tight">
              {personal.name}
            </h3>
          </div>
          <p className="text-[10px] font-tech text-cyan-400 tracking-widest uppercase">
            {personal.title}
          </p>
        </motion.div>

        {/* Directory links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-4"
        >
          <h4 className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">ROUTING SYSTEM</h4>
          <ul className="space-y-2.5 list-none p-0 m-0">
            {[
              { label: 'ABOUT', href: '#about' },
              { label: 'SKILLS', href: '#skills' },
              { label: 'PROJECTS', href: '#projects' },
              { label: 'CONTACT', href: '#contact' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[10px] font-tech text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-cyan-400 font-bold">
                    &gt;
                  </span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Telemetry endpoints contact info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h4 className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">COMMUNICATION CODES</h4>
          <div className="space-y-2 font-tech text-[10px] sm:text-xs text-zinc-400">
            <p className="hover:text-white transition-colors cursor-pointer">
              <span className="text-zinc-600 mr-1">EMAIL:</span> {personal.email}
            </p>
            <p className="hover:text-white transition-colors cursor-pointer">
              <span className="text-zinc-600 mr-1">PHONE:</span> {personal.phone}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Massive Interactive Title Name Container with Socials and TM */}
      <div className="max-w-7xl mx-auto mt-16 sm:mt-24 select-none relative z-10 flex items-end justify-center w-full">
        {/* Social Icons on the left (vertically aligned next to the word, hidden on mobile) */}
        <div className="absolute left-0 bottom-4 hidden sm:flex flex-col gap-4 text-zinc-500 text-base pointer-events-auto">
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
              <FaGithub />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
              <FaLinkedin />
            </a>
          )}
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
              <FaTwitter />
            </a>
          )}
        </div>

        {/* The Name "PRATIK" with TM */}
        <div className="relative">
          <motion.h1 
            className="text-[17vw] sm:text-[18vw] font-black font-sans-body text-center tracking-tighter leading-none uppercase pointer-events-auto cursor-default transition-all duration-700 ease-out text-transparent select-none relative px-6"
            style={{
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'; // White Glow
              e.currentTarget.style.webkitTextStroke = '1.5px transparent';
              e.currentTarget.style.textShadow = '0 0 35px rgba(255, 255, 255, 0.85)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'transparent';
              e.currentTarget.style.webkitTextStroke = '1.5px rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.textShadow = 'none';
            }}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            PRATIK
            <span className="absolute -top-1 right-0 text-[3vw] sm:text-[2.5vw] font-tech text-zinc-600 tracking-normal select-none pointer-events-none uppercase">
              TM
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Mobile Social Icons (only visible on mobile, under the name) */}
      <div className="flex sm:hidden gap-6 text-zinc-500 text-base justify-center mt-6 mb-2 pointer-events-auto">
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
            <FaGithub />
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
            <FaLinkedin />
          </a>
        )}
        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
            <FaTwitter />
          </a>
        )}
      </div>

      {/* Copyright notes */}
      <motion.div
        className="text-center pt-8 mt-12 border-t border-zinc-950 text-zinc-650 font-tech text-[9px] tracking-widest relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>&copy; {new Date().getFullYear()} {personal.name.toUpperCase()}. ALL SYSTEM LOGS SECURED.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
