import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { PortfolioData } from './types';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then((data: PortfolioData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-primary">
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 border-4 border-cream/30 border-t-cream rounded-full" />
          <motion.div
            className="absolute inset-2 border-4 border-blue-light/30 border-t-blue-light rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading portfolio data</div>;
  }

  return (
    <ThemeProvider>
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <Hero personal={data.personal} />
        <About personal={data.personal} experience={data.experience} education={data.education} projects={data.projects} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact personal={data.personal} social={data.social} />
        <Footer personal={data.personal} />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;



