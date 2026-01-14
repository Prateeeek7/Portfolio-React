import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    theme === 'dark' 
      ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
      : ['rgba(239, 236, 227, 0)', 'rgba(239, 236, 227, 0.95)']
  );
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: `blur(${blur}px)`,
      }}
      className="fixed top-0 w-full z-50 py-3 sm:py-4 border-b border-blue-light/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
            Pratik.k
        </motion.a>

        <ul className="hidden md:flex list-none gap-8 items-center">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.a
                href={item.href}
                className="relative text-black dark:text-cream font-medium transition-colors hover:text-blue dark:hover:text-blue-light"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream-dark dark:bg-black-light border border-blue-light/30 flex items-center justify-center text-black dark:text-cream transition-colors touch-manipulation"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </motion.button>

          <motion.button
            className="md:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-black dark:text-cream text-2xl touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-cream dark:bg-black border-b border-blue-light/20 shadow-lg p-6 flex flex-col gap-4"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-black dark:text-cream font-medium py-3 px-2 transition-colors hover:text-blue dark:hover:text-blue-light touch-manipulation min-h-[44px] flex items-center"
                  whileHover={{ x: 5 }}
                >
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

