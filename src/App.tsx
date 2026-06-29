import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ImpactGraph from './components/ImpactGraph';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import CockpitHUD from './components/CockpitHUD';
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
      <div className="flex justify-center items-center h-screen bg-black">
        <motion.div
          className="relative w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-black font-tech text-xs text-red-500">
        FATAL ERROR: DATA STREAM DISCONNECTED
      </div>
    );
  }

  return (
    <ThemeProvider>
      {/* Background Interactive canvas */}
      <ParticleCanvas />
      
      {/* Magnetic mouse cursor */}
      <CustomCursor />

      <motion.div
        className="min-h-screen text-white bg-transparent select-none relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <Hero personal={data.personal} />
        
        {/* About: biography and timeline */}
        <About 
          personal={data.personal} 
          experience={data.experience} 
          education={data.education} 
          projects={data.projects} 
        />
        
        {/* Skills modules */}
        <Skills />

        {/* Dynamic Impact Graph */}
        <section id="impact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid relative overflow-hidden border-t border-zinc-900">
          <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.01] blur-[100px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto space-y-12 relative z-10">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">PERFORMANCE DIAGNOSTICS</span>
              <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-white tracking-tight">
                Proof, not promises.
              </h2>
            </div>
            <ImpactGraph />
          </div>
        </section>

        {/* Projects / Case studies drawer */}
        <Projects projects={data.projects} />
        
        {/* Contact console */}
        <Contact personal={data.personal} social={data.social} />
        
        {/* Footer */}
        <Footer personal={data.personal} social={data.social} />

        {/* Dynamic coordinate bottom HUD */}
        <CockpitHUD />
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
