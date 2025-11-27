import { motion } from 'framer-motion';
import type { Personal } from '../types';

interface FooterProps {
  personal: Personal;
}

const Footer = ({ personal }: FooterProps) => {
  return (
    <footer className="bg-cream-dark dark:bg-black-light py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-light/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-2xl font-bold text-black dark:text-cream mb-2">{personal.name}</h3>
            <p className="text-black/70 dark:text-cream/70">{personal.title}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-cream mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-black/70 dark:text-cream/70 hover:text-blue dark:hover:text-blue-light transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-cream mb-4">Contact</h4>
            <p className="text-black/70 dark:text-cream/70 mb-2">{personal.email}</p>
            <p className="text-black/70 dark:text-cream/70">{personal.phone}</p>
          </div>
        </motion.div>
        <motion.div
          className="text-center pt-8 border-t border-blue-light/20 text-black/60 dark:text-cream/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 {personal.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;



