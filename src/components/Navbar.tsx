import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Custom transparent-to-solid transitions for cockpit HUD look
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );
  
  const blur = useTransform(scrollY, [0, 100], [0, 15]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Impact', href: '#impact' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: `blur(${blur}px)`,
      }}
      className="fixed top-0 w-full z-50 py-3 sm:py-4 border-b border-zinc-900 select-none pointer-events-auto"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout: Distributed Full-Width Links */}
        <ul className="hidden md:flex justify-between items-center w-full list-none m-0 p-0">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 text-center"
            >
              <a
                href={item.href}
                className="relative text-[10.5px] sm:text-xs font-tech tracking-widest uppercase text-zinc-450 hover:text-white transition-all duration-300 py-2 block w-full"
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Layout: Hamburger Menu Button (since there's no logo) */}
        <div className="md:hidden flex justify-end items-center w-full">
          <button
            className="w-9 h-9 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 shadow-xl m-0 p-4 flex flex-col gap-1 list-none"
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900 rounded py-2.5 px-3 transition-all"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
